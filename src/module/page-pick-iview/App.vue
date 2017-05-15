<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
  }
  .layout-assistant{
    width: 300px;
    margin: 0 auto;
    height: inherit;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
</style>
<template>
  <div class="layout">
    <div class="layout-breadcrumb">

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
//      this._init(null)
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
