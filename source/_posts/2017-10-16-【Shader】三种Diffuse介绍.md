---
title: 【Shader】三种基础 Diffuse 漫反射光照模型详解
date: 2017-10-16 22:54:06
cover: /img/article-title/三种diffuse介绍.jpg
tags:
  - Diffuse
  - Shader详解(含Code)
  - Unity3D
categories:
  - 渲染与特效
tagline: 详解高洛德漫反射、Phong 逐像素漫反射与半兰伯特漫反射的原理及 Shader 实现
listing:
  priority: 1
---

{% box 基础光照模型导览 %}
本篇系统解析 Unity 实时渲染中三种基础漫反射模型：
1. **高洛德漫反射 (Gouraud Shading)**：顶点级光照，性能极高。
2. **Phong 逐像素漫反射 (Pixel Diffuse)**：片元级光照，过渡细腻。
3. **Half-Lambert 半兰伯特漫反射**：Valve 经典技术，提升暗部细节。
4. **工程级扩展**：法线贴图切线空间计算与光照衰减。
{% endbox %}
---

### 漫反射效果对比

![](/img/article/diffuse.png)
*(左：高洛德漫反射，中：Phong 逐像素漫反射，右：Phong 半兰伯特漫反射)*

---

## 1. 高洛德漫反射 (Gouraud Diffuse)

{% box 原理说明 %}
在**顶点着色器（Vertex Shader）**中计算漫反射光照，然后通过光栅化阶段插值传入片元着色器。计算量小、性能极高，但在低多边形网格表面容易产生明显的折线光照伪影。
{% endbox %}

```shaderlab
Shader "Custom/GouraudDiffuse" {
	Properties {
		_Diffuse ("Diffuse Color", Color) = (1, 1, 1, 1)
	}
	SubShader {
		Pass { 
			Tags { "LightMode"="ForwardBase" }		
			CGPROGRAM			
			#pragma vertex vert
			#pragma fragment frag			
			#include "Lighting.cginc"
			
			fixed4 _Diffuse;			
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
				// 获取环境光 (由 Lighting.cginc 与 ForwardBase 决定)
				fixed3 ambient = UNITY_LIGHTMODEL_AMBIENT.xyz;
				fixed3 worldNormal = UnityObjectToWorldNormal(v.normal);
				// 在世界空间下获取平行光方向
				fixed3 worldLight = normalize(_WorldSpaceLightPos0.xyz);
				// 计算漫反射：_LightColor0 为光源颜色，saturate 将点积截取至 [0, 1]
				fixed3 diffuse = _LightColor0.rgb * _Diffuse.rgb * saturate(dot(worldNormal, worldLight));
				
				// 顶点颜色累加环境光与漫反射
				o.color = ambient + diffuse;
				return o;
			}
			
			fixed4 frag(v2f i) : SV_Target {
				return fixed4(i.color, 1.0);
			}			
			ENDCG
		}
	}
	FallBack "Diffuse"
}
```

---

## 2. Phong 逐像素漫反射 (Pixel Diffuse)

{% box 原理说明 %}
顶点着色器仅负责将顶点法线转换到世界坐标系并传递给片元；在**片元着色器（Fragment Shader）**中对每个像素逐一归一化法线并计算点积光照。光照平滑细腻，能够完美呈现曲面阴影过渡。
{% endbox %}

```shaderlab
Shader "Custom/PixelDiffuse" {
	Properties {
		_Diffuse ("Diffuse Color", Color) = (1, 1, 1, 1)
	}
	SubShader {
		Pass { 
			Tags { "LightMode"="ForwardBase" }		
			CGPROGRAM			
			#pragma vertex vert
			#pragma fragment frag			
			#include "Lighting.cginc"			

			fixed4 _Diffuse;
			struct a2v {
				float4 vertex : POSITION;
				float3 normal : NORMAL;
			};			
			struct v2f {
				float4 pos : SV_POSITION;
				float3 worldNormal : TEXCOORD0;
			};
			
			v2f vert(a2v v) {
				v2f o;
				o.pos = UnityObjectToClipPos(v.vertex);
				o.worldNormal = UnityObjectToWorldNormal(v.normal);
				return o;
			}
			
			fixed4 frag(v2f i) : SV_Target {
				fixed3 ambient = UNITY_LIGHTMODEL_AMBIENT.xyz;
				fixed3 worldNormal = normalize(i.worldNormal);
				fixed3 worldLightDir = normalize(_WorldSpaceLightPos0.xyz);
				fixed3 diffuse = _LightColor0.rgb * _Diffuse.rgb * saturate(dot(worldNormal, worldLightDir));
				fixed3 color = ambient + diffuse;
				return fixed4(color, 1.0);
			}			
			ENDCG
		}
	} 
	FallBack "Diffuse"
}
```

