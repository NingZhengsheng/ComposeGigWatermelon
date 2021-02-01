"use strict";

var moduleMap = {
  'src/assets/script/window.js': function srcAssetsScriptWindowJs() {
    require('src/assets/script/window.js');
  },
  'src/project.js': function srcProjectJs() {
    require('src/project.js');
  }
};

window.__cocos_require__ = function (moduleName) {
  var func = moduleMap[moduleName];
  func && func();
};