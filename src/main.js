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
// 引入element-ui模块
import ElementUI from 'element-ui';
// 引入iview模块
import iview from "iview";
// 引入iview模块样式
import 'iview/dist/styles/iview.css';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router.js'
// 导入懒加载模块
import VueLazyload from 'vue-lazyload'
// 导入放大镜模块
import ProductZoomer from 'vue-product-zoomer'
// Vue实例使用放大镜模块
Vue.use(ProductZoomer)
// 一定要use一下
Vue.use(VueRouter)  // Vue实例使用vue-router路由
Vue.use(ElementUI)  // Vue实例使用element-ui
Vue.use(iview)      // Vue实例使用iview

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
Vue.filter('formatTime',(data,format='YYYY-MM-DD')=>{
  // 格式化日期 使用moment.js来格式化  默认'YYYY-MM-DD
  return moment(data).format(format)
})

// 导入Vuex模块
import Vuex from 'vuex'
// Vue实例使用Vuex模块
Vue.use(Vuex)
// 实例化Vuex
const store = new Vuex.Store({
  // 数据设置到state中
  state: {
    count: 0,
    // 先定义一个空对象,数据格式: { 商品id:购买个数  ,商品id2:购买个数}   数据常驻
    shopCartData: JSON.parse(localStorage.getItem('totalCar')) || {}
  },
  // 修改数据的方式  (提交载荷)
  mutations: {
    // 测试vuex
    increment (state) {
      state.count++
    },
    // 添加购物车
    addCart(state,opt){
      // console.log(state)
      // console.log(opt)
      // 判断,如果是首次添加的商品,则直接赋值, 否则+=   对象的键值对  id: buyNum => 90: 1
      if(state.shopCartData[opt.id] == undefined){
        // 对象赋值: 如果没有这个属性，则是添加一个属性
        // state.shopCartData[opt.id] = opt.buyNum
        // 必须添加: Vue.set   当需要在对象上添加新属性时，你应该
        Vue.set(state.shopCartData, opt.id, opt.buyNum)
      }else{
        state.shopCartData[opt.id] += opt.buyNum
      }
      // 数据常驻
      localStorage.setItem('totalCar',JSON.stringify(state.shopCartData))

    }
  },
  // getter 类似于Vue的计算属性
  getters: {
    cartDataCount(state){
      console.log(state)
      var totalCount = 0;
      // 遍历state里的数据 shopCartData
      for (const key in state.shopCartData) {
        //  将对象的属性+=给购物车总数量 
         totalCount += state.shopCartData[key]
      }
      return totalCount;
    }
  }
})

// 实例化vue
new Vue({
  // 渲染主组件
  render: h => h(App),
  // 挂载路由
  router,
  // 挂载 Vuex
  store
}).$mount('#app') // 挂载到index页面#app的div上
