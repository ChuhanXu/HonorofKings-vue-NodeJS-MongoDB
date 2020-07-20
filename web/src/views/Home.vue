<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/20200508164525-463402.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/20200508165029-541891.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/20200508174536-924420.jpg" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-0.5" slot="pagination"></div>
    </swiper>

    <!-- 精灵图标 导航栏 -->
    <div class="nav-icons bg-white mt-3 text-info text-center pt-3">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-direction"></i>
          <div class="py-2">方向</div>
        </div>
      </div>
      <div class="bg-light py-2">
        <span class="text-center">收起</span>
      </div>
    </div>
    <!-- end of nav icons -->
    <!-- 字体图标 -->
    <!-- icon-cc-menu-circle 图标名称 -->
    <!-- 可以当作字体来控制大小也可以变颜色 -->
    <!-- 如果我们定义了一个组件并且再main.js中引用了它，就可以当作一个标签使用 -->

    <m-card icon="cc-menu-circle" title="新闻资讯">
      <div class="nav jc-between ">
        <div class="nav-item active">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">公告</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">活动</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">赛事</div>
        </div>
      </div>
      <swiper>
        <swiper-slide v-for="m in 5" :key="m">
          <div class="text-left mt-3 py-2" v-for="n in 5" :key="n">
            <span>[新闻]</span>
            <span>|</span>
            <span>夏日新版本</span>
            <span>06/02</span>
          </div>
        </swiper-slide>
      </swiper>
    </m-card>

    <div class="card p-3 bg-white mt-3"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      }
    };
  }
};
</script>

<style lang="scss">
//加上lang="scss"才可以嵌套
// @import '../style.scss'; 再style中把变量和实现分离
@import "../assets/scss/variable.scss";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 0.7;
    border-radius: 0.1538rem;
    background: map-get($colors, "grey");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info"); //info 是定义在variabl.scss的颜色
    }
  }
}

//导航栏
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%; //一行四个
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none; //4,8没有右边框
    }
  }
}
</style>

