---
title: 【Shader】三种基础 Specular 高光反射光照模型详解
date: 2017-10-17 12:30:25
cover: /img/article-title/三种Specular.jpg
tags:
  - Specular
  - Shader详解(含Code)
  - Unity3D
categories:
  - 渲染与特效
tagline: 详解高洛德高光、Phong 逐像素高光与 Blinn-Phong 光照模型的原理及 Shader 实现
listing:
  priority: 1
---

{% box 基础高光光照模型导览 %}
本篇系统解析 Unity 实时渲染中三种基础高光反射模型：
1. **高洛德高光反射 (Gouraud Specular)**：顶点级高光计算，开销极低。
2. **Phong 逐像素高光反射**：基于反射向量 $\vec{r}$ 与视线 $\vec{v}$ 的高光计算。
3. **Blinn-Phong 光照模型**：采用半角向量 $\vec{h}$ 替代反射向量，现代渲染工业标准。
4. **工程级扩展**：法线贴图切线空间与阴影接收完整实现。
{% endbox %}
---

### 高光反射效果对比

![](/img/article/Specular.png)
*(左：高洛德高光反射，中：Phong 逐像素高光反射，右：Blinn-Phong 光照模型)*

---

## 1. 高洛德高光反射 (Gouraud Specular)

{% box 原理说明 %}
在**顶点着色器（Vertex Shader）**中计算反射向量 $\vec{r} = \text{reflect}(-\vec{l}, \vec{n})$，再与视线方向 $\vec{v}$ 做点积求高光。由于高光区域在顶点间非线性变化，顶点插值容易导致高光区域失真或“漏掉”高光斑，现代引擎极少使用。
{% endbox %}

```shaderlab
Shader "Custom/GouraudSpecular" {
	Properties {
		_Diffuse ("Diffuse Color", Color) = (1, 1, 1, 1)
		_Specular ("Specular Color", Color) = (1, 1, 1, 1)
		_Gloss ("Gloss", Range(8.0, 256)) = 20 // 控制高光光斑大小与锐度
	}
	SubShader {
		Pass { 
			Tags { "LightMode"="ForwardBase" }
			CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			#include "Lighting.cginc"
			
			fixed4 _Diffuse;
			fixed4 _Specular;
			float _Gloss;
			
			struct a2v {
				float4 vertex : POSITION;
				float3 normal : NORMAL;
			};
			struct v2f {
				float4 pos : SV_POSITION;
				fixed3 color : COLOR;
			};
			
			v2f vert(a2v v) {
				v2f o;
				o.pos = UnityObjectToClipPos(v.vertex);
				fixed3 ambient = UNITY_LIGHTMODEL_AMBIENT.xyz;
				fixed3 worldNormal = UnityObjectToWorldNormal(v.normal);
				fixed3 worldLightDir = normalize(_WorldSpaceLightPos0.xyz);
				
				// 漫反射计算
				fixed3 diffuse = _LightColor0.rgb * _Diffuse.rgb * saturate(dot(worldNormal, worldLightDir));
				
				// 反射光向量 reflect(入射方向, 法线)
				fixed3 reflectDir = normalize(reflect(-worldLightDir, worldNormal));
				fixed3 viewDir = normalize(_WorldSpaceCameraPos.xyz - mul(unity_ObjectToWorld, v.vertex).xyz);
				
				// 高光计算：pow(dot(v, r), gloss)
				fixed3 specular = _LightColor0.rgb * _Specular.rgb * pow(saturate(dot(reflectDir, viewDir)), _Gloss);
				
				o.color = ambient + diffuse + specular;
				return o;
			}
			
			fixed4 frag(v2f i) : SV_Target {
				return fixed4(i.color, 1.0);
			}
			ENDCG
		}
	} 
	FallBack "Specular"
}
```

---

## 2. Phong 逐像素高光反射 (Pixel Specular)

{% box 原理说明 %}
在**片元着色器（Fragment Shader）**中逐像素计算反射光向量与视线方向的点积，高光斑边缘过渡柔和真实。
{% endbox %}

