var Animal=function (time,url) {
    this.time=time;
    this.url=url;
    this.img;
};


var SpriteManager=function () {
    this.manager=[];
};
SpriteManager.prototype={
    add:function (sprite1) {
        var result=false;
        for(var z=0;z<this.manager.length;z++)
        {
            if(this.manager[z].type==1)
            {
                this.manager[z]=sprite1;
                result=true;
                break;
            }
        }

        if(!result){
            this.manager.push(sprite1);
        }
    },
    excute:function () {
        for(var z=0;z<this.manager.length;z++) {
            for (var key in this.manager[z].action) {
                this.manager[z].action[key].excute(this.manager[z]);
            }
        }
    },
    render:function () {
        for(var z=0;z<this.manager.length;z++)
        {
            if(this.manager[z].type==0||this.manager[z].type==2)
            {   //context.save();

                this.manager[z].render();
                // context.restore();
            }
        }
    },
    update:function () {
        //this.lastmanager=this.manager.;
        for(var z=0;z<this.manager.length;z++)
        {
            if(this.manager[z].type==0||this.manager[z].type==0)
            {
                this.manager[z].update();
            }
        }
    }
};


var Base=function () {

};
Base.prototype={
    render:function () {
    },
    update:function () {
    }
};


var Sprite=function () {
    this.name="Sprite";
    this.naturalWidth=0;
    this.img=0;
    this.callimgsrc="../img/wow.png";
    this.naturalHeight=0;
    this.x=0;
    this.y=0;
    this.z=0;
    this.width=600;
    this.height=800;
    this.velocityx=0;
    this.velocityy=0;
    this.type=0;
    this.typeboom=0;
    this.angle=0;
    this.score = 0;
    this.velocitangle=0;
    this.animal=Array();
    this.action=Array();
    this.clicksound="../audio/fkpyx.mp3";
    this.createPath = function(){
        context.beginPath();
        context.rect(this.x,this.y,this.width,this.height);
        context.closePath();
    };
    this.click = function(clickObj){
        soundManager.playSound(this.clicksound);
        //this.animal=a1;
        this.img = imageManager.getImage(this.callimgsrc);
        this.velocityx = 0;
        this.velocityy = 0;
        this.angle = 0;
        this.velocitangle = 0;
        this.width = boxw;
        this.height = boxh;
        if(this.score==0){}else {
        var text=sprite = new BaseFactory("Text");
            text.name = "Score1111";
			if(this.score>0){
				text.text = "+"+this.score;
			}else{
            text.text = this.score;
			}
            Score += this.score;
            var size=30;
            text.font=30+"pt 微软雅黑";
			text.color="red";
            text.length = 100;
            text.x = this.x+this.width/2-size*3/4/2;
            text.y = this.y-10;
            var action=new DelAction();
            text.action.push(action);
            texts.push(text);
        }
        this.click=function () {

        };
        var action=new ImgAction();
        this.action.push(action);
        action=new DelAction();
        this.action.push(action);
        //setTimeout(function() {text.type=1;},5000);
        //setTimeout(function() {clickObj.type=1;},5000);
    };
};
Sprite.prototype={
    render:function () {
        //this.img.width=this.width;
        //this.img.height=this.height;
        context.translate(this.x+this.width/2,this.y+this.height/2);
        context.rotate(this.angle * Math.PI / 180);
        context.drawImage(this.img,-this.width/2,-this.height/2,this.width,this.height);
        context.rotate(-this.angle * Math.PI / 180);
        context.translate(-this.x-this.width/2,-this.y-this.height/2)

    },
    update:function () {
        for (var key in this.action) {
            this.action[key].excute(this);
        }
        this.angle+=this.velocitangle;
        if(this.angle>=361)this.angle=0;
        this.time+=timeSystem.getTime();
        this.x+=this.velocityx*(timeSystem.getTime())/1000;
        this.y+=this.velocityy*(timeSystem.getTime())/1000;
        if(this.y>=bottom)this.type=1;
        if(this.animal.length>0) {
            if (this.time >= this.animal[this.curimg].time) {
                this.time=this.time-this.animal[this.curimg].time;
                this.curimg++;
                if (this.curimg == this.animal.length) this.curimg = 0;
                this.img = this.animal[this.curimg].img;
            }
        }
    }
};


