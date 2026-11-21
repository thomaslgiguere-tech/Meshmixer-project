#!/bin/bash
# Prévisualisation locale du site (sans Docker).
# Utilisation : ./scripts/preview.sh   puis ouvrir http://localhost:4000
# Prérequis (une fois par ordinateur) : brew install ruby@3.3
set -e
cd "$(dirname "$0")/.."

# Ruby 3.3 = même version que GitHub Pages (le Ruby de macOS est trop vieux, Ruby 4 trop récent)
export PATH="/opt/homebrew/opt/ruby@3.3/bin:/usr/local/opt/ruby@3.3/bin:$PATH"

if ! ruby -v | grep -q "ruby 3\.3"; then
  echo "Ruby 3.3 introuvable. Installer avec : brew install ruby@3.3"
  exit 1
fi

bundle config set --local path vendor/bundle >/dev/null
bundle check >/dev/null 2>&1 || bundle install

# _config.local.yml remplace l'url par http://localhost:4000 pour que les liens restent en local
bundle exec jekyll serve -l -H localhost --config _config.yml,_config.local.yml "$@"
