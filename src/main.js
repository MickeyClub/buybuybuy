// 引入 Vue模块
import Vue from 'vue'
// 引入App.vue页面
import App from './App.vue'
// 默认开发
Vue.config.productionTip = false
// 引入 路由模块
import VueRouter from 'vue-router'

// 引入element-ui模块
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router.js'
// 一定要use一下
Vue.use(VueRouter)
Vue.use(ElementUI)

// 实例化vue
new Vue({
  // 渲染主组件
  render: h => h(App),
  // 挂载路由
  router
}).$mount('#app') // 挂载到index页面#app的div上
