<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">加工盘盈统计表</h3>
    </div>

    <div class="panel-body">
      <form class="form-inline" role="form" action="javascript:void(0);" onsubmit="tableObj.query(this);"
            onkeydown="if(event.keyCode==13){return false;}" novalidate>
        <div class="form-group">
          <label>仓库</label>
          <select v-model="warehouseId" class="form-control" @change="warehouseIdChanged">
            <option v-for="(text, val) in wareHouseMap" :value="val">
              {{text}}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>查询维度</label>
          <select v-model="searchBy" class="form-control">
            <option value="0">按天查</option>
            <option value="1">按月查</option>
          </select>
        </div>

        <div class="form-group" v-show="searchBy==0">
          <label>日期</label>
          <datepicker v-model="dateString" format="yyyy-MM-dd" placeholder="请选择"></datepicker>
        </div>

        <div class="form-group" v-show="searchBy==1">
          <label>月份</label>
          <datepicker v-model="monthString" :is-month="true" format="yyyy-MM" placeholder="请选择"></datepicker>
        </div>

        <div class="form-group">
          <label>SKUID</label>
          <input v-model="skuId" class="form-control"/>
        </div>

        <div class="form-group">
          <label>商品名称</label>
          <input v-model="skuName" class="form-control"  placeholder="支持模糊查询商品名称"/>
        </div>

        <div class="form-group">
          <label></label>
          <button type="submit" class="btn btn-primary" formaction="javascript:void(0);">查询</button>
          <button type="button" @click="resetForm" class="btn btn-warning">重置</button>
        </div>
      </form>
      <button id='allexport' type="button" class="btn btn-success">全部导出</button>

      <table id="table1" class="table table-hover"></table>
    </div>


  </div>
</template>

<script>
  import Datepicker from '@/components/Datepicker'
  import Vue from 'vue'
//  import VueStrap from 'vue-strap'
  import qs from 'qs'
  import axios from '@/js/axios-common';
  import '@/js/vue-strap-lang.js'
  import '@/lib/bootstrap-3.3.5/css/bootstrap.min.css'
  import '@/lib/bootstrap-3.3.5/css/bootstrap-theme.css'
  import '@/lib/bootstrap-3.3.5/css/bootstrap-select.css'
  import '@/css/meicai-view-css.css'
  import '@/css/wms.css'
  import '@/js/wms.js'

  export default {
    props: ['post'],
    data () {
      return {
        wareHouseMap: [],
        warehouseId: '',
        searchBy: 0,
        skuId: '',
        skuName: '',
        dateString: MCDateUtil.initAsDeliveryDate(),
        monthString: MCDateUtil.getCurrnetMonth(),
      }
    },
    created() {
      this._init(null)
    },
    components: {
//      vSelect: VueStrap.select, 'VOption': VueStrap.option,
      Datepicker
    },
    methods: {
      _init(warehouseId) {
        axios.post('/baseDataUtil/dataItem', qs.stringify({warehouseId: warehouseId, type: "1"}))
            .then(res => {
          this.warehouseId = res.data.warehouseId
          this.wareHouseMap = res.data.wareHouseMap
        })
      },
      resetForm() {
//        e.preventDefault()//如果type 为 reset
        this.searchBy = 0
        this.skuId = ''
        this.skuName = ''
        this.dateString = MCDateUtil.initAsDeliveryDate()
        this.monthString = MCDateUtil.getCurrnetMonth()
      },
      warehouseIdChanged(sel) {
        console.log("warehouseIdChanged = %s",sel)
      }
    }
  }
</script>

<style>

</style>
