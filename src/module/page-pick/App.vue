<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">加工盘盈统计表</h3>
    </div>

    <div class="panel-body">
      <form class="form-inline">
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
          <select v-model="searchBy" class="form-control" @change="clsTable">
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
          <button type="button" class="btn btn-primary" @click="queryT">查询</button>
          <button type="button" @click="reset" class="btn btn-warning">重置</button>
        </div>
      </form>
      <button id='allexport' type="button" class="btn btn-success">全部导出</button>

      <Table border :columns="tableColumns" :data="tableData"></Table>
      <div style="margin: 10px 70px;overflow: hidden">
        <div style="float: right;">
          <Page :total="totalSize" :page-size="pageSize" showTotal show-sizer @on-change="changePage"></Page>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import Datepicker from '@/components/Datepicker'
  import Vue from 'vue'
  import iView from 'iview'
  import 'iview/dist/styles/iview.css';
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

  Vue.use(iView);

  export default {
    components: {
//      vSelect: VueStrap.select, 'VOption': VueStrap.option,
      Datepicker
    },
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
        tableData: [],
        pageNumber: 0,
        pageSize:10,
        totalSize:0
      }
    },
    created() {
      this._init(null)
    },
    computed: {
      tableColumns()
      {
        return [
          {
            title: '序号',
            key: 'index',
            width: 70,
            align: 'center',
            render (row, column, index) {
              row.index = index;
              return index + 1;
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 100,
            align: 'center',
            render (row, column, index) {
              return `<div class="btn-group-xs"><button type="button" data-style="zoom-in" class="jump btn btn-primary" @click="show(${index})">查看详情</button></div>`;
            }
          },
          {
            title: parseInt(this.searchBy) == 1 ? '月份' : '日期',
            key: 'date',
            align: 'center',
          },
          {
            title: 'SKUID',
            key: 'skuId',
            align: 'center',
          },
          {
            title: '商品名称',
            key: 'skuName',
            align: 'center',
          },
          {
            title: '规格',
            key: 'skuFormat',
            align: 'center',
          },
          {
            title: '累计盘盈(计价)',
            key: 'priceTotal',
            align: 'center',
          },
          {
            title: '累计盘盈(物理)',
            key: 'weightTotal',
            align: 'center',
          }
        ]
      },

    },
    methods: {
      _init(warehouseId) {
        axios.post('/baseDataUtil/dataItem', qs.stringify({warehouseId: warehouseId, type: "1"}))
            .then(res => {
          this.warehouseId = res.data.warehouseId
          this.wareHouseMap = res.data.wareHouseMap
        })
      },
      queryT() {
        const pd = {
          warehouseId: this.warehouseId,
          searchBy: this.searchBy,
          skuId: this.skuId,
          skuName: this.skuName,
          dateString: this.dateString,
          monthString: this.monthString,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        }
        axios.post('/packAutoCheckMore/getListData', pd)
            .then(res => {
//              console.log(JSON.stringify(res.data))
              this.tableData = res.data.data
              this.pageNumber = res.data.current_page
              this.totalSize = res.data.total_records
            })
            .catch(function (error) {
              console.log(error);
            });
      },
      reset() {
//        e.preventDefault()//如果type 为 reset
        this.searchBy = 0
        this.skuId = ''
        this.skuName = ''
        this.dateString = MCDateUtil.initAsDeliveryDate()
        this.monthString = MCDateUtil.getCurrnetMonth()
        this.tableData = []
      },
      clsTable() {
        this.tableData = []
      },
      warehouseIdChanged(sel) {
        console.log("warehouseIdChanged = %s",sel)
        this.clsTable()
      },
      show(index) {
        console.log("index = %s",index)
      },
      changePage(pageNumber) {
        console.log("pageNumber = %s",pageNumber)
        this.pageNumber = pageNumber
        this.queryT()
      },
    }
  }
</script>

<style>

</style>
