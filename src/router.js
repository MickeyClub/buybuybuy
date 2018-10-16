// 导入axios
import Vue from 'vue'
// 导入路由模块
import VueRouter from 'vue-router'
// 导入首页组件
import index from './components/index.vue'
// 导入商品详情组件
import detail from './components/detail.vue'
// 导入(自己写)购物车模块
import cart from './components/cart.vue'
// 导入购物车模块
import shopcart from './components/shopcart.vue'
// 导入登录页模块
import login from './components/login.vue'
// 导入订单模块
import checkOrder from './components/checkOrder.vue'


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
        path: '/checkOrder',
        component: checkOrder,
        meta: {
            title: '订单信息'
        }
    },
    {
        path: '/login',
        component: login,
        meta: {
            title: '登录'
        }
    },
]

// 实例化路由
const router = new VueRouter({
    routes
})


// 跳转到订单信息时判断是否登录
router.beforeEach((to, from, next) => {
    console.log(to)  // 跳转之后的参数
    console.log(from)  // 跳转之前的参数
    // 跳转到订单信息后,如果请求接口返回为登录(nologin),则跳转首页
    if(to.path == '/checkOrder'){
        // 请求接口,根据返回的状态 
        Vue.prototype.$axios.get('site/account/islogin').then((response)=>{
            console.log(response)
            // console.log(response)
            if(response.data.code == 'nologin'){
                // 跳转登录页
                router.push('/login')
            }else{
                // 继续操作
                next()
            }
        })
    }else{
        // 继续操作
        next()
    }
    


})
export default router