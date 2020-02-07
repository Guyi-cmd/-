$(function () {
//    手势切换轮播图
//    1、自动轮播且无缝
//    2、点随着变化
//    3、完成手势切换
    var $banner=$('.sn_banner');
    var width=$banner.width();
    var $imageBox=$banner.find('ul:first');
    var $pointBox=$banner.find('ul:last');
    var $points=$pointBox.find('li');
    var animationFun=function () {
        $imageBox.animate({transform:'translateX('+(-index*width)+'px)'},200,function () {
            /*动画执行完成的回调*/
            if(index>=9){
                index=1;
                /*瞬间*/
                $imageBox.css({transform:'translateX('+(-index*width)+'px)'});
            }else if(index<=0){
                /*瞬间*/
                index=8;
                $imageBox.css({transform:'translateX('+(-index*width)+'px)'});
            }
            /*点随着变化，1-8*/
            $points.removeClass('now').eq(index-1).addClass('now');
        });
    }

    //    1、自动轮播且无缝
    var index=1;
    var timer=setInterval(function () {
        index++;
        /*动画*/
        animationFun();
    },1000);
    /*左滑*/
    $banner.on('swpieLeft',function () {
        index++;
        animationFun();
    });
    /*右滑*/
    $banner.on('swipeRight',function () {
        index--;
        animationFun();
    });
});