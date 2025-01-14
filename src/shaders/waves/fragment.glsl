precision mediump float;

varying float vElevation;

uniform float uColorOffset;
uniform float uColorMultiplier;
uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
// #define PI 3.1415926535897932384626433832795

// vec2 rotate(vec2 uv, float rotation, vec2 mid)
// {
//     return vec2(
//       cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
//       cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
//     );
// }

// float random(vec2 st)
// {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

void main()
{
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;

    gl_FragColor = vec4(mix(uDepthColor, uSurfaceColor, mixStrength), 1.0);
}