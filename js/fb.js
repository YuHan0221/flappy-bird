/**
 * Created by 余涵 on 2017/6/25 0025.
 */
/*
* fb是一个全局的变量，它是一个对象，内部有很多方法：
*   Bird：绘制鸟的构造函数
*   sky：绘制天空的构造函数
*   pipe：绘制管道的构造函数
* */
(function (w) {
    var FB={};
    /*
    * 为了在以上各种构造函数的实例里在所有照片都加载完成后进行绘制
    * 我们需要一个imageLoad方法：该方法的目的就是传入一个数组（参数一）
    * ['birds','land','sky','pipe1','pipe2']
    * 通过该方法可以生成一个对象{img,img,img,img,img}
    * 该对象里存放着对应的img实例，
    * 当图片的onload事件触发时，让计数器++
    * 最终当计数器值为参数一的长度值时
    * 触发该方法的另一个参数callback()
    * 该参数是在图片完全加载完成之后进行调用的
    * */
    FB.imageLoad= function (arr,callback) {
        var imgList={};
        //记录存放对象的实例个数
        var total=0;
        arr.forEach(function (item) {
            //每遍历一次数组都创建一次img
            var img=new Image();
            //注意这里因为是将该方法引到game文件里调用，同时将game文件里的init方法在index文件里调用
            //所以这里的src是相当于index文件的路径
            img.src='./imgs/'+item+'.png';
            imgList[item]=img;
            img.onload= function () {
                total++;
                if(total===arr.length){
                    //所有图片加载完成触发回调函数
                    callback(imgList);
                }
            }
        });
    };
    w.FB=FB;
})(window);