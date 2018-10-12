// 导入路由模块
import VueRouter from 'vue-router'

// 导入首页组件
import index from './components/index.vue'
// 导入商品详情组件
import detail from './components/detail.vue'
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
    }
]

// 实例化路由
const router = new VueRouter({
    routes
})
export default router