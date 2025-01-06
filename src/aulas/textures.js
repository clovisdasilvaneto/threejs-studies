import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/**
 * Base
 */
const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load("/checkerboard-8x8.png");
const texture = textureLoader.load("/minecraft.png");
// texture.colorSpace = THREE.SRGBColorSpace;
texture.minFilter = THREE.NearestFilter;

// we need to avoid mipMaps for small textures to improve GPU performance
texture.generateMipmaps = false;
texture.magFilter = THREE.NearestFilter;

// Canvas
const canvas = document.querySelector("canvas.webgl");

const applyRender = () => {
  renderer.setSize(sizes.width, sizes.height);
  // this is to limit the pixel ratio and have good quality in better devices
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry();

const material = new THREE.MeshBasicMaterial({
  map: texture,
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2;
camera.position.y = 2;
camera.position.x = 2;

scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
applyRender();

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

// Animations
const tick = () => {
  renderer.render(scene, camera);

  controls.update();

  window.requestAnimationFrame(tick);
};

tick();
