// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iView'
import App from './App'

// import locale from 'iview/src/locale/lang/en-US';
import locale from 'iview/src/locale/lang/zh-CN';
// import 'iview/dist/styles/iview.css'


Vue.use(iView, { locale });


Vue.config.productionTip = false
// 开启debug模式
Vue.config.debug = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
