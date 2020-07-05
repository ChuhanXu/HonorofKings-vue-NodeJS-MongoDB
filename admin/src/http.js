import axios from 'axios'

const http =axios.create({//创建一个实例
    baseURL:'http://localhost:3000/admin/api'//指向后台接口地址
})

export default http//导出变量并在mainz中引用变量
// 存放接口的引用