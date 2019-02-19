// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {get, post, patch, put} from './common/js/http' //引入公共axios请求方法
import 'common/style/md-reset.scss';
import 'github-markdown-css';

Vue.config.productionTip = false

// 使用原型链调用封装的axios函数
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$patch = patch
Vue.prototype.$put = put

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
