uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute vec2 uv;

// Custom Attributes
attribute float aRandom;

// Custom varying
varying float varyingRandom;
varying vec2 varyingUv;
varying float varyingElevation;

// Custom Uniforms
uniform vec2 uFrequency;
uniform float uTime;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

    modelPosition.z += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;

    varyingRandom = aRandom;
    varyingUv = uv;
    varyingElevation = elevation;
}