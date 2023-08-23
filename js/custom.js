/*
Title: 星光闪闪 - Star Light Spark
Author: 白芍 <0xac.cn>
Data: 20230803

星光闪闪 - Star Light Spark
让主页背景充满繁星~

This code is licensed under the GNU GPLv3 License <https://www.gnu.org/licenses/gpl-3.0.txt>.
You are free to use it under the condition of compliance with the license.

Copyright 2023 (C) 0xzco <0xz.co> All rights reserved.
*/
(function() 
{
  /* 星光闪闪，Star Light Spark */
  const starLightCanvas = document.createElement("canvas");
  var page_header;
  if (window.location.pathname == '/404')
  {
    page_header = document.getElementById('web_bg');
  }
  else
  {
    page_header = document.getElementById('page-header');
  }
  // 插入 Canvas
  page_header.appendChild(starLightCanvas);

  // 创建合适大小画布
  const ctx = starLightCanvas.getContext("2d");
  starLightCanvas.width = page_header.getBoundingClientRect().width;
  starLightCanvas.height = page_header.getBoundingClientRect().height;

  // 填充画布背景
  ctx.fillStyle = "rgb(44, 51, 56)";
  ctx.fillRect(0, 0, starLightCanvas.width, starLightCanvas.height);

  // 更新画布大小和对应的值
  function handleResize() 
  {
    starLightCanvas.width = page_header.getBoundingClientRect().width;
    starLightCanvas.height = page_header.getBoundingClientRect().height;
    ctx.fillRect(0, 0, starLightCanvas.width, starLightCanvas.height);
  }

  // 监听窗口大小改变事件 -> 更新画布大小和对应的值
  window.addEventListener('resize', handleResize);

  // 星星
  class starLightStar 
  {
    constructor() 
    {
      this.x = 0; // X 坐标
      this.y = 0; // Y 坐标
      this.radius = Math.random() * 1 + 1;      // 半径
      this.speed = Math.random() * 0.02 + 0.01; // 闪烁速度
      this.opacity = 0;                         // 不透明度
      this.opacityDirection = 1;                // 不透明度改变符号
    }

    // 绘制星星
    draw() 
    {
      ctx.beginPath();

      // 星星的形状
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

      // 星星的颜色
      ctx.fillStyle = `rgba(211, 211, 211, ${this.opacity})`;

      ctx.fill();
    }

    // 移动星星
    move() {
      
      // 星星画布中心向量 + 偏移量（外围快）
      this.x += (this.x - starLightCanvas.width / 2) * 0.004;
      this.y += (this.y - starLightCanvas.height / 2) * 0.004;

      // 旋转星星，按中心旋转一点点
      const radian = 0.001; // 旋转弧度

      // 旋转矩阵
      const RotateX = this.x * Math.cos(radian) - this.y * Math.sin(radian);
      const RotateY = this.x * Math.sin(radian) + this.y * Math.cos(radian);
      this.x = RotateX;
      this.y = RotateY;

	    // 闪烁
      var opacity = this.opacity + this.opacityDirection * this.speed;    // 透明度闪烁
      this.opacity = Math.max(0, Math.min(1, opacity));                   // 限制透明度范围
      this.opacityDirection = this.opacity === 1 ? -1 : 1;                // 自动转向

      this.draw();

      // 出画布星星回中，速度位置重生
      if (this.x < 0 || this.x > starLightCanvas.width ||
	      this.y < 0 || this.y > starLightCanvas.height)
      {
        this.x = Math.random() * starLightCanvas.width;
        this.y = Math.random() * starLightCanvas.height;
        this.radius = Math.random() * 1 + 1;               // 半径
        this.speed = Math.random() * 0.002 + 0.001;        // 闪烁速度
      }
    }
  }

  // 对象列
  const stars = [];
  for (let i = 0; i < 1000; i++) 
  {
    stars.push(new starLightStar());
  }

  // 主函数绘制
  function drawMain() 
  {
    // 清除画布
    ctx.clearRect(0, 0, starLightCanvas.width, starLightCanvas.height);

    // 更新和绘制每颗星星
    for (let i = 0; i < stars.length; i++)
    {
      stars[i].move();
    }

    // 帧率限制，防止浏览器占用过高
    requestAnimationFrame(() => 
    {
      setTimeout(drawMain, 20);
    });
  }

// 主函数执行
drawMain();
})();

