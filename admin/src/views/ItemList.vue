<template>
  <div>
    <h1>物品列表</h1>
    <el-table :data="items">
      <!-- items是给表格提供的数据 -->
      <!-- prop是字段 -->
        <el-table-column prop="_id" label="ID" width="300"></el-table-column>
        
        <el-table-column prop="name" label="物品名称" ></el-table-column>

        <el-table-column prop="icon" label="图标" >
          <template slot-scope="scope">
            <img :src="scope.row.icon" style="height:3rem;">
          </template>

        </el-table-column>
        <el-table-column fixed="right" label="Operations" width="200">
         <template slot-scope="scope" >
         
          <!-- type 决定编辑按钮的形式 可以改为primary -->
          <!-- 点击此按钮以后应该是跳转页面，加一个click,通过router.push来跳转页面 -->
          <!-- scope.row._id 代表每一行的ID -->
          <el-button type="text" size="small" @click="$router.push(`/items/edit/${scope.row._id}`)">Edit</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">Delete</el-button>
         </template>
        </el-table-column>
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
      const res = await this.$http.get('rest/items')
      this.items=res.data
    },
    async remove(row){
      this.$confirm(`Are you sure to delete the record?"${row.name}"`, 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
          .then(async() => {//await 和 async 配对使用
            const res = await this.$http.delete(`rest/items/${row._id}`)
              this.$message({
              type: 'success',
              message: 'Delete completed'
          });
          console.log(res)
          this.fetch()
        })
    }   
  },
    

    
  created(){
    // 这个组件默认进来要做什么事情，这里默认进来去获取数据
    this.fetch()
    
    
    
  }
}

</script>
