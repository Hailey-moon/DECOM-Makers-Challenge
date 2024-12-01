import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding; // Better color handling
renderer.toneMapping = THREE.ACESFilmicToneMapping; // Improved HDR rendering
renderer.toneMappingExposure = 1.5; // Boost exposure
document.body.appendChild(renderer.domElement);

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  updateCanvas();
  location.reload(); 
});

// Create a canvas texture for the "Capital One" background
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Function to update canvas content
function updateCanvas() {
  const dpr = window.devicePixelRatio || 1;

  // Set canvas dimensions with high-DPI scaling
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  // Clear the canvas to prevent overlapping content
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background and text
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  ctx.fillStyle = 'black';
  ctx.font = `bold ${Math.min(window.innerWidth / 7, 170)}px Arial`; // Dynamic text size
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CAPITAL ONE', window.innerWidth / 2, window.innerHeight / 2);

  // Update the texture
  textTexture.needsUpdate = true;
}

// Create a texture from the canvas
const textTexture = new THREE.CanvasTexture(canvas);
textTexture.wrapS = THREE.ClampToEdgeWrapping; // Prevent horizontal tiling
textTexture.wrapT = THREE.ClampToEdgeWrapping; // Prevent vertical tiling

// Apply the texture as the scene background
scene.background = textTexture;

// Initialize the canvas content
updateCanvas();

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Load the 3D Logo
const loader = new GLTFLoader();
loader.load('/logo.glb', (gltf) => {
  const logo = gltf.scene;
  logo.scale.set(0.15, 0.15, 0.15); // Adjust the size of the logo
  logo.rotation.x = 1.8; // Slight tilt for better view

  // Apply a glass material with refraction and iridescence
  logo.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshPhysicalMaterial({
        roughness: 0, // Smooth surface
        transmission: 1, // Fully transparent
        thickness: 0.5, // Refraction thickness
        clearcoat: 1, // Glossy surface
        envMapIntensity: 10, // Enhance environment reflections
        ior: 2, // Index of refraction
        iridescence: 1, // Dynamic color shift
        iridescenceIOR: 2, // Index of Refraction for iridescence
        specularIntensity: 1,
      });
    }
  });
  logo.position.set(-.5, 0, 0); // Ensure it's at the origin
  scene.add(logo);

  // Add rotation animation for the logo
  const seed = Math.random() - Math.random()
  function rotateLogo() {
    logo.rotation.x += (0.006 * seed);
    logo.rotation.y += (0.0041 * seed);
    logo.rotation.z += (0.0021 * seed);
    requestAnimationFrame(rotateLogo);
  }
  rotateLogo();
}, undefined, (error) => {
  console.error(error);
});

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
