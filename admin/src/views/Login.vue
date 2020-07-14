<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <!-- login是一个方法 在method中定义 -->
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model='model.username'></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input type="password" v-model='model.password'></el-input>
        </el-form-item>

        <el-form-item >
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>



<script>
export default {

  data(){
    return{
      model:{}//对每个表单都定义一个model
    }
  },

  methods:{
    async login(){
     const res=await this.$http.post('login',this.model)//服务端返回得应该是一个token密钥,即使是同一个用户每次返回的token也不一样
     //sessionStorage.token=res.data.token//关掉再回来会没有,在前端将token保存下来
     localStorage.token=res.data.token//关掉回来还会有
     this.$router.push('/')
     this.$message({
       type:'success',
       message:'登录成功'
     })
    }
  }
};


</script>

<style>
.login-card {
  width: 30rem;
  margin: 6rem auto;
}
</style>
