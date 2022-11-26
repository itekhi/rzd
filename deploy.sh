#!/bin/zsh

gulp build

cd dist

git add .
git commit -am "$*"
git push origin gh-pages