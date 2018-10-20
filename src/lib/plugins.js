// 导入vue
import Vue from 'vue'

// 导入放大镜模块
import ProductZoomer from 'vue-product-zoomer'
// Vue实例使用放大镜模块
Vue.use(ProductZoomer)


// 导入懒加载模块
import VueLazyload from 'vue-lazyload'
// 懒加载实例
Vue.use(VueLazyload, {
  // 报警图片
  error: 'dist/error.png',
  // 懒加载图片
  loading: require('../assets/loading.jpg'),
})

// 导入二维码模块
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)




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