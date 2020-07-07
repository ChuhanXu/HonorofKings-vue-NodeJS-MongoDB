<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items">
      <!-- items是给表格提供的数据 -->
      <!-- prop是字段 -->
        <el-table-column prop="_id" label="ID" width="300"></el-table-column>
        <el-table-column prop="name" label="分类名称" ></el-table-column>
        
      </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      items:[]
    }
  },
  //写一个method，来方便以后来重新调用
  methods:{
    async fetch(){
      //const res = this.$http.需要加上分类列表的接口，进入服务端的routes\admin\index写接口
      const res = await this.$http.get('categories')
      this.items=res.data
    }
},
  created(){
    // 这个组件默认进来要做什么事情，这里默认进来去获取数据
    this.fetch()
    
    
    
  }
}

</script>
