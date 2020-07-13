<template>
  <div class="about">
      <!-- 使用一个三目运算符，如果有ID就是编辑分类，不然就是新建分类 -->
    <h1>{{id?'编辑':'新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
        <!-- native表示原生表单el-form，prevent表示阻止默认提交防止跳转页面 -->

    


     <el-form-item label ="用户">   
         <el-input v-model="model.username">请输入名称</el-input>
     </el-form-item>

     <el-form-item label ="密码">   
         <el-input v-model="model.password">请输入密码</el-input>
     </el-form-item>


     <el-form-item >   
         <el-button type="primary" native-type="submit">保存</el-button>
     </el-form-item>

    </el-form>  
  </div>
</template>
<script>
export default {
    //获取ID，实现和router文件的解耦
    props:{
        id:{

        }

    },
    data(){
        return{
            model:{},
            
        }
    },
    methods:{
        // 请求一个接口提交数据
       async save(){
           let res
           //如果有id,直接进入修改，否则为新建
           if(this.id){
                res = await this.$http.put(`rest/admin_users/${this.id}`,this.model)
           }else{
                res = await this.$http.post('rest/admin_users',this.model)
           }
           console.log(res)
           //发送请求到admin_users接口，参数为this.model
           //将异步的回调函数的方法换成async同步的
           
           
           //跳转到list页面
           this.$router.push('/admin_users/list')
           //跳转页面后提示保存成功了
           this.$message({
               type:'success',
               message:'保存成功'
           })

       },
       async fetch(){
        const res = await this.$http.get(`rest/admin_users/${this.id}`)//需要去写接口
        this.model = res.data
    },
   
    },
    
    //如果是编辑的话需要获取相应分类ID的信息
    //在created里面要有一个方法去获取数据，并且要存在ID
    created(){
        
        //&&表示前面条件满足以后再执行后面的方法
        this.id && this.fetch()
    }

    
}
</script>