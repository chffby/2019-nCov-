// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'lib-flexible'
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts
import axios from 'axios'
import VueAxios from 'vue-axios'


import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
Vue.use(VueAxios, axios)

axios.defaults.baseURL = '/api'//跨域使用
//（注意：不使用use来使用该例，而是用prototype原型来使用
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