var Text=function () {
    this.name="Text";
    this.naturalWidth=0;
    this.img=0;
    this.naturalHeight=0;
    this.x=0;
    this.y=0;
    this.z=0;
    this.font="10pt 微软雅黑";
	this.color="black";
    this.width=w;
    this.height=h;
    this.action=[];
    this.type=0;
    this.animal=Array();
    this.createPath = function(){
        context.beginPath();
        context.rect(this.x,this.y,this.width,this.height);
        context.closePath();
    };
    this.click = function(clickObj){

    };
};
Text.prototype={
    render:function () {
        context.font=this.font;
		context.fillStyle = this.color;
        context.fillText(this.text,this.x,this.y,this.length);
    },
    update:function () {
        for (var key in this.action) {
            this.action[key].excute(this);
        }
    }
};


var Back=function () {
    this.name="Sprite";
    this.naturalWidth=0;
    this.img=0;
    this.naturalHeight=0;
    this.x=0;
    this.y=0;
    this.z=0;
    this.width=w;
    this.height=h;
    this.velocityx=0;
    this.velocityy=0;
    this.type=0;
    this.animal=Array();
    this.createPath = function(){
        context.beginPath();
        context.rect(this.x,this.y,this.width,this.height);
        context.closePath();
    };
    this.click = function(){
        //this.animal=a1;
        this.type=1;
    };
};
Back.prototype={
    render:function () {
        //this.img.width=this.width;
        //this.img.height=this.height;
        //c.width=c.width;
        context.drawImage(this.img,0,0,this.naturalWidth,this.naturalHeight,this.x,this.y,this.width,this.height)
    },
    update: function () {
        this.time+=timeSystem.getTime();
        this.x+=this.velocityx*(timeSystem.getTime())/1000;
        this.y+=this.velocityy*(timeSystem.getTime())/1000;
        if(this.y>=h)this.type=1;
        if(this.animal.length>0) {
            if (this.time >= this.animal[this.curimg].time) {
                this.time=this.time-this.animal[this.curimg].time;
                this.curimg++;
                if (this.curimg == this.animal.length) this.curimg = 0;
                this.img = this.animal[this.curimg].img;
            }
        }
    }
};


var BackSprite=function () {
    this.name="BackSprite";
    this.naturalWidth=0;
    this.img=0;
    this.naturalHeight=0;
    this.x=0;
    this.y=0;
    this.z=0;
    this.width=w;
    this.height=h;
    this.velocityx=0;
    this.velocityy=0;
    this.type=0;
    this.angle=0;
    this.score = 0;
    this.velocitangle=0;
    this.animal=Array();
    this.createPath = function(){
        context.beginPath();
        context.rect(this.x,this.y,this.width,this.height);
        context.closePath();
    };
    this.click = function(clickObj){
    };
};
BackSprite.prototype={
    render:function () {
        //this.img.width=this.width;
        //this.img.height=this.height;
        context.translate(this.x+this.width/2,this.y+this.height/2);
        context.rotate(this.angle * Math.PI / 180);
        context.drawImage(this.img,-this.width/2,-this.height/2,this.width,this.height);
        context.rotate(-this.angle * Math.PI / 180);
        context.translate(-this.x-this.width/2,-this.y-this.height/2)

    },
    update:function () {
        this.angle+=this.velocitangle;
        if(this.angle>=361)this.angle=0;
        this.time+=timeSystem.getTime();
        this.x+=this.velocityx*(timeSystem.getTime())/1000;
        this.y+=this.velocityy*(timeSystem.getTime())/1000;
        if(this.y>=h)this.type=1;
        if(this.animal.length>0) {
            if (this.time >= this.animal[this.curimg].time) {
                this.time=this.time-this.animal[this.curimg].time;
                this.curimg++;
                if (this.curimg == this.animal.length) this.curimg = 0;
                this.img = this.animal[this.curimg].img;
            }
        }
    }
};