```shaderlab
Shader "Custom/PixelSpecular" {
	Properties {
		_Diffuse ("Diffuse Color", Color) = (1, 1, 1, 1)
		_Specular ("Specular Color", Color) = (1, 1, 1, 1)
		_Gloss ("Gloss", Range(8.0, 256)) = 20
	}
	SubShader {
		Pass { 
			Tags { "LightMode"="ForwardBase" }
			CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			#include "Lighting.cginc"
			
			fixed4 _Diffuse;
			fixed4 _Specular;
			float _Gloss;
			
			struct a2v {
				float4 vertex : POSITION;
				float3 normal : NORMAL;
			};
			struct v2f {
				float4 pos : SV_POSITION;
				float3 worldNormal : TEXCOORD0;
				float3 worldPos : TEXCOORD1;
			};
			
			v2f vert(a2v v) {
				v2f o;
				o.pos = UnityObjectToClipPos(v.vertex);
				o.worldNormal = UnityObjectToWorldNormal(v.normal);
				o.worldPos = mul(unity_ObjectToWorld, v.vertex).xyz;
				return o;
			}
			
			fixed4 frag(v2f i) : SV_Target {
				fixed3 ambient = UNITY_LIGHTMODEL_AMBIENT.xyz;
				fixed3 worldNormal = normalize(i.worldNormal);
				fixed3 worldLightDir = normalize(_WorldSpaceLightPos0.xyz);
				
				fixed3 diffuse = _LightColor0.rgb * _Diffuse.rgb * saturate(dot(worldNormal, worldLightDir));
				
				fixed3 reflectDir = normalize(reflect(-worldLightDir, worldNormal));
				fixed3 viewDir = normalize(_WorldSpaceCameraPos.xyz - i.worldPos);
				
				fixed3 specular = _LightColor0.rgb * _Specular.rgb * pow(saturate(dot(reflectDir, viewDir)), _Gloss);
				
				return fixed4(ambient + diffuse + specular, 1.0);
			}
			ENDCG
		}
	} 
	FallBack "Specular"
}
```

---

## 3. Blinn-Phong 光照模型（半角向量优化）

{% box 原理说明 %}
引入**半角向量（Half Vector）** $\vec{h} = \text{normalize}(\vec{l} + \vec{v})$。通过计算法线与半角的点积 $\text{dot}(\vec{n}, \vec{h})$ 替代反射向量 $\vec{r}$，省去了复杂的 `reflect()` 运算，性能更高，且在大入射角观察时的高光更平滑。
{% endbox %}

```shaderlab
Shader "Custom/BlinnPhong" {
	Properties {
		_Diffuse ("Diffuse Color", Color) = (1, 1, 1, 1)
		_Specular ("Specular Color", Color) = (1, 1, 1, 1)
		_Gloss ("Gloss", Range(8.0, 256)) = 20
	}
	SubShader {
		Pass { 
			Tags { "LightMode"="ForwardBase" }
			CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			#include "Lighting.cginc"
			
			fixed4 _Diffuse;
			fixed4 _Specular;
			float _Gloss;
			
			struct a2v {
				float4 vertex : POSITION;
				float3 normal : NORMAL;
			};
			struct v2f {
				float4 pos : SV_POSITION;
				float3 worldNormal : TEXCOORD0;
				float3 worldPos : TEXCOORD1;
			};
			
			v2f vert(a2v v) {
				v2f o;
				o.pos = UnityObjectToClipPos(v.vertex);
				o.worldNormal = UnityObjectToWorldNormal(v.normal);
				o.worldPos = mul(unity_ObjectToWorld, v.vertex).xyz;
				return o;
			}
			
			fixed4 frag(v2f i) : SV_Target {
				fixed3 ambient = UNITY_LIGHTMODEL_AMBIENT.xyz;
				fixed3 worldNormal = normalize(i.worldNormal);
				fixed3 worldLightDir = normalize(_WorldSpaceLightPos0.xyz);
				
				fixed3 diffuse = _LightColor0.rgb * _Diffuse.rgb * saturate(dot(worldNormal, worldLightDir));
				
				fixed3 viewDir = normalize(_WorldSpaceCameraPos.xyz - i.worldPos);
				// Blinn-Phong 核心：半角向量
				fixed3 halfDir = normalize(worldLightDir + viewDir);
				fixed3 specular = _LightColor0.rgb * _Specular.rgb * pow(saturate(dot(worldNormal, halfDir)), _Gloss);
				
				return fixed4(ambient + diffuse + specular, 1.0);
			}
			ENDCG
		}
	} 
	FallBack "Specular"
}
```

