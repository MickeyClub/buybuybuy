// 导入vue
import Vue from 'vue'
// 引入element-ui模块
// import ElementUI from 'element-ui';
// 按需加载ui组件
import {
    carousel,
    CarouselItem,
    Input,
    FormItem,
    Radio
} from 'element-ui';
// 引入iview模块
import iview from "iview";
// Vue.use(ElementUI) // Vue实例使用element-ui
Vue.use(carousel) 
Vue.use(CarouselItem) 
Vue.use(Input) 
Vue.use(FormItem) 
Vue.use(Radio) 
Vue.use(iview) // Vue实例使用iview
// 引入iview模块样式
import 'iview/dist/styles/iview.css';
import 'element-ui/lib/theme-chalk/index.css';