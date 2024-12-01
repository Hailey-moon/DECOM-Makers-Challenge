import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Setup Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;
document.body.appendChild(renderer.domElement);

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  updateCanvas();
  location.reload();
});

// Canvas for background texture
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const textTexture = new THREE.CanvasTexture(canvas);
textTexture.wrapS = THREE.RepeatWrapping;
textTexture.wrapT = THREE.RepeatWrapping;

// Update canvas content dynamically
function updateCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  ctx.fillStyle = 'black';
  ctx.font = `${Math.min(window.innerWidth / 7, 50)}px Optimist`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText("what's  in  your  wallet ?", window.innerWidth / 2, window.innerHeight / 2);

  textTexture.needsUpdate = true;
}

scene.background = textTexture;
updateCanvas();

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

// Reflection CubeMap
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
  format: THREE.RGBFormat,
  generateMipmaps: true,
  minFilter: THREE.LinearMipmapLinearFilter,
});
const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget);
scene.add(cubeCamera);

// Load 3D logo model
const loader = new GLTFLoader();
loader.load(
  './logo.glb',
  (gltf) => {
    const logo = gltf.scene;
    logo.scale.set(0.14, 0.14, 0.14);
    logo.rotation.x = 1.8;

    const logoMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0f0f0f,
      roughness: 0,
      transmission: 25,
      thickness: 1,
      clearcoat: 1,
      envMap: cubeRenderTarget.texture,
      envMapIntensity: 2.5,
      ior: 2.7,
      iridescence: 1.2,
      iridescenceIOR: 1.9,
      specularIntensity: 1,
    });

    logo.traverse((child) => {
      if (child.isMesh) child.material = logoMaterial;
    });

    logo.position.set(-0.5, 0, 0);
    scene.add(logo);

    // Rotate logo animation
    const seed = Math.random() - Math.random();
    const rotateLogo = () => {
      logo.rotation.x += 0.004 * seed;
      logo.rotation.y += 0.0025 * seed;
      logo.rotation.z += 0.0015 * seed;
      requestAnimationFrame(rotateLogo);
    };
    rotateLogo();
  },
  undefined,
  (error) => console.error(error)
);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  cubeCamera.update(renderer, scene);
  renderer.render(scene, camera);
}
animate();

// Guide message
const guideMessage = document.createElement('div');
guideMessage.className = 'guide-message';
guideMessage.textContent = 'Try scrolling or click + dragging';
document.body.appendChild(guideMessage);

// Flash guide message
function flashGuideMessage(element, flashes, interval) {
  let count = 0;
  const flashInterval = setInterval(() => {
    element.classList.toggle('visible');
    count++;
    if (count >= flashes * 2) {
      clearInterval(flashInterval);
      element.remove();
    }
  }, interval);
}

flashGuideMessage(guideMessage, 7, 1000);
