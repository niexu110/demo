/**
 * Created by Administrator on 2017/9/23.
 */
var canvas=document.getElementById("canvas"),height=650, width=480;
canvas.width=width;canvas.height=height;
$(function(){
     var score=0,
         lives=3,
         ctx=canvas.getContext("2d");
       //游戏设置
     const PHASE_download=1; //图片下载阶段
     const PHASE_ready=2;  //就绪阶段
     const PHASE_staring=3;  //启动阶段
     const PHASE_play=4;  //开始阶段
     const PHASE_pause=5;  //暂停阶段
     const PHASE_over=6;  //结束阶段
    var current=PHASE_download;//当前状态
    /*图片加载组*/
    var list=[
        ["background"], ["bullet"],["start"],
        ["game_loading1","game_loading2","game_loading3","game_loading4"],
        ["enemy1","enemy1_down1","enemy1_down2","enemy1_down3","enemy1_down4"],
        ["enemy2","enemy2_down1","enemy2_down2","enemy2_down3","enemy2_down4"],
        ["hero1","hero2","hero_blowup_n1","hero_blowup_n2","hero_blowup_n3","hero_blowup_n4"],
        ["enemy3_hit","enemy3_n1","enemy3_n2","enemy3_down1","enemy3_down2","enemy3_down3","enemy3_down4","enemy3_down5","enemy3_down6"],
        ["game_pause_nor"]
    ];
    /**********************************
     * 第一阶段
     *******************************/
    var bar=0;//进度条
    ctx.lineWidth=10;
    ctx.strokeStyle="#FA6F7C";
    ctx.fillStyle="#FA6F7C";
    ctx.font="60px SimHei";
   function drawBar(){//绘制进度条
     ctx.beginPath();
     ctx.clearRect(0,0,canvas.width,canvas.height);//清除画布
     var starAngle=-90*Math.PI/180,endAngle=(-90+360*bar/100)*Math.PI/180;
     ctx.arc(canvas.width/2,canvas.height/2,80,starAngle,endAngle);
     ctx.stroke();//对路径进行描边
     var txt=bar+"%",txtWidth=ctx.measureText(txt).width;
      ctx.fillText(txt,canvas.width/2-txtWidth/2,canvas.height/2+20);
      if(bar>=100){
          current=PHASE_ready;
          sky=new skyImg(imgBackground[0]);
          //启动动画引擎
          starting();
      }
   }
   //加载图片
   var imgBackground=addImg(list[0],4),imgBullet=addImg(list[1],3),imgEnemy1=addImg(list[4],3),imgEnemy2=addImg(list[5],3),
       imgEnemy3=addImg(list[7],3),imgHero=addImg(list[6],3),imgLoading=addImg(list[3],3),imgstart=addImg(list[2],3),
       imgPause=addImg(list[8],3);
   function addImg(list,s){//加载图片
      var arr=[],path="image/";
      for(var i=0;i<list.length;i++){
        arr.push(new Image());
        arr[i].src=path+list[i]+".png";
        arr[i].onload=function(){
            bar+=s;
            drawBar();
        }
    }
    return arr;
   }
   /**************
    * 阶段构造天空
    * ******************/
   var sky= null;
   function skyImg(img){
       this.x=0;
       this.y=0;
       this.x2=0;
       this.y2=-img.height;
       //绘制上下天空
       this.draw=function(){
         ctx.drawImage(img,this.x,this.y);
         ctx.drawImage(img,this.x2,this.y2);
       };
       this.move=function(){
        this.y++;this.y2++;
        if(this.y>=height){//第一幅移除
            this.y=this.y2-img.height;
        }
        if(this.y2>=height){//第二幅移除
           this.y2=this.y-img.height;
        }
       }
   }
   //绘制Logo
     function drawLogo(){
        ctx.drawImage(imgstart[0],canvas.width/2-imgstart[0].width/2,canvas.height/2-imgstart[0].height/2);
     };
   //为画布添加点击事件开始游戏
   canvas.addEventListener("click",function(){
       if(current===PHASE_ready){
           current=PHASE_staring;
           //底部加载进入游戏飞机
           runingPlane=new runingFlay(imgLoading)
       }
   },false);
   /************************
    * 创建飞行小飞机
    * **********/
   var runingPlane=null;
   function runingFlay(imgPlane){
         this.x=0;
         this.y=canvas.height-imgPlane[0].height;
         this.index=0;//当前要绘制的图片的下标;
         this.draw=function(){
             ctx.drawImage(imgPlane[this.index],this.x,this.y)
         };
         this.moveContent=0;//move()被调用的次数；
         this.move=function(){
             this.moveContent++;
             if(this.moveContent%6===0){
                 this.index++;//每过42*6ms才会换下一张;
                 if(this.index===imgPlane.length){
                     //进入下一阶段,创建英雄，子弹列表，敌人列表
                     current=PHASE_play;
                     hero=new heroPeo(imgHero);
                     bulletList=new bulletLists();
                     enemyList=new planeList();
                 }
             }
         }
   };
    /******
     * 创建英雄和子弹列表等******/
    var hero=null,bulletList=null;
      function heroPeo(heroImg){
          this.width=heroImg[0].width;
          this.height=heroImg[0].height;
          this.x=canvas.width/2-heroImg[0].width/2;
          this.y=canvas.height/2-heroImg[0].height/2;
          this.index=0;//绘制哪一张
          this.wreck=false;//是否被摧毁
          this.draw=function(){
              ctx.drawImage(heroImg[this.index],this.x,this.y)
          };
          this.moveContent=0;//move调用次数
          this.move=function(){
              if(!this.wreck){
                if(this.index===0)this.index=1;
                else if(this.index===1)this.index=0;
              }
              this.moveContent++;
              if(this.moveContent%5===0){
                 var bullet=new bullets(imgBullet[0]);
                  bulletList.add(bullet)
              }
              if(this.wreck&&this.moveContent%2===0){
                  if(this.index==0||this.index==1){
                      this.index=2;
                }else{
                  this.index++;
                  if(this.index==heroImg.length-1){
                      lives--;//命数-1；
                      if(lives>0){
                          this.x=width/2-this.width/2;
                          this.y=height-this.height;
                          this.index=0;//重新绘制
                          this.wreck=false;//是否被摧毁
                      }else{
                          current=PHASE_over;
                      }
                  }
                }
              }
          };
       //画布添加手表移入时间
          canvas.addEventListener("mousemove",function(e){
              var x=e.offsetX-heroImg[0].width/2,y=e.offsetY-heroImg[0].height/2;
              hero.x=x;hero.y=y;
          },false)
      }
      function bullets(bulletImg){
           this.width=bulletImg.width;
           this.height=bulletImg.height;
           this.x=hero.x+(imgHero[0].width/2-bulletImg.width/2);
           this.y=hero.y-bulletImg.height;
           this.removable=false;//是否可以移除掉子弹
           this.draw=function(){
            ctx.drawImage(bulletImg,this.x,this.y)
           }
           this.move=function(){
               this.y-=10;//飞行速度
               if(this.y<=-bulletImg.height){
                    this.removable=true;//移除子弹
               }
           }
      }
      //子弹夹
    function bulletLists(){
        //保存当前子弹数
        this.list=[];
        this.add=function(bul){
            this.list.push(bul)
        }
        this.draw=function(){
            for(var i=0;i<this.list.length;i++){
               this.list[i].draw();//绘制每一个子弹
            }
        }
        this.move=function(){
          for(var i=0;i<this.list.length;i++){
              this.list[i].move();
              if(this.list[i].removable){
                  this.list.splice(i,1);
                  i--;//小心这里
              }
          }
        }
    }
    /*********
     *敌机列表
     * **************/
    var enemyList=null;
    function enemy1(enemy){
        this.width=enemy[0].width;
        this.height=enemy[0].height;
        this.x=Math.random()*(width-this.width);
        this.y=-this.height;
        this.index=0;
        this.blood=1;//血量
        this.removable=false;//是否能删除
        this.score=10;
        this.wreck=false;//是否已摧毁
        this.draw=function(){
          ctx.drawImage(enemy[this.index],this.x,this.y)
        };
        this.moveContent=0;
        this.move=function(){
          this.moveContent++;
          this.y+=8;//飞行速度
            if(this.y>=height){
                this.removable=true;
            }
            if(this.wreck&&this.moveContent%2===0){
                this.index++;
              if(this.index===enemy.length-1){
                  this.removable=true;
              }
            }
        }
    }
    function enemy2(enemy){
        this.width=enemy[0].width;
        this.height=enemy[0].height;
        this.x=Math.random()*(width-this.width);
        this.y=-this.height;
        this.index=0;
        this.blood=3;//血量
        this.removable=false;//是否能删除
        this.score=20;
        this.wreck=false;//是否已摧毁
        this.draw=function(){
            ctx.drawImage(enemy[this.index],this.x,this.y)
        };
        this.moveContent=0;
        this.move=function(){
            this.moveContent++;
            this.y+=5;//飞行速度
            if(this.y>=height){
                this.removable=true;
            }
            if(this.wreck&&this.moveContent%2===0){
                this.index++;
                if(this.index===enemy.length-1){
                    this.removable=true;
                }
            }
        }
    }
    function enemy3(enemy){
        this.width=enemy[0].width;
        this.height=enemy[0].height;
        this.x=Math.random()*(width-this.width);
        this.y=-this.height;
        this.index=0;
        this.blood=6;//血量
        this.removable=false;//是否能删除
        this.score=30;
        this.wreck=false;//是否已摧毁
        this.draw=function(){
            ctx.drawImage(enemy[this.index],this.x,this.y);
        };
        this.moveContent=0;
        this.move=function(){
            this.moveContent++;
            this.y+=3;//飞行速度
            if(this.y>=height){
                this.removable=true;
            }
            if(this.moveContent%2===0){
                if(!this.wreck){
                    if(this.index===0)this.index=1
                    else if(this.index===1)this.index=0;
                }else{
                    if(this.index==0||this.index==1){this.index=3}
                    else{this.index++;}
                    if(this.index===enemy.length-1){this.removable=true;}
                }
            }
        }
    }
    function planeList(){
        this.list = []; //保存当前所有的敌机
        this.add = function(enemy){  //添加新敌机
            this.list.push(enemy);
        }
        this.draw = function(){
            for(var i=0; i<this.list.length; i++){
                this.list[i].draw();
            }
        }
        this.move = function(){
            /****试着随机生成敌机****/
            var num = Math.floor(Math.random()*300);
            if(num<6){  //创建小号敌机  6
                this.add( new enemy1(imgEnemy1) );
            }else if(num<9){  //创建中号敌机  3
                this.add( new enemy2(imgEnemy2) );
            }else if(num<20){   //创建大号敌机  1
                this.add( new enemy3(imgEnemy3) );
            }
            /************************/

            /****敌方飞机与我方子弹碰撞检验*****/
            for(var i=0; i<this.list.length; i++){
                var enemy = this.list[i];  //一个敌机
                for(var j=0; j<bulletList.list.length;j++){
                    var bullet = bulletList.list[j]; //一个子弹
                    if(
                        enemy.x+enemy.width>=bullet.x
                        &&
                        bullet.x+bullet.width>=enemy.x
                        &&
                        enemy.y+enemy.height>=bullet.y
                        &&
                        bullet.y+bullet.height>=enemy.y
                    ){
                        bullet.removable = true; //子弹碰撞后消失
                        enemy.blood--; //血格-1
                        if(enemy.blood<=0){enemy.wreck = true;} //开始启动撞毁程序
                        score += enemy.score; //给英雄加分
                    }
                }
            }
            /************************************/

            /****敌方飞机与我方英雄碰撞检验*****/
            for(var i=0; i<this.list.length; i++){
                var enemy = this.list[i];
                if(
                    enemy.x+enemy.width >= hero.x
                    &&
                    hero.x+hero.width >= enemy.x
                    &&
                    enemy.y+enemy.height >= hero.y
                    &&
                    hero.y+hero.height >= enemy.y
                ){
                    //敌机血格-1
                    enemy.blood--;
                    if(enemy.blood<=0)enemy.wreck = true;
                    //英雄坠毁
                    hero.wreck = true;
                }
            }
            /************************************/

            ////移动每一个敌机//////////
            for(var i=0; i<this.list.length; i++){
                var e = this.list[i];
                e.move(); //移动敌机
                if(e.removable){  //当前敌机可被删除了
                    this.list.splice(i, 1);
                    i--;
                }
            }
        }
    }
   //绘制分数和命数
    function drawStart(){
       //绘制分数
         ctx.font="20px SimHei";
         ctx.fillStyle="#5793dd";
         var scores="总分:"+score;
         ctx.fillText(scores,5,25);
         //绘制命数
         var live="命数:"+lives;
         var w=ctx.measureText(live).width;
         ctx.fillText(live,canvas.width-w-5,25);
    }
    canvas.addEventListener("mouseout",function(){
        if(current===PHASE_play){
            current=PHASE_pause;
        }
    },false)
    canvas.addEventListener("mouseover",function(){
        if(current===PHASE_pause){
            current=PHASE_play;
        }
    },false);
    function pause(){
        ctx.drawImage(imgPause[0],canvas.width/2-imgPause[0].width/2,canvas.height/2-imgPause[0].height/2)
    };
    function gameOver() {
          ctx.font="90px SimHei";
          ctx.fillStyle="#666";
          var txt="GAME OVER";
          var w=ctx.measureText(txt).width;
          ctx.fillText(txt,canvas.width/2-w/2,canvas.height/2);
    }
    function Countdown() {
         ctx.font="60px SimHei";
         ctx.fillStyle="#e4393c";
         var txt="再来一盘";
         var w=ctx.measureText(txt).width;
         ctx.fillText(txt,canvas.width/2-w/2,canvas.height-100);
         canvas.addEventListener("click",function(){
             if(current===PHASE_over){
                 current=PHASE_staring;
                 runingPlane=new runingFlay(imgLoading);
                 score=0;lives=3;
             }
         },false)
    }
   //定义主动引擎
   function starting(){
        setInterval(function(){
            sky.draw(); //绘制天空
            sky.move(); //移动天空
            switch (current){
                case PHASE_ready:
                    drawLogo();
                    break;
                case  PHASE_staring:
                    runingPlane.draw();
                    runingPlane.move();
                    break;
                case PHASE_play:
                    hero.draw();
                    hero.move();
                    bulletList.draw();
                    bulletList.move();
                    enemyList.draw();
                    enemyList.move();
                    drawStart();
                    break;
                case PHASE_pause:
                    pause();
                    drawStart();
                    break;
                case PHASE_over:
                    gameOver();
                    drawStart();
                    Countdown();
                    break;
            }
        },42)
   }
});
