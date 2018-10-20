// 导入vue
import Vue from 'vue'

// 导入moment.js时间插件
import moment from 'moment';
// 全局过滤器  
// 参数1 是过滤的那个值，后面才是你要的参数
Vue.filter('formatTime', (data, format = 'YYYY-MM-DD') => {
  // 格式化日期 使用moment.js来格式化  默认'YYYY-MM-DD
  return moment(data).format(format)
})