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
  import iView from 'iview'
  import 'iview/dist/styles/iview.css';

  Vue.use(iView);

  export default {
    computed: {
      value () {
        return this.$store.state.count
      }
    },
    methods: {
      increment () {
        this.$store.commit('increment')
      },
      decrement () {
        this.$store.commit('decrement')
      }
    }
  }
</script>

<style>

</style>