var BaseFactory = function (type) {
    switch (type) {
        case "Sprite":
            return new Sprite();
            break;
        case "bomb":
            var sprites=new Sprite();
            sprites.callimgsrc="../img/boom.png";
            var action=new DelAllAction();
            sprites.action.push(action);
            return sprites;
            break;
        case "BackSprite":
            return new BackSprite();
            break;
        case "Back":
            return new Back();
            break;
        case "Text":
            return new Text();
            break;
    }
    return new Base();
};


var TimeSystem=function () {
    this.lasttime = 0;
    this.now=0;
    this.time=0;
    this.starttime=0;
    this.timev=1;
	this.stop=false;
	this.stoptimes=0;
};
TimeSystem.prototype={
    start:function () {
		this.stop=false;
        this.time=0;
        this.starttime=new Date().getTime();
        this.lasttime=new Date().getTime();
    },
    getTimeStart:function () {
        this.now=new Date().getTime();
        return this.now-this.starttime-this.stoptimes;
    },
    getTime:function () {
        this.now=new Date().getTime();
		if(this.stop){
			return 0;
		}else{
			return (this.now-this.lasttime)*this.timev;
		}
    },
	stoptime:function () {
        this.stop=true;
    },
	restart:function () {
        this.stop=false;
    },
    update:function () {
		if(this.stop){
			this.now=new Date().getTime();
			this.stoptimes+=this.now-this.lasttime;
			console.log(this.stoptimes);
		}
        this.lasttime=new Date().getTime();
    },
    render:function () {
        for(var z=0;z<this.manager.length;z++)
        {
            if(this.manager[z].type==0||this.manager[z].type==2)
            {   //context.save();

                this.manager[z].render();
                // context.restore();
            }
        }
    }
};


var ImageManager=function () {
    this.Images=[];
};
ImageManager.prototype={
    getImage:function (src) {
        for (var key in this.Images) {
            if(this.Images[key].key==src){
                return this.Images[key].value;
            }
        }
        var img=new Image();
        var image=[];
        img.src=src;
        image.key=src;
        image.value=img;
        this.Images.push(image);
        return img;
    }
};


var SoundManager=function () {

    this.Sounds=[];
};
SoundManager.prototype={
	loadAudio:function (src){
		var img=new Audio(src);
        var sound=[];
        sound.key=src;
        sound.value=img;
        sound.type=0;
		this.Sounds.push(sound);
		
	},
    playSound:function (src,isback) {
		console.log(src);
        for (var key in this.Sounds) {
            if(this.Sounds[key].key==src&&this.Sounds[key].type==0){
                this.Sounds[key].type=1;
                if(isback!=null) {
                    this.Sounds[key].isback = isback;
                }
                this.Sounds[key].value.play();
                return;
            }
        }
        for (var key in this.Sounds) {
            if(this.Sounds[key].type==0){
                this.Sounds[key].value.src=src;
				this.Sounds[key].key=src;
                this.Sounds[key].type=1;
                if(isback==null) {
                    this.Sounds[key].isback = isback;
                }
                this.Sounds[key].value.play();
                return;
            }
        }
        var img=new Audio(src);
        var sound=[];
        sound.key=src;
        sound.value=img;
        sound.type=1;
        sound.value.play();
        if(isback!=null) {
            sound.isback = isback;
        }else{
            sound.isback = 0;
        }
        this.Sounds.push(sound);

    },update:function () {
        for (var key in this.Sounds) {
            if(this.Sounds[key].value.ended==true){
                this.Sounds[key].type=0;
                if(this.Sounds[key].isback==1){
                    this.playSound(this.Sounds[key].value.src,1);
                }
            }
        }
    },stop:function () {
        for (var key in this.Sounds) {
            this.Sounds[key].value.pause();
        }
    }

};


