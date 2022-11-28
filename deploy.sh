#!/bin/zsh

# first commit to main branch
git add .
git commit -am "$*"
git push

# build site
gulp build

cd dist

# then commit to the second branch
git add .
git commit -am "$*"
git push origin gh-pages