var i=0;
if(typeof datas=="undefined"){
    var datas=[{id:0,FClass:"Sprite",chance:20,score:5,src:"../img/zongzi.png",v:300,vangle:1,clicksound:"../audio/fkpyx.mp3"},{id:1,FClass:"Sprite",chance:5,score:-3,src:"../img/dumpling.png",v:300,vangle:1,clicksound:"../audio/fkpyx.mp3"},{id:2,FClass:"bomb",chance:5,score:0,src:"../img/bomb2.png",v:300,vangle:1,clicksound:"../audio/fkpyx.mp3"}];
}
if(typeof config=="undefined"){
    var config={
        boxsize:6,
        v:300,
        timeall:60,
        backimg:"../img/back.png",
        backsound:"../audio/qinzi_bg.mp3",
    };
}
function LoadImage() {
    imageManager.getImage("../img/zongzi.png");
    imageManager.getImage("../img/bomb2.png");
    imageManager.getImage("../img/boom.png");
    imageManager.getImage("../img/wow.png");
    imageManager.getImage("../img/back.png");
    imageManager.getImage("../img/score.png");
    imageManager.getImage("../img/time.png");
    imageManager.getImage("../img/sea-under.png");
	soundManager.loadAudio("../audio/BGM.mp3");
	soundManager.loadAudio("../audio/click.mp3");
	soundManager.loadAudio("../audio/boom.mp3");
}
var spriteManager=new SpriteManager();
var timeSystem=new TimeSystem();
var imageManager=new ImageManager();
var soundManager=new SoundManager();
var a1=[];
//a1.push(new Animal(1000,"../img/JellyFish.jpg"));
//a1.push(new Animal(1000,"../img/Hydrangeas.jpg"));
//a1.push(new Animal(1000,"../img/Tulips.jpg"));
var timeset=0;
var lasttype=0;
var w=window.innerWidth;
var h=window.innerHeight;
var boxw=w/config.boxsize;
var boxh=w/config.boxsize;
var backimg=config.backimg;
var backsound=config.backsound;
var v=config.v;
var vangle=config.vangle;
var timeall = config.timeall;
var Score=0;
var type=0;
var background = [];
var backgroundsprite = [];
var ground = [];
var texts = [];
var time = 0;
var bottom;
var sprite;
var p=document.getElementById("div2");
var c;
var context;
const raf = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) {
        window.setTimeout(callback, 1000 / 60); //每帧1000/60ms
    };
