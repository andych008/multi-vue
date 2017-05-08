<template>
  <div>
    <Card style="width:320px">
      <p slot="title" style="text-align:center">标准卡片</p>
      <p>{{this.$store.state.count}}</p>
      <p>{{value}}</p>
      <p>{{count}}</p>
    </Card>
    <Card style="width:320px">
      <p slot="title" style="text-align:center">是否为奇数</p>
      <p>{{this.$store.getters.isOdd}}</p>
    </Card>
    <Button-group>
      <Button @click="increment">加1</Button>
      <Button @click="decrement">减1</Button>
    </Button-group>
  </div>

</template>

<script>
  import Vue from 'vue'
  import iView from 'iview'
  import 'iview/dist/styles/iview.css';
  import { mapState, mapMutations} from 'vuex'
  import {MUTATION_INCREMENT, MUTATION_DECREMENT} from './mutation-types'

  Vue.use(iView);

  export default {
    computed: {
      value () {
        return this.$store.state.count
      },
        ...mapState(['count'])
    },
    methods: {
//      increment () {
//        this.$store.commit(MUTATION_INCREMENT)
//      },
//      decrement () {
//        this.$store.commit(MUTATION_DECREMENT)
//      },
      //同上
      ...mapMutations([
        MUTATION_INCREMENT, MUTATION_DECREMENT // 映射 this.increment() 为 this.$store.commit('increment')
      ]),
    }
  }
</script>

<style>

</style>
