<?php
require_once 'config.php';

$class = 'account find-password';
$title = '登录';
$keywords = '登录';
$description = '登录';

include 'header.html';
?>

  <div id="main">
    <form class="w-form form-login" id="js-form-login" method="post" action="#">
      <div class="error-msg"></div>
      <div class="w-form-item readonly">注册邮箱：<em>2345235423@qq.com</em></div>
      <div class="w-form-item">
        <div class="input">
          <label for="password">新密码：</label>
          <input type="text" name="password" id="password" placeholder="请输入密码" />
        </div>
      </div>

      <div class="w-form-item">
        <div class="input">
          <label for="repassword">确认密码：</label>
          <input type="text" name="repassword" id="repassword" placeholder="请再次输入密码" />
        </div>
      </div>

      <div class="w-form-item">
        <button type="submit">提交</button>
      </div>
    </form>
  </div>

<?php include 'footer.html'; ?>