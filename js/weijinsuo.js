$(function () {
    /*动态轮播图*/
    banner();
    //移动端页签
    initMoblieTab();
//    初始化工具提示
    $('[data-toggle="tooltip"]').tooltip();

});
var banner=function () {
    /*1.获取轮播图数据    ajax */
    /*2.根据数据动态渲染  根据当前设备  屏幕宽度判断 */
    /*2.1 准备数据*/
    /*2.2 把数据转换成html格式的字符串 （动态创建元素，字符串拼接，模版引擎【artTemplate】*/
    /*2.3 把字符渲染页面当中*/
    /*3.测试功能 页面尺寸发生改变重新渲染*/
    /*4.移动端手势切换  touch*/

    /*ui框架：bootstrap,妹子UI,jqueryUI,easyUI,jqueryMobile,mui,framework7*/
    /*关于移动端的UI框架：bootstrap,jqueryMobile,mui,framework7*/
    /*模板引擎：artTemplate,handlebars,mustache,baiduTemplate,velocity,underscore*/

    /*做数据缓存*/
    /*1.获取轮播图数据*/
    // $.ajax({
    //     type:'get',
    //     url:'js/data.json',
    /*强制转换后台返回的数据为json对象*/
    /*强制转换不成功程序报错，不会执行success,执行error回调*/
    //     dataType:'json',
    //     data:'',
    //     success:function (data) {
    //         // console.log(data);
    /*2.根据数据动态渲染  根据当前设备  屏幕宽度判断 */
    //         var isMobile=$(window).width()<768 ? true : false;
    //         // console.log(isMobile);
    /*2.1 准备数据*/
    /*2.2 把数据转换成html格式的字符串*/
    /*使用模版引擎：那些html静态内容需要编程动态的*/
    /*发现：点容器  图片容器  新建模版*/
    /*开始使用*/
    /*<% console.log(list); %> 模版引擎内不可使用外部变量 */
    //         //template必须使用对象，但是返回的data是arr数组，所以可以自己构造一个自定义对象。
    //         var pointHtml=template('pointTemplate',{list:data});
    //         console.log(pointHtml);
    //         var imageHtml= template('imageTemplate',{list: data,isM:isMobile});
    //         console.log(imageHtml);
    /*2.3 把字符渲染页面当中*/
    //         $('.carousel-indicators').html(pointHtml);
    //         $('.carousel-inner').html(imageHtml);
    //     }
    // });
    var getData=function (callback) {
        /*缓存了数据*/
        if (window.data){
           callback&&callback(window.data);
        }else {
            /*1.获取轮播图数据*/
            $.ajax({
                type:'get',
                url:'js/data.json',
                /*强制转换后台返回的数据为json对象*/
                /*强制转换不成功程序报错，不会执行success,执行error回调*/
                dataType:'json',
                data:'',
                success:function (data) {
                    //相当于定义了一个全局变量data，把第一次数据请求成功的data缓存下来
                    window.data = data;
                    callback&&callback(window.data);
                }
            });
        }

    }
   var render=function () {
        getData(function (data) {
            // console.log(data);
            /*2.根据数据动态渲染  根据当前设备  屏幕宽度判断 */
            var isMobile=$(window).width()<768 ? true : false;
            // console.log(isMobile);
            //template必须使用对象，但是返回的data是arr数组，所以可以自己构造一个自定义对象。
            /*2.1 准备数据*/
            /*2.2 把数据转换成html格式的字符串*/
            /*使用模版引擎：那些html静态内容需要编程动态的*/
            /*发现：点容器  图片容器  新建模版*/
            /*开始使用*/
            /*<% console.log(list); %> 模版引擎内不可使用外部变量 */
            var pointHtml=template('pointTemplate',{list:data});
            console.log(pointHtml);
            var imageHtml= template('imageTemplate',{list: data,isM:isMobile});
            console.log(imageHtml);
            /*2.3 把字符渲染页面当中*/
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);

        });

   }
    /*3.测试功能 resize:页面尺寸发生改变事件*/
   // render();
   $(window).on('resize',function () {
       render();
       /*通过js主动触发某个事件*/
   }).trigger('resize');

//   移动端手势切换
    var startX=0;
    var distanceX=0;
    var isMove=false;
    /*originalEvent 代表js原生事件*/
    $('.wjs_banner').on('touchstart',function (e) {
        startX=e.originalEvent.touches[0].clientX;

    }).on('touchmove',function (e) {
        var moveX=e.originalEvent.touches[0].clientX;
        distanceX=moveX-startX;
        isMove=true;

    }).on('touchend',function (e) {
        /*距离足够50px 一定要滑动过*/
        if (isMove&&Math.abs(distanceX)>50){
            /*手势*/
            /*左滑手势*/
            if (distanceX<0){
                console.log('next');
                $('.carousel').carousel('next');
            }
            /*右滑手势*/
            else {
                $('.carousel').carousel('prev');
                console.log('prev');
            }

        }
        startX=0;
        distanceX=0;
        isMove=false;
    });

    };
var initMoblieTab=function () {
//    1、解决换行问题
    var $navTabs=$('.wjs_product .nav-tabs ');
    var width=0;
    $navTabs.find('li').each(function (i,item) {
        var $currLi=$(this);//$(item);
        var liWidth=$currLi.outerWidth(true);
        width+=liWidth;
    });
    console.log(width);
    $navTabs.width(width);
//    修改结构使之区域滑动的结构
//    加一个父容器给.nav-tabs
//    3、自己添加滑动效果或使用iscroll

        /*区域滚动效果  条件：子容器大于父容器*/
        /*条件：一个容器装着一个容器html结构*/
        /*找到最大容器，拿到dom对象*/

        new IScroll($('.nav-tabs-parent')[0],{
            scrollX:true,
            scrollY:false,
            click:true
        });


}