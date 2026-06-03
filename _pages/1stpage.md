---
permalink: /
title: ""
author_profile: true
---

<div class="home-hero">
  <div class="home-hero__headline">
    <p class="home-hero__eyebrow">OMFS · Planification chirurgicale</p>
    <h1 class="home-hero__title">Virtual Surgical<br>Planning <span class="home-hero__accent">In-House</span></h1>
    <p class="home-hero__subtitle">
      Ressources pratiques et outils de planification pour chirurgiens maxillo-faciaux —
      du DICOM au guide chirurgical, en autonomie.
    </p>
    <div class="home-hero__cta">
      <a href="/meshmixerportfolio/" class="btn btn--primary btn--large">Portfolio Meshmixer</a>
      <a href="/about/" class="btn btn--inverse btn--large">À propos du projet</a>
    </div>
  </div>

  <div class="home-skull" id="skull-wrapper">
    <canvas id="skull-canvas"></canvas>
    <div class="home-skull__loading" id="skull-loading">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="2" viewBox="0 0 24 24" style="animation: spin 1.2s linear infinite"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
      <span>Chargement du modèle 3D...</span>
    </div>
  </div>
</div>

<style>
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Hero layout ── */
.home-hero {
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding-bottom: 1em;
}

.home-hero__eyebrow {
  font-size: 0.8em;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--global-link-color);
  margin: 0 0 0.6em;
}

.home-hero__title {
  font-size: 2.1em;
  font-weight: 700;
  line-height: 1.15;
  margin: 0 0 0.5em;
  color: var(--global-text-color);
}

.home-hero__accent {
  color: var(--global-link-color);
}

.home-hero__subtitle {
  font-size: 1em;
  color: var(--global-text-color-light);
  line-height: 1.65;
  margin: 0 0 1.5em;
  max-width: 460px;
}

.home-hero__cta {
  display: flex;
  gap: 0.75em;
  flex-wrap: wrap;
}

/* ── 3D skull viewer ── */
.home-skull {
  position: relative;
  width: 100%;
  height: 480px;
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.home-skull canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}

.home-skull__loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75em;
  color: rgba(0, 0, 0, 0.35);
  font-size: 0.85em;
  pointer-events: none;
}

@media (max-width: 600px) {
  .home-skull        { height: 300px; border-radius: 10px; }
  .home-hero__title  { font-size: 1.55em; }
  .home-hero__subtitle { font-size: 0.95em; }
}
</style>

<script type="importmap">
{
  "imports": {
    "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
    "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
  }
}
</script>

<script type="module">
import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

const wrapper = document.getElementById('skull-wrapper');
const canvas  = document.getElementById('skull-canvas');
const loading = document.getElementById('skull-loading');

/* ── Renderer (fond blanc) ── */
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(0xffffff, 1);

/* ── Scene / Camera ── */
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 2000);
camera.position.set(0, 20, 260);

/* ── Éclairage adapté au fond blanc ── */
scene.add(new THREE.AmbientLight(0xffffff, 0.75));

const key = new THREE.DirectionalLight(0xfff5e8, 1.4);
key.position.set(120, 180, 120);
scene.add(key);

const fill = new THREE.DirectionalLight(0xd0e8ff, 0.5);
fill.position.set(-100, -40, -80);
scene.add(fill);

const rim = new THREE.DirectionalLight(0xffffff, 0.25);
rim.position.set(0, -120, -80);
scene.add(rim);

/* ── Mesh (référence pour rotation) ── */
let skull = null;

const errorMsg = () => {
  loading.innerHTML =
    '<span style="color:#c0392b;font-size:0.85em;text-align:center;line-height:1.6">' +
    '⚠ Fichier introuvable<br>' +
    '<code style="background:#f1f5f9;padding:2px 8px;border-radius:4px;font-size:0.9em">/assets/3d/skull.stl</code>' +
    '</span>';
};

/* Timeout de secours : affiche l'erreur après 6s si le fichier ne charge pas */
const loadTimeout = setTimeout(errorMsg, 6000);

/* ── Load STL ── */
const loader = new STLLoader();
loader.load(
  '/assets/3d/skull.stl',
  (geometry) => {
    clearTimeout(loadTimeout);
    geometry.computeVertexNormals();
    geometry.center();

    const material = new THREE.MeshPhongMaterial({
      color:     0xede0c8,
      specular:  0x282828,
      shininess: 20,
    });

    const mesh = new THREE.Mesh(geometry, material);

    const box  = new THREE.Box3().setFromObject(mesh);
    const size = new THREE.Vector3();
    box.getSize(size);
    mesh.scale.setScalar(170 / Math.max(size.x, size.y, size.z));

    scene.add(mesh);
    skull = mesh;
    loading.style.display = 'none';
  },
  undefined,
  () => { clearTimeout(loadTimeout); errorMsg(); }
);

/* ── Resize ── */
function resize() {
  const w = wrapper.clientWidth;
  const h = wrapper.clientHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

/* ── Render loop — rotation simple 360° ── */
(function animate() {
  requestAnimationFrame(animate);
  if (skull) skull.rotation.y += 0.007;
  renderer.render(scene, camera);
})();

resize();
window.addEventListener('resize', resize);
</script>
