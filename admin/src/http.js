import axios from 'axios'
import Vue from 'vue'

const http =axios.create({//创建一个实例
    baseURL:'http://localhost:3000/admin/api'//指向后台接口地址
})
//捕获全局错误。拦截器，当服务端返回了一个错误并且错误对象有massage时就弹出错误对象里的massage,不需要处理每一个错误
http.interceptors.response.use(res=>{
    return res
},err=>{
    if(err.response.data.message){
    Vue.prototype.$message({
        type:'error',//报错的框是红色的
        message: err.response.data.message

    })
} 
    return Promise.reject(err)
})


export default http//导出变量并在mainz中引用变量
// 存放接口的引用