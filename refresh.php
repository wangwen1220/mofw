<?php
header('Content-Type: application/json');
sleep(1);

$data = array();
$image = array('txt', 'doc', 'xls', 'album', 'pdf', 'ppt', 'ufo');
$count = count($image);

for ($i = 0; $i < 10; $i++) {
  $data[] = array(
    'html' => '<li class="w-list-item"><a href="#">情侣初吻太激动女孩下巴脱臼</a></li>'
  );
}

echo json_encode($data);
?>