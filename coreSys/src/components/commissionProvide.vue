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
    <h2 class="hdHeadline">薪资信息查询条件</h2>
    <div class="cf">
      <hd-select class="fl" title="管理机构" :required="true" :selectitems="manageList"
                 @getdata="getcalcSelect" :value="setParams"></hd-select>
      <hd-input class="fl" title="佣金所属年(YYYY)" :required="true" @getdata="getcomYear"
                :value="getParams.year"></hd-input>
      <hd-input class="fl" title="佣金所属月(MM)" :required="true" @getdata="getcomMonth"
                :value="getParams.month"></hd-input>
    </div>
    <div class="btnArea">
      <div class="btn">
        <span @click="getAllList"> <hd-button type="query"></hd-button></span>
      </div>
      <div class="btn">
        <span @click="resetList"> <hd-button type="reset"></hd-button></span>
      </div>
      <div class="btn">
        <span @click="finalConfirm"> <hd-button
          :btnstyle='{"url":require("../assets/img/calc_icon.png"),"text":"薪酬审核","color":"#3f9a41"}'></hd-button></span>
      </div>
    </div>
    <div class="tableBox">
      <table class="hdTable">
        <thead>
        <th>序号</th>
        <th>年月代码</th>
        <th>销售人员编码</th>
        <th>销售人员姓名</th>
        <th>管理机构</th>
        <th>实发金额</th>
        <th>发放状态</th>
        </thead>
        <tbody>
        <tr v-for="item in comissionList">
          <td>{{item.ROW_ID}}</td>
          <td>{{item.TIME}}</td>
          <td>{{item.AGENTCODE}}</td>
          <td>{{item.AGENTNAME}}</td>
          <td>{{item.CORPORATION}}</td>
          <td>{{item.MONEY}}</td>
          <td>{{item.STATUS}}</td>
        </tr>
        </tbody>
      </table>
      <p v-show="isQueryInfortion" style="margin-top:30px;color:darkred">没有查询到需要审核的薪资信息！</p>
      <hd-turnpage v-if="totalPage" :turnPageData="{curPage:currentPage ,pageNum:totalPage}"
                   style="text-align:center; margin-top:20px" @getdata="getCurrentPage"></hd-turnpage>
    </div>
    <hd-tips :istips="isShowTips">
      <p>{{contentTips}}</p>
    </hd-tips>
    <hd-dialog :isshow="isShowDiolag" @getdata="getShowStatus('isShowDiolag')">
      <p>{{contentText}}</p>
    </hd-dialog>
  </main>
</template>
<script>
  import {hdComponents} from "../js/components.js";

  export default {
    name: "commissionProvide",
    components: hdComponents,
    data: function () {
      return {
        manageList: [],
        getParams: {year: '', month: ''},
        isShowDiolag: false,
        contentText: "",
        comissionList: [],
        currentPage: 1,
        totalPage: 0,
        pageSize: 10,
        setParams: {key: '', value: ''},
        isShowTips:false,
        contentTips:'',
        isQueryInfo:false,
        isQueryInfortion:false
      }
    },
    mounted: function () {
      this.getManageList();
    },
    methods: {
      getShowStatus(data) {
        this[data] = false;
      },
      getCurrentPage(page) {
        this.currentPage = page;
        this.getCommisssonData()
      },
      getManageList() {
        this.$http.get(this.URL_PREFIX + '/broker/salary/queryManageCom.do', {params: {comcode: '9900000000'}}).then((data) => {
          if (data.status == 200 && data.data.length!=0) {
            for (let i = 0; i < data.data.length; i++) {
              var Obj = {};
              Obj.key = data.data[i].COMCODE;
              Obj.value = data.data[i].SHORTNAME;
              this.manageList.push(Obj);
            }
          }
        }, (err) => {
          console.log(err);
        });
      },
      getcalcSelect(data) {
        this.getParams.comcode = data.key;
        this.setParams = data;
      },
      getcomYear(data) {
        this.getParams.year = data.replace(/\s/g, "");
      },
      getcomMonth(data) {
        this.getParams.month = data.replace(/\s/g, "");
      },
      getAllList() {
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
        this.currentPage = 1;
        this.getCommisssonData()
      },
      resetList() {
        this.totalPage = 0;
        this.comissionList = [];
        this.currentPage = 1;
        this.getParams = {year: '', month: '', comcode: ''};
        this.setParams = {key: '', value: ''};
        this.isQueryInfortion = false;
        this.isQueryInfo = false;
      },
      getCommisssonData() {
        this.$http.post(this.URL_PREFIX + '/broker/salary/querySalaryApprove.do?currentPage=' + this.currentPage, this.getParams)
          .then((data) => {
            if (data.status == 200) {
              if (data.data.data && data.data.data != null) {
                this.comissionList = data.data.data.data;
                this.totalPage = Math.floor((data.data.data.total) / this.pageSize);
                this.isQueryInfo = true;
                this.isQueryInformation = false;
              } else {
                this.isQueryInfortion = true;
              }
            }
          }).catch((err) => {
          console.log(err);
        });
      },
      finalConfirm() {
        if(!this.isQueryInfo){
          this.isShowDiolag = true;
          this.contentText = '请先查询到薪酬信息!';
          return;
        }
        this.isShowTips = true;
        this.contentTips = '正在进行薪酬审核，请稍等...'
        this.$http.post(this.URL_PREFIX + '/broker/salary/passSalaryApprove.do?operator=001', this.getParams)
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
</script>
