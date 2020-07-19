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
  border-top:1px solid $border-color;
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

