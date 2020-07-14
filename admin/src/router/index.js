import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(Router)

 const router = new Router({

  routes:[

    {
      path:'/login',
      name:'login',
      component:Login,//Login 是一个方法
      //除了这个登录页面，其余的都需要限制，login需要公开访问
      meta:{isPublic:true}
    },

   {
      path: '/',
      name: 'main',
      component: Main,//使用的是main形式
      // 添加了一个子路由
      children:[
      // 让两个不同的地址指向同一个页面组件CategoryEdit,加入一个特殊参数props，表示的是把 /categories/edit/:id 
      //任何的url参数，比如ID都注入到CategoryEdit页面里面，因此在CategoryEdit页面就可以接受该参数

        //categories地址和其对应的页面
        {path:'/categories/edit/:id',component:CategoryEdit,props:true},
        {path:'/categories/create',component:CategoryEdit},
        {path:'/categories/list',component:CategoryList},
      
      
        //items对应的地址和其对应的页面
        {path:'/items/create',component:ItemEdit},
        {path:'/items/list',component:ItemList},
        {path:'/items/edit/:id',component:ItemEdit,props:true},

        //heroes对应的地址和其对应的页面
        {path:'/heroes/create',component:HeroEdit},
        {path:'/heroes/list',component:HeroList},
        {path:'/heroes/edit/:id',component:HeroEdit,props:true},
        
        //articles对应的地址和其对应的页面
        {path:'/articles/create',component:ArticleEdit},
        {path:'/articles/list',component:ArticleList},
        {path:'/articles/edit/:id',component:ArticleEdit,props:true},

        //ads对应的地址和其对应的页面
        {path:'/ads/create',component:AdEdit},
        {path:'/ads/list',component:AdList},
        {path:'/ads/edit/:id',component:AdEdit,props:true},

        //admin_users对应的地址和其对应的页面
        {path:'/admin_users/create',component:AdminUserEdit},
        {path:'/admin_users/list',component:AdminUserList},
        {path:'/admin_users/edit/:id',component:AdminUserEdit,props:true}
      ]
    },
  ]
  
})
//beforeEach()表示在每次进入这个路由之前需要做什么，to去哪个页面，from从哪个页面来
//在login加了一个isPublic属性

router.beforeEach((to,from,next) => {
  //如果不是公开访问页面，并且没有token，他就无法进入页面，会停留在登陆页面
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})
export default router
