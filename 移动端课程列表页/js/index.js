/*
* @Author: sakurabei
* @Date:   2019-03-27 20:43:25
* @Last Modified by:   sakurabei
* @Last Modified time: 2019-03-27 21:44:09
*/
// 控制宽度永远在保持在640px;
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 640) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    recalc();
})(document, window);

var innerGroup = $(".innerwrapper");
var leftArrow = $(".left-arrow");
var rightArrow = $(".right-arrow");
var spanGroup = $(".pagination span");
var imgWidth = $(".innerwrapper img:first-child").eq(0).width();
var _index = 0;
var timer = null;
// 点击切换
spanGroup.on("click", function() {
    //导航切换
    _index = spanGroup.index($(this));
    selectPic(_index);

})
function selectPic(num) {
    // 重置操作
    clearInterval(timer);
    //让我们点击的小圆点背景色变白，其余小圆点，没有背景色
    $(".pagination span").eq(num).addClass("active").siblings().removeClass("active");
    //自动播放，小圆点切换至最后的时候,再次切换的时候呢,让第一个小圆点变白,周而复始
    if (num % 4 == 0) {
        $(".pagination span").eq(0).addClass("active").siblings().removeClass("active");
    }
    $(".inner").stop().animate({
        left: -num * imgWidth,
    }, 1000, function() {
        //点击切换图片效果结束以后3秒,要开始自动播放啦
        timer = setInterval(go, 3000);
        //自动播放检查是否到最后一张
        if (_index == innerGroup.length - 1) {
            //最后一张图片的时候,让_index = 0
            _index %= 4;
            // 从最后一张直接瞬间换成第一张图片
            $(".inner").css("left", "0px");
        }
    })
}
// 自动切换
function autoGo() {
    //自动行走
    timer = setInterval(go, 3000);
}
//调用自动播放
autoGo();

function go() {
    //计时器的函数
    _index++;
    selectPic(_index);
}

