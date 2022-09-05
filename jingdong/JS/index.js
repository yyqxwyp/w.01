// // 获取元素节点
window.onload = function() {

    var header = document.querySelector('.header')
        // console.log(header);
    var ico = document.querySelector('.iconfont')
    ico.onclick = function() {
        header.style.display = 'none';
    }
    let hotWord = document.querySelector('#hot-words');
    // console.log(hotWord);
    // 获取关键字
    // console.log(placeholder);



    // 立即执行函数 封装成一个函数 再操hotword的时候不影响内容 
    (function() {
        let hotWords = ['智能机', '家用电气', '电脑', '电子书', '手机'];
        let index = 0;
        // 元素节点。属性=‘属性值’
        setInterval(function() {
            index++;
            // 校验范围
            if (index > hotWords.length - 1) {
                index = 0;
            }
            // 设置placehoder属性

            hotWord.placeholder = hotWords[index];
            // console.log(this.placeholder);

        }, 3000)
    })()


    // 轮番图
    let img = document.querySelector('#img');
    // console.log(img);
    var arr1 = document.querySelector('.arr-1');
    let arr2 = document.querySelector('.arr-2');
    var lis = document.querySelectorAll('.banner-center-1 li');
    var bannerCenter = document.querySelector('.banner-center-left')
    var imgArr = ['4.jpg.webp', '9.jpg.webp', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '14.jpg.webp'];
    var i = 0;

    function banner() {
        // 清空样式
        for (let k = 0; k < lis.length; k++) {
            lis[k].className = '';
        }
        img.src = 'images/' + imgArr[i];
        lis[i].className = 'center-active'
    }

    // 封装自动切换函数
    function autoBanner() {
        i++;
        if (i > imgArr.length - 1) {
            i = 0;
        }
        banner();
    }

    var timer = setInterval(autoBanner, 2000)
        // 鼠标移入停止计时器
    bannerCenter.onmouseover = function() {
            clearInterval(timer)
        }
        // 鼠标离开开始定时器
    bannerCenter.onmouseout = function() {
            // 重新复制给定时器
            timer = setInterval(autoBanner, 2000);
        }
        // 下一张
    arr2.onclick = function() {
            i++;
            if (i > imgArr.length - 1) {
                i = 0;
            }
            // 设置图片路径
            banner();
        }
        // 上一张
    arr1.onclick = function() {
        i--;
        if (i < 0) {
            i = imgArr.length - 1;
        }
        // 设置图片路径
        banner();
    }

    for (let j = 0; j < lis.length; j++) {
        lis[j].onclick = function() {
            // 设置图片路径
            i = j;
            banner();
        }
    }


    // 倒计时
    var date = document.querySelector('.d3');

    var hour = document.querySelector('.hour');
    var dateNow = document.querySelector('.d2');
    var minute = document.querySelector('.minute');
    var second = document.querySelector('.second');
    time();
    // 定时器
    setInterval(time, 1000);

    function time() {
        function addZero(x) {
            return x < 10 ? '0' + x : x
        }
        // 获取当前时间
        var now = +new Date();
        // console.log(now);
        // 设置结束时间
        var last = +new Date('2023-8-18  16:00:00');
        // 
        var count = (last - now) / 1000;
        //替换内容
        var h = parseInt(count / 60 / 60 % 24);
        h = addZero(h);
        hour.innerHTML = h;
        var m = parseInt(count / 60 % 60);
        m = addZero(m);
        minute.innerHTML = m;
        var s = parseInt(count % 60);
        s = addZero(s);
        second.innerHTML = s


        // 年月日
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        // 定义星期数组
        var arr = ['星期日', '星期一', '星期二', '星期二', '星期三', '星期四', '星期五', '星期六'];
        var week = date.getDay();
        dateNow.innerHTML = y + "年" + m + "月" + d + "日 " + arr[week]

    }




}






// 搜索框
$(document).ready(function() {
    // 定义延时器
    var timer = null;
    // 定义缓存对象
    var cacheObj = {};
    //   // 防抖函数
    function debounceSearch(kw) {
        timer = setTimeout(function() {
            getSuggestList(kw)
        }, 500);
    }


    $('#hot-words').on('keyup', function() {
            clearTimeout(timer);
            var keywords = $(this).val().trim();
            // console.log(keyworsds);


            if (keywords.length <= 0) {
                // 关键词为空时清空下面的内容
                return $('.list').empty().hide();
            }

            // 判断缓存中是否有数据
            if (cacheObj[keywords]) {
                return renderSuggestList(cacheObj[keywords])
            }
            // 
            // console.log(keywords);
            // getSuggestList(keywords);
            debounceSearch(keywords);


        })
        // 封装函数
    function getSuggestList(kw) {
        $.ajax({

            // 指定请求的URL地址 
            url: 'http://suggest.taobao.com/sug?q=' + kw,
            dataType: 'jsonp',
            success: function(res) {
                // console.log(res);
                renderSuggestList(res);
            }


        })
    }
    // 渲染UI结构
    function renderSuggestList(res) {
        if (res.result.length <= 0) {
            return $('.list').empty().hide();
        }
        var htmlStr = template('tpl-list', res)
        $('.list').html(htmlStr).show();
        // 获取用户输入的内容
        var k = $('.list').val().trim();
        cacheObj[k] = res;
    }


    // 当点击小li时 不执行滚动事件内的li更换样式的操作
    // 用节流锁 (互斥锁)
    var flag = true
        // 滚动滚动条使侧边栏显示出来
    var toolTop = $('.miaosha').offset().top;
    toggleTool();

    // console.log(toolTop);
    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            // fadeIn()显示
            $('.right').fadeIn();

        } else {
            // fadeOut()隐藏
            $('.right').fadeOut();
        }
    }
    $(window).scroll(function() {
        toggleTool();
        // console.log(1);
        // 滚动到相应区域时 侧边栏相对应德模块变样式
        if (flag) {
            $('.zhongjian .x').each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    console.log(i);
                    $('.right li').eq(i).addClass('current').siblings().removeClass();
                }

            })
        }

    })

    // 点击侧边栏的按钮时内容滚动到相应的区域
    $('.right li').click(function() {
        // console.log();
        flag = false;
        //点击li计算页面要去往的位置
        // 选出对应索引号的内容区域的盒子计算它的offset（）.top
        var current = $('.zhongjian .x').eq($(this).index()).offset().top;
        // 页面动画滚动效果
        $('body,html').stop().animate({
            scrollTop: current
        }, function() {
            flag = true;
        });
        // 点击之后让当前的小li让他添加current
        $(this).addClass('current').siblings().removeClass();
    })
});