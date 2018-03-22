// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({31:[function(require,module,exports) {
"use strict";

var WIDTH = 1000,
    HEIGHT = 300;
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
var copycanvas = document.createElement('canvas'),
    copycontext = copycanvas.getContext('2d');
var imageData = void 0,
    mousedownFlag = void 0,
    mousedownPos = {},
    scale = 3;
canvas.width = WIDTH;
canvas.height = HEIGHT;
copycanvas.width = WIDTH * scale;
copycanvas.height = HEIGHT * scale;

var Glass = function Glass(pos, radius) {
  this.x = pos.x;
  this.y = pos.y;
  this.radius = radius;
};
Glass.prototype = {
  draw: function draw(context, pos) {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    // context.drawImage(image,0,0,image.width,image.height,0,0,WIDTH,HEIGHT);
    context.putImageData(imageData, 0, 0, 0, 0, WIDTH, HEIGHT);
    context.save();
    context.beginPath();
    if (pos) {
      this.x = pos.x;
      this.y = pos.y;
    }
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#000000';
    context.stroke();
    context.clip();
    context.drawImage(copycanvas, (scale - 1) * pos.x, (scale - 1) * pos.y, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
    context.restore();
  }
};

var glass = new Glass({ x: 600, y: 100 }, 100);
var image = new Image();
image.src = './detail.jpg';
image.onload = function () {
  context.drawImage(image, 0, 0, image.width, image.height, 0, 0, WIDTH, HEIGHT);
  imageData = context.getImageData(0, 0, WIDTH, HEIGHT);
  console.log('iamgeData', imageData);
  copycontext.drawImage(image, 0, 0, image.width, image.height, 0, 0, WIDTH * scale, HEIGHT * scale);
  glass.draw(context, { x: 300, y: 100 });
};

function posToCanvas(pos) {
  var canvasPos = canvas.getBoundingClientRect(),
      x = void 0,
      y = void 0;
  x = pos.x - canvasPos.left;
  y = pos.y - canvasPos.top;
  return { x: x, y: y };
}
function mousedownEve(e) {
  if (e.target.tagName == 'CANVAS') {
    mousedownFlag = true;
    mousedownPos = posToCanvas({ x: e.pageX, y: e.pageY });
    glass.draw(context, mousedownPos);
  }
}
function mousemoveEve(e) {
  if (mousedownFlag) {
    glass.draw(context, posToCanvas({ x: e.pageX, y: e.pageY }));
  }
}
function mouseupEve(e) {
  if (mousedownFlag) {
    mousedownFlag = false;
  }
}
document.addEventListener('mousedown', mousedownEve, false);
document.addEventListener('mousemove', mousemoveEve, false);
document.addEventListener('mouseup', mouseupEve, false);
},{}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var ws = new WebSocket('ws://' + window.location.hostname + ':49305/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        window.location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,31])