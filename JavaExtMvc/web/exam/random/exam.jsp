<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <%@ page contentType="text/html;charset=UTF-8" language="java" %>
  <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
  <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
  <title>考试</title>
  <link href="/exam/css/style.css" rel="stylesheet" type="text/css" />
  <script src="../../timeLine/js/jquery.min.js"></script>
</head>

<body onload="start_event_timer()">
<div class="top-ksxt">
</div>

<div class="main-info" >
  <div class="left" id="left">
    <div class="left-top">
      <b>题目</b>
    </div>
    <div class="left-top1">
      <p style="color:#ff5d00">(单击题号可直接选择该题目)</p>
      <p>
        <span style="color: green">绿色</span>代表正确 &nbsp;&nbsp;
        <span style="color: #cccccc">灰色</span>代表未做 &nbsp;&nbsp;
        <span style="color:red">红色</span>代表错误
      </p>
    </div>
    <div class="left-tm" >
      <p><b>单选题</b></p>
    </div>
    <div class="left-kt" >
      <ul>
        <c:forEach items="${questionList.oneList}" var="oneList">
          <c:if test="${oneList.answered==1}">
            <li><a href="#" id="${oneList.no}" onclick="selectButton(${oneList.no})" style="background-color: green">${oneList.no}</a></li>
          </c:if>
          <c:if test="${oneList.answered==0}">
            <li><a href="#" id="${oneList.no}" onclick="selectButton(${oneList.no})" style="background-color: #cccccc">${oneList.no}</a></li>
          </c:if>
          <c:if test="${oneList.answered==2}">
            <li><a href="#" id="${oneList.no}" onclick="selectButton(${oneList.no})" style="background-color: red">${oneList.no}</a></li>
          </c:if>
        </c:forEach>
      </ul>
    </div>
    <div class="left-tm" >
      <p ><b>多选题</b></p>
    </div>
    <div class="left-kt" >
      <ul>
        <c:forEach items="${questionList.moreList}" var="moreList">
          <c:if test="${moreList.answered==1}">
            <li><a href="#" id="${moreList.no}" style="background-color: green" onclick="selectButton(${moreList.no})">${moreList.no}</a></li>
          </c:if>
          <c:if test="${moreList.answered==0}">
            <li><a href="#" id="${moreList.no}" style="background-color: #cccccc" onclick="selectButton(${moreList.no})">${moreList.no}</a></li>
          </c:if>
          <c:if test="${moreList.answered==2}">
            <li><a href="#" id="${moreList.no}" style="background-color: red" onclick="selectButton(${moreList.no})">${moreList.no}</a></li>
          </c:if>
        </c:forEach>
      </ul>
    </div>
    <div class="left-tm" >
      <p ><b>判断题</b></p>
    </div>
    <div class="left-kt" >
      <ul>
        <c:forEach items="${questionList.judgeList}" var="judgeList">
          <c:if test="${judgeList.answered==1}">
            <li><a href="#" id="${judgeList.no}" style="background-color: green" onclick="selectButton(${judgeList.no})">${judgeList.no}</a></li>
          </c:if>
          <c:if test="${judgeList.answered==0}">
            <li><a href="#" id="${judgeList.no}" style="background-color: #cccccc" onclick="selectButton(${judgeList.no})">${judgeList.no}</a></li>
          </c:if>
          <c:if test="${judgeList.answered==2}">
            <li><a href="#" id="${judgeList.no}" style="background-color: red" onclick="selectButton(${judgeList.no})">${judgeList.no}</a></li>
          </c:if>
        </c:forEach>
      </ul>
    </div>
  </div>
  <div class="center" id="center">
    <div class="left-top" >
      <b>试题</b>
      <p>已做：<span id="answeredNumId"></span>道</p>
      <p>总题数：<span>${totalNum}</span>道</p>
    </div>
    <form action="" id="formId" method="">
      <input type="hidden" id="joinExamId" name="joinExamId" value="${questionList.joinExamId}"/>
      <input type="hidden" id="totalNumId" name="totalNumId" value="${totalNum}"/>
      <input type="hidden" id="studentId" name="studentId" value="${examStudent.id}"/>
      <input type="hidden" id="examModelOid" name="examModelOid" value="${examModel}"/>
      <input type="hidden" id="noId" name="no" value="1"/>
      <div class="center-tm" id="contentId">

      </div>
    </form>
    <div class="center-da">
      <p hidden id="answeredId">答案: <span id="questionAnswer"></span></p>
    </div>
    <div class="center-bottom" >
      <div class="center-bottom-btn">
        <input type="button" value="上一题" class="loginbtnb" onclick="noSubtraction()"/>
        <input type="button" value="下一题" class="loginbtnb" onclick="noPlus()"/>
        <input type="button" value="答 案" class="loginbtnb lbtn" onclick="answeredShow()"/>
      </div>
      <div class="center-bottom-btn">
        <p class="center-first" >
          <input type="hidden" id="timeCountId" value="${timeCount}"/>
          <span style="margin-right: inherit">剩余时间：</span>
          <span id="timeMeter" style="margin-left: inherit;margin-top: 12px;color: red"></span>
        </p>
        <p class="center-secend" ><input type="submit" value="交卷" class="loginbtnb" onclick="doCalc(0)"/></p>
      </div>
    </div>
  </div>
