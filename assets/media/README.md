Vidéos de la démo de l'accueil. Déposer ici les .mp4 puis remplir le champ `video` dans `_data/demo.yml`
(ex. `video: /assets/media/dicom.mp4`). Format : MP4 H.264 16:9 1280×720, 10 à 20 s en boucle, sans son, < 8 Mo.

Conversion depuis un enregistrement d'écran (.mov) ; ajouter `crop=L:H:X:Y,` au début de `-vf` pour rogner :
    ffmpeg -i brut.mov -an -vf "scale=1280:720:flags=lanczos,fps=30" -c:v libx264 -crf 20 -preset slow -tune animation -pix_fmt yuv420p -movflags +faststart nom.mp4
