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

  <img src="/assets/3d/skull_rotate.webp"
       alt="Modèle 3D du crâne — rotation 360°"
       class="home-skull">
</div>

<style>
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
  display: block;
  width: 100%;
  height: 480px;
  border-radius: 16px;
  background: #f7f7f7;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  object-fit: contain;
}

@media (max-width: 600px) {
  .home-skull       { height: 300px; border-radius: 10px; }
  .home-hero__title { font-size: 1.55em; }
  .home-hero__subtitle { font-size: 0.95em; }
}
</style>
