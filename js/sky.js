/**
 * Created by 余涵 on 2017/6/25 0025.
 */
(function (fb) {
    function Sky(options) {
        this.ctx = options.ctx;
        this.img = options.img;
        this.x = options.x;
        this.y = options.y;
        this.speed = -3;
    }

    Sky.prototype.draw = function () {
        this.x += this.speed;
        if (this.x <= -this.img.width) {
            this.x += this.img.width * 2;
        }
        this.ctx.drawImage(this.img, this.x, this.y);
    };
    fb.Sky = Sky;
})(FB);