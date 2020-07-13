<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items">
      <!-- items是给表格提供的数据 -->
      <!-- prop是字段 -->
        <el-table-column prop="_id" label="ID" width="300"></el-table-column>
       
        <el-table-column prop="username" label="用户名称" ></el-table-column>

        <el-table-column prop="password" label="密码" ></el-table-column>
        <el-table-column fixed="right" label="Operations" width="200">
         <template slot-scope="scope" >
         
         
          <el-button type="text" size="small" @click="$router.push(`/admin_users/edit/${scope.row._id}`)">Edit</el-button>
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
      
      const res = await this.$http.get('rest/admin_users')
      this.items=res.data
    },
    async remove(row){
      this.$confirm(`Are you sure to delete the user?"${row.username}"`, 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
          .then(async() => {//await 和 async 配对使用
            const res = await this.$http.delete(`rest/admin_users/${row._id}`)
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
