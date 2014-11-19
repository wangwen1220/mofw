<?php
require_once 'config.php';

$class = 'account login';
$title = '登录';
$keywords = '登录';
$description = '登录';

include 'header.html';
?>

  <div id="main">
    <form class="w-form form-login" id="js-form-login" method="post" action="#">
      <div class="error-msg">您输入的邮箱尚未注册</div>
      <div class="w-form-item">
        <div class="input">
          <label class="icon userid" for="userid">用户名</label>
          <input type="text" name="userid" id="userid" placeholder="请输入用户名或邮箱" />
        </div>
      </div>

      <div class="w-form-item">
        <div class="input">
          <label class="icon password" for="password">密码</label>
          <input type="text" name="password" id="password" placeholder="请输入密码" />
        </div>
      </div>

      <div class="w-form-item">
        <button type="submit">登录</button>
        <div class="forget-password"><a href="#">忘记密码？</a></div>
      </div>

      <div class="reg-now">还不是OFweek会员，<a href="#">马上注册</a></div>
    </form>
  </div>

<?php include 'footer.html'; ?>