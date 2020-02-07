window.onload=function () {
    /*1、顶部搜索*/
        search();
    /*2、轮播图*/
        banner();
    /*3、倒计时*/
        dowmTime();

};

var search=function () {
    /*1、默认固定顶部透明背景*/
    var searchBox=document.querySelector('.jd_search_box');
    var banner=document.querySelector('.jd_banner');
    var Height=banner.offsetHeight;
    /*监听页面滚动事件*/
    window.onscroll=function () {
        var scrollTop=document.body.scrollTop;
        // console.log(scrollTop);
        /*设置默认透明度*/
        var opacity=0;
        if (scrollTop<Height){
            /*2、当页面滚动的时候---随着页面卷曲的高度变大，透明度变大*/
            opacity=scrollTop/Height*0.85;
        }else {
            /*3、当页面滚动的时候---超过某一高度的时候透明度不变*/
            opacity=0.85;
        }
        searchBox.style.background='rgba(201,31,35,'+opacity+')';
    }
};

var banner=function () {
    /*1、自动轮播且无缝   定时器、过渡*/
    /*2、点要随着图片的轮播而改变 根据索引切换*/
    /*3、滑动效果    touch事件*/
    /*4、滑动结束的时候   如果滑动的距离不超过屏幕的1/3，则吸附  过渡*/
    /*5、滑动结束的时候   如果滑动的距离不超过屏幕的1/3，则滑到下一张（上一张）  根据滑动的方向、过渡*/
    /*轮播图*/
    var banner=document.querySelector('.jd_banner');
    /*屏幕宽度*/
    var width=banner.offsetWidth;
    /*图片容器*/
    var imgBox=banner.querySelector('ul:first-child');

    /*点容器*/
    var pointBox=banner.querySelector('ul:last-child');
    /*找到所有的点*/
    var points=pointBox.querySelectorAll('li');

    var addTransition=function () {
        imgBox.style.transition='all 0.2s';
        imgBox.style.webkitTransition='all 0.2s';
    }
    var removeTransition=function () {
        imgBox.style.transition='none';
        imgBox.style.webkitTransition='none';
    }
    var setTranslateX=function (translateX) {
        imgBox.style.transform='translateX('+translateX+'px)';
        imgBox.style.webkitTransform='translateX('+translateX+'px)';

    }

    /*程序的核心*/
    var index=1;
    var timer=setInterval(function () {
        index++;
        /*加过渡*/
        addTransition();
        /*做位移*/
        setTranslateX(-index*width)

    },1000);
    /*需要等最后一张动画结束后判断，是否瞬间定位第一张*/
    imgBox.addEventListener('transitionend',function () {
        if (index>=9){
            index=1;
            /*瞬间定位*/
            /*清过渡*/
            removeTransition();
            /*做位移*/
            setTranslateX(-index*width);

        }
        /*滑动的时候也要无缝*/
        else if (index<=0){
            index=8;
            /*瞬间定位*/
            /*清过渡*/
            removeTransition();
            /*做位移*/
            setTranslateX(-index*width);


        }
        /*根据索引设置点*/
        /*此时此刻 index的取值范围1-8（0==8，1==9）*/
        /*点索引 index-1*/
        setPoint();
    });
    var setPoint=function () {
        /*index 1-8*/
        /*清除样式*/
        for (var i=0;i<points.length;i++){
            var obj=points[i];
            obj.classList.remove('now');
        }
        /*添加样式*/
        points[index-1].classList.add('now');

    }


    /*绑定事件*/
    var startX=0;
    var distanceX=0;
    var isMove=false;
    imgBox.addEventListener('touchstart',function (e) {
        /* 清除定时器*/
        clearInterval(timer);
        /*记录起始位置的x坐标*/
        startX=e.touches[0].clientX;

    });
    imgBox.addEventListener('touchmove',function (e) {
        /*记录滑动过程中的x坐标*/
        var moveX=e.touches[0].clientX;
        /*计算位移，有正负方向*/
        distanceX=moveX-startX;
        /*计算目标元素的位移，不用管正负*/
        /*元素将要的定位=当前定位+手指移动的距离*/
        var translateX=-index*width+distanceX;
        /*滑动----元素随着手指的滑动做位置的改变*/
        /*清除过渡*/
        removeTransition();
        setTranslateX(translateX);
        isMove=true;
    });
    imgBox.addEventListener('touchend',function (e) {
        /*4、5、实现*/
        /*要使用移动的距离*/
        if (isMove){
            if(Math.abs(distanceX)<width/3){
                /*吸附*/
                addTransition();
                setTranslateX(-index*width);
            }else {
                /*切换*/
                /*右滑动  上一张*/
                if(distanceX>0){
                    index--
                }else {
                    /*左滑动  下一张*/
                    index++
                }
                /*根据index去做动画移动*/
                addTransition();
                setTranslateX(-index*width);
            }
        }

        /*最好做一次参数的重置*/
        startX=0;
        distanceX=0;
        isMove=false;
        /*加上定时器*/
        clearInterval(timer);
        timer=setInterval(function () {
            index++;
            /*加过渡*/
            addTransition();
            /*做位移*/
            setTranslateX(-index*width)

        },1000);
    });

}
/*倒计时*/
var dowmTime=function () {
    /*倒计时的时间*/
    var time=2*60*60;
    /*时间盒子*/
    var spans=document.querySelector('.time').querySelectorAll('span');
    /*每一秒更新显示时间*/
    var timer=setInterval(function () {
        time--;
        /*转换时间*/
        var h=Math.floor(time/3600);
        var m=Math.floor(time%3600/60);
        var s=time%60;
        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML=h%10;
        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML=m%10;

        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=s%10;
        if (time<0){
            clearInterval(timer);
        }

    },1000);

};