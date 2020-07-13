const express = require ("express")//引入express

const app = express()//定义一个app 是express的一个实例
//在3000端口启动同时传入一个回调函数，里面表示启动之后做什么
//设置一个全局变量，防止用户篡改
app.set('secret','nfrhnfhnrfhrnh')

//把跨域模块也引用进来
app.use(require('cors')())

//中间件,用来从客户端拿数据,json是前后端交互的基本数据格式
app.use(express.json())

//定义一个静态路由，表示uploads下的文件都是静态文件,托管静态文件，实现uploads里的所有文件可以通过uploads来访问
app.use('/uploads',express.static(__dirname+'/uploads'))

//引用我们的路由，引用过来是一个函数,把app传给它，这样在admin里面就有一个app可以用
require('./routes/admin')(app)


//同样的方法将数据库的也引用
require('./plugins/db.js')(app)



app.listen(3000,()=>{
    console.log('http://localhost:3000');//接口地址打印在控制版
});

