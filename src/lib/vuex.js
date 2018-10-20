// 1. 引入vue
import Vue from "vue"
// 2. 引入vuex
import Vuex from 'vuex'
// 3. 注册vuex到vue中
Vue.use(Vuex)
// 4. 实例话一个数据仓库对象
const store = new Vuex.Store({
  // 1. 数据设置到state中  不能直接修改，如果想要修改,必须通过mutations
  state: {
    // 2. 如果组件模板要想直接从state上获取数据.需要: this.$store.state.addCart
    count: 0,
    // 先定义一个空对象,数据格式: { 商品id:购买个数  ,商品id2:购买个数}   数据常驻
    shopCartData: JSON.parse(localStorage.getItem('totalCar')) || {},
    // 定义一个登录状态
    isLogin: false,
  },
  // 修改数据的方式  (提交载荷)  
  // 3. 如果组件想要修改数据, 必须使用mutations提供的方法,需要 this.$store.commit("方法的名称", 唯一的参数)
  mutations: {
    // 测试vuex
    increment(state) {
      state.count++
    },
    // 添加购物车 
    addCart(state, opt) {
      // console.log(state)
      // console.log(opt)
      // 判断,如果是首次添加的商品,则直接赋值, 否则+=   对象的键值对  id: buyNum => 90: 1
      if (state.shopCartData[opt.id] == undefined) {
        // 对象赋值: 如果没有这个属性，则是添加一个属性
        // state.shopCartData[opt.id] = opt.buyNum
        // 必须添加: Vue.set   当需要在对象上添加新属性时，你应该
        Vue.set(state.shopCartData, opt.id, opt.buyNum)
      } else {
        state.shopCartData[opt.id] += opt.buyNum
      }

    },
    updateCart(state, opt) {
      // 获取id
      state.shopCartData[opt.id] = opt.newCount
    },
    // 删除商品
    delById(state, id) {
      // 直接使用Vue.delete 可以动态的删除数据  
      Vue.delete(state.shopCartData, id)
    },
    // 登录状态
    changeLoginState(state, login) {
      state.isLogin = login;
    }

    // 删除商品  自写
    // removeGood(state, obj) {
    //   //   localStorage.setItem('obj',JSON.stringify(obj))
    //   //   console.log(obj)
    //   if (confirm("确定要移除购物车吗")) {
    //     // if(state.shopCartData[obj] == obj){
    //     delete state.shopCartData[obj]
    //     // }
    //     //     delete state.shopCartData[obj.id]
    //     if (JSON.stringify(state.shopCartData) == '{}') {
    //       state.totalCount = 0
    //     }
    //   }
    //   // window.localStorage.setItem('totalCar',state.shopCartData)
    //   localStorage.setItem('totalCar', JSON.stringify(state.shopCartData))
    // }
  },
  // getter 类似于Vue的计算属性  只负责对外提供数据,不负责修改数据
  getters: {
    cartDataCount(state) {
      //   console.log(state)
      let totalCount = 0;
      // 遍历state里的数据 shopCartData
      for (const key in state.shopCartData) {
        //  将对象的属
        //性+=给购物车总数量 
        totalCount += state.shopCartData[key]
      }
      // 
      return totalCount;
    }
  }
})

// 5. 将vuex的数据仓库对象暴露出去,并挂在到vue中
window.onunload = function () {
  // 数据常驻
  localStorage.setItem('totalCar', JSON.stringify(store.state.shopCartData))
}

export default store
