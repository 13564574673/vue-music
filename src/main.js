import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局样式
import './assets/stylus/index.scss'
// 移动端300ms延迟
import FastClick from 'fastclick'
// 解决移动端300ms延迟

FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
