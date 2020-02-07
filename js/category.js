window.onload=function () {
    /*区域滚动效果  条件：子容器大于父容器*/
    /*条件：一个容器装着一个容器html结构*/
    /*找到最大容器*/
    new IScroll(document.querySelector('.jd_cateLeft'),{
        scrollX:false,
        scrollY:true
    });
    new IScroll(document.querySelector('.jd_cateRight'),{
        scrollX:false,
        scrollY:true
    });
}