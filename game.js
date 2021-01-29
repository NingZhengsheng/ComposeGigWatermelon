"use strict";

require('adapter-min.js');

__globalAdapter.init();

require('cocos/cocos2d-js-min.js');

require('physics-min.js');

__globalAdapter.adaptEngine();

require('./ccRequire');

require('./src/settings'); // Introduce Cocos Service here


require('./main'); // TODO: move to common
// Adjust devicePixelRatio


cc.view._maxPixelRatio = 4; // downloader polyfill

window.wxDownloader = remoteDownloader; // handle remote downloader

remoteDownloader.REMOTE_SERVER_ROOT = "";
remoteDownloader.SUBCONTEXT_ROOT = "";
var pipeBeforeDownloader = cc.loader.subPackPipe || cc.loader.md5Pipe || cc.loader.assetLoader;
cc.loader.insertPipeAfter(pipeBeforeDownloader, remoteDownloader);

if (cc.sys.platform === cc.sys.WECHAT_GAME_SUB) {
  var SUBDOMAIN_DATA = require('src/subdomain.json.js');

  cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
    cc.Pipeline.Downloader.PackDownloader._doPreload("SUBDOMAIN_DATA", SUBDOMAIN_DATA);
  });
} else {
  // Release Image objects after uploaded gl texture
  cc.macro.CLEANUP_IMAGE_CACHE = true;
}

remoteDownloader.init();
window.boot();