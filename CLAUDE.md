# CLAUDE.md

Contexte pour Claude Code. Ce fichier est versionné : il est le même sur tous les ordinateurs.

## Le projet

Site **OMFS In-House VSP** (planification chirurgicale virtuelle en chirurgie maxillo-faciale), publié sur **https://omfsvsp.com** via GitHub Pages (fichier `CNAME`).
Basé sur le thème Jekyll **Academic Pages** (dérivé de Minimal Mistakes).

- Dépôt : `github.com/thomaslgiguere-tech/Meshmixer-project`, branche `master`.
- Chaque push sur `master` redéploie le site automatiquement (quelques minutes).
- Le propriétaire travaille depuis **plusieurs ordinateurs** : toujours faire `git pull` avant de modifier.

## Préférences

- Répondre et rédiger les messages de commit **en français**.
- Le contenu du site est un mélange français / anglais : garder la langue déjà utilisée dans la page modifiée.
- Ne commit/push que lorsque c'est demandé.

## Pages personnalisées (le vrai contenu)

Le menu est défini dans `_data/navigation.yml`.

| Page | Fichier | URL |
|---|---|---|
| Accueil (bloc `home-hero`) | `_pages/1stpage.md` | `/` |
| DICOM → STL | `_pages/dicom-converter.md` | `/dicom-stl/` |
| Meshmixer Portfolio (vidéos) | `_pages/Meshmixer porfolio.md` | `/meshmixerportfolio/` |
| Téléchargement STL | `_pages/STL.md` | `/stl/` |
| Stamp creator (outil) | `_pages/stamp.html` + `assets/js/stamp.js` | `/stamp/` |
| À propos | `_pages/about.md` | `/about/` |

- Vidéos du portfolio : un bloc `<div>` sombre par vidéo (commentaire `<!-- Video N -->`) contenant un `<iframe>`. Copier un bloc existant pour en ajouter une.
- CSS perso : chargés dans `_includes/head/custom.html` (`assets/css/CustomChatGPTvideo.css`, `assets/css/collapse.css`), styles globaux dans `assets/css/main.scss` et `_sass/`.
- Fichiers 3D / STL : `assets/3d/`. Images : `images/`.
- `_posts/`, `_portfolio/`, `_publications/`, `_talks/`, `_teaching/` et plusieurs pages de `_pages/` (`markdown.md`, `terms.md`, etc.) sont encore le contenu d'exemple du thème.

## Configuration

- `_config.yml` : `url: "https://omfsvsp.com"` et `baseurl: ""` — ne pas remettre `/Meshmixer-project` (le domaine perso sert le site à la racine).
- Liens internes : utiliser `{{ base_path }}` ou des chemins absolus `/…`.

## Prévisualiser en local

```bash
bundle install          # une fois
bundle exec jekyll serve -l -H localhost --config _config.yml,_config.local.yml
```
Puis ouvrir http://localhost:4000. Alternative : `docker compose up`.
`_site/` et `.sass-cache/` sont générés et ignorés par git.
