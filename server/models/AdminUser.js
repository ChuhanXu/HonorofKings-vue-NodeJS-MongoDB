const mongoose = require('mongoose')
//建立数据库的结构
const schema = new mongoose.Schema({
    
    username:{type:String}, 
    password:{
        type:String,
        select:false,//显示密码 select:false 不显示密码
        //bcrypt 加密的密码不可逆，用同样的12345做密码会生成不同的散列加密序列，不显示密码的时候，保存后散列不会变
        //显示密码，保存后散列会发生改变
      
        
        set(val){
            return require('bcrypt').hashSync(val,10)//散列加密,返回一个长度为10的加密数列
        }
    }

    
    

})
//将这个模型导出的是一个mongo的模型，哪里需要用就去哪里导入，数据库的增删改查需要用
module.exports = mongoose.model('AdminUser',schema)