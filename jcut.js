    
     /* ========================= 顶部大轮播脚本 =========================*/
    var imglist = document.querySelectorAll(".slide"); // 获取所有轮播图
    var index = 0; // 当前显示图片的索引
    var time; // 定时器变量
    var container = document.querySelector(".banner"); // 轮播容器
    var btnbox = document.getElementById("btn"); // 圆点容器
    var btnlist; // 圆点元素集合
    var leftbtnEl = document.getElementById("leftbtn"); // 左箭头
    var rightbtnEl = document.getElementById("rightbtn"); // 右箭头

    function createDots() {
      btnbox.innerHTML = ""; // 清空圆点容器
      imglist = document.querySelectorAll(".slide"); // 重新获取轮播图
      for (var i = 0; i < imglist.length; i++) {
        var s = document.createElement("span"); // 创建圆点元素
        if (i === index) {
          s.classList.add("active"); // 当前索引的圆点添加激活类
        }
        btnbox.appendChild(s); // 将圆点添加到容器
      }
      btnlist = document.querySelectorAll("#btn span"); // 获取所有圆点
      for (let j = 0; j < btnlist.length; j++) {
        btnlist[j].onclick = function () {
          index = j; // 点击圆点更新索引
          updateSlide(); // 更新轮播图显示
        };
      }
    }

    function updateSlide() {
      if (index >= imglist.length) {
        index = 0; // 索引超出重置为0
      }
      if (index < 0) {
        index = imglist.length - 1; // 索引小于0设置为最后一张
      }
      for (var i = 0; i < imglist.length; i++) {
        imglist[i].classList.remove("show"); // 移除所有图片的显示类
      }
      imglist[index].classList.add("show"); // 为当前索引图片添加显示类
      var dots = document.querySelectorAll("#btn span"); // 获取所有圆点
      for (var k = 0; k < dots.length; k++) {
        dots[k].classList.remove("active"); // 移除所有圆点的激活类
      }
      if (dots[index]) {
        dots[index].classList.add("active"); // 为当前圆点添加激活类
      }
    }

    function auto() {
      clearInterval(time); // 清除之前的定时器
      time = setInterval(function () {
        index = (index === imglist.length - 1) ? 0 : index + 1; // 索引递增或循环
        updateSlide(); // 更新轮播图显示
      }, 2000); // 每2秒执行一次
    }

    function leftbtn() {
      index = (index === 0) ? imglist.length - 1 : index - 1; // 索引递减或循环
      updateSlide(); // 更新轮播图显示
    }

    function rightbtn() {
      index = (index === imglist.length - 1) ? 0 : index + 1; // 索引递增或循环
      updateSlide(); // 更新轮播图显示
    }

    container.onmouseenter = function () {
      clearInterval(time); // 鼠标进入容器暂停自动轮播
    };
    container.onmouseleave = function () {
      auto(); // 鼠标离开容器恢复自动轮播
    };

    leftbtnEl.onclick = leftbtn; // 左箭头点击事件
    rightbtnEl.onclick = rightbtn; // 右箭头点击事件

    window.addEventListener("resize", function () {
      createDots(); // 窗口大小变化时重新创建圆点
      updateSlide(); // 更新轮播图显示
    });

    createDots(); // 初始化创建圆点
    updateSlide(); // 初始化显示轮播图
    auto(); // 启动自动轮播

 /* ========================= news1 小轮播（悬停切换 + 自动） ========================= */
 
    var n1Container = document.querySelector(".news1 .carousel-container"); // 小轮播容器
    var n1Slides = n1Container ? n1Container.querySelectorAll(".carousel-slide") : []; // 小轮播图片
    var n1Dots = n1Container ? n1Container.querySelectorAll(".n1-dot") : []; // 小轮播圆点
    var n1Index = 0; // 小轮播当前索引
    var n1Timer; // 小轮播定时器

    function n1Render() {
      for (var i = 0; i < n1Slides.length; i++) {
        n1Slides[i].classList.remove("active"); // 移除所有图片的激活类
      }
      if (n1Slides[n1Index]) {
        n1Slides[n1Index].classList.add("active"); // 为当前索引图片添加激活类
      }
      for (var d = 0; d < n1Dots.length; d++) {
        n1Dots[d].classList.remove("active"); // 移除所有圆点的激活类
      }
      if (n1Dots[n1Index]) {
        n1Dots[n1Index].classList.add("active"); // 为当前圆点添加激活类
      }
    }

    function n1Auto() {
      clearInterval(n1Timer); // 清除之前的定时器
      n1Timer = setInterval(function () {
        if (n1Slides.length === 0) {
          return; // 如果没有图片则退出
        }
        n1Index = (n1Index === n1Slides.length - 1) ? 0 : n1Index + 1; // 索引递增或循环
        n1Render(); // 更新小轮播显示
      }, 2000); // 每2秒执行一次
    }

    function n1BindDotsHover() {
      for (let j = 0; j < n1Dots.length; j++) {
        n1Dots[j].onmouseenter = function () {
          n1Index = j; // 鼠标悬停圆点更新索引
          n1Render(); // 更新小轮播显示
        };
      }
    }

    function n1BindHoverPause() {
      if (!n1Container) {
        return; // 如果没有容器则退出
      }
      n1Container.onmouseenter = function () {
        clearInterval(n1Timer); // 鼠标进入容器暂停自动轮播
      };
      n1Container.onmouseleave = function () {
        n1Auto(); // 鼠标离开容器恢复自动轮播
      };
    }

    (function initN1() {
      if (!n1Container || n1Slides.length === 0) {
        return; // 如果没有容器或图片则退出
      }
      n1Index = 0; // 初始化索引
      n1Render(); // 初始化显示
      n1BindDotsHover(); // 绑定圆点悬停事件
      n1BindHoverPause(); // 绑定容器悬停暂停事件
      n1Auto(); // 启动自动轮播
    })();