<?php
  /**接受客户提交的phone和pwd， 验证是否正确，返回验证结果
   形式：{'code':1,'msg':'用户名和密码都正确'}
   形式：{'code':0,'msg':'用户名和密码都错误'}
  **/
  header('Content-Type:application/json;charset=utf8');
  $phone=$_REQUEST['phone'];
  $pwd=$_REQUEST['pwd'];
  if(empty($phone)||empty($pwd)){
     echo "[]";
     return;
  }
  $conn=mysqli_connect('127.0.0.1','root','root','user',3306);
  $sql='SET NAMES UTF8';
  mysqli_query($conn,$sql);
  $sql="SELECT user_id FROM users WHERE user_phone='$phone' AND user_pwd='$pwd'";
  $num=mysqli_query($conn,$sql);
  $output;
 if($num===false){
 $output['code']=-1;
 $output['msg']='执行失败请检查SQL'.$sql;
}else{
  $row=mysqli_fetch_assoc($num);
  if($row===NULL){
    $output['code']=0;
    $output['msg']='用户名或密码错误';
  }else{
    $output['code']=1;
    $output['msg']='登陆成功';
  }
}
echo json_encode($output);
