---
permalink: /dicom-stl/
title: "DICOM → STL"
author_profile: true
---

<div class="dicom-page">

  <div class="dicom-unavailable-banner">
    <span class="dicom-unavailable-icon">⚠</span>
    Fonction pas encore disponible
  </div>

  <div class="dicom-instructions">
    <p class="dicom-instructions__main">
      Déposez votre fichier DICOM afin de le transposer en fichier STL
      <span class="dicom-instructions__detail">(Dents séparées)</span>
    </p>
    <p class="dicom-instructions__warning">
      <strong>Attention</strong> — veuillez absolument utiliser des fichiers anonymisés
    </p>
  </div>

  <div class="dicom-dropzone dicom-dropzone--disabled">
    <div class="dicom-dropzone__icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="17 8 12 3 7 8"/>
        <line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
    </div>
    <p class="dicom-dropzone__label">Glissez-déposez votre dossier DICOM ici</p>
    <p class="dicom-dropzone__or">— ou —</p>
    <button class="dicom-btn dicom-btn--disabled" disabled>Parcourir les fichiers</button>
    <p class="dicom-dropzone__hint">Formats acceptés&nbsp;: dossiers DICOM (.dcm)</p>
  </div>

  <div class="dicom-actions">
    <button class="dicom-btn dicom-btn--primary dicom-btn--disabled" disabled>
      Convertir en STL
    </button>
  </div>

</div>

<style>
.dicom-page {
  max-width: 640px;
  margin: 2em auto;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
}

/* ── Unavailable banner ── */
.dicom-unavailable-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  padding: 0.65em 1.2em;
  background: #fff3cd;
  border: 1px solid #f0c040;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95em;
  color: #7a5800;
  letter-spacing: 0.01em;
}
.dicom-unavailable-icon {
  font-size: 1.1em;
}

/* ── Instructions ── */
.dicom-instructions {
  text-align: center;
  padding: 0 0.5em;
}
.dicom-instructions__main {
  font-size: 1.05em;
  font-weight: 600;
  margin-bottom: 0.4em;
  line-height: 1.4;
}
.dicom-instructions__detail {
  font-weight: 400;
  color: var(--global-text-color-light);
  font-size: 0.9em;
}
.dicom-instructions__warning {
  font-size: 0.9em;
  color: #c0392b;
  margin: 0;
}

/* ── Drop zone ── */
.dicom-dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75em;
  padding: 3em 2em;
  border: 2px dashed var(--global-border-color);
  border-radius: 12px;
  background: var(--global-code-background-color);
  transition: border-color 0.2s, background 0.2s;
  text-align: center;
}
.dicom-dropzone--disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.dicom-dropzone__icon {
  color: var(--global-text-color-light);
}
.dicom-dropzone__label {
  font-size: 1em;
  font-weight: 500;
  margin: 0;
}
.dicom-dropzone__or {
  font-size: 0.85em;
  color: var(--global-text-color-light);
  margin: 0;
}
.dicom-dropzone__hint {
  font-size: 0.78em;
  color: var(--global-text-color-light);
  margin: 0;
}

/* ── Buttons ── */
.dicom-btn {
  padding: 0.6em 1.8em;
  border-radius: 6px;
  font-size: 0.9em;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
}
.dicom-btn--disabled {
  cursor: not-allowed;
  opacity: 0.5;
  background: var(--global-border-color);
  color: var(--global-text-color);
}
.dicom-btn--primary {
  background: var(--global-link-color);
  color: #fff;
  font-size: 1em;
  padding: 0.75em 2.5em;
}

/* ── Convert button row ── */
.dicom-actions {
  display: flex;
  justify-content: center;
}

/* ── Mobile ── */
@media (max-width: 600px) {
  .dicom-dropzone {
    padding: 2em 1em;
  }
  .dicom-btn--primary {
    width: 100%;
    text-align: center;
  }
}
</style>