function update() {

    if (type == 0) {
        if(timeall-parseInt(timeSystem.getTimeStart()/1000)<=0)type=-1;
        soundManager.update();
        for (var z = 0; z < background.length; z++) {
            if (background[z].type == 0) {
                background[z].update();
                background[z].render();
            }
        }
        for (var z = 0; z < backgroundsprite.length; z++) {
            if (backgroundsprite[z].type == 0) {
                backgroundsprite[z].update();
                backgroundsprite[z].render();
            }
        }
        for (var z = 0; z < texts.length; z++) {
            if (texts[z].type == 0) {
                if(texts[z].name=="Score"){
                    texts[z].text=Score;
                }
                if(texts[z].name=="Time"){
                    texts[z].text=timeall-parseInt(timeSystem.getTimeStart()/1000);
                }
                // texts[z].text=1000/timeSystem.getTime();
                texts[z].update();
                texts[z].render();
            }
        }
        spriteManager.update();
        spriteManager.render();
        spriteManager.excute();
        for (var z = 0; z < ground.length; z++) {
            if (ground[z].type == 0) {
                ground[z].update();
                ground[z].render();
            }
        }
        CreateSprite();
        timeSystem.update();
    }else if(type==2){
        timeset=3-parseInt(timeSystem.getTimeStart()/1000);
        p.innerText=timeset;
        if(timeset<=0) {
            texts = [];
            c.style.display = "block";
            type = 0;
			p.style.display = "none";
            startGame1();
        }
        timeSystem.update();
        //if()
    }else if(type==3){
		
		var start=document.getElementById("start");
		start.onclick = function(e){
			LoadImage();
			soundManager.playSound(backsound,1);
			type=2; 
			p.style.fontSize='200px';
			timeSystem.start();
		};
		start.touchstart = function(e){
			LoadImage();
			soundManager.playSound(backsound,1);
			type=2; 
			p.style.fontSize='200px';
			timeSystem.start();
		}
        //if()
    }
	else if(type==-1){
        p.innerText="得分:"+Score;
        p.style.fontSize='10';
        texts = [];
        p.style.display = "block";
        c.style.display = "none";
        type = 0;
		soundManager.stop();
        timeSystem.update();
        //if()
    }else if(type==99){
        timeSystem.update();
    }
    raf(update);
}
function windowToCanvas(canvas, x, y) {
    var div=document.getElementById("div1");
    var  bbox=div.getBoundingClientRect();
    return { x: x-bbox.left ,
        y: y-bbox.top
    };
}
function initFunc() {
    c=document.getElementById("game");
  

 
    window.onfocus=function(){
		
        //type=lasttype;
        //console.log("开始")
        //console.log(type)
    };
    window.onblur=function(){
        //lasttype=type;
        //type=99;
       // console.log(type)
       // console.log("暂停")
    };
    context=c.getContext("2d");
    c.width=w;
    c.height=h;
}
function startGame1() {
	timeSystem.start();
	LoadGameData();
	//timeSystem.stoptime();
	window.onclick = function(e){
		};
	window.touchstart = function(e){
		};
	 c.addEventListener('touchstart', function(event) {
        // 如果这个元素的位置内只有一个手指的话
        for (var i=0;i<event.targetTouches.length;i++) {
            event.preventDefault();// 阻止浏览器默认事件，重要
            var touch = event.targetTouches[i];
            // 把元素放在手指所在的位置
            var loc = windowToCanvas(context,touch.pageX,touch.pageY);
            var clickObj =getClickObj(loc.x,loc.y);
            if(clickObj!== undefined){
                clickObj.click(clickObj);
            }
        }
    }, false);
	 window.onclick = function(e){
        var loc = windowToCanvas(context,e.clientX,e.clientY);
        var clickObj =getClickObj(loc.x,loc.y);
        if(clickObj!== undefined){
            clickObj.click(clickObj);
        }
		}
}
function loadGame() {
    initFunc();
    c.style.display="none";
    p.style.width=c.width;
    p.style.height=c.height;
    p.style.lineHeight=c.height+"px";
    p.style.backgroundColor='#333333';
    p.style.color='#ADADAD';
    p.style.fontSize='50px';
    //var div=document.getElementById("div1");
   // div.style.width=c.width;
    //div.style.height=c.height;
    //div.style.backgroundColor='#333333';

   // var text = new BaseFactory("Text");
   // text.name = "Load";
   // text.text = "Loading...";
   // text.length = 100
   // context.font = "40pt";;
  // text.x = w/2;
   // text.y = h/3;
   // texts.push(text);
	type=3;
    initSystem();
	timeSystem.stoptime();
    LoadImage();
}
function initSystem() {
    raf(update);
}
function LoadGameData() {
    sprite = new BaseFactory("Back");
    sprite.img = imageManager.getImage(backimg);
    sprite.name = "Back";
    sprite.naturalWidth=sprite.img.naturalWidth;
    sprite.naturalHeight=sprite.img.naturalHeight;
    background.push(sprite);
    sprite = new BaseFactory("Back");

    sprite.img = imageManager.getImage("../img/sea-under.png");
    sprite.name = "Back";
    sprite.width=w;
    sprite.height=sprite.width*(sprite.img.naturalHeight/sprite.img.naturalWidth);
    sprite.y=6/7*h-(807/1186)*sprite.height;
    bottom=6/7*h;
    //sprite.y+=500;
    sprite.naturalWidth=sprite.img.naturalWidth;
    sprite.naturalHeight=sprite.img.naturalHeight;
    ground.push(sprite);
    sprite = new BaseFactory("BackSprite");
    sprite.img= imageManager.getImage("../img/score.png");
    sprite.name = "Sprite";
    sprite.type = 0;
    sprite.x =w-20-w/4 ;
    sprite.y =40 ;
    sprite.width = w/4;
    sprite.height = sprite.width*(sprite.img.naturalHeight/sprite.img.naturalWidth);
    backgroundsprite.push(sprite);
    sprite = new BaseFactory("BackSprite");
    sprite.img = imageManager.getImage("../img/time.png");
    sprite.name = "Sprite";
    sprite.type = 0;
    sprite.x =20;
    sprite.y =40;
    sprite.width = w/4;
    sprite.height = sprite.width*(sprite.img.naturalHeight/sprite.img.naturalWidth);
    //sprite.naturalWidth=sprite.img.naturalWidth;
    //sprite.naturalHeight=sprite.img.naturalHeight;
    backgroundsprite.push(sprite);
    var text = new BaseFactory("Text");
    text.name = "Score";
    text.text = Score;
    text.length = 100;
    text.font = w/22+"pt Calibri";
    text.x = w-20-w/4+w/9;
    text.y = 40+backgroundsprite[0].height/2+w/22*3/4/2+backgroundsprite[0].height/10;
    texts.push(text);
    var text = new BaseFactory("Text");
    text.name = "Time";
    text.text = "0";
    text.length = 100;
    text.font = w/22+"pt Calibri";
    text.x = 20+w/8;
    text.y = 40+backgroundsprite[1].height/2+w/22*3/4/2;
    texts.push(text);
}
function getClickObj(x,y){
    for(var i = spriteManager.manager.length-1; i>=0; i--){
        if(spriteManager.manager[i].type==0) {
            spriteManager.manager[i].createPath();
            if (context.isPointInPath(x, y)) {
                return spriteManager.manager[i];
            }
        }
    }
}
window.onload = function(){
    loadGame();
    //startGame();
};
function startGame() {
    initFunc();
    initSystem();
    LoadImage();
    LoadGameData();
    soundManager.playSound("../audio/qinzi_bg.mp3");
    timeSystem.start();
}
function getRandom(datas){
    var sum=0;
    for(var i = datas.length-1; i>=0; i--){
        sum+=datas[i].chance;
    }
    var sum1=0;
    var sum2=0;
    var random=Math.floor(Math.random()*sum + 1);
    for(var i = 0; i<datas.length; i++){
        sum1+=datas[i].chance;
        if(random<=sum1&&random>=sum2){
            return datas[i].id
        }
        sum2+=datas[i].chance;
    }
}

