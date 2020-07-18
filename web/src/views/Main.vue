
<template>
  <div >
    <!-- py-2 -->
    <!-- 主轴方向（vertical）分散对齐。交叉轴（水平方向）垂直居中的，用的ai-center -->
    <div class="topbar bg-black px-2 py-2 d-flex ai-center" >
      <img src="../assets/logo.jpg" height="30">
      <div class="flex-1 text-left ml-2">
        <div class="text-white">王者荣耀</div>
        <div class="text-dark-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary my-2">立即下载</button>
    </div>
  


   

    <div class="nav bg-primary pt-3 pb-2">
      <!-- 左右没有间距 space-between 左右有间距 space-around  -->
      <div class="nav d-flex text-white jc-around pb-1 ">
        <div class='nav-item active'>
          <router-link class="nav-link" tag="div" to="/">首页</router-link>

        </div>

        <div class='nav-item'>
          <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>

        </div>

        <div class='nav-item'>
          <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>

        </div>
      </div>
    </div>

    <!-- 子路由的一个容器 -->
    <router-view></router-view>
  </div>
</template>
