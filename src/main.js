// 引入 Vue模块
import Vue from 'vue'
// 引入App.vue页面
import App from './App.vue'
// 默认开发
Vue.config.productionTip = false
// 引入 路由模块
import VueRouter from 'vue-router'
// 全局导入 axios 
import axios from "axios";
// 把axios放到Vue的原型中,这样就可以共享了
Vue.prototype.$axios = axios;
// Vue.prototype.$baseURL = 'http://111.230.232.110:8899'
// 设置axios基路径
axios.defaults.baseURL = 'http://111.230.232.110:8899';
// 设置axios跨域请求携带cookie
// 跨域是否携带凭证
axios.defaults.withCredentials = true;
// 引入element-ui模块
import ElementUI from 'element-ui';
// 引入iview模块
import iview from "iview";
// 引入iview模块样式
import 'iview/dist/styles/iview.css';
import 'element-ui/lib/theme-chalk/index.css';

// 导入懒加载模块
import VueLazyload from 'vue-lazyload'
// 导入放大镜模块
import ProductZoomer from 'vue-product-zoomer'
// Vue实例使用放大镜模块
Vue.use(ProductZoomer)
// 一定要use一下
Vue.use(VueRouter) // Vue实例使用vue-router路由
Vue.use(ElementUI) // Vue实例使用element-ui
Vue.use(iview) // Vue实例使用iview

// 懒加载实例
Vue.use(VueLazyload, {
  // 报警图片
  error: 'dist/error.png',
  // 懒加载图片
  loading: require('./assets/loading.jpg'),
})

// 导入moment.js时间插件
import moment from 'moment';
// 全局过滤器  
// 参数1 是过滤的那个值，后面才是你要的参数
Vue.filter('formatTime', (data, format = 'YYYY-MM-DD') => {
  // 格式化日期 使用moment.js来格式化  默认'YYYY-MM-DD
  return moment(data).format(format)
})

// 导入router模块数据
import router from './router.js'

// 导入vuex模块的store数据仓库对象
import store from "./vuex"

// 导入二维码模块
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)


// 实例化vue
new Vue({
  // 渲染主组件
  render: h => h(App),
  // 挂载路由
  router,
  // 挂载 Vuex
  store,
  // 页面(一打开)重现刷新后,需要重新判断登录状态,否则vuex的登录状态默认是false  ==> 将它放到了App.vue中,因为mian.js最终也是挂在到App.vue上
  // created() {
  //   axios.get('site/account/islogin').then((response)=>{
  //     console.log(response)
  //     if(response.data.code == "logined"){
  //       store.commit('changeLoginState',true)
  //     }
  //   })
  // },
}).$mount('#app') // 挂载到index页面#app的div上


// window.onbeforeunload = function () {
//   localStorage.setItem('totalCar',JSON.stringify(store.state.shopCartData))
// }