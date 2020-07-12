<template>
  <div>
    <h1>文章列表</h1>
      <el-table :data="items">
      
        <el-table-column prop="_id" label="ID" width="300"></el-table-column>
        <el-table-column prop="title" label="文章标题" ></el-table-column>
        <!-- <el-table-column prop="body" label="文章詳情" ></el-table-column> -->
        <el-table-column fixed="right" label="Operations" width="200">
          <template slot-scope="scope" >
            <el-button type="text" size="small" @click="$router.push(`/articles/edit/${scope.row._id}`)">Edit</el-button>
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

  
  methods:{
    async fetch(){
      const res = await this.$http.get('rest/articles')
      this.items=res.data
    },


    async remove(row){
      this.$confirm(`Are you sure to delete the article?"${row.title}"`, 'Warning', {
         confirmButtonText: 'OK',
         cancelButtonText: 'Cancel',
         type: 'warning'
        }
      )

      .then(async() => {
          const res = await this.$http.delete(`rest/articles/${row._id}`)

          this.$message({
            type: 'success',
            message: 'Delete completed'
          });

          console.log(res)
          this.fetch()
        }
      )

    }
  },
    

  created(){
    // 这个组件默认进来要做什么事情，这里默认进来去获取数据
    this.fetch()
  }

}

</script>
