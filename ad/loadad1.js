// 广告加载系统
(function(win, $, undefined) {
  'use strict';

  var doc = win.document;
  var loc = win.location;

  // 队列控制
  var loadQueue = [];

  // 入列
  var queue = function(data) {
    loadQueue.push(data);
    if (loadQueue[0] !== 'runing') {
      dequeue();
    }
  };

  // 出列
  var dequeue = function() {
    var fn = loadQueue.shift();
    if (fn === 'runing') {
      fn = loadQueue.shift();
    }

    if (fn) {
      loadQueue.unshift('runing');
      fn();
    }
  };

  // 重写 document.write 实现无阻塞加载广告
  var loadAD = function(elem, url) {
    var dw = doc.write; // 缓存原生的 document.write
    var script = doc.createElement('script'); // 创建一个新 script 来加载
    var body = doc.body || doc.getElementsByTagName('body')[0];
    var protocol = loc.protocol === 'https:' ? 'https://' : 'http://';
    var rand = Date.now();
    var adid = elem.getAttribute('data-adid');

    url = url || protocol + 'd1.ofweek.com/www/delivery/ajs.php'
      + '?zoneid=' + adid
      + '&cb=' + rand
      + "&loc=" + escape(loc);
      + '&exclude=' + doc.MAX_used
      + '&charset=' + (doc.charset ? doc.charset : (doc.characterSet ? doc.characterSet : ''))
      + '&referer=' + escape(doc.referrer)
      + '&context=' + escape(doc.context)
      + '&mmm_fo=' + (!doc.mmm_fo ? '1' : '');

    // 重写 document.write
    document.write = function(ad) {
      elem.innerHTML = ad;
    };

    // script.type = 'text/javascript';
    script.src = url;

    script.onerror = script.onload = script.onreadystatechange = function(e) {
      e = e || win.event;
      if (!script.readyState || /loaded|complete/.test(script.readyState) || e === 'error') {
        document.write = dw; // 恢复原生的 document.write
        body.removeChild(script);
        body =
          parent =
          elem =
          script =
          script.onerror =
          script.onload =
          script.onreadystatechange = null;

        // 出列
        dequeue();
      }
    }

    // 加载广告脚本
    // body.insertBefore(script, body.firstChild);
    body.appendChild(script);
  };

  // 页面加载完时加载广告
  $(function() {
    $('.ofwad').each(function(i, elem) {
      queue(function() {
        loadAD(elem);
      });
    });
  });
})(window, jQuery);