---

## 4. 工业级工程应用：法线贴图 + Blinn-Phong + 阴影与双 Pass

{% box 原理说明 %}
支持切线空间法线解包、主光源阴影衰减（`AutoLight.cginc`）以及前向附加光照（`ForwardAdd`）。
{% endbox %}

```shaderlab
Shader "Custom/BumpedBlinnPhongWithShadow" {
	Properties {
		_Color ("Color Tint", Color) = (1, 1, 1, 1)
		_MainTex ("Main Tex", 2D) = "white" {}
		_BumpMap ("Normal Map", 2D) = "bump" {}
		_Specular ("Specular Color", Color) = (1, 1, 1, 1)
		_Gloss ("Gloss", Range(8.0, 256)) = 20
	}
	SubShader {
		Tags { "RenderType"="Opaque" "Queue"="Geometry"}

		// Base Pass
		Pass { 
			Tags { "LightMode"="ForwardBase" }
			CGPROGRAM
			#pragma multi_compile_fwdbase
			#pragma vertex vert
			#pragma fragment frag
			#include "Lighting.cginc"
			#include "AutoLight.cginc"
			
			fixed4 _Color;
			sampler2D _MainTex; float4 _MainTex_ST;
			sampler2D _BumpMap; float4 _BumpMap_ST;
			fixed4 _Specular; float _Gloss;
			
			struct a2v {
				float4 vertex : POSITION;
				float3 normal : NORMAL;
				float4 tangent : TANGENT;
				float4 texcoord : TEXCOORD0;
			};
			struct v2f {
				float4 pos : SV_POSITION;
				float4 uv : TEXCOORD0;
				float4 TtoW0 : TEXCOORD1;  
				float4 TtoW1 : TEXCOORD2;  
				float4 TtoW2 : TEXCOORD3;
				SHADOW_COORDS(4)
			};
			
			v2f vert(a2v v) {
				v2f o;
				o.pos = UnityObjectToClipPos(v.vertex);
				o.uv.xy = v.texcoord.xy * _MainTex_ST.xy + _MainTex_ST.zw;
				o.uv.zw = v.texcoord.xy * _BumpMap_ST.xy + _BumpMap_ST.zw;
				
				float3 worldPos = mul(unity_ObjectToWorld, v.vertex).xyz;  
				fixed3 worldNormal = UnityObjectToWorldNormal(v.normal);  
				fixed3 worldTangent = UnityObjectToWorldDir(v.tangent.xyz);  
				fixed3 worldBinormal = cross(worldNormal, worldTangent) * v.tangent.w; 
				
				o.TtoW0 = float4(worldTangent.x, worldBinormal.x, worldNormal.x, worldPos.x);
				o.TtoW1 = float4(worldTangent.y, worldBinormal.y, worldNormal.y, worldPos.y);
				o.TtoW2 = float4(worldTangent.z, worldBinormal.z, worldNormal.z, worldPos.z);  
				
				TRANSFER_SHADOW(o);
				return o;
			}
			
			fixed4 frag(v2f i) : SV_Target {
				float3 worldPos = float3(i.TtoW0.w, i.TtoW1.w, i.TtoW2.w);
				fixed3 lightDir = normalize(UnityWorldSpaceLightDir(worldPos));
				fixed3 viewDir = normalize(UnityWorldSpaceViewDir(worldPos));
				
				fixed3 bump = UnpackNormal(tex2D(_BumpMap, i.uv.zw));
				bump = normalize(half3(dot(i.TtoW0.xyz, bump), dot(i.TtoW1.xyz, bump), dot(i.TtoW2.xyz, bump)));
				
				fixed3 albedo = tex2D(_MainTex, i.uv.xy).rgb * _Color.rgb;
				fixed3 ambient = UNITY_LIGHTMODEL_AMBIENT.xyz * albedo;
			 	fixed3 diffuse = _LightColor0.rgb * albedo * max(0, dot(bump, lightDir));
				
				fixed3 halfDir = normalize(lightDir + viewDir);
				fixed3 specular = _LightColor0.rgb * _Specular.rgb * pow(max(0, dot(bump, halfDir)), _Gloss);
				
				UNITY_LIGHT_ATTENUATION(atten, i, worldPos);
				return fixed4(ambient + (diffuse + specular) * atten, 1.0);
			}
			ENDCG
		}
		
		// Add Pass
		Pass { 
			Tags { "LightMode"="ForwardAdd" }
			Blend One One
			CGPROGRAM
			#pragma multi_compile_fwdadd
			#pragma vertex vert
			#pragma fragment frag
			#include "Lighting.cginc"
			#include "AutoLight.cginc"
			
			fixed4 _Color;
			sampler2D _MainTex; float4 _MainTex_ST;
			sampler2D _BumpMap; float4 _BumpMap_ST;
			fixed4 _Specular; float _Gloss;
			
			struct a2v {
				float4 vertex : POSITION;
				float3 normal : NORMAL;
				float4 tangent : TANGENT;
				float4 texcoord : TEXCOORD0;
			};
			struct v2f {
				float4 pos : SV_POSITION;
				float4 uv : TEXCOORD0;
				float4 TtoW0 : TEXCOORD1;  
				float4 TtoW1 : TEXCOORD2;  
				float4 TtoW2 : TEXCOORD3;
				SHADOW_COORDS(4)
			};
			
			v2f vert(a2v v) {
				v2f o;
				o.pos = UnityObjectToClipPos(v.vertex);
				o.uv.xy = v.texcoord.xy * _MainTex_ST.xy + _MainTex_ST.zw;
				o.uv.zw = v.texcoord.xy * _BumpMap_ST.xy + _BumpMap_ST.zw;
				
				float3 worldPos = mul(unity_ObjectToWorld, v.vertex).xyz;  
				fixed3 worldNormal = UnityObjectToWorldNormal(v.normal);  
				fixed3 worldTangent = UnityObjectToWorldDir(v.tangent.xyz);  
				fixed3 worldBinormal = cross(worldNormal, worldTangent) * v.tangent.w; 
				
				o.TtoW0 = float4(worldTangent.x, worldBinormal.x, worldNormal.x, worldPos.x);
				o.TtoW1 = float4(worldTangent.y, worldBinormal.y, worldNormal.y, worldPos.y);
				o.TtoW2 = float4(worldTangent.z, worldBinormal.z, worldNormal.z, worldPos.z);  
				
				TRANSFER_SHADOW(o);
				return o;
			}
			
			fixed4 frag(v2f i) : SV_Target {
				float3 worldPos = float3(i.TtoW0.w, i.TtoW1.w, i.TtoW2.w);
				fixed3 lightDir = normalize(UnityWorldSpaceLightDir(worldPos));
				fixed3 viewDir = normalize(UnityWorldSpaceViewDir(worldPos));
				
				fixed3 bump = UnpackNormal(tex2D(_BumpMap, i.uv.zw));
				bump = normalize(half3(dot(i.TtoW0.xyz, bump), dot(i.TtoW1.xyz, bump), dot(i.TtoW2.xyz, bump)));
				
				fixed3 albedo = tex2D(_MainTex, i.uv.xy).rgb * _Color.rgb;
			 	fixed3 diffuse = _LightColor0.rgb * albedo * max(0, dot(bump, lightDir));
				
				fixed3 halfDir = normalize(lightDir + viewDir);
				fixed3 specular = _LightColor0.rgb * _Specular.rgb * pow(max(0, dot(bump, halfDir)), _Gloss);
				
				UNITY_LIGHT_ATTENUATION(atten, i, worldPos);
				return fixed4((diffuse + specular) * atten, 1.0);
			}
			ENDCG
		}
	} 
	FallBack "Specular"
}
```
