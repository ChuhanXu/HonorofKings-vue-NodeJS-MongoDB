<template>
  <div class="card p-3 bg-white mt-3">
    <div class="card-header d-flex ai-center pb-3">
      <!-- <i class="iconfont icon-cc-menu-circle"></i> -->
      <!-- 动态绑定icon -->
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2 text-left">{{title}}</div>
      <i class="iconfont icon-menu"></i>
    </div>

    <div class="card-body pt-3">
        <!-- 插槽 -->
        <slot></slot>
     
    </div>
  </div>
</template>

<script>
export default {
  //给title传参数要在props里定义
  props: {
    title: { type: String, required: true }, //required : true表示如果你要使用card组件，title是必须参数
    icon: { type: String, required: true }
  }
};
</script>

<style lang="scss">
@import '../assets/scss/variable.scss';
.card{
    .card-header{
        border-bottom: 1px solid $border-color
    }
    border-bottom: 1px solid $border-color
}
</style>

