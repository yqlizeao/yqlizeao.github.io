---
published: false
---
>> 高洛德漫反射<br>
>> Phone漫反射<br>
>> Phone半兰伯特<br>
>> 三种基础漫反射Shader

![](http://yqlizeao.55555.io/img/article/diffuse.png)

## 更新纪要

2017年10月16日22:44:48 三种Diffuse Shader编写

### 高洛德漫反射
```
Shader "高洛德漫反射" {
	Properties {
		_Diffuse ("Diffuse", Color) = (1, 1, 1, 1)
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
				//获取环境光 "Lighting.cginc"决定UNITY_LIGHTMODEL_AMBIENT能拿到，"LightMode"="ForwardBase"决定UNITY_LIGHTMODEL_AMBIENT
				fixed3 ambient = UNITY_LIGHTMODEL_AMBIENT.xyz;
				fixed3 worldNormal =UnityObjectToWorldNormal(v.normal);
				//在世界空间下获取光的方向
				fixed3 worldLight = normalize(_WorldSpaceLightPos0.xyz); //_WorldSpaceLightPos是Forward前向渲染当中重要的光源
				//计算漫反射 _LightColor0类比_WorldSpaceLightPos0;saturate把漫反射系数截取到[0,1]
				fixed3 diffuse = _LightColor0.rgb * _Diffuse.rgb * saturate(dot(worldNormal, worldLight));
				
				//此处的颜色累加
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
### Phone漫反射
```
Shader "Phone漫反射" {
	Properties {
		_Diffuse ("Diffuse", Color) = (1, 1, 1, 1)
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
### Phone半兰伯特
```
Shader "Phone半兰伯特" {
	Properties {
		_Diffuse ("Diffuse", Color) = (1, 1, 1, 1)
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
				//将结果范围从[-1,1]映射到[0,1]
				fixed halfLambert = dot(worldNormal, worldLightDir) * 0.5 + 0.5;
				fixed3 diffuse = _LightColor0.rgb * _Diffuse.rgb * halfLambert;
				fixed3 color = ambient + diffuse;
				
				return fixed4(color, 1.0);
			}
			ENDCG
		}
	} 
	FallBack "Diffuse"
}

---