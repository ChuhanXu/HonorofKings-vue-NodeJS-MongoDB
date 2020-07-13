import Vue from 'vue'
import VueRouter from 'vue-router'
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

Vue.use(VueRouter)

  const routes = [

    {
      path:'/login',
      name:'login',
      component:Login//Login 是一个方法


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

  const router = new VueRouter({routes})
  export default router
