import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http =axios.create({//创建一个实例
    baseURL:'http://localhost:3000/admin/api'//指向后台接口地址
})
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (localStorage.token){
        config.headers.Authorization = "Bearer "+(localStorage.token)

    }
   //在请求头中添加token,"bearer "行业规范
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


//捕获全局错误。拦截器，当服务端返回了一个错误并且错误对象有massage时就弹出错误对象里的massage,不需要处理每一个错误
http.interceptors.response.use(res=>{
    return res
},err=>{
    if(err.response.data.message){
    Vue.prototype.$message({
        type:'error',//报错的框是红色的
        message: err.response.data.message

    })
    if(err.response.status === 401){//如果状态码=401回到登陆界面
        router.push('/login')
    }
} 
    return Promise.reject(err)
})


export default http//导出变量并在mainz中引用变量
// 存放接口的引用