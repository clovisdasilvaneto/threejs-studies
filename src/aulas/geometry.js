import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
/**
 * Base
 */

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
const positionsArray = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", positionsAttribute);

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

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

  //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;

  //   camera.lookAt(mesh.position);
  controls.update();

  window.requestAnimationFrame(tick);
};

tick();