---

## 3. Phong 半兰伯特漫反射 (Half-Lambert)

{% box 原理说明 %}
由 Valve 在《半条命》中提出，通过公式 `dot(n, l) * 0.5 + 0.5` 将标准朗伯光照 `[-1, 1]` 的范围重新映射到 `[0, 1]`。即使背面不受光也能保留环境阴影层次，有效防止暗部死黑，非常适合角色面部与皮肤渲染。
{% endbox %}

```shaderlab
Shader "Custom/HalfLambert" {
	Properties {
		_Diffuse ("Diffuse Color", Color) = (1, 1, 1, 1)
	}
	SubShader {
		Pass { 
			Tags { "LightMode"="ForwardBase" }
			CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			#include "Lighting.cginc"

			fixed4 _Diffuse;
			struct a2v {
				float4 vertex : POSITION;
				float3 normal : NORMAL;
			};
			struct v2f {
				float4 pos : SV_POSITION;
				float3 worldNormal : TEXCOORD0;
			};

			v2f vert(a2v v) {
				v2f o;
				o.pos = UnityObjectToClipPos(v.vertex);
				o.worldNormal = UnityObjectToWorldNormal(v.normal);
				return o;
			}

			fixed4 frag(v2f i) : SV_Target {
				fixed3 ambient = UNITY_LIGHTMODEL_AMBIENT.xyz;
				fixed3 worldNormal = normalize(i.worldNormal);
				fixed3 worldLightDir = normalize(_WorldSpaceLightPos0.xyz);
				// 半兰伯特核心公式映射
				fixed3 halfLambert = dot(worldNormal, worldLightDir) * 0.5 + 0.5;
				fixed3 diffuse = _LightColor0.rgb * _Diffuse.rgb * halfLambert;
				fixed3 color = ambient + diffuse;
				return fixed4(color, 1.0);
			}
			ENDCG
		}
	} 
	FallBack "Diffuse"
}
```

---

## 4. 工业级工程应用：法线贴图 + 阴影投射与光照衰减

{% box 原理说明 %}
实际游戏项目中，漫反射通常配合切线空间法线贴图（Normal Map）与 Unity 前向渲染多 Pass（`ForwardBase` + `ForwardAdd`），以支持多光源累加与实时阴影投射（`TRANSFER_SHADOW` / `SHADOW_ATTENUATION`）。
{% endbox %}

```shaderlab
Shader "Custom/BumpedDiffuseWithShadow" {
	Properties {
		_Color ("Color Tint", Color) = (1, 1, 1, 1)
		_MainTex ("Main Tex", 2D) = "white" {}
		_BumpMap ("Normal Map", 2D) = "bump" {}
	}
	SubShader {
		Tags { "RenderType"="Opaque" "Queue"="Geometry"}

		// Base Pass: 处理平行光、环境光与主阴影
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
				
				fixed3 bump = UnpackNormal(tex2D(_BumpMap, i.uv.zw));
				bump = normalize(half3(dot(i.TtoW0.xyz, bump), dot(i.TtoW1.xyz, bump), dot(i.TtoW2.xyz, bump)));
				
				fixed3 albedo = tex2D(_MainTex, i.uv.xy).rgb * _Color.rgb;
				fixed3 ambient = UNITY_LIGHTMODEL_AMBIENT.xyz * albedo;
			 	fixed3 diffuse = _LightColor0.rgb * albedo * max(0, dot(bump, lightDir));
				
				UNITY_LIGHT_ATTENUATION(atten, i, worldPos);
				return fixed4(ambient + diffuse * atten, 1.0);
			}
			ENDCG
		}
		
		// Add Pass: 处理点光源与聚光灯累加
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
				
				fixed3 bump = UnpackNormal(tex2D(_BumpMap, i.uv.zw));
				bump = normalize(half3(dot(i.TtoW0.xyz, bump), dot(i.TtoW1.xyz, bump), dot(i.TtoW2.xyz, bump)));
				
				fixed3 albedo = tex2D(_MainTex, i.uv.xy).rgb * _Color.rgb;
			 	fixed3 diffuse = _LightColor0.rgb * albedo * max(0, dot(bump, lightDir));
				
				UNITY_LIGHT_ATTENUATION(atten, i, worldPos);
				return fixed4(diffuse * atten, 1.0);
			}
			ENDCG
		}
	} 
	FallBack "Diffuse"
}
```
