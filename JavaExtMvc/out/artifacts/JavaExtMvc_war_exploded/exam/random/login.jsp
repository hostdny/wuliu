<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <%@ page contentType="text/html;charset=UTF-8" language="java" %>
  <title>考生登录</title>
  <link href="/exam/css/style.css" rel="stylesheet" type="text/css" />
  <script src="../../timeLine/js/jquery.min.js"></script>
</head>

<body>

<div class="top">
</div>

<div class="main">
  <div class="denglu">

    <div class="text" ><strong>重要提示：</strong><br />
      一、考生进入考场必须关闭各种通讯工具。<br />
      二、考生不得询问试题题意，若发现试题字迹模糊或试题有误，可举手向监考人员询问，不准询问其他考生。<br />
      三、考生必须服从监考人员的监督管理。不准交头接耳，左顾右盼，传递物品，打手势，做暗号。
    </div>
    <div class="dlk">
      <table width="292" border="0" align="center" cellpadding="0" cellspacing="0" style="margin:5px 25px">
        <tr>
          <td height="76" colspan="3"></td>
        </tr>
        <tr>
          <td width="65" >证件号码</td>
          <td colspan="2"><input name="textfield" type="text" class="dlinput" id="cid"/></td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td height="16" colspan="3" style="padding: 10px 0 10px 0;color: red" id="errorMassage">${examText}</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td colspan="2"><input type="submit" value="登 录" class="loginbtn" onclick="studentLogin()"/></td>
        </tr>
      </table>
    </div>
  </div>
</div>

<div class="footer">Copyright &copy; 2016 xxx.com All Rights Reserved　版权所有 卫东区人民检察院</div>

</body>
<script>
  function studentLogin() {
    var cid = $("#cid").val();
    window.location.href = '/examStudent/studentLogin.htm?cid='+cid+'&examModel=2';
  }
</script>
</html>
