import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import 'babel-polyfill'
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
if (process.env.NODE_ENV !== 'development') {
  Vue.prototype.URL_PREFIX = '';
} else {
  Vue.prototype.URL_PREFIX = 'http://10.63.2.132:8081';
}

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