//动态效果行为
var ImgAction=function () {
    this.looptime=0.5*1000;//持续时间
    this.timeend=0;//开始时间

    this.zt=-1;
    this.time=10;//帧数
    this.times=60;//帧数
    this.oldwidth=0;
    this.oldheight=0;
    this.x=0;
    this.y=0;
    this.cx=0;
    this.cy=0;
    this.minwidth=1;
    this.minheight=1;
    this.midwidth=1;
    this.midheight=1;
};
ImgAction.prototype={
    excute:function (obj) {
        if(this.zt==-1) {
            this.oldwidth=obj.width;
            this.oldheight=obj.height;
            this.width=obj.width;
            this.height=obj.height;
            this.x=obj.x;
            this.y=obj.y;
            this.cx=this.x+this.width/2;
            this.cy=this.y+this.height/2;
            this.midwidth=this.oldwidth-this.oldwidth/7;
            this.midheight=this.oldheight-this.oldheight/7;
            obj.width=this.minwidth;
            obj.height=this.minheight;
            this.zt=0;
        }
        if(this.zt==0) {
            obj.width+=this.oldwidth/this.time;
            obj.height+=this.oldheight/this.time;
            if(obj.width>=this.oldwidth||obj.height>=this.oldheight){
                obj.width=this.oldwidth;
                obj.height=this.oldheight;
                this.zt=1;
            }
            obj.x=this.cx-obj.width/2;
            obj.y=this.cy-obj.height/2;
        }
        if(this.zt==1) {
            obj.width-=this.oldwidth/this.times;
            obj.height-=this.oldheight/this.times;
            if(obj.width<=this.midwidth||obj.height<=this.midheight){
                obj.width=this.midwidth;
                obj.height=this.midheight;
                this.zt=2;
            }
            obj.x=this.cx-obj.width/2;
            obj.y=this.cy-obj.height/2;
        }
        if(this.zt==2) {
            obj.width+=this.oldwidth/this.times;
            obj.height+=this.oldheight/this.times;
            if(obj.width>=this.oldwidth||obj.height>=this.oldheight){
                obj.width=this.oldwidth;
                obj.height=this.oldheight;
                this.zt=1;
            }
            obj.x=this.cx-obj.width/2;
            obj.y=this.cy-obj.height/2;
        }
    },
};

var DelAction=function () {
    this.looptime=0.3*1000;//持续时间
    this.timeend=0;//开始时间
    this.zt=-1;
};
DelAction.prototype={
    excute:function (obj) {
        if(this.zt==-1) {
            this.timeend += timeSystem.getTime();
            if (this.looptime <= this.timeend) {
                obj.type = 1;
                obj.typeboom = 1;
                this.zt = -99;
            }
        }
    },
};

var DelAllAction=function () {
    this.zt=-1;
};
DelAllAction.prototype={
    excute:function (obj) {
        if(this.zt==-1&&obj.typeboom==1) {
            for (var z = 0; z < spriteManager.manager.length; z++) {
                spriteManager.manager[z].img = imageManager.getImage(obj.callimgsrc);
                spriteManager.manager[z].velocityx = 0;
                spriteManager.manager[z].velocityy = 0;
                spriteManager.manager[z].angle = 0;
                spriteManager.manager[z].velocitangle = 0;
                spriteManager.manager[z].width = 70;
                spriteManager.manager[z].height = 70;
                var action=new ImgAction();
                spriteManager.manager[z].action.push(action);
                action=new DelAction();
                spriteManager.manager[z].action.push(action);

            }
            obj.typeboom=0;
            this.zt=99;
        }
    },
};