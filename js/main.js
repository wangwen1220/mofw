!function(t){function n(t){t=t||window;var n=t.document;return null!==t.innerWidth?{w:t.innerWidth,h:t.innerHeight}:"CSS1Compat"===document.compatMode?{w:n.documentElement.clientWidth,h:n.documentElement.clientHeight}:{w:n.body.clientWidth,h:n.body.clientWidth}}function e(t){var e=t.getBoundingClientRect(),o=e.height||e.bottom-e.top,i=e.width||e.right-e.left,a=n();return o&&i?e.top>a.h||e.bottom<0?!1:e.right<0||e.left>a.w?!1:!0:!1}jQuery.noConflict();!!window.ActiveXObject&&!window.XMLHttpRequest;t(function(){{var n=t("#gotop"),o=t("#header"),i=t("#dropmenu"),a=t("#dropmenu-subsite"),r=t("#main");t("#mask"),t("html")}window.FastClick&&document.body&&FastClick.attach(document.body),jQuery("#main").find(".w-art").not(".w-art-hr").find(".txt h3").dotdotdot({watch:"window"}),o.on("click fastclick",".sitenav > .dropmenu-trigger",function(){var n=t(this),e=i.find(".w-mask"),o=i.find("nav");return n.hasClass("on")?(e.fadeOut(100),o.hide(0),n.removeClass("on")):(e.fadeIn(100),o.show(0),n.addClass("on")),!1}),i.on("touchmove",function(){}).on("click",".w-mask",function(t){t.preventDefault(),o.find(".sitenav > .dropmenu-trigger").trigger("fastclick")}),t(".js-search").on("submit",function(){var n=t(this).find("input[name=q]"),e=t.trim(n.val());return e?(window.location="/search/"+encodeURIComponent(encodeURIComponent(n.val()))+".html",!1):!1}),o.on("click fastclick",".logo > .dropmenu-trigger",function(){var n=t(this),e=a.find(".w-mask"),o=a.find("nav");return n.hasClass("on")?(o.hide(0),e.fadeOut(100),n.removeClass("on")):(o.show(0),e.fadeIn(100),n.addClass("on")),!1}),a.on("touchmove",function(){}).on("click",".w-mask, .cancel",function(t){t.preventDefault(),o.find(".logo > .dropmenu-trigger").trigger("fastclick")}),t("#js-art").on("click",".w-viewmore",function(n){n.preventDefault();var e=t(this),o=e.data("url");t.get(o,function(t){e.before(t).hide()})}),r.on("click",".pagenav .more",function(){var n=t(this),e=n.siblings("a").slice(11);return n.hasClass("fold")?(e.hide(),n.text("更多").removeClass("fold")):(e.show(),n.text("收起").addClass("fold")),!1}),t("#slider").slider({autoPlay:!0,imgZoom:!1,loop:!0}),t("#js-setfont").on("click",function(n){n.preventDefault();var e=t(this),o=t("#js-art"),i=e.text();"T小"===i?(o.css("font-size","18px"),e.text("T中")):"T中"===i?(o.css("font-size","20px"),e.text("T大")):"T大"===i&&(o.css("font-size","16px"),e.text("T小"))});var d=t("#js-dialog-login"),s=t("#js-comment-reply"),c=t("#js-comment-bar");d.length&&(d.dialog({autoOpen:!1}).dialog("this").getWrap().addClass("w-dialog w-dialog-login"),s.on("focus","textarea",function(){islogin||(d.dialog("open"),t(this).blur())})),s.on("keyup","textarea",function(){var n=t(this);t.trim(n.val())?c.removeClass("js-hide"):c.addClass("js-hide")}),c.on("click","button",function(n){n.preventDefault();var e=(t(this),s.find(".tips"));t.ajax({type:"POST",url:"/comment.php",data:{uid:uid,comment:s.find("textarea").val()},dataType:"json",context:t("#js-comment-list"),success:function(){e.fadeIn(function(){var n=t(this);setTimeout(function(){n.fadeOut(500)},5e3)})},error:function(){e.html("Ajax error!").fadeIn(function(){var n=t(this);setTimeout(function(){n.fadeOut(500)},5e3)})}})}),t(".ui-refresh").refresh({load:function(n){var e=this,o=e.$el,i=o.find(".w-viewmore"),a=i.data("url"),r=i.data("page")||1;t.getJSON(a,{pagenum:r},function(a){var d,s=o.find(".refresh-data");a.length?(d=function(n){var e=[];return t.each(n,function(){e.push(this.html)}),e.join("")}(a),s["up"===n?"prepend":"append"](d),e.afterDataLoading(),i.data("page",++r)):e.disable(n)})}}),t(window).on("DOMContentLoaded load resize scroll",function(){var n,o=t("#js-ajaxload"),i=o.prev(),a=o.data("url"),r=o.data("page")||1,d=o.data("loading")||!1;e(o[0])&&!d&&(o.data("loading",!0),t.getJSON(a,{pagenum:r},function(e){e.length?(n=function(n){var e=[];return t.each(n,function(){e.push(this.html)}),e.join("")}(e),i.append(n),o.data("page",++r).data("loading",!1)):o.hide()}))}),n.on("click",function(){return window.scrollTo(0,0),!1})})}(Zepto);