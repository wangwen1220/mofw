////////////////////////////////////////////////////////////////////////////////
// 名称: 主程序
// 作者: Steven
// 链接: http://wenwang.org/
// 说明: Require Zepto
// 更新: 2014-8-1
////////////////////////////////////////////////////////////////////////////////

// Main
(function(win, $, undefined) {
  // jQuery.noConflict();

  // Helpers
  var isIE6 = !!window.ActiveXObject && !window.XMLHttpRequest;

  function isString(val) {
    return Object.prototype.toString.call(val) === '[object String]';
  }

  function $id(id) {
    // return 'string' === typeof id ? document.getElementById(id) : id;
    return isString(id) ? document.getElementById(id) : id;
  }

  // 检测元素是否进入视口
  function getViewportSize(w) {
    w = w || window;
    var d = w.document;

    if (w.innerWidth !== null) return {
      w: w.innerWidth,
      h: w.innerHeight
    };

    if (document.compatMode === 'CSS1Compat') {
      return {
        w: d.documentElement.clientWidth,
        h: d.documentElement.clientHeight
      };
    }

    return {
      w: d.body.clientWidth,
      h: d.body.clientWidth
    };
  }

  function isViewportVisible(el) {
    var box = el.getBoundingClientRect();
    var height = box.height || (box.bottom - box.top);
    var width = box.width || (box.right - box.left);
    var viewport = getViewportSize();

    if (!height || !width) return false;
    if (box.top > viewport.h || box.bottom < 0) return false;
    if (box.right < 0 || box.left > viewport.w) return false;
    return true;
  }

  // 文档加载完执行
  $(function() {
    // 通用变量
    var $gotop = $('#gotop');
    var $header = $('#header');
    var $dropmenu = $('#dropmenu');
    var $dropmenuSubsite = $('#dropmenu-subsite');
    var $main = $('#main');
    var $mask = $('#mask');
    var $html = $('html');
    // var islogin = $html.hasClass('logined');

    // use fastclick
    // FastClick.attach(document.body);
    // Don't attach to body if undefined
    if (window.FastClick && document.body) {
      FastClick.attach(document.body);
    }

    // 多行文字省略号 - 某些情况下有问题暂时关掉
    // jQuery('#main').find('.w-art').not('.w-art-hr').find('.txt h3').dotdotdot({
    //   watch: 'window'
    // });

    // 导航下拉菜单
    $header.on('click fastclick', '.sitenav > .dropmenu-trigger', function(event) {
      var $ths = $(this);
      var $mask = $dropmenu.find('.w-mask');
      var $nav = $dropmenu.find('nav');
      // console.log('test');

      if ($ths.hasClass('on')) {
        $mask.fadeOut(100);
        $nav.hide(0);
        $ths.removeClass('on');
      } else {
        $mask.fadeIn(100);
        // $header.find('.dropmenu').animate({
        //   height: 'auto'
        // }, 500, 'ease-in-out');
        $nav.show(0);
        $ths.addClass('on');
      }

      // 操！用 tap 会点透，用 fastclick 不能用 trigger 触发点击事件
      // 可以定义一个事件来触发
      return false;
    });

    $dropmenu.on('touchmove', function() {
      // 先暂时去年滑动隐藏功能，避免弹层太高需要滑动来查看
      // var $trigger = $header.find('.sitenav > .dropmenu-trigger');
      // if ($trigger.hasClass('on')) {
      //   $trigger.trigger('fastclick');
      // }
    })
    .on('click', '.w-mask', function(event) {
      event.preventDefault();
      $header.find('.sitenav > .dropmenu-trigger').trigger('fastclick');
    });

    // 处理搜索词
    $('.js-search').on('submit', function() {
      var $kw = $(this).find('input[name=q]');
      var val = $.trim($kw.val());

      if (!val) {
        // $kw.attr('placeholder', '请输入你要搜索的关键词');
        return false;
      }

      // 后台说要编码两次，那边才能解析
      window.location = '/search/' + encodeURIComponent(encodeURIComponent($kw.val())) + '.html';
      // window.location = '/search/' + encodeURIComponent($kw.val()) + '.html';
      return false;

      // var $this = $(this);
      // var qval = $this.find('input[name=q]').val();
      // $this.find('input[name=url]').val('search/' + qval + '.html');
    });

    // 子站导航下拉菜单
    $header.on('click fastclick', '.logo > .dropmenu-trigger', function(event) {
      var $ths = $(this);
      var $mask = $dropmenuSubsite.find('.w-mask');
      var $nav = $dropmenuSubsite.find('nav');

      if ($ths.hasClass('on')) {
        $nav.hide(0);
        $mask.fadeOut(100);
        $ths.removeClass('on');
      } else {
        $nav.show(0);
        $mask.fadeIn(100);
        $ths.addClass('on');
      }

      return false;
    });

    $dropmenuSubsite.on('touchmove', function() {
      // 先暂时去年滑动隐藏功能，避免弹层太高需要滑动来查看
      // var $trigger = $header.find('.logo > .dropmenu-trigger');
      // if ($trigger.hasClass('on')) {
      //   $trigger.trigger('fastclick');
      // }
    }).on('click', '.w-mask, .cancel', function(event) {
      event.preventDefault();
      $header.find('.logo > .dropmenu-trigger').trigger('fastclick');
    });

    // 显示全部文章
    // $('#js-art').on('click', '.w-viewmore', function(event) {
    //   event.preventDefault();

    //   var $this = $(this);
    //   var url = $this.data('url');

    //   // $(this).hide().siblings('.js-hide').removeClass('js-hide');
    //   $.get(url, function(html) {
    //     // html = '<p>OK</p>';
    //     $this.before(html).hide();
    //   });
    // });
    $('#js-art').on('click', '.js-viewall', function(event) {
      event.preventDefault();

      var $this = $(this);
      var url = $this.data('url');

      // $(this).hide().siblings('.js-hide').removeClass('js-hide');
      $.get(url, function(html) {
        // html = 'test';
        $this.parent().before(html).find('.next, .disabled').add($this).hide();
      });
    });

    // 页内导航更多按钮
    $main.on('click', '.pagenav .more', function() {
      var $ths = $(this);
      var $foldnavs = $ths.siblings('a').slice(11);
      // var $foldnavs = $ths.siblings('.hidden');

      if ($ths.hasClass('fold')) {
        // $foldnavs.addClass('js-hide');
        $foldnavs.hide();
        $ths.text('更多').removeClass('fold');
      } else {
        // $foldnavs.removeClass('js-hide');
        $foldnavs.show();
        $ths.text('收起').addClass('fold');
      }

      return false;
    });//.find('.pagenav .more').trigger('click');

    // 创建 slider 组件
    $('#slider').slider({
      autoPlay: true,
      imgZoom: false,
      loop: true
    });

    // var carousel = new Carousel({
    //   element: '#js-carousel',
    //   recursive: false,
    //   autoplay: true,
    //   autoplay_interval_ms: 5000,
    //   selectors: {
    //     content: '.wui-carousel-cnt',
    //     contItem: '.item',
    //     control: '.wui-carousel-ctrl',
    //     controlItem: '.item',
    //     active: '.active'
    //   }
    // });

    // 设置文章字体大小
    $('#js-setfont').on('click', function(event) {
      event.preventDefault();
      var $ths = $(this);
      var $art = $('#js-art');
      var txt = $ths.text();

      if (txt === 'T小') {
        $art.css('font-size', '18px');
        $ths.text('T中');
      } else if (txt === 'T中') {
        $art.css('font-size', '20px');
        $ths.text('T大');
      } else if (txt === 'T大') {
        $art.css('font-size', '16px');
        $ths.text('T小');
      }
    });

    // 登录弹窗
    var $loginDialog = $('#js-dialog-login');
    var $commentReply = $('#js-comment-reply');
    var $commentBar = $('#js-comment-bar');

    if ($loginDialog.length) {
      $loginDialog.dialog({
        autoOpen: false
      // }).dialog('this')._options['_wrap'].addClass('w-dialog w-dialog-login');
      }).dialog('this').getWrap().addClass('w-dialog w-dialog-login');

      $commentReply.on('focus', 'textarea', function(event) {
        if (!islogin) {
          $loginDialog.dialog('open');
          $(this).blur();
        }
      });
    }

    // 切换发送按钮显示
    $commentReply.on('keyup', 'textarea', function(event) {
      var $ths = $(this);

      if ($.trim($ths.val())) {
        $commentBar.removeClass('js-hide');
      } else {
        $commentBar.addClass('js-hide');
      }
    });

    // 发送评论
    $commentBar.on('click', 'button', function(event) {
      event.preventDefault();
      var $ths = $(this);
      var $tips = $commentReply.find('.tips');

      $.ajax({
        type: 'POST',
        url: '/comment.php',
        data: {
          uid: uid,
          comment: $commentReply.find('textarea').val()
        },
        dataType: 'json',
        // timeout: 300,
        context: $('#js-comment-list'),
        success: function(data){
          // Supposing this JSON payload was received:
          // {"status": "success", "data": "<div>..." }
          // append the HTML to context object.
          // this.append(data.data);
          $tips.fadeIn(function() {
            var $ths = $(this);
            setTimeout(function() {
              $ths.fadeOut(500);
            }, 5000);
          });
        },
        error: function(xhr, type) {
          $tips.html('Ajax error!').fadeIn(function() {
            var $ths = $(this);
            setTimeout(function() {
              $ths.fadeOut(500);
            }, 5000);
          });
        }
      });
    });

    // 加载更多
    $('.ui-refresh').refresh({
      load: function(dir, type) {
        var me = this;
        var $me = me.$el;
        var $viewmore = $me.find('.w-viewmore');
        var url = $viewmore.data('url');
        var page = $viewmore.data('page') || 1;

        $.getJSON(url, {pagenum: page}, function(data) {
          var html, $list = $me.find('.refresh-data');
          // console.log(data);
          if (data.length) {
            html = (function(data) { // 数据渲染
              var liArr = [];
              $.each(data, function() {
                liArr.push(this.html);
              });
              return liArr.join('');
            })(data);

            $list[dir === 'up' ? 'prepend' : 'append'](html);
            me.afterDataLoading(); // 数据加载完成后改变状态

            $viewmore.data('page', ++page);
          } else {
            me.disable(dir); // 没有数据就不再加载，并且显示没有更多内容
            // dir == 'up' && ++countUp > 1 && me.disable(dir); // 加载两次后不再加载，并且显示没有更多内容
          }
        });
      }
    });

    // 下拉加载
    (function() {
      var $ajaxload = $('#js-ajaxload');
      var $list = $ajaxload.prev();
      var url = $ajaxload.data('url');

      if (!$ajaxload.length) return;

      $(window).on('DOMContentLoaded load resize scroll', function() {
        var page = $ajaxload.data('page') || 1;
        var loading = $ajaxload.data('loading') || false;
        var html;

        // 进入视口且不在加载中
        if (isViewportVisible($ajaxload[0]) && !loading) {
          // console.log('进入视口');
          $ajaxload.data('loading', true);

          $.getJSON(url, {pagenum: page}, function(data) {
            // console.log(data);
            if (data.length) {
              html = (function(data) {
                var liArr = [];
                $.each(data, function() {
                  liArr.push(this.html);
                });
                return liArr.join('');
              })(data);

              $list.append(html);
              $ajaxload.data('page', ++page).data('loading', false);
            } else { // 如果没有更多产品
              $ajaxload.hide();
            }
          });
        }
      });
    })();

    // 滚到底部
    // $('.ui-refresh').on('swipeUp', function(event) {
    //   if(Math.abs(document.body.clientHeight - document.documentElement.clientHeight) <= (document.documentElement.scrollTop || document.body.scrollTop)){
    //     alert('滚到底部');
    //   }
    // });

    // 广告加载系统
    (function() {
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
      var loadAD = function(elem) {
        var doc = window.document;
        var loc = window.location;
        var dw = doc.write; // 缓存原生的 document.write
        var script = doc.createElement('script'); // 创建一个新 script 来加载
        var head = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement;
        var protocol = loc.protocol === 'https:' ? 'https://' : 'http://';
        var rand = Math.floor(Math.random() * 99999999999);
        var adid = elem.getAttribute('data-adid');
        var url = protocol + 'd1.ofweek.com/www/delivery/ajs.php?zoneid=' + adid + '&cb=' + rand + "&loc=" + escape(loc);
        doc.MAX_used = doc.MAX_used || ',';

        if (doc.MAX_used !== ',') {
          url += '&exclude=' + doc.MAX_used;
        }

        if (doc.charset) {
          url += '&charset=' + doc.charset;
        } else if (doc.characterSet) {
          url += '&charset=' + doc.characterSet;
        }

        if (doc.referrer) {
          url += '&referer=' + escape(doc.referrer);
        }

        if (doc.context) {
          url += '&context=' + escape(doc.context);
        }
        if (!doc.mmm_fo) {
          url += '&mmm_fo=1';
        }

        // 重写 document.write
        document.write = function(ad) {
          elem.innerHTML = ad;
        };

        // script.type = 'text/javascript';
        script.src = url;

        script.onerror = script.onload = script.onreadystatechange = function(e) {
          e = e || window.event;
          if (!script.readyState || /loaded|complete/.test(script.readyState) || e === 'error') {
            // 恢复原生的 document.write
            document.write = dw;
            head.removeChild(script);

            // 卸载事件和断开 DOM 的引用，尽量避免内存泄漏
            head =
            elem =
            script =
            script.onerror =
            script.onload =
            script.onreadystatechange = null;

            dequeue();
          }
        };

        // 加载广告脚本
        // head.insertBefore(script, head.firstChild);
        head.appendChild(script);
      };

      // 加载广告
      $('.ofwad').each(function(i, elem) {
        queue(function() {
          loadAD(elem);
        });
      });
    })();

    // 返回顶部
    $gotop.on('click', function(event) {
      window.scrollTo(0, 0);
      return false;
      // $('html, body').scrollTop(0);
      // $('html, body').animate({
      //   scrollTop: 0
      // }, 600);
    });

    // 转到
    // $('.goto').click(function() {
    //   $('html, body').animate({
    //     scrollTop: $($(this).attr('href')).offset().top
    //   }, {
    //     duration: 500,
    //     easing: 'swing'
    //   });
    //   return false;
    // });
  });
})(window, Zepto);