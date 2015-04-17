<?php
// JSON
// header('Content-Type: application/json');
// sleep(1);

// $data = array();
// $image = array('txt', 'doc', 'xls', 'album', 'pdf', 'ppt', 'ufo');
// $count = count($image);

// for ($i = 0; $i < 10; $i++) {
//   $data[] = array(
//     'html' => '<li class="w-list-item"><a href="#">情侣初吻太激动女孩下巴脱臼</a></li>'
//   );
// }

// echo json_encode($data);


// JSON
// header('Content-Type:text/html; charset=gb2312'); // 使用gb2312编码，使中文不会变成乱码

// $backValue = array();
// $backValue = $_POST['trans_data2'];
// $backValue[0] = $_POST['trans_data'];
// $backValue[1] = $_POST['trans_data1'];

// echo json_encode($backValue);


// HTML
// header('Content-Type:text/html; charset=utf-8');

// // 读取第一个数组
// $backValue = 'trans_data:';
// $trans = $_POST['trans_data'];
// foreach ($trans as $value) {
//   $backValue = $backValue.' '.$value;
// }

// // 读取第二个数组
// $backValue = $backValue.' , trans_data1:';
// $trans = $_POST['trans_data1'];
// foreach ($trans as $value) {
//   $backValue = $backValue.' '.$value;
// }
// echo $backValue;


// HTML
header('Content-Type:text/html; charset=utf-8');

echo '<p>专营铁塔和基站建设运营的铁塔公司，是今年下半年通信人热门讨论的话题，人们普遍认为，铁塔公司将是通信行业最后一个可以享受&ldquo;垄断红利&rdquo;的国有企业，其工作职位也因此倍受青睐。据笔者了解，不止是像何坤这样的外部人员想进入铁塔公司，三大运营商内部，想到铁塔公司寻找新机会的员工也为数不少。但由此存在的隐忧是，来自不同渠道人员的整合将是铁塔公司未来两三年最大的难题。</p>';