// import library Three JS Online
// import * as THREE from "https://cdn.skypack.dev/three@0.122.0/build/three.module.js";

// Program Main Three JS Model 3d (belum fix)

// variabel untuk ukuran dunia 3d
let width = window.innerWidth - 33;
let height = window.innerHeight;

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(55, width / height, 0.2, 10);
camera.position.z = 3.5;

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Geometri mars
const geo = new THREE.SphereGeometry(1.1, 20, 20);

// Geometry asteroid (kanan)
// const geo2 = new THREE.BufferGeometry();
const geo2 = new THREE.IcosahedronBufferGeometry(1.1, 0);

// Geometry asteroid (atas)
const geo3 = new THREE.DodecahedronBufferGeometry(1.1, 0);

// Custom geometry asteroid (bawah)
const geo4 = new THREE.BufferGeometry();

// vertex custom geometry asteroid (bawah)
let vertices = new Float32Array([
  // vertex 0 (depan)
  0, 0, 1,
  // vertex 1 (kanan dalam)
  1, 0, -1,
  // vertex 2 (kiri dalam)
  -1, 0, -1,
  // vertex 3 (atas)
  0, 1, 0,
]);

let uvs = new Float32Array([
  0.0, 0.0, 1.0, 0.0, 1.0, 1.0,

  1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
]);

geo4.setIndex([
  1,
  3,
  2, //kiri
  0,
  3,
  1, //kanan
  0,
  1,
  2, //depan
  0,
  2,
  3, //bawah
]);

// planet textures
const asteroid = new THREE.TextureLoader().load("https://i.postimg.cc/L6FXTf41/moon.jpg");
const mars = new THREE.TextureLoader().load("https://i.postimg.cc/SQMRCV44/mars.jpg");

// MeshLambertMaterial
// pencahayaan 1
let light1 = new THREE.PointLight(0xffffff, 1.3);
light1.position.set(-15, 20, 10);
scene.add(light1);

// pencahayaan 2
let light2 = new THREE.PointLight(0xffffff, 1.1);
light2.position.set(10, -10, 10);
scene.add(light2);

// material texture geometry mars
const material = new THREE.MeshPhongMaterial({
  map: mars,
  shininess: 500,
  bumpMap: mars,
  bumpScale: 0.01,
});

let mesh = new THREE.Mesh(geo, material);
mesh.position.set(-1.5, 0, -1);
scene.add(mesh);

// material geometri asteroid (kanan)
const material2 = new THREE.MeshPhongMaterial({
  map: asteroid,
  shininess: 500,
  bumpMap: asteroid,
  bumpScale: 0.01,
});

let mesh2 = new THREE.Mesh(geo2, material2);
mesh2.position.set(3.2, 1.8, 0);
scene.add(mesh2);

// material geometry asteroid (atas)
const material3 = new THREE.MeshPhongMaterial({
  map: asteroid,
  shininess: 500,
  bumpMap: asteroid,
  bumpScale: 0.01,
});

let mesh3 = new THREE.Mesh(geo3, material3);
mesh3.position.set(-7, 2.7, -5);
scene.add(mesh3);

// material custom geometri asteroid (bawah)
geo4.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
geo4.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

let material4 = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  map: asteroid,
});

let mesh4 = new THREE.Mesh(geo4, material4);
mesh4.position.set(-6.4, -3, -5.5);
scene.add(mesh4);

// fungsi animasi
function update() {
  mesh.rotation.y += 0.02;

  mesh2.rotation.x += 0.02;
  mesh2.rotation.y += 0.02;

  mesh3.rotation.x += 0.01;
  mesh3.rotation.y += 0.01;

  mesh4.rotation.x += 0.03;
  // mesh4.rotation.y += 0.03;

  requestAnimationFrame(update);
  renderer.render(scene, camera);
}

update();
