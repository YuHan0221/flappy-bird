/**
 * Created by 余涵 on 2017/6/25 0025.
 */
(function (fb) {
    function Bird(options) {
        this.ctx = options.ctx;
        this.img = options.img;
        this.x = 100;
        this.y = 100;
        this.v = 0;
        this.g = 0.0005;
        this.index = 0;
        this.maxSpeed = 0.5;
        this.maxAngle = Math.PI / 4;
    }

    //这个Bird的draw方法只是画一帧鸟
    //要想画连续的鸟，需要在gameinit方法里添加定时器，重复调用draw方法
    Bird.prototype.draw = function (deltaTime) {
        //保存之前的坐标系，在下一次画鸟的时候是正常的坐标系
        this.ctx.save();
        //将坐标系平移到鸟的中心
        this.ctx.translate(this.x + this.img.width / 3 / 2, this.y + this.img.height / 2);
        var h = this.v * deltaTime + this.g * deltaTime * deltaTime / 2;
        this.v += this.g * deltaTime;
        this.y += h;
        //当前角度/当前速度=最大角度/最大速度
        var currentAngle = this.maxAngle / this.maxSpeed * this.v;
        //如果当前角度大于等于最大角度，让当前角度置为最大角度
        if (currentAngle > this.maxAngle) {
            currentAngle = this.maxAngle;
        }
        this.ctx.rotate(currentAngle);
        //注意由于坐标系已经平移到小鸟的中心了，所以画鸟的时候应该将鸟按照平移之前的坐标系绘制
        //-this.img.width/6
        //-this.img.height/2
        this.ctx.drawImage(this.img, 52 * this.index, 0, 52, 45, -this.img.width/6, -this.img.height/2, 52, 45);
        //每次画完一帧鸟就让index++，来画下一帧
        this.index++;
        //同时index在0-2之间变化
        this.index = this.index % 3;
        this.ctx.restore();
    };
    fb.Bird = Bird;
})(FB);