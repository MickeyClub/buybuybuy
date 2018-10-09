import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入路由
import VueRouter from 'vue-router'
// 导入首页组件
import index from './components/index.vue'

// 一定要use一下
Vue.use(VueRouter)

// 路由规则
const routes = [
  {
    path: '/',
    component: index
  },
  {
    path: '/index',
    component: index
  }
]

// 实例化路由
const router = new VueRouter({
  routes
})


new Vue({
  render: h => h(App),
  // 挂在路由
  router
}).$mount('#app')
