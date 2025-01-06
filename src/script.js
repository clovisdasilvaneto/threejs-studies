import * as THREE from "three";
import GUI from "lil-gui";
import { MeshToonMaterial } from "three";

/**
 * Debug
 */
const gui = new GUI();

const parameters = {
  materialColor: "#ffeded",
};

gui.addColor(parameters, "materialColor").onChange(() => {
  material.color.set(parameters.materialColor);
});

/***
 * Loader
 */
const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");
gradientTexture.magFilter = THREE.NearestFilter;

let scroll = window.scrollY;
let cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("scroll", () => {
  scroll = window.scrollY;
});

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const distance = 3;

/**
 * Objects
 */
const material = new MeshToonMaterial({
  color: parameters.materialColor,
  gradientMap: gradientTexture,
});
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.z = 3;

const roof = new THREE.Mesh(new THREE.ConeGeometry(0.8, 0.8, 3), material);
roof.position.z = 3;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 1), material);
cube.position.z = 3;

torus.position.y = -(distance * 0);
roof.position.y = -(distance * 1);
cube.position.y = -(distance * 2);

scene.add(torus, roof, cube);

/**
 * Light
 */
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 1;
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight();
directionalLight.position.x = 2;

scene.add(directionalLight);

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
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;

/***
 * Group
 */
const cameraGroup = new THREE.Group();
cameraGroup.add(camera);

scene.add(cameraGroup);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  torus.rotation.y = elapsedTime * 0.5;
  torus.rotation.x = elapsedTime * 0.8;

  cube.rotation.y = elapsedTime * 0.5;
  cube.rotation.x = elapsedTime * 0.8;

  roof.rotation.y = elapsedTime * 0.5;

  cameraGroup.position.y = cursor.y;
  cameraGroup.position.x = cursor.x;
  camera.position.y = -(scroll / sizes.height) * distance;

  // Camera
  // camera.position.y = scrollY /

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
