<style scoped>
  .btnArea {
    padding: 20px;
    padding-left: 50px;
    text-align: center;
  }

  .btn {
    display: inline-block;
    margin: 0 20px;
  }
  .tableBox{
    text-align: center;
  }
</style>
<template>
  <main>
    <h2 class="hdHeadline">销售人员每月最终佣金计算</h2>
    <div class="cf">
      <hd-select class="fl" title="管理机构" :required="true" :selectitems="manageList"
                 @getdata="getcomSelect"></hd-select>
      <hd-input class="fl" title="佣金所属年(YYYY)" :required="true" @getdata="getcomYear" :value="getParams.year"></hd-input>
      <hd-input class="fl" title="佣金所属月(MM)" :required="true" @getdata="getcomMonth"></hd-input>
    </div>
    <div class="btnArea">
      <div class="btn">
        <span @click="queryInfo"><hd-button type="query"></hd-button></span>
      </div>
      <div class="btn">
        <span @click="calcInfo"><hd-button
          :btnstyle='{"url":require("../assets/img/calc_icon.png"),"text":"计 算","color":"#49a7ad"}'></hd-button></span>
      </div>
      <div class="btn">
       <span @click="deleteData">
           <hd-button type="delete"></hd-button>
       </span>
      </div>
    </div>
    <div class="tableBox">
      <table class="hdTable">
        <thead>
        <th>管理机构编号</th>
        <th>管理机构名称</th>
        <th>佣金计算状态</th>
        </thead>
        <tbody>
        <tr v-if="queryList">
          <td>{{queryList.M}}</td>
          <td>{{queryList.N}}</td>
          <td>{{queryList.SN}}</td>
        </tr>
        </tbody>
      </table>
      <p v-show="isQueryInformation" style="margin-top:30px;color:darkred">没有查询到相关数据!</p>
    </div>
    <hd-tips :istips="isShowTips">
      <p>{{contentTips}}</p>
    </hd-tips>
    <hd-confirm :isconfirm="isShowConfirm" @getdata="getConfirm">
      <p>{{contentConfrim}}</p>
    </hd-confirm>
    <hd-dialog :isshow="isShowDiolag" @getdata="getShowStatus('isShowDiolag')">
      <p>{{contentText}}</p>
    </hd-dialog>
  </main>
</template>
<script>
  import {hdComponents} from "../js/components.js";

  export default {
    name: "commissionCalc",
    components: hdComponents,
    data: function () {
      return {
        manageList: [],
        isShowDiolag: false,
        isShowConfirm: false,
        isShowTips:false,
        contentText: '',
        contentConfrim: '您确定要进行佣金计算？',
        contentTips: '',
        getParams: {},
        queryList: "",
        isQureyInfo:false,
        isQueryInformation:false,
        binddata:''
      }
    },
    mounted: function () {
      this.getManageList();
    },
    methods: {
      getShowStatus(data) {
        this[data] = false;
      },
      getManageList() {
          this.$http.get(this.URL_PREFIX + '/broker/salary/queryManageCom.do',{params:{comcode: '9900000000'}})
            .then((data) => {
              if (data.status == 200) {
                for (let i = 0; i < data.data.length; i++) {
                  var Obj = {};
                  Obj.key = data.data[i].COMCODE;
                  Obj.value = data.data[i].SHORTNAME;
                  this.manageList.push(Obj);
                }
              }
            }).catch((err) => {
            console.log(err);
          });
      },
      getcomSelect(data) {
        this.getParams.comcode = data.key;
      },
      getcomYear(data) {
        this.getParams.year = data.replace(/\s/g,"");
        this.binddata =  this.getParams.year
        console.log(this.binddata);
      },
      getcomMonth(data) {
        this.getParams.month = data.replace(/\s/g,"");
      },
      //查询数据列表
      queryInfo() {
        var regYear = /^(1949|19[5-9]\d|20\d{2})$/;
        var regMonth = /^[0-9]*$/
        if (!this.getParams.comcode) {
          this.isShowDiolag = true;
          this.contentText = '请选择管理机构名称!';
          return;
        }
        if (!this.getParams.year) {
          this.isShowDiolag = true;
          this.contentText = '请输入查询年份!';
          return;
        } else if (!regYear.test(this.getParams.year)) {
          this.isShowDiolag = true;
          this.contentText = '输入的年份只能是数字!';
          return;
        } else if (this.getParams.year > new Date().getFullYear()) {
          this.isShowDiolag = true;
          this.contentText = '输入的年份不能超过当前年!';
          return;
        }
        if (!this.getParams.month) {
          this.isShowDiolag = true;
          this.contentText = '请输入查询月!';
          return;
        } else if (!regMonth.test(this.getParams.month)) {
          this.isShowDiolag = true;
          this.contentText = '输入月份只能是数字!';
          return;
        } else if (this.getParams.month < 1 || this.getParams.month > 12) {
          this.isShowDiolag = true;
          this.contentText = '输入月份在01~12之间!';
          return;
        }
        this.$http.post(this.URL_PREFIX + '/broker/salary/querySalary.do', this.getParams)
          .then((data) => {
            if (data.status == 200) {
              if (data.data.data && data.data.data != null) {
                this.queryList = data.data.data;
                this.isQureyInfo = true;
                this.isQueryInformation = false;
              } else {
                this.isQueryInformation = true;
              }
            }
          }).catch((err) => {
          console.log(err);
        });
      },
      //计算列表
      calcInfo() {
        if(!this.isQureyInfo){
          this.isShowDiolag = true;
          this.contentText = '请先进行佣金查询!';
          return;
        }
        this.isShowConfirm =true;
      },
      //删除列表
      deleteData() {
        if(!this.isQureyInfo){
          this.isShowDiolag = true;
          this.contentText = '请先查询佣金信息!';
          return;
        }
        this.$http.post(this.URL_PREFIX + '/broker/salary/deleteSalary.do?operator=001', this.getParams)
          .then((data) => {
            if (data.status == 200) {
              this.queryList = data.data.data
              this.isQureyInfo = false;
            }
          }).catch((err) => {
          console.log(err);
        });
      },
      getConfirm(data){
        this.isShowConfirm = false;
        if(data){
          if(this.queryList.S=='2'){
            this.isShowDiolag = true;
            this.contentText = '佣金已审核,不能够再计算！';
            return;
          }else{
            this.isShowTips = true;
            this.contentTips = '正在计算佣金，请稍等...'
            this.$http.post(this.URL_PREFIX + '/broker/salary/calculateSalary.do?operator=001', this.getParams)
              .then((data) => {
                if (data.status == 200) {
                  this.isShowTips = true;
                  this.contentTips = data.data.msg;
                  setTimeout(() => {
                    this.isShowTips = false;
                  }, 3500);
                }
              }).catch((err) => {
              console.log(err);
            });
          }
        }
      }
    }
  }
</script>
