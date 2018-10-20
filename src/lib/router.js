// 导入vue
import Vue from 'vue'
// 导入路由模块
import VueRouter from 'vue-router'
Vue.use(VueRouter) // Vue实例使用vue-router路由

// 导入首页组件
import index from '../components/index.vue'
// 导入商品详情组件
import detail from '../components/detail.vue'
// 导入(自己写)购物车模块
import cart from '../components/cart.vue'
// 导入购物车模块
import shopcart from '../components/shopcart.vue'
// 导入登录页模块
import login from '../components/login.vue'
// 导入订单模块
import checkOrder from '../components/checkOrder.vue'
// 导入下单
import payOrder from '../components/payOrder.vue'
// 导入支付成功模块
import paySuccess from '../components/paySuccess.vue'
// 导入会员中心模块
import userInfo from '../components/userInfo.vue'
// 导入会员中心的信息模块
import info from '../components/userInfoChildren/info.vue'
// 导入会员中心的订单列表模块
import orderList from '../components/userInfoChildren/orderList.vue'
// 导入会员中心的订单信息模块
import orderInfo from '../components/userInfoChildren/orderInfo.vue'
// // 导入首页组件
// import index from '../components/index.vue'
// // 导入商品详情组件
// import detail from '../components/detail.vue'
// // 导入(自己写)购物车模块
// import cart from '../components/cart.vue'
// // 导入购物车模块
// import shopcart from '../components/shopcart.vue'
// // 导入登录页模块
// import login from '../components/login.vue'
// // 导入订单模块
// import checkOrder from '../components/checkOrder.vue'
// // 导入下单
// import payOrder from '../components/payOrder.vue'
// // 导入支付成功模块
// import paySuccess from '../components/paySuccess.vue'
// // 导入会员中心模块
// import userInfo from '../components/userInfo.vue'
// // 导入会员中心的信息模块
// import info from '../components/userInfoChildren/info.vue'
// // 导入会员中心的订单列表模块
// import orderList from '../components/userInfoChildren/orderList.vue'
// // 导入会员中心的订单信息模块
// import orderInfo from '../components/userInfoChildren/orderInfo.vue'

// 导入路由模块
// 一定要use一下
// 路由规则
const routes = [{
        path: '/',
        component: index,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/index',
        component: index,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/detail/:id',
        component: detail,
        meta: {
            title: '商品信息'
        }
    },
    {
        path: '/cart', // 自己写的
        component: cart,
        meta: {
            title: '购物车'
        }
    },
    {
        path: '/shopcart',
        component: shopcart,
        meta: {
            title: '购物车'
        }
    },
    {
        path: '/login',
        component: login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/checkOrder/:ids',
        component: checkOrder,
        meta: {
            title: '订单信息',
            // 标志位 => 表示进入这个页面是 就激活导航守卫
            checkLogin: true
        }
    },
    {
        path: '/payOrder/:orderId',
        component: payOrder,
        meta: {
            title: '支付',
            // 标志位 => 表示进入这个页面是 就激活导航守卫
            checkLogin: true
        }
    },
    {
        path: '/paySuccess',
        component: paySuccess,
        meta: {
            title: '支付成功',
            // 标志位 => 表示进入这个页面是 就激活导航守卫
            checkLogin: true
        }
    },
    {
        path: '/userInfo',
        component: userInfo,
        meta: {
            title: '支付成功',
            // 标志位 => 表示进入这个页面是 就激活导航守卫
            checkLogin: true
        },
        children: // 嵌套路由
            [{
                path: '',
                component: info,
                meta: {
                    title: '会员中心',
                },
            }, {
                path: 'info',
                component: info,
                meta: {
                    title: '会员中心',
                },
            }, {
                path: 'orderList',
                component: orderList,
                meta: {
                    title: '订单列表',
                },
            }, {
                path: 'orderInfo/:orderId',
                component: orderInfo,
                meta: {
                    title: '订单信息',
                },
            }]
    },
]

// 实例化路由
const router = new VueRouter({
    // 挂在路由规则
    routes
})

// 跳转到订单信息时判断是否登录
router.beforeEach((to, from, next) => {
    // 根据不同页面修改不同title
    window.document.title = to.meta.title
    // console.log(to) // 跳转之后的参数
    // console.log(from) // 跳转之前的参数
    // 跳转到订单信息后,如果请求接口返回为登录(nologin),则跳转首页
    if (to.meta.checkLogin == true) { // 如果有标记字段 就需要验证登录
        // 请求接口,根据返回的状态 
        Vue.prototype.$axios.get('site/account/islogin').then((response) => {
            // console.log(response)
            if (response.data.code == 'nologin') {
                // 跳转登录页
                router.push('/login')
            } else {
                // 继续操作
                next()
            }
        })
    } else {
        // 继续操作
        next()
    }
})
// 后置导航守卫
router.afterEach(() => {
    window.scroll(0, 0)
})

// 将router暴露出去
export default router