import * as THREE from "three";
import { Color } from "three";
import { TextureLoader } from "three";
import { Clock } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/Addons.js";

/**
 * Debug
 */
const gui = new GUI();

/**
 * Base
 */
const textureLoader = new TextureLoader();
const doorColorTexture = textureLoader.load("/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/door/alpha.jpg");
const doorAOTexture = textureLoader.load("/door/ambientOcclusion.jpg");
const doorHeightTexture = textureLoader.load("/door/height.jpg");
const doorNormalTexture = textureLoader.load("/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/door/roughness.jpg");

const matcapTexture = textureLoader.load("/matcaps/2.png");
const gradientTexture = textureLoader.load("/gradients/5.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

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
// basic material
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new Color("#ff0000");
// // for meshes which where being cut in the back or inner it,
// // like the plane when it is fliped
// material.side = THREE.DoubleSide;

// Normal material
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// Normal material
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// MeshLamberMaterial
// const material = new THREE.MeshLambertMaterial();

// MeshPolygonMaterial
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 200;
// material.specular = new THREE.Color(0x1188ff);

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial();
// // gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;

// MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 1;
// material.roughness = 1;
// material.map = doorColorTexture;
// material.aoMap = doorAOTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.metalnessMap = doorMetalnessTexture;
// material.normalMap = doorNormalTexture;

// MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial();
material.metalness = 0;
material.roughness = 0;
// material.map = doorColorTexture;
// material.aoMap = doorAOTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.metalnessMap = doorMetalnessTexture;
// material.normalMap = doorNormalTexture;

// Transmission
material.transmission = 1;
material.ior = 1.5;
material.thickness = 0.5;

gui.add(material, "transmission").min(0).max(1).step(0.0001);
gui.add(material, "ior").min(1).max(10).step(0.0001);
gui.add(material, "thickness").min(0).max(1).step(0.0001);

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);

const offset = 10;

// ----- Sphere object
const sphereWidth = 10;
const sphereGeometry = new THREE.SphereGeometry(sphereWidth, 64, 64);
const sphereMesh = new THREE.Mesh(sphereGeometry, material);

// ----- Sphere object
const squadGeometry = new THREE.PlaneGeometry(10, 10);
const squadMesh = new THREE.Mesh(squadGeometry, material);
squadMesh.position.x = sphereMesh.position.x - offset - sphereWidth;

// ----- Torus object
const TorusGeometry = new THREE.TorusGeometry(6, 2, 32, 64);
const torusMesh = new THREE.Mesh(TorusGeometry, material);
torusMesh.position.x = offset + sphereWidth;

scene.add(sphereMesh, squadMesh, torusMesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 32 + offset;
camera.position.y = 2;
camera.position.x = 2;

scene.add(camera);
camera.lookAt(sphereMesh.position);

// Lights
// ---- Ambient light
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// // ---- Point light
// const pointLight = new THREE.PointLight(0xffffff, 1000);
// pointLight.position.x = offset * 2;
// pointLight.position.y = offset * 2;
// pointLight.position.z = offset;
// scene.add(pointLight);

const rgbeLoader = new RGBELoader();

rgbeLoader.load("/environmentMap/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularRefractionMapping;

  scene.background = environmentMap;
  scene.environment = environmentMap;
});

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
applyRender();

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Animations
const clock = new Clock();
const tick = () => {
  torusMesh.rotation.y = 0.1 * clock.getElapsedTime();
  squadMesh.rotation.y = 0.1 * clock.getElapsedTime();
  sphereMesh.rotation.y = 0.1 * clock.getElapsedTime();

  torusMesh.rotation.x = -0.15 * clock.getElapsedTime();
  squadMesh.rotation.x = -0.15 * clock.getElapsedTime();
  sphereMesh.rotation.x = -0.15 * clock.getElapsedTime();

  renderer.render(scene, camera);

  controls.update();

  window.requestAnimationFrame(tick);
};

tick();
