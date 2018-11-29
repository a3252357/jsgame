<%--
  Created by IntelliJ IDEA.
  User: hanhaishao
  Date: 2018-06-06
  Time: 9:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <!--    <script type="text/javascript" src="js/properScreen_css.js"></script>
        <script type="text/javascript" src="js/properScreen.js"></script>-->
</head>
<body padding="0px" margin="0px" >
<div id="div2" >
    5
</div>
<style>
    body {
        padding:0;  /*去除内边距*/
        border:0;   /*去除边框*/
        margin:0;   /*去除外边距*/
    }
    #div2{
        text-align:center;
    }
</style>
<script>
    var p1=document.getElementById("div2");
    p1.style.width=window.innerWidth;
    p1.style.height=window.innerHeight;
    p1.style.lineHeight=window.innerHeight+"px";
    p1.style.backgroundColor='#333333';
    p1.style.color='#ADADAD';
    p1.style.fontSize='200'
</script>
<div id="div1" >
    <canvas id="game" width="100%" style="display: block;">
    </canvas>
</div>
</body>
<script type="text/javascript">
    var datas=[{id:0,FClass:"Sprite",chance:20,score:5,src:"../img/zongzi.png",v:300,vangle:1,clicksound:"../audio/fkpyx.mp3"},{id:1,FClass:"Sprite",chance:5,score:-3,src:"../img/dumpling.png",v:300,vangle:1,clicksound:"../audio/fkpyx.mp3"},{id:2,FClass:"bomb",chance:5,score:0,src:"../img/bomb2.png",v:300,vangle:1,clicksound:"../audio/fkpyx.mp3"}];
    var config={
        boxsize:7,
        v:300,
        timeall:60,
        backimg:"../img/back.png",
        backsound:"../audio/qinzi_bg.mp3",
    };
    var js="<script type='text/javascript' src='../js/Class.js?vs"+Math.random()+"'></"+"script>";
    document.write(js);
    js="<script type='text/javascript' src='../js/Game.js?vs"+Math.random()+"'></"+"script>";
    document.write(js);
</script>

</html>
