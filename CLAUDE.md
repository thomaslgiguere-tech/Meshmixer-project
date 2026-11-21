# CLAUDE.md

Contexte pour Claude Code. Ce fichier est versionné : il est le même sur tous les ordinateurs.

## Le projet

Site **OMFS In-House VSP** : la vitrine d'**OMFS Planner** (add-on Blender gratuit et open source de planification chirurgicale maxillo-faciale, dépôt `thomaslgiguere-tech/omfs-planner`), avec les tutoriels Meshmixer et des fichiers STL.
Projet personnel de Thomas Lafontaine-Giguère, DMD : le ton reste léger et non commercial, et le crédit à l'auteur doit rester visible.

- Dépôt : `github.com/thomaslgiguere-tech/Meshmixer-project`, branche `master`. Chaque push sur `master` redéploie le site (GitHub Pages, quelques minutes).
- Adresse actuelle : **https://thomaslgiguere-tech.github.io/Meshmixer-project/** (`baseurl: "/Meshmixer-project"`). L'ancien domaine `omfsvsp.com` a expiré ; pour un futur domaine perso : ajouter `CNAME`, mettre `url` sur le domaine et `baseurl: ""`.
- Le propriétaire travaille depuis **plusieurs ordinateurs** : toujours faire `git pull` avant de modifier.

## Préférences

- Répondre et rédiger les messages de commit **en français**.
- Le site est **bilingue FR/EN** : chaque texte existe deux fois, en `<span lang="fr">` / `<span lang="en">` (ou `<p lang=…>`, etc.). Le CSS masque la langue inactive ; le bouton FR/EN est dans l'en-tête. Toujours écrire les deux versions.
- Ne commit/push que lorsque c'est demandé.

## Structure (Jekyll sans thème externe)

| Page | Fichier | URL |
|---|---|---|
| Accueil (intro + démo à onglets + cartes) | `index.html` | `/` |
| Télécharger OMFS Planner | `_pages/telecharger.html` | `/telecharger/` |
| Tutoriels (vidéos YouTube) | `_pages/tutoriels.html` | `/tutoriels/` |
| Fichiers STL | `_pages/fichiers.html` | `/fichiers/` |
| Stamp creator | `_pages/stamp.html` + `assets/js/stamp.js` | `/stamp/` |
| À propos (photo, mission, remerciements) | `_pages/a-propos.html` | `/a-propos/` |

- Layout unique : `_layouts/default.html` (en-tête, pied de page avec crédit, remerciements et « pull requests bienvenues »).
- Style unique : `assets/css/site.css` (couleurs en variables, mode sombre automatique). Comportements : `assets/js/site.js`.
- Contenu en données :
  - `_data/navigation.yml` : menu ;
  - `_data/videos.yml` : vidéos des tutoriels (copier un bloc pour en ajouter une) ;
  - `_data/files.yml` : STL à télécharger (fichiers dans `files/`) ;
  - `_data/demo.yml` : onglets de la démo de l'accueil. Les vidéos d'exemple vont dans `assets/media/` puis dans le champ `video`.
- Les anciennes URL (`/meshmixerportfolio/`, `/stl/`, `/about/`, `/dicom-stl/`) redirigent via `redirect_from`.
- Liens internes : toujours `{{ '/chemin/' | relative_url }}` (à cause du `baseurl`).

## Prévisualiser en local

```bash
brew install ruby@3.3   # une fois par ordinateur
./scripts/preview.sh    # installe les gems au besoin (dans vendor/bundle) puis lance Jekyll
```
Puis ouvrir http://localhost:4000 (`_config.local.yml` remet `baseurl` à vide en local).
- Utiliser **Ruby 3.3** (comme GitHub Pages) : le Ruby de macOS (2.6) est trop vieux et Ruby 4 casse Jekyll 3.9.
`_site/`, `vendor/` et `Gemfile.lock` sont ignorés par git.
