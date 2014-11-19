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
      <div class="error-msg">您输入的邮箱尚未注册</div>
      <div class="w-form-item">
        <div class="input">
          <label class="icon email" for="email">注册邮箱</label>
          <input type="email" name="email" id="email" placeholder="请输入有效邮箱" />
        </div>
      </div>

      <div class="w-form-item">
        <button type="submit">提交</button>
      </div>
    </form>
  </div>

<?php include 'footer.html'; ?>