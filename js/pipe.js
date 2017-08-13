/**
 * Created by 余涵 on 2017/6/27 0027.
 */
(function (fb) {
    function Pipe(options){
        this.ctx=options.ctx;
        this.topImg=options.topImg;
        this.bottomImg=options.bottomImg;
        this.x=options.x+400;
        this.y=options.y;
        this.speed=-3;
        this.space=options.space;
        this.top=0;
        this.bottom=0;
        this.initHeight();

    }
    Pipe.prototype.draw= function () {
        this.x += this.speed;
        if(this.x <= - this.topImg.width*3){
            this.x += this.topImg.width * 3 * 6;
        }
        this.ctx.drawImage(this.topImg,this.x,this.top);
        this.ctx.drawImage(this.bottomImg,this.x,this.bottom);
        this.strokePath();
    };
    //初始化管子的高度
    Pipe.prototype.initHeight= function () {
        this.top= -(Math.random() * 80 + 200);
        this.bottom= this.topImg.height + this.top + this.space;
    };
    //管子描路径
    Pipe.prototype.strokePath= function () {
        this.ctx.rect(this.x,this.top,this.topImg.width,this.topImg.height);
        this.ctx.rect(this.x,this.bottom,this.bottomImg.width,this.bottomImg.height);
    };
    fb.Pipe=Pipe;
})(FB);