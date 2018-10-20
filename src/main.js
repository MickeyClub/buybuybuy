// 引入 Vue模块
import Vue from 'vue'
// 引入App.vue页面
import App from './App.vue'

// 默认开发
Vue.config.productionTip = false

// 导入第三方插件
import './lib/plugins'

// 导入过滤器
import './lib/filters'

// 导入router模块数据
import router from './lib/router.js'

// 导入vuex模块的store数据仓库对象
import store from "./lib/vuex"

// 导入ui库
import './lib/ui'

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