function CreateSprite(){
    timeset += timeSystem.getTime();
    if (timeset >= v) {
        var Random = getRandom(datas);

        timeset = 0;
        sprite = new BaseFactory(datas[Random].FClass);
        sprite.img = imageManager.getImage(datas[Random].src);
        sprite.score = datas[Random].score;
        sprite.name = "";
        if (datas[Random].width == 0 || datas[Random].width == null) {
            sprite.width = boxw;
        } else {
            sprite.width = datas[Random].width;
        }
        if (datas[Random].height == 0 || datas[Random].height == null) {
            sprite.height = boxw*(sprite.img.naturalHeight/sprite.img.naturalWidth);
        } else {
            sprite.height = datas[Random].height;
        }
        sprite.clicksound=datas[Random].clicksound;
        sprite.time = 0;
        sprite.curimg = 0;
        sprite.type = 0;
        sprite.x = Math.floor(Math.random() * (w - boxw));
        sprite.y = 10;
        //  sprite.y = Math.floor(Math.random() * (400 - 1 + 1) + 1);
        sprite.velocityy = datas[Random].v;
        sprite.velocitangle = datas[Random].vangle;
        //sprite.animal.push(new Animal(1000, "../img/Koala.jpg"));
        //sprite.animal.push(new Animal(1000, "../img/grid.png"));
        //sprite.animal.push(new Animal(1000, "../img/Tulips.jpg"));
        //var action=new ImgAction();
        //sprite.action.push(action);
        spriteManager.add(sprite);

    }
}

function audioAutoPlay(){
    soundManager.playSound(backsound,1);
    document.addEventListener("WeixinJSBridgeReady", function () {
            soundManager.playSound(backsound,1);
    }, false);
}
