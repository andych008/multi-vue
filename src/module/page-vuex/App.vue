<template>
  <div>
    <Card style="width:320px">
      <p slot="title" style="text-align:center">标准卡片</p>
      <p>{{value}}</p>
    </Card>

    <Button @click="increment">加1</Button>
    <Button @click="decrement">减1</Button>
  </div>

</template>

<script>
  import Vue from 'vue'
  import Vuex from 'vuex'
  import iView from 'iview'
  import 'iview/dist/styles/iview.css';

  Vue.use(iView);
  Vue.use(Vuex)

  const store = new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      increment: state => state.count++,
      decrement: state => state.count--
    }
  })

  export default {
    computed: {
      value () {
        return store.state.count
      }
    },
    methods: {
      increment () {
        store.commit('increment')
      },
      decrement () {
        store.commit('decrement')
      }
    }
  }
</script>

<style>

</style>
