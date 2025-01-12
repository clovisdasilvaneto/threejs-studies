precision mediump float;
uniform sampler2D uTexture;

uniform vec3 uColor;

varying vec2 varyingUv;
varying float varyingRandom;
varying float varyingElevation;

void main() {
    // gl_FragColor = vec4(1.0, varyingRandom, 0.0, 1.0);
    vec4 textureColor = texture2D(uTexture, varyingUv);
    textureColor.rgb *= varyingElevation * 2.0 + 0.5;
    
    gl_FragColor = vec4(textureColor);
}