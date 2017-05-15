<template>
  <div id="app">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import qs from 'qs'
  import axios from '@/js/axios-common';
  import ElementUI from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'
  import '@/js/wms.js'

  Vue.use(ElementUI)

  export default {
    components: {
    },
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

<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
     margin-bottom: 0;
   }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
