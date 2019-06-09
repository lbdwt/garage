<style scoped>
  .btnArea {
    padding: 20px;
    padding-left:160px;
  }

  .btn {
    display: inline-block;
    margin: 0 20px;
  }

  .tableBox {
    text-align: center;
  }
</style>
<template>
  <main>
    <h2 class="hdHeadline">角色查询</h2>
    <div class="cf">
      <hd-input class="fl" title="角色ID"
                @getdata="getRoleCode" ></hd-input>
      <hd-input class="fl" title="角色名称"
                @getdata="getRoleName"></hd-input>
    </div>
    <div class="btnArea">
      <div class="btn">
        <span @click="queryInfo"><hd-button type="query"></hd-button></span>
      </div>
      <div class="btn">
        <span @click="backInfo"><hd-button type="back"></hd-button></span>
      </div>
    </div>
    <div class="tableBox">
      <table class="hdTable">
        <thead>
        <th></th>
        <th>角色ID</th>
        <th>角色名</th>
        <th>状态</th>
        <th>是否分多个职级</th>
        <th>是否算佣金</th>
        <th>是否参加考核</th>
        </thead>
        <tbody>
        <tr v-for="(item,index) in queryList">
          <td><input type="radio"></td>
          <td>{{item.ROW_ID}}</td>
          <td>{{item.TIME}}</td>
          <td>{{item.AGENTCODE}}</td>
          <td>{{item.AGENTNAME}}</td>
          <td>{{item.CORPORATION}}</td>
          <td>{{item.MONEY}}</td>
        </tr>
        </tbody>
      </table>
      <hd-turnpage v-if="totalPage" :turnPageData="{curPage:currentPage ,pageNum:totalPage}"
                   style="text-align:center; margin-top:20px" @getdata="getCurrentPage"></hd-turnpage>
    </div>
    <hd-dialog :isshow="isShowDiolag" @getdata="getShowStatus('isShowDiolag')">
      <p>{{contentText}}</p>
    </hd-dialog>
  </main>
</template>
<script>
  import {hdComponents} from "../js/components.js";

  export default {
    name: "userRole",
    components: hdComponents,
    data: function () {
      return {
        isShowDiolag: false,
        contentText: '',
        paramsInfo: {},
        currentPage:1,
        totalPage:0,
        queryList:[]
      }
    },
    mounted: function () {

    },
    methods: {
      //提示框
      getShowStatus(data) {
        this[data] = false;
      },
      getRoleCode(data) {
      },
      getRoleName(data) {
      },
      //返回
      backInfo() {
      },
      //查询
      queryInfo() {
      }
    }
  }
</script>

