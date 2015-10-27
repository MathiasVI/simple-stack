# Simple Stack
simple stack for building vanilla JS with webpack.

### requirements

#### NPM
we use NPM to do all watching, and scripts. (no gulp/bower/grunt please, just extra abstraction).

#### webpack
check the webpack configuration. Renders JS, and compiles into a common.js file.

### Setup

run all commands from the root of the project folder.
```
npm install
```

### watch folders and live reload.
```
npm run dev
```

### create build environment for deployment
TODO we may need to build out these scripts more.
```
npm run deploy
```


## Folder structure
```
Deploy folder for deployment
| - deploy/ 
Build folder for development
| - build/
| --- build/public/
Any shell/CLI scripts
| - scripts/
All source files that are watched and built/deployed
| - src/
| --- src/css/ 
| --- src/js/


```

## JS Framework


## CSS Framework
using stylus. (we could change it to sass).


# potential compatibility errors

Flag any new technologies being used (i.e. :before :after, webgl, Array.prototype.every )

