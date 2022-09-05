// 创建一个动画移动的通用函数
// var timer;
// 参数
// obj要执行动画的对象
// target执行动画的目标位置
// attr：要执行动画的样式 left top width height
// speed移动的速度（正数向右移动 负数向左移动）
// callback回调函数 这个函数将在动画执行完毕后调用
function move(obj, attr, target, speed, callback) {
    // 关闭上一个定时器 防止点击按钮多次速度会叠加 避免在同一个定时器开启多次
    clearInterval(obj.timer);
    // 获取元素目前的位置
    var current = parseInt(getStyle(obj, attr));
    // 判断速度的正负值
    // 从0向800移动 则speed为正
    // 从800向0移动 则speed为负
    if (current > target) {
        // 此时速度应为负值
        speed = -speed;
    }

    // 开启一个定时器执行效果
    // 向执行动画的对象中添加一个timer属性 用来保存他自己的定时器的标识，防止不同之间的互相影响 就为obj添加timer
    obj.timer = setInterval(function() {
        // 将字符串的合法数字 转化为number型数字 parseInt
        // 调用getStyle函数
        var oldValue = parseInt(getStyle(obj, attr));
        // alert(oldValue);
        // 在旧值上增加

        var newValue = oldValue + speed;
        // 判断是否等于大于800

        // 向左移动时  需要判断newValue是否小于target
        // 向右移动时 需要判断newValue是否大于target
        if (speed < 0 && newValue < target || speed > 0 && newValue > target) {
            newValue = target;

        }
        // 将新值设置给obj
        obj.style[attr] = newValue + 'px';

        // 当我们元素移动到800px时停止执行动画
        if (newValue == target) {
            clearInterval(obj.timer);

            // 动画执行完毕 调用回调函数
            callback && callback();
        }
    }, 20)
}




// 获取当前正在显示的样式
function getStyle(obj, name) {

    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[name];

    } else {
        return obj.currentStyle[name];
    }
};

// 定义一个函数向一个元素中添加指定的class属性值
// 参数:obj要添加class属性的元素
// cn 要添加class的值
function addClass(obj, cn) {
    // 判断obj里是否有cn
    if (!hasClass(obj, cn)) {

    }
    obj.className += '' + cn;
};
/* 判断 一个元素是否含有固定的class属性值
如果有该class，则范湖true 没有则返回false*/
function hasClass(obj, cn) {
    // 判断obj中有没有cn class
    // 创建一个正则表达式
    // var reg = /\bb2\b/;
    var reg = new RegExp('\\b' + cn + '\\b');
    return reg.test(obj.className);
};

// 删除一个元素中的指定class属性
function removeClass(obj, cn) {
    // 创建一个正则表达式
    var reg = new RegExp('\\b' + cn + '\\b');
    // 删除class
    obj.className = obj.className.replace(reg, '');
};
// 切换一个类 如果有就删除 如果没有就添加
function toggleClass(obj, cn) {
    // 判断obj中是否含有cn
    if (hasClass(obj, cn)) {
        removeClass(obj, cn);
    } else {
        // 没有则添加
        addClass(obj, cn);
    }
};