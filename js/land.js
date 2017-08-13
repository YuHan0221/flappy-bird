/**
 * Created by 余涵 on 2017/6/27 0027.
 */
(function(fb){
    function Land(options){
        this.img=options.img;
        this.ctx=options.ctx;
        this.x=options.x;
        this.y=options.y;
        this.speed= -3;
    }
    Land.prototype.draw= function () {
        this.x+=this.speed;
        if(this.x<= -this.img.width){
            this.x += this.img.width*4;
        }
        this.ctx.drawImage(this.img,this.x,this.y);
    };
    fb.Land=Land;
})(FB);