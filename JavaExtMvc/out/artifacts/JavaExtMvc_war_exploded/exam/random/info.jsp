<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <%@ page contentType="text/html;charset=UTF-8" language="java" %>
  <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
  <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
  <title>信息确认</title>
  <link href="../exam/css/style.css" rel="stylesheet" type="text/css" />
  <script src="../../timeLine/js/jquery.min.js"></script>
</head>

<body>

<div class="top-ksxt">
</div>

<div class="main-info" >
  <table width="1080px" border="1" cellspacing=”0″ bordercolor="#333" style="margin: 50px auto">
    <input type="hidden" id="examStudentId" value="${examStudent.id}"/>
    <tr>
      <td colspan="5" style="text-align: center;padding:  10px 0;color: #000">考生信息确认</td>
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

  </table>
  <div style="text-align:center">
    <input type="submit" value="信息确认并参加考试" class="loginbtn"  onclick="startExam()"/>
    <p style="color: red;font-size: 20px">${Msg}</p>
    <!-- 	<input type="submit" value="返回" class="loginbtn"  /> -->
  </div>
</div>

<div class="footer" style="clear: both">Copyright &copy; 2016 xxx.com All Rights Reserved　版权所有 卫东区人民检察院</div>

</body>
<script>
  function startExam(){
    var studentId = $("#examStudentId").val();
    var subjectId = $("#subjectId").text();
    window.location.href = '/examJoinExam/joinExam.do?studentId='+studentId+'&typeOfWork='+subjectId+'&examModel=2';
  }
</script>
</html>
