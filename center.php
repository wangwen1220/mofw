<?php
require_once 'config.php';

$class = 'account center';
$title = '个人中心';
$keywords = '个人中心';
$description = '个人中心';

include 'header.html';
?>

  <div id="main" class="cnt-center">
    <div class="w-card">
      <a href="#" class="avatar"><img src="http://blog.jobbole.com/wp-content/uploads/sites/2/userphoto/10992.thumbnail.jpg" alt=""></a>
      <div class="info">
        <h3><a href="#">美好年华</a></h3>
        <ul>
          <li>感兴趣行业：LED、照明 [+]</li>
          <li>注册时间：2014-8-14</li>
        </ul>
      </div>
    </div>
    <a class="mycomment" href="mycomment.php">评论过的文章</a>
  </div>

<?php include 'footer.html'; ?>