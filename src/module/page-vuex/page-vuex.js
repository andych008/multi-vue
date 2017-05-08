// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import {MUTATION_INCREMENT, MUTATION_DECREMENT} from './mutation-types'

Vue.use(Vuex)

Vue.config.productionTip = false
// 开启debug模式
Vue.config.debug = true;

const store = new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    isOdd: state => {
      return state.count%2!=0
    }
  },
  mutations: {
    [MUTATION_INCREMENT]: state => state.count++,
    [MUTATION_DECREMENT]: state => state.count--
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  template: '<App/>',
  components: { App }
})
