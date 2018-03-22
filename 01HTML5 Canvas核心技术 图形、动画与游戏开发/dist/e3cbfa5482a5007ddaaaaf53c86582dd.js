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
})({27:[function(require,module,exports) {
"use strict";

var WIDTH = 800,
    HEIGHT = 800;
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;
var spritPaint = {
  paint: function paint(sprite, context) {
    var w = sprite.width,
        l = sprite.left,
        t = sprite.top,
        r = w / 2;
    context.save();
    context.beginPath();
    context.strokeStyle = '#000';
    context.moveTo(WIDTH / 2, HEIGHT / 2);
    context.lineTo(l, t);
    context.stroke();

    context.save();
    context.beginPath();
    context.arc(l, t, r, 0, 2 * Math.PI, false);
    context.clip();

    context.shadowColor = 'rgb(0,0,0)';
    context.shadowOffsetX = -4;
    context.shadowOffsetY = -4;
    context.shadowBlur = 8;

    context.lineWidth = 2;
    context.strokeStyle = 'rgb(100,100,195)';
    context.fillStyle = 'rgba(30,144,255,0.15)';
    context.fill();
    context.stroke();
    context.restore();
  }
},
    ballSprite = new Sprite('circle', spritPaint);
function paintClock() {
  var current = new Date(),
      hour = current.getHours(),
      second = current.getSeconds(),
      min = current.getMinutes(),
      x = void 0,
      y = void 0,
      angle = void 0;

  context.clearRect(0, 0, WIDTH, HEIGHT);
  grid(WIDTH / 2 - 200, 20, 20);

  //时
  angle = (hour * 360 / 12 - 90 + min * 360 / 12 / 60) * Math.PI / 180;
  x = WIDTH / 2 + Math.cos(-angle) * (WIDTH / 2 - 200);
  y = HEIGHT / 2 - Math.sin(-angle) * (WIDTH / 2 - 200);
  ballSprite.top = y;
  ballSprite.left = x;
  ballSprite.width = 60;

  ballSprite.paint(context);

  //分
  angle = (min * 360 / 60 - 90 + second * 360 / 60 / 60) * Math.PI / 180;
  x = WIDTH / 2 + Math.cos(-angle) * (WIDTH / 2 - 200);
  y = HEIGHT / 2 - Math.sin(-angle) * (WIDTH / 2 - 200);
  ballSprite.top = y;
  ballSprite.left = x;
  ballSprite.width = 40;
  ballSprite.paint(context);

  //秒
  angle = (second * 360 / 60 - 90) * Math.PI / 180;
  x = WIDTH / 2 + Math.cos(-angle) * (WIDTH / 2 - 200);
  y = HEIGHT / 2 - Math.sin(-angle) * (WIDTH / 2 - 200);
  ballSprite.top = y;
  ballSprite.left = x;
  ballSprite.width = 20;
  ballSprite.paint(context);
}

function grid(radius, stepx, stepy) {

  context.save();
  context.shadowColor = undefined;
  context.shadowBlur = 0;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;

  context.strokeStyle = 'lightgray';
  context.fillStyle = '#ffffff';
  context.lineWidth = 0.5;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, context.canvas.height);
    context.stroke();
  }

  for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(context.canvas.width, i);
    context.stroke();
  }

  context.restore();

  context.beginPath();
  context.arc(WIDTH / 2, HEIGHT / 2, radius, 0, 2 * Math.PI, true);
  context.closePath();
  context.strokeStyle = '#000';
  context.stroke();
}

function animating() {
  paintClock();
  requestNextAnimationFrame(animating);
}

requestNextAnimationFrame(animating);
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
},{}]},{},[0,27])