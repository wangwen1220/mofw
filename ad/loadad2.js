// 无阻塞广告加载系统
(function(win, doc, undefined) {
  'use strict';

  var dw = doc.write; // 缓存 document.write
  var adQueue = [];

  function LoadADScript(url, container, init, callback) {
    this.url = url;
    this.container = (typeof container === 'string' ? doc.getElementById(container) : container);
    this.init = init || function() {};
    this.callback = callback || function() {};
  }

  LoadADScript.prototype = {
    startLoad: function() {
      var script = doc.createElement('script');
      var _this = this;

      _this.init.apply();

      if (script.readyState) { // IE
        script.onreadystatechange = function() {
          if (script.readyState == 'loaded' || script.readyState == 'complete') {
            script.onreadystatechange = null;
            _this.startNext();
          }
        };
      } else { // Other
        script.onload = function() {
          _this.startNext();
        };
      }

      // 重写 document.write
      doc.write = function(ad) {
        _this.container.innerHTML = ad;
      }

      script.src = _this.url;
      script.type = 'text/javascript';
      doc.body.appendChild(script);
    },

    finished: function() {
      // 还原 document.write
      doc.write = this.dw;
    },

    startNext: function() {
      adQueue.shift();
      this.callback.apply();
      if (adQueue.length > 0) {
        adQueue[0].startLoad();
      } else {
        this.finished();
      }
    }
  };

  window.loadAD = {
    add: function(obj) {
      if (!obj) {
        return;
      }
      adQueue.push(new LoadADScript(obj.url, obj.container, obj.init, obj.callback));
      return this;
    },

    run: function() {
      if (adQueue.length > 0) {
        adQueue[0].startLoad();
      }
    }
  };
})(window, document);