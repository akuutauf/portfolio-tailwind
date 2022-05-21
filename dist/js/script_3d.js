// import library three js for online use
import * as THREE from "https://cdn.skypack.dev/three@0.122.0/build/three.module.js";

// Program Main Three JS

// variabel untuk ukuran dunia 3d
let width = window.innerWidth;
let height = window.innerHeight;

// scene
const scene = new THREE.Scene();

// scene background texture
var loader = new THREE.TextureLoader();
loader.load("https://i.postimg.cc/HLjxy4xT/5532919.jpg", function (texture) {
  scene.background = texture;
});

// camera
const camera = new THREE.PerspectiveCamera(55, width / height, 0.2, 10);
camera.position.z = 3.5;

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Geometri Earth
const earthPlanet = new THREE.SphereGeometry(0.9, 20, 20);

// Geometri Moon
const moonPlanet = new THREE.SphereGeometry(0.4, 20, 20);

// planet textures
const moon = new THREE.TextureLoader().load("https://i.postimg.cc/L6FXTf41/moon.jpg");
const earth = new THREE.TextureLoader().load("https://i.postimg.cc/D0yTKRP2/earth.jpg");

// MeshLambertMaterial
// pencahayaan 1
let light1 = new THREE.PointLight(0xffffff, 1.3);
light1.position.set(-15, 20, 10);
scene.add(light1);

// pencahayaan 2
let light2 = new THREE.PointLight(0xffffff, 0.15);
light2.position.set(10, -10, 10);
scene.add(light2);

// material texture geometry earth
const material = new THREE.MeshPhongMaterial({
  map: earth,
  shininess: 500,
  bumpMap: earth,
  bumpScale: 0.015,
});

let mesh = new THREE.Mesh(earthPlanet, material);
mesh.position.set(0, 0, 0);
scene.add(mesh);

// material texture geometry moon
const material2 = new THREE.MeshPhongMaterial({
  map: moon,
  shininess: 500,
  bumpMap: moon,
  bumpScale: 0.015,
});

let mesh2 = new THREE.Mesh(moonPlanet, material2);
mesh2.position.set(1.9, 0.3, 0);
scene.add(mesh2);

// Fungsi interaksi object 3d
document.addEventListener("mousemove", (interaction) => {
  camera.position.x = (interaction.x - window.innerWidth / 1) * 0.002;
  camera.position.y = (interaction.y - window.innerWidth / 2.5) * 0.002;
  camera.lookAt(scene.position);
});

// fungsi animasi
function update() {
  mesh.rotation.y += 0.01;
  // mesh.rotation.x += 0.01;

  mesh2.rotation.y += 0.009;
  mesh2.rotation.x += 0.009;

  requestAnimationFrame(update);
  renderer.render(scene, camera);
}

update();
