precision mediump float;
varying vec2 vUv;

#define PI 3.1415926535897932384626433832795

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(0.5, strength);

    // strength *= mod(vUv.y * 10.0, 1.0);
    // strength = step(0.5, strength);

    // gl_FragColor = vec4(vec4(strength));

    // ------------------------------
    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(0.8, strength);

    // strength += mod(vUv.y * 10.0, 1.0);
    // strength = step(0.8, strength);


    // ------------------------------
    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(0.4, strength);

    // strength *= mod(vUv.y * 10.0, 1.0);
    // strength = step(0.8, strength);


    // ------------------------------
    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(0.4, strength);
    // strength *= mod(vUv.y * 10.0, 1.0);
    // strength = step(0.8, strength);

    // strength += mod(vUv.x * 10.0, 1.0);
    // strength = step(0.8, strength);
    // strength *= mod(vUv.y * 10.0, 1.0);
    // strength = step(0.4, strength);


    // ------------------------------
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0, 1.0));
    // float strength = barX + barY;


    // ------------------------------
    // float barX = step(0.4, mod(vUv.x * 10.0 - 0.2, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0 - 0.2, 1.0));
    // float strength = barX + barY;
    
    // ------------------------------
    // float strength = abs(vUv.x - 0.5);


    // ------------------------------
    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));


    // ------------------------------
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));


    // ------------------------------
    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));


    // ------------------------------
    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // strength *= 1.0 - step(0.4, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));


    // ------------------------------
    // float strength = floor(vUv.x * 10.0) / 10.0;
    // strength *= floor(vUv.y * 10.0) / 10.0;

    // ------------------------------
    // float strength = floor(vUv.x * 10.0) / 10.0;
    // strength *= floor(vUv.y * 10.0) / 10.0;

    // ------------------------------
    // float strength = random(vUv);

    // ------------------------------
    // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor((vUv.y + vUv.x * 0.5) * 10.0) / 10.0);
    // float strength = random(gridUv);

    // ------------------------------
    // float strength = length(vUv);
    
    // ------------------------------
    // float strength = 1.0 - distance(vUv, vec2(0.5));
    
    // ------------------------------
    // float strength = 0.3 / distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5));
    // strength *= 0.3 / distance(vec2(vUv.y, (vUv.x - 0.5) * 5.0 + 0.5), vec2(0.5));

    
    // ------------------------------
    // vec2 rotatedUv = rotate(vUv, PI * 0.25, vec2(0.5));
    // float strength = 0.15 / distance(vec2(rotatedUv.x, (rotatedUv.y - 0.5) * 5.0 + 0.5), vec2(0.5));
    // strength *= 0.15 / distance(vec2(rotatedUv.y, (rotatedUv.x - 0.5) * 5.0 + 0.5), vec2(0.5));

    
    // ------------------------------
    // float strength = step(0.5, distance(vUv, vec2(0.5)) + 0.25);


    // ------------------------------
    // float strength = abs(distance(vUv, vec2(0.5)) - 0.2);

    // ------------------------------
    // float strength = step(0.17, abs(distance(vUv, vec2(0.5)) - 0.2));



    // ------------------------------
    // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.2));


    // ------------------------------
    vec2 wavedUv = vec2(
        vUv.x + sin(vUv.y * 30.0) * 0.1,
        vUv.y + sin(vUv.x * 30.0) * 0.1
    );
    
    float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));
    

    // ------------------------------
    // vec2 wavedUv = vec2(
    //     vUv.x + sin(vUv.y * 100.0) * 0.1,
    //     vUv.y + sin(vUv.x * 100.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));
    // ------------------------------
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    
    // angle /= PI * 2.0;
    // angle += 0.5;

    // float strength = angle;

    // ------------------------------
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    
    // angle /= PI * 2.0;
    // angle += 0.5;

    // float strength = mod(angle * 20.0, 1.0);

    // ------------------------------
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    
    // angle /= PI * 2.0;
    // angle += 0.5;

    // float strength = sin(angle * 100.0);

    // ------------------------------
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    
    // angle /= PI * 2.0;
    // angle += 0.5;

    // float strength = sin(angle * 100.0);


    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // strength *= 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    

    // Colors:
    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 1.0);
    vec3 mixedColor = mix(blackColor, uvColor, strength);

    // gl_FragColor = vec4(vec4(strength));
    gl_FragColor = vec4(mixedColor, 1.0);
}