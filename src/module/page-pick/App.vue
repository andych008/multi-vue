<template>
  <div id="main_tableObj" class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">加工盘盈统计表</h3>
    </div>

    <div id = "home" class="panel-body tableObj-q">
      <form id="formObj" class="form-inline" role="form" action="javascript:void(0);" onsubmit="tableObj.query(this);"
            onkeydown="if(event.keyCode==13){return false;}" novalidate>
        <div class="form-group">
          <label>仓库</label>
          <!--:value.sync="val"-->
          <v-select v-model="warehouseId" :options="warehouseMap"  options-label="name" options-value="id" showCount="true">
          </v-select>
          <!--<select name="warehouseId" class="form-control" onchange="refreshData();">-->
            <!--<option v-for="warehouse in warehouseMap" :value="warehouse.id">-->
              <!--{{warehouse.name}}-->
            <!--</option>-->
          <!--</select>-->
        </div>
        <div class="form-group">
          <label>查询维度</label>
          <select name="searchBy" class="form-control" onchange="onSearchBy();">
            <option value="0">按天查</option>
            <option value="1">按月查</option>
          </select>
        </div>

        <div class="form-group" id="dateDiv">
          <label for="dateString" class="" style="width:90px;">日期</label>
          <div class="input-group date">
            <input type="text" class="form-control" style="width:150px;" id="dateString" name="dateString"  placeholder="请选择" required="required"/>
          </div>
        </div>

        <div class="form-group" id="monthDiv">
          <label for="monthString" class="" style="width:90px;">月份</label>
          <div class="input-group date">
            <input type="text" class="form-control" style="width:150px;" id="monthString" name="monthString"  placeholder="请选择" required="required"/>
          </div>
        </div>

        <div class="form-group">
          <label>SKUID</label>
          <input name="skuId" class="form-control"/>
        </div>
        <div class="form-group">
          <label>商品名称</label>
          <input name="skuName" style="width:180px" class="form-control"  placeholder="支持模糊查询商品名称"/>
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
  import Vue from 'vue'
  import VueStrap from 'vue-strap'
  import '@/lib/bootstrap-3.3.5/css/bootstrap.min.css'
  import '@/lib/bootstrap-3.3.5/css/bootstrap-theme.css'
  import '@/lib/bootstrap-3.3.5/css/bootstrap-select.css'
  import '@/css/meicai-view-css.css'
//  import '@/css/common.css'
  import '@/css/wms.css'

  export default {
    props: ['post'],
    data () {
      return {
        warehouseMap: [{
          id:1,name:'北京1'
        },{
          id:2,name:'北京2'
        },{
          id:3,name:'北京3'
        }],
        warehouseId:1
      }
    },
    components: {
      vSelect: VueStrap.select, 'v-option': VueStrap.option,
    }
  }
</script>

<style>

</style>
