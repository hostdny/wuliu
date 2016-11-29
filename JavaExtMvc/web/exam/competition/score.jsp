<%--
  Created by IntelliJ IDEA.
  User: 王宾
  Date: 2016/8/24
--%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <%@ page contentType="text/html;charset=UTF-8" language="java" %>
  <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
  <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
  <title>考生分数</title>
  <link href="../exam/css/style.css" rel="stylesheet" type="text/css" />
  <script src="../../timeLine/js/jquery.min.js"></script>
</head>

<body>

<div class="top-ksxt">
</div>

<div class="main-info" >
  <table width="1080px" border="1" cellspacing=”0″ bordercolor="#333" style="margin: 50px auto">
    <tr>
      <td colspan="5" style="text-align: center;padding:  10px 0;color: #000">考生成绩确认</td>
    </tr>
    <tr>
      <td >姓名:</td>
      <td style="color: #000000">${examStudent.userCName}</td>
      <td >性别：</td>
      <td style="color: #000000">
        <c:if test="${examStudent.sex == 0}">
          男
        </c:if>
        <c:if test="${examStudent.sex == 1}">
          女
        </c:if>
      </td>
      <td rowspan="5" style="width:135px;height:135px">
        <div style="padding: 5px">
          <img src="${examStudent.photoUrl}" alt="" style="width:74px;height:111px">
        </div></td>
    </tr>
    <tr>
      <td >证件类型：</td>
      <td style="color: #000000">身份证</td>
      <td >证件号码：</td>
      <td style="color: #000000">${examStudent.idNo}</td>
    </tr>
    <tr>
      <td >民族：</td>
      <td style="color: #000000">${examStudent.race}</td>
      <td >报考类别：</td>
      <td style="color: #000000" id="subjectId">${examStudent.subject}</td>
    </tr>
    <tr>
      <td >单位名称：</td>
      <td style="color: #000000">${examStudent.unitName}</td>
      <td >联系电话：</td>
      <td style="color: #000000">${examStudent.contractNo}</td>
    </tr>
    <tr>
      <td >考生成绩：</td>
      <td colspan="3" style="color:red" ><span style="font-size:20px;">${score}</span></td>
    </tr>
  </table>
  <div style="text-align:center">
    <input type="submit" value="退出" class="loginbtn"  onclick="goBack()"/>
  </div>
</div>

<div class="footer" style="clear: both">Copyright &copy; 2016 xxx.com All Rights Reserved　版权所有 卫东区人民检察院</div>

</body>
<script>
  function goBack(){
    window.location = "http://localhost:8080/exam/competition/login.jsp"
  }
  $(document).ready(function(e) {
    var counter = 0;
    if (window.history && window.history.pushState) {
      $(window).on('popstate', function () {
        window.history.pushState('forward', null, '#');
        window.history.forward(1);
        $("#label").html("第" + (++counter) + "次单击后退按钮。");
      });
    }
    window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
    window.history.forward(1);
  });
</script>
</html>
