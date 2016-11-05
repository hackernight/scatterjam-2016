# Phaser Bootstrap

Designed to be forked, a jumping off point.

## Getting started after forking
1. `npm install`
1. `bower install` (after `npm install -g bower` if necessary)
1. If you have assets you're ready to include, put them in `<project root>/assets`
1. `gulp dev`
1. From inside `/www` run `python -m http.server 5000` (after installing Python 3 if necessary)

## Files that need manual configuration for your project
* `gulpfile` - Make sure it's set up to move your assets correctly
* `karma.conf.js` - If you're writing unit tests, make sure you include the correct JS directories
* `package.json` - If you want, add package info for NPM (and fix those warnings)
* `bower.json` - If you want, add package info for Bower (and fix those warnings)
* `www/index.html` - The title of your game, and include your new JS files, of course!
* `LICENSE.md` - You'll probably want your own License, not mine! Mine is for this Bootstrap project!
* `.git` - You'll probably want to do something about this so you're not trying to push to the Bootstrap repo. You can remove this folder and run `git init` or fiddle with remotes if you want to preserve history.
