import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import './style.css'

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http=http
// 加载到一个vue的实例属性上面后原型上面之后，我们可以在任意的页面用this.$http去访问数据请求接口

//上传图片里没有Authorization 需要自己写个方法给它,在任意位置都可以调用
Vue.mixin({

  computed:{
    uploadUrl(){
      return this.$http.defaults.baseURL+'/upload'
    }
  },
  methods:{
    getAuthHeaders(){
      return{
        Authorization:`Bearer ${localStorage.token || ''}`
      }
    }
  }

})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
