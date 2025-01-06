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

// Make it responsive
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // we update the aspect ratio in order to make it work
  camera.aspect = sizes.width / sizes.height;
  // update the matrix to make the resize work
  camera.updateProjectionMatrix();
  // then update the renderer to normalize the canvas
  applyRender();
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
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