</div>
<div class="footer" style="clear: both">Copyright &copy; 2016 xxx.com All Rights Reserved　版权所有 卫东区人民检察院</div>

</body>
<script>
  /**
   * 初始化onload方法
   */
  function start_event_timer() {
    document.getElementById('center').style.height = document.getElementById("left").offsetHeight+"px";
    var timeCount = $("#timeCountId").val();
    var joinExamId = $("#joinExamId").val();
    var noId = $("#noId").val();
    contentShow(joinExamId,noId,2);
    event_timer(timeCount);
  }
  /**
   * 开始计时
   * @param time_remain
   */
  function event_timer(time_remain) {
    var rt = parseInt(time_remain);
    var eventid = document.getElementById('timeMeter');
    if (rt <= 0 || $('#totalTime').val() <= 0) {
      //交卷操作
      doCalc(1);
    } else {
      eventid.innerHTML = time_format(rt);
      time_remain = time_remain - 1;
      setTimeout("event_timer('" + time_remain + "')", 1000);
    }
  }

  /**
   * 以hh:mm:ss格式化时间，可以根据需要 定义格式
   * @param s
   */
  function time_format(s) {
    var t;
    if (s > -1) {
      hour = Math.floor(s / 3600);
      min = Math.floor(s / 60) % 60;
      sec = s % 60;
      day = parseInt(hour / 24);
      if (day > 0) {
        hour = hour - 24 * day;
        t = day + "天," + hour + ":";
      }
      else t = hour + ":";

      if (min < 10) {
        t += "0";
      }
      t += min + ":";
      if (sec < 10) {
        t += "0";
      }
      t += sec;
    }
    else {
      t = "0:00:0x";
    }
    return t;
  }

  /**
   * 交卷
   * @param flag
   */
  function doCalc(flag) {
    if(flag == 0){
      // 手动交卷
      $.ajax({
        type: "POST",
        url: '/examPaperRecord/doAnswer.do?completeFlag=1',
        data:$('#formId').serialize(),
        success: function (data) {
          var isComplete = data.isComplete;//0：完成，1：未完成
          var noCompleteNum = data.noCompleteNum;
          var des = "";
          if(isComplete == 0){
            // 完成
            des = "是否确认交卷?";
          }else{
            // 未完成
            des = "有" + noCompleteNum + "道题未填写，是否确认交卷?";
          }
          if(confirm(des)){
            var joinExamId = $("#joinExamId").val();
            var studentId = $("#studentId").val();
            var examModel = $("#examModelOid").val();
            window.location.href = "/examJoinExam/handInPaper.do?studentId="+studentId+"&joinExamId="+joinExamId+"&examModel="+examModel;
          }
        },
        // 调用出错执行的函数
        error: function () {

        }
      });
    }else if(flag == 1){
      // 自动交卷
      $.ajax({
        type: "POST",
        url: '/examPaperRecord/doAnswer.do',
        data:$('#formId').serialize(),
        success: function (data) {
          var joinExamId = $("#joinExamId").val();
          var studentId = $("#studentId").val();
          var examModel = $("#examModelOid").val();
          window.location.href = "/examJoinExam/handInPaper.do?studentId="+studentId+"&joinExamId="+joinExamId+"&examModel="+examModel;
        },
        // 调用出错执行的函数
        error: function () {

        }
      });
    }
  }

  /**
   * 答案显示
   *
   */
  function answeredShow(){
    $("#answeredId").show();
  }

  /**
   * 答案隐藏
   *
   */
  function answeredHide(){
    $("#answeredId").hide();
  }

  /**
   * 下一题的内容
   * @param joinExamId
   * @param no
   * @param examModle
   */
  function contentShow(joinExamId,no,examModle){
    $.ajax({
      type: "GET",
      url: '/examPaperRecord/find.do',
      data:{
        joinExamId:joinExamId,
        no:no,
        examModle:examModle
      },
      success: function (data) {
        if(data.success){
          $("#contentId").empty();
          $("#contentId").append('<p><b>'+data.no+'、'+data.testContent+'</b></p>');
          if(data.type == 0){
            $("#contentId").append('<div class="center-xx" id="centerId">');
            appendAns(data,"radio",data.answer);
          }else if(data.type == 1){
            $("#contentId").append('<div class="center-xx-dx" id="centerId">');
            appendAns(data,"checkbox",data.answer);
          }else if(data.type == 2){
            $("#contentId").append('<div class="center-xx" id="centerId">');
            appendAns(data,"radio",data.answer);
          }
          if(data.rightAns){
            $("#questionAnswer").text(data.rightAns);
          }
          answeredHide();
          $("#answeredNumId").text(data.answeredNum);
        }
      },
      // 调用出错执行的函数
      error: function () {

      }
    });
  }
  /**
   * 下一题的内容拼接
   * @param data
   * @param type
   * @param answer
   */
  function appendAns(data,type,answer){
    var answers = "";
    if(answer != null){
      answers = answer.split(",");
    }
    if(data.ansA){
      if(answers.length>0 && answers.indexOf("A") > -1){
        $("#centerId").append('<label><input name="answer" type="'+type+'" value="A" checked="checked" />A、'+data.ansA+' </label>');
      }else{
        $("#centerId").append('<label><input name="answer" type="'+type+'" value="A" />A、'+data.ansA+' </label>');
      }

    }
    if(data.ansB){
      if(answers.length>0 && answers.indexOf("B") > -1){
        $("#centerId").append('<label><input name="answer" type="'+type+'" value="B" checked="checked" />B、'+data.ansB+' </label>');
      }else{
        $("#centerId").append('<label><input name="answer" type="'+type+'" value="B" />B、'+data.ansB+' </label>');
      }

    }
    if(data.ansC){
      if(answers.length>0 && answers.indexOf("C") > -1){
        $("#centerId").append('<label><input name="answer" type="'+type+'" value="C" checked="checked" />C、'+data.ansC+' </label>');
      }else{
        $("#centerId").append('<label><input name="answer" type="'+type+'" value="C" />C、'+data.ansC+' </label>');
      }
    }
    if(data.ansD){
      if(answers.length>0 && answers.indexOf("D") > -1){
        $("#centerId").append('<label><input name="answer" type="'+type+'" value="D" checked="checked" />D、'+data.ansD+' </label>');
      }else{
        $("#centerId").append('<label><input name="answer" type="'+type+'" value="D" />D、'+data.ansD+' </label>');
      }
    }
    if(data.ansE){
      if(answers.length>0 && answers.indexOf("E") > -1){
        $("#centerId").append('<label><input name="answer" type="'+type+'" value="E" checked="checked" />E、'+data.ansE+' </label>');
      }else{
        $("#centerId").append('<label><input name="answer" type="'+type+'" value="E" />E、'+data.ansE+' </label>');
      }
    }
    if(data.ansF){
      if(answers.length>0 && answers.indexOf("F") > -1){
        $("#centerId").append('<label><input name="Fruit" type="'+type+'" value="F" checked="checked" />F、'+data.ansF+' </label>');
      }else{
        $("#centerId").append('<label><input name="Fruit" type="'+type+'" value="F" />F、'+data.ansF+' </label>');
      }
    }
    $("#contentId").append('</div>');
  }
  /**
   * 下一题
   */
  function noPlus(){
    var joinExamId = $("#joinExamId").val();
    var noId = $("#noId").val();
    var noOid = noId;
    var totalNum = $("#totalNumId").val();
    noId = parseInt(noId);
    totalNum = parseInt(totalNum);
    if(noId + 1 >totalNum){
      alert("已经是最后一题了！");
    }else{
      doSubmit(noOid,joinExamId,noId + 1,2);
    }

  }
  /**
   * 上一题
   */
  function noSubtraction(){
    var joinExamId = $("#joinExamId").val();
    var noId = $("#noId").val();
    var noOid = noId;
    noId = parseInt(noId);
    if(noId - 1 == 0){
      alert("已经是第一题了！");
    }else{
      doSubmit(noOid,joinExamId,noId - 1,2);
    }

  }
  /**
   * 点击题号
   * @param no
   */
  function selectButton(no){
    var joinExamId = $("#joinExamId").val();
    var noOid = $("#noId").val();
    doSubmit(noOid,joinExamId,no,2);
  }

  /**
   * 提交当前题的答案
   * @param no
   * @param joinExamId
   * @param num
   * @param examModle
   */
  function doSubmit(no,joinExamId,num,examModle){
    $.ajax({
      type: "POST",
      url: '/examPaperRecord/doAnswer.do',
      data:$('#formId').serialize(),
      success: function (data) {
        contentShow(joinExamId,num,examModle);
        $("#noId").val(num);
        var noOid = "#"+no;
        if(data.answered == 1){
          $(noOid).removeAttr("style");
          $(noOid).attr("style","background-color:green");
        }else if(data.answered == 2){
          $(noOid).removeAttr("style");
          $(noOid).attr("style","background-color:red");
        }else{
          $(noOid).removeAttr("style");
          $(noOid).attr("style","background-color:#cccccc");
        }
      },
      // 调用出错执行的函数
      error: function () {

      }
    });

  }
</script>
</html>