//动态标题
/*
// 这个实现有 Pjax 刷新问题，不建议用
const originalTitle = document.title;

window.addEventListener('blur', () => {
  document.title = "~(>_<)~ 崩溃了！";
});

window.addEventListener('focus', () => {
  document.title = "(≧▽≦) 骗你的，又好了。";
  setTimeout(() => {
    document.title = originalTitle;
  }, 3000);
});
*/
var globalMourn = false;             // 不开玩笑 
const titleMaxDisplayed = 3;         // 最大显示次数
var titleDisplayedCount = 0;         // 显示次数计数
const OriginTitile = document.title; // 原标题

let backTime, leaveTime;
document.addEventListener('visibilitychange', () => 
{ 
  if (globalMourn == true)
  {
    return ;
  }

  // 只会提示 3 次，
  if (localStorage.getItem('titleDisplayedCount') == null || 
      localStorage.getItem('titleDisplayedCount') < titleMaxDisplayed) 
  {
    if (document.hidden) 
    {
      clearTimeout(backTime);
      leaveTime = setTimeout(() =>
      {
        document.title = '~(>_<)~ 网页崩溃了！';
      }, 3000);
      
    }
    else 
    {
      clearTimeout(leaveTime);
      document.title = '(≧▽≦) 骗你的，又好了。';
      backTime = setTimeout(() => 
      {
        document.title = OriginTitile;
      }, 1500);
      localStorage.setItem('titleDisplayedCount', titleDisplayedCount++);
    }
  }
});
/*
ref:http://patorjk.com/software/taag/#p=display&v=0&f=ANSI%20Shadow&t=JUST%20NOTE
*/
/* 这个是利用某种 BUG 进行输出*/
const log_out = [`
  ∧＿∧    BUG 退散!
  >｡o.o｡< つ━☆・*。
`,`
              ・゜+.
              °。+ *
`,`
          ██╗██╗   ██╗███████╗████████╗    ███╗   ██╗ ██████╗ ████████╗███████╗
          ██║██║   ██║██╔════╝╚══██╔══╝    ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝
          ██║██║   ██║███████╗   ██║       ██╔██╗ ██║██║   ██║   ██║   █████╗  
    ██   ██║██║   ██║╚════██║   ██║       ██║╚██╗██║██║   ██║   ██║   ██╔══╝  
    ╚█████╔╝╚██████╔╝███████║   ██║       ██║ ╚████║╚██████╔╝   ██║   ███████╗
      ╚════╝  ╚═════╝ ╚══════╝   ╚═╝       ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝
`,`
©2023 By 0xac.cn
`];
let log_print;
log_print = setTimeout(
  console.log.bind(console,
    `%c ${log_out[0]} %c ${log_out[1]} %c ${log_out[2]} %c ${log_out[3]}\n`,
    "color:#134857",
    "color:#0f95b0",
    "color:#0eb0c9",
    "color:#c7d2d4",
  )
);
/*
Title: 动态横幅
Author: 白芍 <0xac.cn>
Data: 20230804

主页横幅，额外支持
+ JS 动作接入
+ 一天触发一次
+ 定日期触发
+ 全页灰度

用法
var banner = new Banner("id");
document.addEventListener("DOMContentLoaded", banner.show({
  text: "这是动态消息内容",
  })
);

let banner = new Banner("id");
banner.show({
  text: "请注意授权协议",
  actionText: "授权协议",
  delay: '3000',
  onAction: function (element) {
    window.open("/licenses/")
  },
});
不可以直接将 text 交给用户输入，尤其是 UA，会被注入

条目         | 用途         | 默认   | true | false | 其他
text         | 显示标题消息 |  -     | -    | -     |          
actionText   | 关闭按钮     |  X     | X    | -     |
onAction     | 关闭按钮     | true   | 关闭 | -     | 自定义动作
background   | 背景颜色     | 红     | -    | -     |          
color        | 文字颜色     | 白     | -    | -     |          
height       | 横幅高       | 40px   | -    | -     |          
delay        | 显示时长 ms  | 4000ms | -    | 不关闭 |
date         | 显示日期     | 不开启  | -    | -     | 仅支持 日月 09-08
once         | 一天一次     | 一天一次| 一次  | 每次  |
mourn        | 全屏灰色默哀  | 禁用   | 启用  | 关闭  |

This code is licensed under the GNU GPLv3 License <https://www.gnu.org/licenses/gpl-3.0.txt>.
You are free to use it under the condition of compliance with the license.

Copyright 2023 (C) 0xzco <0xz.co> All rights reserved.
*/
/*
CSS
#banner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transform: translateY(-100px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: opacity 0.5s ease-in-out;
}

#bannerAction {
  margin-left: 10px;
  cursor: pointer;
  font-size: 18px;
  color:#d2b42c;
}

@keyframes bounce-down {
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }
  70% {
    opacity: 1;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes bounce-up {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  70% {
    opacity: 1;
    transform: translateY(20px);
  }
  100% {
    opacity: 0;
    transform: translateY(-100px);
  }
}
*/
/*
class Banner {
  constructor(id)
  {
    // 主挂靠
    if (document.getElementById(id) === null) 
    {
        return;
    }     
    this.parentElement = document.getElementById(id);
    this.navElement = document.getElementById("nav");

    this.banner = document.createElement("div");
    this.banner.id = "banner";

    this.bannerMessage = document.createElement("span");
    this.bannerMessage.id = "bannerMessage";
    this.bannerAction = document.createElement("span");
    this.bannerAction.id = "bannerAction";

    this.banner.appendChild(this.bannerMessage);
    this.banner.appendChild(this.bannerAction);

    this.parentElement.insertBefore(this.banner, this.navElement);

  }

  // 设置元素
  setElement()
  {
    //this.bannerMessage.textContent = this.actionText; // 自动转义，不会注入
    // 有注入风险，不要接收用户输入，非要接受请转义，包括浏览器 User-Agent
    this.bannerMessage.innerHTML = this.text;
    this.bannerAction.innerHTML = this.actionText;

    // 横幅颜色
    this.banner.style.background = `linear-gradient(to top, ${this.background}, ${this.background})`;
    // 文字颜色
    this.banner.style.color = this.color;
    // 横幅高度
    this.banner.style.height = this.height + 'px';
  }

  // 显示过了？
  isShown() 
  { 
    const storedData = localStorage.getItem("banner_shown");
    if (storedData == null)
    {
      return false;
    }

    const parsedData = JSON.parse(storedData);
    if (parsedData === undefined) 
    {
      return false;
    }

    const currentTime = Date.now();
    const expirationTime = parsedData.time + parsedData.expire * 1000;
    if(currentTime < expirationTime) 
    {
      if (parsedData.data == '1') 
      {
        return true;
      }
    }
    return false;
  }

  // 设置显示过了
  setShown() 
  { // 有效期 1天
    localStorage.setItem("banner_shown", 
      JSON.stringify({
          data: 1,
          time: Date.now(),
          expire: 24 * 3600,
      })
    ); 
  }

  // 不符合日期？
  isnotDate()
  { // 日期格式 月-日（08-15）
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // 月份从 0 开始 +1
    const currentDay = currentDate.getDate();
    const dateParts = this.date.split('-');

    const targetMonth = parseInt(dateParts[0]);
    const targetDay = parseInt(dateParts[1]);
    if (currentMonth === targetMonth && currentDay === targetDay) 
    {
      return false;
    }
    return true;
  }

  // 显示
  displayBanner()
  { 
    this.banner.style.animation = "bounce-down 0.5s ease forwards";
    
    setTimeout(() => {
      this.banner.style.animation = "unset;";
    }, 500);
  }

  // 隐藏
  hiddenBanner()
  { 
    this.banner.style.animation = "bounce-up 0.5s ease forwards";
    
    setTimeout(() => {
      this.banner.style.animation = "unset;";
    }, 500);
  }

  // 启用灰度滤镜
  applyFilter() 
  { 
    const htmlElement = document.querySelector("html");
    htmlElement.style.mozFilter = "grayscale(100%)";
    htmlElement.style.msFilter = "grayscale(100%)";
    htmlElement.style.oFilter = "grayscale(100%)";
    htmlElement.style.filter = "grayscale(100%)";
  }

  // 关闭灰度滤镜
  resetFilter() 
  { 
    const htmlElement = document.querySelector("html");
    htmlElement.style.mozFilter = "grayscale(0%)";
    htmlElement.style.msFilter = "grayscale(0%)";
    htmlElement.style.oFilter = "grayscale(0%)";
    htmlElement.style.filter = "grayscale(0%)";
  }

  // 显示传参
  show(options) 
  { 
    this.text   = options.text;                                                              // 标题消息
    this.actionText = !(options.actionText === undefined) ? options.actionText : '&#x2716;'; // 关闭按钮 X: true | 文本 :''
    this.onAction   = !(options.onAction === undefined)   ? options.onAction   : false;      // 隐藏横幅动作: true | 自定义动作 :''
    this.background = !(options.background === undefined) ? options.background : '#c04851';  // 背景颜色
    this.color  = !(options.color === undefined)  ? options.color  : '#d8e3e7';              // 文字颜色
    this.height = !(options.height === undefined) ? options.height : 50;                     // 文字颜色
    this.delay  = !(options.delay === undefined)  ? options.delay  : 4000 ;                  // 显示时长 ms
    this.date   = !(options.date  === undefined)  ? options.date   : false;                  // 显示日期
    this.once   = !(options.once  === undefined)  ? options.once   : false;                  // 一天一次: true | 每次都是: false 
    this.mourn  = !(options.mourn === undefined)  ? options.mourn  : false;                  // 全屏灰色默哀
    
    // 显示一次
    if (this.once && this.isShown()) 
    {
      return;
    }

    // 日期判别
    if (this.date && this.isnotDate()) 
    {
      return;
    }

    // 全屏灰色
    if (this.mourn) 
    {
      globalMourn = true; // 联动其他模块
      this.applyFilter();
    }

    // 创建元素
    this.setElement();

    // 显示
    this.displayBanner();

    // 延时消失
    if (this.delay != false)
    {
      setTimeout(() => 
        {
          this.hiddenBanner();
        }, this.delay
      );
    }

    // 按钮消失
    this.bannerAction.addEventListener("click", () => 
    {
      if (this.onAction == false) 
      {
        this.hiddenBanner();
      } 
      else 
      {
        this.onAction();
        this.hiddenBanner();
      }
    });

    // 显示一次
    if (this.once) 
    {
      this.setShown();
    }

  }
}
*/
// 横幅提示
/*
window.addEventListener("DOMContentLoaded", function(event) {
  var banner = new Banner("page-header");
  banner.show({
    text: "欢迎",
    delay: 3000,
    once: true,
  })
});
*/
/*
window.addEventListener("copy", function(event) 
{
  //event.preventDefault(); // 阻止
  let banner = new Banner("page-header");
  banner.show({
    text: "复制成功，请注意",
    actionText: "授权协议",
    delay: 3000,
    once: true,
    onAction: function (element) 
    {
      window.open("/licenses/")
    },
  });
});

window.addEventListener("keydown", function(event) 
{
  if (event.key === "F12") 
  {
    //event.preventDefault(); // 阻止
    let banner = new Banner("page-header");
    banner.show(
      {
        text: '进入 F12 开发者模式，请注意',
        actionText: "授权协议",
        delay: 3000,
        onAction: function (element) 
        {
          window.open("/licenses/")
        },
    });
  }
});
*/
//(function(){
//  var toggle_menu = document.getElementById("sidebar-menus");
//  if (toggle_menu == null)
//  {
//    return ;
//  }
//  toggle_menu.remove();
//});

/* 重构 404 页面 */
(function() {
  var warp_404page = document.getElementById("error-wrap");
  if (warp_404page == null)
  {
    return ;
  }
  warp_404page.innerHTML = '<dev id="warp_404page"><span class="num_404page">404</span><span class="num_404text">找不到页面</span></dev>';
  var background_404page = document.getElementById("web_bg");
  if (background_404page) {
      background_404page.style.backgroundColor = "#1e1e1e";
  }
  var pageHeader = document.querySelector("#nav");
  pageHeader.style.background = "unset";
  pageHeader.style.boxShadow  = "unset";
  pageHeader.style.setProperty("--font-color", "white");
})();

(function(){
  var sidebarElement = document.getElementById("sidebar");
  var toggleMenuElement = document.getElementById("toggle-menu");

  if (sidebarElement) {
      sidebarElement.remove();
  }

  if (toggleMenuElement) {
      toggleMenuElement.remove();
  }

})();
