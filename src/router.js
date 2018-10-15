// 导入axios
import axios from 'axios'
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
// 导入登录模块
import checkOrder from './components/checkOrder.vue'
// 导入路由模块
// 一定要use一下
// 路由规则
const routes = [{
        path: '/',
        component: index
    },
    {
        path: '/index',
        component: index
    },
    {
        path: '/detail/:id',
        component: detail
    },
    {
        path: '/cart', // 自己写的
        component: cart
    },
    {
        path: '/shopcart',
        component: shopcart
    },
    {
        path: '/checkOrder',
        component: checkOrder
    }
]

// 实例化路由
const router = new VueRouter({
    routes
})


// 跳转到订单信息时判断是否登录
router.beforeEach((to, from, next) => {
    console.log('跳转了')
    console.log(to)
    console.log(from)
    console.log(this)
    // 跳转到订单信息后,如果请求接口返回为登录(nologin),则跳转首页
    if(to.path == '/checkOrder'){
        // 请求接口,根据返回的状态 
        axios.get('site/account/islogin').then((response)=>{
            console.log(response)
            if(response.data.code == 'nologin'){
                router.push('/index')
            }else{
                next()
            }
        })
    }else{
        next()
    }
    


})
export default router