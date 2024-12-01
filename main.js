import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Load the 3D logo
const loader = new GLTFLoader();
loader.load('./public/logo.glb', (gltf) => {
  const logo = gltf.scene;
  logo.scale.set(.1, .1, .1); // Adjust the size of the logo
  logo.rotation.x = 1.8; // Slight tilt for better view
  scene.add(logo);

//   Add rotation animation
  function rotateLogo() {
    logo.rotation.x += 0.0105;
    logo.rotation.z += 0.01; 
    requestAnimationFrame(rotateLogo);
  }
  rotateLogo();
}, undefined, function ( error ) {

	console.error( error );

} );

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Resize handling
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Camera position
camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
