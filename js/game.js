/**
 * Created by 余涵 on 2017/6/25 0025.
 */
/*
 * 通过game函数来控制整个页面的渲染，可以理解为入口函数
 * */
(function (fb) {
    function Game(options) {
        this.ctx = options.ctx;
        this.currentTime = new Date();
        this.lastTime = new Date();
        this.deltaTime = 0;
        this.images = ['birds', 'land', 'sky', 'pipe1', 'pipe2'];
        this.hero = null;
        this.list = [];
        this.isRunning = true;
        this.space=options.space;
        console.log(this.space);
    }

    Game.prototype.init = function () {
        //当图片完全加载之后，进行页面操作
        //需要调用fb.js里面的imageLoad方法了
        var that = this;
        fb.imageLoad(this.images, function (imageList) {

            //实例化背景蓝天
            //画两片蓝天，一片是假的
            for (var j = 0; j < 2; j++) {
                var sky = new fb.Sky({
                    ctx: that.ctx,
                    img: imageList['sky'],
                    x: that.ctx.canvas.width * j,
                    y: 0
                });
                that.list.push(sky);
            }
            //实例化陆地
            //注意要画4个陆地（多出一张假的）
            for (var i = 0; i < 4; i++) {
                var land = new fb.Land({
                    ctx: that.ctx,
                    img: imageList['land'],
                    x: imageList['land'].width * i,
                    y: that.ctx.canvas.height - imageList['land'].height
                });
                that.list.push(land);
            }
            //实例化上管道
            //要显示五组管子，有一组是假的
            for (var a = 0; a < 6; a++) {
                var pipe = new fb.Pipe({
                    ctx: that.ctx,
                    topImg: imageList['pipe2'],
                    bottomImg: imageList['pipe1'],
                    x: imageList['pipe2'].width * 3 * a,
                    space:that.space
                });
                that.list.push(pipe);
            }
            //实例化小鸟
            var bird = new fb.Bird({
                img: imageList['birds'],
                ctx: that.ctx
            });
            that.hero = bird;
            that.ctx.canvas.onclick = function () {
                that.hero.v = -0.3;
            };
            //进行背景以及小鸟绘制
            function render() {
                //首先清空画布
                that.ctx.clearRect(0, 0, that.ctx.canvas.width, that.ctx.canvas.height);
                //首先计算两帧之间的时间差
                that.currentTime = new Date();
                that.deltaTime = that.currentTime - that.lastTime;
                that.lastTime = that.currentTime;
                //先画蓝天，再画陆地，再画小鸟
                //所以push的时候，先push的是蓝天，再push陆地
                that.ctx.beginPath();
                that.list.forEach(function (item) {
                    item.draw();
                });
                //在绘制管道之后判断小鸟是否在管道的路径上

                //判断小鸟的临界值
                //如果小鸟的头落地也让标志位为false
                if (that.hero.y >= that.ctx.canvas.height - imageList['land'].height - that.hero.img.height) {
                    that.isRunning = false;
                }
                //如果小鸟的this.x+鸟图宽度的三分之一和this.y在管道的路径上，那么让标志位为false
                if (that.ctx.isPointInPath(that.hero.x + that.hero.img.width / 3, that.hero.y)) {
                    that.isRunning = false;
                }

                //然后进行小鸟的绘制，在此之前要先进行小鸟的实例化
                bird.draw(that.deltaTime);
                //设置一个标志位如果为true，则执行动画
                if (that.isRunning) {
                    requestAnimationFrame(render);
                }
            }

            render();
        })
    };
    fb.Game = Game;
})(FB);