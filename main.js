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
  ctx.font = `${Math.min(window.innerWidth / 7, 50)}px Optimist`; // Dynamic text size
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText("what's  in  your  wallet ?", window.innerWidth / 2, window.innerHeight / 2);

  // Update the texture
  textTexture.needsUpdate = true;
}

// Create a texture from the canvas
const textTexture = new THREE.CanvasTexture(canvas);
textTexture.wrapS = THREE.RepeatWrapping; // Prevent horizontal tiling
textTexture.wrapT = THREE.RepeatWrapping; // Prevent vertical tiling

// Apply the texture as the scene background (optional for reference)
scene.background = textTexture;

// Initialize the canvas content
updateCanvas();

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);


// Create a CubeMap from the canvas texture
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
  format: THREE.RGBFormat,
  generateMipmaps: true,
  minFilter: THREE.LinearMipmapLinearFilter,
  magFilter: THREE.LinearFilter,
});

const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget);
scene.add(cubeCamera);

// Load the 3D Logo
const loader = new GLTFLoader();
loader.load('/logo.glb', (gltf) => {
  const logo = gltf.scene;
  logo.scale.set(0.14, 0.14, 0.14); // Adjust the size of the logo
  logo.rotation.x = 1.8; // Slight tilt for better view

  let logoMaterial;

  // Apply a glass material with refraction and iridescence
  logo.traverse((child) => {
    if (child.isMesh) {
      logoMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x0f0f0f,
        metalness: 0,
        roughness: 0, // Smooth surface
        transmission: 25, // Fully transparent
        thickness: 1, // Refraction thickness
        clearcoat: 1, // Glossy surface
        envMapIntensity: 2, // Control the intensity of the reflection
        ior: 2.7, // Index of refraction
        iridescence: 1.2, // Dynamic color shift
        iridescenceIOR: 1.9, // Index of Refraction for iridescence
        specularIntensity: 1,
        envMap: cubeRenderTarget.texture, // Use the CubeMap as environment map
        envMapIntensity: 2.5,
      });
      child.material = logoMaterial;
    }
  });
  logo.position.set(-.5, 0, 0); // Ensure it's at the origin
  scene.add(logo);

  // Add rotation animation for the logo
  const seed = Math.random() - Math.random()
  function rotateLogo() {
    logo.rotation.x += (0.004 * seed);
    logo.rotation.y += (0.0025 * seed);
    logo.rotation.z += (0.0015 * seed);

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
  cubeCamera.update(renderer, scene); // Update the CubeMap reflection
  renderer.render(scene, camera);
}
animate();

// Add the guide message element
const guideMessage = document.createElement('div');
guideMessage.className = 'guide-message';
guideMessage.textContent = 'Try scrolling or click + dragging';
document.body.appendChild(guideMessage);

// Function to flash the message
function flashGuideMessage(element, flashes, interval) {
  let count = 0; // Number of flashes
  const flashInterval = setInterval(() => {
    // Toggle the 'visible' class
    element.classList.toggle('visible');
    count++;

    // Stop flashing after the desired number of flashes
    if (count >= flashes * 2) {
      clearInterval(flashInterval);
      element.remove(); // Remove the message after flashing
    }
  }, interval);
}

flashGuideMessage(guideMessage, 7, 1000);