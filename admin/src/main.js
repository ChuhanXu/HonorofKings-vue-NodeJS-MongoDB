import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http=http
// 加载到一个vue的实例属性上面后原型上面之后，我们可以在任意的页面用this.$http去访问数据请求接口

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
