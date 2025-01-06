import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Particles
 */
const params = {
  count: 42600,
  size: 0.015,
  radius: 3.78,
  spin: 1,
  branches: 11,
  randomness: 1.508,
  randomnessPower: 9.557,
  insideColor: "#ff6030",
  outsideColor: "#1b3984",
};

let particlesGeometry = null;
let particlesMaterial = null;
let particlesMesh = null;

const colorInside = new THREE.Color(params.insideColor);
const colorOutside = new THREE.Color(params.outsideColor);

const createGalaxy = (animation) => {
  if (particlesMesh) {
    particlesGeometry.dispose();
    particlesMaterial.dispose();
    scene.remove(particlesMesh);
  }

  particlesGeometry = new THREE.BufferGeometry();

  const positions = new Float32Array(params.count * 3);
  const colors = new Float32Array(params.count * 3);

  for (let i = 0; i < params.count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * params.radius;

    const spinAngle = radius * params.spin;
    const branchAngle = ((i % params.branches) / params.branches) * Math.PI * 2;

    // this get the particles newerest to the line
    // Math.pow(random, value)
    const randomX =
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() > 0.5 ? 1 : -1);
    const randomY =
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() > 0.5 ? 1 : -1);
    const randomZ =
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() > 0.5 ? 1 : -1);

    positions[i3] = Math.sin(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.cos(branchAngle + spinAngle) * radius + randomZ;

    const mixedColor = colorInside.clone();

    mixedColor.lerp(colorOutside, radius / params.radius);

    colors[i3 + 0] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  particlesMaterial = new THREE.PointsMaterial({
    size: params.size,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);

  scene.add(particlesMesh);
};

gui.add(params, "count").min(100).max(50000).step(100).onChange(createGalaxy);
gui.add(params, "size").min(0.001).max(0.1).step(0.001).onChange(createGalaxy);
gui.add(params, "radius").min(0.01).max(20).step(0.01).onChange(createGalaxy);
gui.add(params, "randomness").min(0).max(2).step(0.001).onChange(createGalaxy);
gui.add(params, "branches").min(2).max(20).step(1).onChange(createGalaxy);
gui.add(params, "spin").min(-5).max(5).step(0.001).onChange(createGalaxy);
gui.addColor(params, "insideColor").onChange(createGalaxy);
gui.addColor(params, "outsideColor").onChange(createGalaxy);
gui
  .add(params, "randomnessPower")
  .min(1)
  .max(10)
  .step(0.001)
  .onChange(createGalaxy);

createGalaxy();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  particlesMesh.rotation.y = elapsedTime * 0.1;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
