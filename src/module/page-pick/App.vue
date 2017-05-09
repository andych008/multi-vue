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
          <!--:value.sync="val"-->
          <v-select v-model="warehouseId" :options="wareHouseMap"  options-label="name" options-value="id" @change="warehouseIdChanged" placeholder="请选择仓库">
          </v-select>
          <!--<select name="warehouseId" class="form-control" onchange="refreshData();">-->
            <!--<option v-for="warehouse in wareHouseMap" :value="warehouse.id">-->
              <!--{{warehouse.name}}-->
            <!--</option>-->
          <!--</select>-->
        </div>
        <div class="form-group">
          <label>查询维度</label>
          <select v-model="searchBy" class="form-control" @change="onSearchBy">
            <option value="0">按天查</option>
            <option value="1">按月查</option>
          </select>
        </div>

        <div class="form-group" id="dateDiv">
          <label>日期</label>
          <datepicker v-model="dateString" format="yyyy-MM-dd" placeholder="请选择"></datepicker>
        </div>

        <div class="form-group" id="monthDiv">
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
          <button type="reset" class="btn btn-warning">重置</button>
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
  import VueStrap from 'vue-strap'
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
        warehouseId: '1',
        searchBy: 0,
        skuId: '',
        skuName: '',
        dateString: MCDateUtil.initAsDeliveryDate(),
        monthString: MCDateUtil.getCurrnetMonth(),
      }
    },
    components: {
      vSelect: VueStrap.select, 'VOption': VueStrap.option, Datepicker
    },
    created() {
      this._init()
    },
    methods: {
      _init() {
        axios.post('/baseDataUtil/dataItem', qs.stringify({ 'bar': 123 }))
            .then(res => {
          this.warehouseId = res.data.warehouseId
          this.wareHouseMap = warehouseMap2Array(res.data.wareHouseMap)
        })
      },
      warehouseIdChanged(sel) {
        console.log("warehouseIdChanged = %s",sel)
      },
      onSearchBy() {
        console.log("onSearchBy")
      }
    }
  }

  function warehouseMap2Array(wareHouseMap) {
    //JSON.stringify(objArr)
    let objArr = []
    for (const key in wareHouseMap) {
      objArr.push({id: key, name: wareHouseMap[key]});
    }
    return objArr
  }
</script>

<style>

</style>
