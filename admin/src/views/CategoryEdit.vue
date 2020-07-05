<template>
  <div class="about">
    <h1>新建分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
        <!-- native表示原生表单el-form，prevent表示阻止默认提交防止跳转页面 -->

     <el-form-item label ="名称">   
         <el-input v-model="model.name">请输入名称</el-input>
     </el-form-item>

     <el-form-item >   
         <el-button type="primary" native-type="submit">保存</el-button>
     </el-form-item>

    </el-form>  
  </div>
</template>
<script>
export default {
    data(){
        return{
            model:{}
        }
    },
    methods:{
        // 请求一个接口提交数据
       async save(){
           console.log("save")
           //发送请求到categories接口，参数为this.model
           //将异步的回调函数的方法换成async同步的
           const res = await this.$http.post('categories',this.model)
           console.log(res)
           //跳转到list页面
           this.$router.push('/categories/list')
           //跳转页面后提示保存成功了
           this.$message({
               type:'success',
               message:'保存成功'
           })

       } 
    }
    
}
</script>