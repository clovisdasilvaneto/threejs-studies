import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";
import { RGBELoader } from "three/examples/jsm/Addons.js";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const axisHelper = new THREE.AxesHelper();
scene.add(axisHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/matcaps/8.png");

matcapTexture.colorSpace = THREE.SRGBColorSpace;

const rgbeLoader = new RGBELoader();

rgbeLoader.load("/environmentMap/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularRefractionMapping;

  scene.background = environmentMap;
  scene.environment = environmentMap;
});

/**
 * Fonts
 */
const fontsLoader = new FontLoader();

const material = new THREE.MeshMatcapMaterial({
  matcap: matcapTexture,
});

fontsLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Nevinha Nevou!", {
    font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 20,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });

  const text = new THREE.Mesh(textGeometry, material);
  // const bevelX = 0.02;
  // const bevelY = 0.033;
  // const bevelZ = 0.03;

  // textGeometry.computeBoundingBox();
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - bevelX) * 0.5,
  //   -(textGeometry.boundingBox.max.y - bevelY) * 0.5,
  //   -(textGeometry.boundingBox.max.z - bevelZ) * 0.5
  // );

  textGeometry.center();
  scene.add(text);
});

/**
 * Object
 */
const donuts = [];
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

for (let i = 0; i < 800; i++) {
  const donut = new THREE.Mesh(donutGeometry, material);

  donut.position.x = (Math.random() - 0.5) * 20;
  donut.position.y = (Math.random() - 0.5) * 40;
  donut.position.z = (Math.random() - 0.5) * 10;

  donut.rotation.x = Math.random() * Math.PI;
  donut.rotation.y = Math.random() * Math.PI;

  const scale = Math.random();
  donut.scale.set(scale, scale, scale);

  donuts.push({
    mesh: donut,
    velocity: 1 - scale + 0.1,
    weight: 5 - scale + 0.1,
    resets: 1,
  });

  scene.add(donut);
}
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
camera.position.x = 1;
camera.position.y = 1;
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

  donuts.forEach((donut) => {
    donut.mesh.rotation.x = donut.velocity * elapsedTime;
    donut.mesh.rotation.y = donut.velocity * elapsedTime;

    donut.mesh.position.y = 10 * donut.resets - donut.weight * elapsedTime;

    if (donut.mesh.position.y < -6) {
      donut.resets += 1;
    }
  });
  console.log(donuts[1].mesh.position.y);
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
