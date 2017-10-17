---
published: true
layout: post
title: 三种Specular介绍
date: 2017-10-17T10:36:34.000Z
author: Leo
header-img: img/article-title/三种Specular.jpg
tags:
  - Specular
  - Shader详解(含Code)
---
>> 高洛德高光反射<br>
>> Phone高光反射<br>
>> Blinn-Phong光照模型<br>
>> 三种基础高光反射Shader

### Specular
![](http://yqlizeao.55555.io/img/article/Specular.png)
（左高洛德高光反射，中Phone高光反射，右Blinn-Phong光照模型）

## 更新纪要

2017年10月17日10:41:14 三中Specular Shader编写

### 高洛德高光反射

```
Shader "高洛德高光反射" {
	Properties {
		_Diffuse ("Diffuse", Color) = (1, 1, 1, 1)
		_Specular ("Specular", Color) = (1, 1, 1, 1)
		_Gloss ("Gloss", Range(8.0, 256)) = 20 //用于控制高光区域的大小
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
				o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
				fixed3 ambient = UNITY_LIGHTMODEL_AMBIENT.xyz;
				fixed3 worldNormal = normalize(mul(v.normal, (float3x3)unity_WorldToObject));
				fixed3 worldLightDir = normalize(_WorldSpaceLightPos0.xyz);
				fixed3 diffuse = _LightColor0.rgb * _Diffuse.rgb * saturate(dot(worldNormal, worldLightDir));
				
				// 计算反射方向
				fixed3 reflectDir = normalize(reflect(-worldLightDir, worldNormal));
				// 计算视角方向
				fixed3 viewDir = normalize(UnityWorldSpaceViewDir(UnityObjectToClipPos(v.vertex)));
				
				// Compute specular term
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