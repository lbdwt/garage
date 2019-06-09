<style scoped>
  .btnArea {
    padding: 20px;
    text-align: center;
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
    <h2 class="hdHeadline">用户角色</h2>
    <div class="cf">
      <hd-input class="fl" title="角色代码"
                @getdata="getRoleCode" readonly="true" placeholder="系统自动生成"></hd-input>
      <hd-input class="fl" title="角色名称"
                @getdata="getRoleName"></hd-input>
      <hd-select class="fl" title="状态" :selectitems="getStatusList"
                 @getdata="getStatus"></hd-select>
      <hd-select class="fl" title="是否分多个职级" :selectitems="dataList"
                 @getdata="getLevel"></hd-select>
      <hd-select class="fl" title="是否算佣金" :selectitems="dataList"
                 @getdata="getCommission"></hd-select>
      <hd-select class="fl" title="是否参加考核" :selectitems="dataList"
                 @getdata="getAssessment"></hd-select>
    </div>
    <div class="btnArea">
      <div class="btn">
        <span @click="addInfo"><hd-button type="add"></hd-button></span>
      </div>
      <div class="btn">
        <span @click="modifyInfo"><hd-button type="modify"></hd-button></span>
      </div>
      <div class="btn">
        <span @click="deleteInfo"><hd-button type="delete"></hd-button></span>
      </div>
      <div class="btn">
        <span @click="queryInfo"><hd-button type="query"></hd-button></span>
      </div>
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
        getRoleList: [],
        getStatusList: [{key: '0', value: '失效'}, {key: '1', value: '生效'}],
        dataList: [{key: 'Y', value: '是'}, {key: 'N', value: '否'}],
        isShowDiolag: false,
        contentText: '',
        paramsInfo: {}
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
      getStatus(data) {
      },
      getLevel(data) {
      },
      getCommission(data) {
      },
      getAssessment(data) {
      },
      //增加
      addInfo() {
      },
      //修改
      modifyInfo() {
      },
      //删除
      deleteInfo() {
      },
      //查询
      queryInfo() {
        this.$router.push({name:'userRoleQuery'});
      }
    }
  }
</script>

