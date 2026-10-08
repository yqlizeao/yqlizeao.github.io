/**
 * Hexo Plugin: Register ShaderLab / CG / HLSL language for highlight.js
 */
const hljs = require('highlight.js');

hljs.registerLanguage('shaderlab', function(hljs) {
  return {
    name: 'ShaderLab',
    aliases: ['shaderlab', 'shader', 'hlsl', 'cg'],
    case_insensitive: false,
    keywords: {
      keyword:
        'Shader Properties SubShader Pass Tags CGPROGRAM ENDCG CGINCLUDE ENDCG ' +
        'FallBack Fallback CustomEditor Category LOD UsePass GrabPass ' +
        'Blend BlendOp Cull ZTest ZWrite ColorMask Stencil Offset ' +
        'Fog Lighting SeparateSpecular AlphaTest ' +
        'struct return if else for while do discard in out inout uniform',
      type:
        'float float2 float3 float4 half half2 half3 half4 fixed fixed2 fixed3 fixed4 ' +
        'bool bool2 bool3 bool4 int int2 int3int4 uint uint2 uint3 uint4 ' +
        'float2x2 float3x3 float4x4 half2x2 half3x3 half4x4 fixed2x2 fixed3x3 fixed4x4 ' +
        'sampler2D samplerCUBE sampler3D sampler2D_half sampler2D_float ' +
        'Color Range Float Int 2D Cube Rect Vector void ' +
        'v2f a2v appdata appdata_base appdata_full appdata_tan ' +
        'fixed3 fixed4 half3 half4 float3 float4',
      built_in:
        'normalize dot cross saturate tex2D tex2Dproj tex2Dlod texCUBE tex3D ' +
        'mul reflect refract pow max min clamp lerp step smoothstep frac ' +
        'abs floor ceil sign sin cos tan asin acos atan atan2 length distance ' +
        'degrees radians exp exp2 log log2 sqrt rsqrt fmod modf ddx ddy ' +
        'UnpackNormal UnityObjectToClipPos UnityObjectToWorldNormal UnityObjectToWorldDir ' +
        'UnityWorldSpaceLightDir UnityWorldSpaceViewDir UnityWorldToClipPos ' +
        'ComputeScreenPos ObjSpaceLightDir ObjSpaceViewDir ShadeSH9 ' +
        'UNITY_LIGHTMODEL_AMBIENT _WorldSpaceLightPos0 _LightColor0 _WorldSpaceCameraPos ' +
        'unity_ObjectToWorld unity_WorldToObject UNITY_MATRIX_MVP UNITY_MATRIX_MV ' +
        'UNITY_MATRIX_V UNITY_MATRIX_P UNITY_MATRIX_VP UNITY_MATRIX_T_MV',
      meta:
        '#pragma #include #define #ifdef #ifndef #endif #else #elif ' +
        'vertex fragment geometry hull domain multi_compile multi_compile_fwdbase multi_compile_fwdadd ' +
        'target POSITION NORMAL TANGENT BINORMAL TEXCOORD0 TEXCOORD1 TEXCOORD2 TEXCOORD3 ' +
        'TEXCOORD4 TEXCOORD5 TEXCOORD6 TEXCOORD7 COLOR COLOR0 COLOR1 ' +
        'SV_POSITION SV_Target SV_Target0 SV_Target1 SV_Depth ' +
        'SHADOW_COORDS TRANSFER_SHADOW UNITY_LIGHT_ATTENUATION'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE
    ]
  };
});
