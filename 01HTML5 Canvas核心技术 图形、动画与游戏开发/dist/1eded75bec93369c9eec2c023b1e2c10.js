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
})({30:[function(require,module,exports) {
"use strict";

var WIDTH = 500,
    HEIGHT = 300;
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;
var cells = [{ left: 0, top: 0, width: 48, height: 64 }, { left: 54, top: 0, width: 48, height: 64 }, { left: 105, top: 0, width: 42, height: 64 }, { left: 152, top: 0, width: 46, height: 64 }, { left: 203, top: 0, width: 55, height: 64 }, { left: 262, top: 0, width: 50, height: 64 }, { left: 318, top: 0, width: 49, height: 64 }, { left: 372, top: 0, width: 46, height: 64 }, { left: 423, top: 0, width: 37, height: 64 }],
    velocityX = 100,
    spriteTop = 100,
    spriteMove = {
  lastTime: 0,
  execute: function execute(sprite, context, time) {
    sprite.left -= sprite.velocityX * (time - this.lastTime) / 1000;
    sprite.top = spriteTop;
    if (sprite.left < 0) {
      sprite.left = WIDTH;
    }
    this.lastTime = time;
  }
},
    sheetMove = {
  interval: 100,
  lastTime: 0,
  execute: function execute(sprite, context, time) {
    if (time - this.lastTime > this.interval) {
      sprite.painter.advance();
      this.lastTime = time;
    }
  }
},
    spriteImage = new Image(),
    spriteWidth = void 0,
    spriteHeight = void 0,
    sprite = new Sprite('sprite', new SpriteSheetPainter(cells), [spriteMove, sheetMove]);

function drawBg() {
  var splite = 20;
  for (var i = 0.5 + splite; i < HEIGHT; i += splite) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(WIDTH, i);
    context.strokeStyle = '#cccccc';
    context.lineWidth = 0.5;
    context.stroke();
  }
  context.drawImage(spriteImage, 0, 0);
}

function animate(time) {
  context.clearRect(0, 0, WIDTH, HEIGHT);
  drawBg();
  sprite.update(context, time);
  sprite.paint(context);
  window.requestNextAnimationFrame(animate);
}

spriteImage.onload = function () {
  spriteWidth = spriteImage.width;
  spriteHeight = spriteImage.height;
  window.spritesheet = spriteImage;
  sprite.top = spriteTop;
  sprite.left = spriteTop;
  sprite.velocityX = velocityX;
  drawBg();
  requestNextAnimationFrame(animate);
};
spriteImage.src = './running-sprite-sheet.png';
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
},{}]},{},[0,30])