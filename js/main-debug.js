////////////////////////////////////////////////////////////////////////////////
// 名称: 主程序
// 作者: Steven
// 链接: http://wenwang.org/
// 说明: Require jQuery
// 更新: 2014-8-1
////////////////////////////////////////////////////////////////////////////////

// Main
(function($) {
  // Helpers
  var isIE6 = !!window.ActiveXObject && !window.XMLHttpRequest;

  jQuery.noConflict();

  function log(msg) {
    window.console && console.log(msg);
  }

  function isString(val) {
    return Object.prototype.toString.call(val) === '[object String]';
  }

  function $id(id) {
    // return 'string' === typeof id ? document.getElementById(id) : id;
    return isString(id) ? document.getElementById(id) : id;
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
    if (typeof FastClick !== 'undefined') {
      // Don't attach to body if undefined
      if (typeof document.body !== 'undefined') {
        FastClick.attach(document.body);
      }
    }

    // 多行文字省略号
    jQuery('#main').find('.w-art').not('.w-art-hr').find('.txt h3').dotdotdot({
      watch: 'window'
    });

    // 导航下拉菜单
    $header.on('tap', '.sitenav .dropmenu-trigger', function(event) {
      var $ths = $(this);
      var $mask = $dropmenu.find('.w-mask');
      var $nav = $dropmenu.find('nav');

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

      return false;
    });

    $dropmenu.on('touchmove', function() {
      var $trigger = $header.find('.sitenav .dropmenu-trigger');
      if ($trigger.hasClass('on')) {
        $trigger.trigger('tap');
      }
    }).on('tap', '.w-mask', function(event) {
      event.preventDefault();
      $header.find('.sitenav .dropmenu-trigger').trigger('tap');
    });

    // 子站导航下拉菜单
    $header.on('tap', '.logo .dropmenu-trigger', function(event) {
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
      var $trigger = $header.find('.logo .dropmenu-trigger');
      if ($trigger.hasClass('on')) {
        $trigger.trigger('tap');
      }
    }).on('tap', '.w-mask, .cancel', function(event) {
      event.preventDefault();
      $header.find('.logo .dropmenu-trigger').trigger('tap');
    });

    // 显示全部文章
    $('#js-art').on('tap', '.w-viewmore', function(event) {
      event.preventDefault();
      $(this).hide().siblings('.js-hide').removeClass('js-hide');
    });

    // 页内导航更多按钮
    $main.on('click', '.pagenav .more', function(event) {
      event.preventDefault();
      var $ths = $(this);
      var $hideNav = $ths.parent().siblings('.hidden');

      if (!$ths.hasClass('fold')) {
        $hideNav.removeClass('js-hide');
        $ths.text('收起').addClass('fold');
      } else {
        $hideNav.addClass('js-hide');
        $ths.text('更多').removeClass('fold');
      }
      return false;
    });

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
    $('#js-setfont').on('tap', function(event) {
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
    $commentBar.on('tap click', 'button', function(event) {
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
      })
    });

    // 加载更多
    $('.ui-refresh').refresh({
      load: function(dir, type) {
        var me = this;
        var $me = me.$el;
        var url = $me.find('.w-viewmore').data('url');

        $.getJSON(url, function(data) {
         var html, $list = $me.find('.refresh-data');
         if (data.length) {
            var html = (function(data) { // 数据渲染
              var liArr = [];
              $.each(data, function() {
                liArr.push(this.html);
              });
              return liArr.join('');
            })(data);

            $list[dir == 'up' ? 'prepend' : 'append'](html);
            me.afterDataLoading(); // 数据加载完成后改变状态
          } else {
            me.disable(dir); // 没有数据就不再加载，并且显示没有更多内容
            // dir == 'up' && ++countUp > 1 && me.disable(dir); // 加载两次后不再加载，并且显示没有更多内容
          }
        });
      }
    });

    // 滚到底部
    // $('.ui-refresh').on('swipeUp', function(event) {
    //   if(Math.abs(document.body.clientHeight - document.documentElement.clientHeight) <= (document.documentElement.scrollTop || document.body.scrollTop)){
    //     alert('滚到底部');
    //   }
    // });

    // 返回顶部
    $gotop.on('tap click', function(event) {
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
})(Zepto);