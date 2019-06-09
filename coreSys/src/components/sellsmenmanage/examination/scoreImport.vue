<style scoped>
.btn{
  padding:20px 0;
}
</style>
<template>
<main>
  <h2 class="hdHeadline">评分模板下载</h2>
  <div class="cf">
    <hd-select class="fl" title="模板类型" :selectitems="templateList" @getdata="getTemplateData" required="true"></hd-select>
    <hd-input class="fl" title="评分批次" :value="yearMonth" required="true"></hd-input>
    <hd-select class="fl" title="机构名称" v-show="comNameShow" :selectitems="comNameList" @getdata="getComName" required="true"></hd-select>
  </div>
  <div class="btn">
    <a @click="downloadTemplateFn">
      <hd-button :btnstyle="{url: require('../../../assets/img/download_icon.png'), text: '下载模板', color: '#2D6B91'}"></hd-button>
    </a>
  </div>
  <hr>
  <h2 class="hdHeadline">评分模板上传</h2>
  <div>
    <hd-uploader type=".xlsx,.xls" name="inputFile" url="/broker/score/uploadScore.do"></hd-uploader>
  </div>
  <hr>
  <h2 class="hdHeadline">查询条件</h2>
  <div class="cf">
    <hd-select class="fl" title="机构名称" :selectitems="comNameList" @getdata="getCorporation"></hd-select>
    <hd-select class="fl" title="评分状态" :selectitems="stateList" @getdata="getState"></hd-select>
  </div>
  <div class="cf">
    <hd-select class="fl" title="模板类型" :selectitems="templateList" @getdata="getType2"></hd-select>
    <hd-input class="fl" title="评分批次" :value="yearMonth2"></hd-input>
  </div>
  <div class="btn">
    <a @click="queryFn">
      <hd-button :btnstyle="{url: require('../../../assets/img/querylen_icon.png'), text: '提交查询', color: '#2D6B91'}"></hd-button>
    </a>
  </div>
  <hr>
  <h2 class="hdHeadline">评分批次信息</h2>
  <div class="talbeBox">
    <table class="hdTable">
      <thead>
        <th><input type="checkbox"></th>
        <th>导入批次编码</th>
        <th>分公司编码</th>
        <th>分公司名称</th>
        <th>评分类型</th>
        <th>评分标志</th>
        <th>评分状态</th>
        <th>导入人姓名</th>
        <th>审核人</th>
        <th>审核说明</th>
        <th>审核时间</th>
        <th>导入日期</th>
        <th>导入时间</th>
      </thead>
      <tbody>
        <tr>

        </tr>
      </tbody>
    </table>
    <hd-turnpage :turnPageData="{curPage:currentPage,pageNum:totalPage,pageSize:10}" class="centerPage"
                 @getdata="queryPage"></hd-turnpage>
  </div>

  <div class="btn">
    <a>
      <hd-button :btnstyle="{url: require('../../../assets/img/delete_icon.png'), text: '删除批次', color: '#2D6B91'}"></hd-button>
    </a>
  </div>
  <hr>
  <h2 class="hdHeadline">评分明细</h2>
  <div class="tableBox">
    <table class="hdTable">
      <thead>
      <th>评分编码</th>
      <th>代理人编码</th>
      <th>代理人姓名</th>
      <th>营业部编码</th>
      <th>营业部名称</th>
      <th>职业编码</th>
      <th>职级名称</th>
      <th>评分/比例</th>
      <th>状态</th>
      </thead>
    </table>
    <hd-turnpage :turnPageData="{curPage:currentPage1,pageNum:totalPage1,pageSize:10}" class="centerPage"
                 @getdata="queryPage"></hd-turnpage>
  </div>
</main>
</template>
<script>
  import {hdComponents} from "../../../js/components.js"
  export default {
    name : 'scoreImport',
    data(){
      return {
        templateList : [
          {key : '01', value:'管家月度综合评分'},
          {key : '02', value:'管家个人品质评分'},
          {key : '03', value:'BDM月度管理评分'},
          {key : '04', value:'BDM业务品质评分'},
          {key : '05', value:'BD客户转代理顾问比例'},
          {key : '06', value:'BDM均合格人力'}
        ],
        type : '',
        yearMonth : '',
        comcode1 : '',
        corporation : '',       //第二个机构名称
        state : '',
        type2 : '',              //模板类型
        yearMonth2 : '',
        comNameList : [],
        stateList : [           //评分状态
          {key:'1', value:'待审核'},
          {key:'2', value:'审核通过'},
          {key:'3', value:'审核未通过'}
        ],
        comNameShow : false,
        currentPage : 1 ,
        totalPage : 8,
        currentPage1 : 5 ,
        totalPage1 : 8
      }
    },
    mounted(){
      var url = this.URL_PREFIX + '/broker/salary/queryManageCom.do?comcode=' + 9900000000;
      this.$http.get(url).then((res)=>{
        console.log(res);
        if(res.status=='200'){
          this.comNameList = [];
          for(let i=0; i<res.data.length; i++){
            let obj = {key:'', value:''};
            obj.key = res.data[i].COMCODE;
            obj.value = res.data[i].SHORTNAME;
            this.comNameList.push(obj);
          }
        }
      });
    },
    methods : {
      queryPage(page){
        console.log(page);
      },
      calYearMonth(key,yearMonth,boolean){
        var year = new Date().getFullYear();
        var month = new Date().getMonth();
        if(key=='01'||key=='03'){
          if(boolean){
            this.comNameShow = false;
          }
          var date = new Date(year, month,0);
          this[yearMonth] = date.getFullYear() + '' + ((date.getMonth()-0+1)<10?"0"+(date.getMonth()-0+1):(date.getMonth()-0+1)) ;
        }else if(key=='02'||key=='04'){
          if(boolean){
            this.comNameShow = false;
          }
          if(month<=5){
            this[yearMonth] = year-1 + '12';
          }else{
            this[yearMonth] = year + '06';
          }
        }else{
          if(boolean){
            this.comNameShow = true;
          }
          if(month>=0&&month<3){
            this[yearMonth] = year-1 + '12';
          }else if(month>=3&&month<6){
            this[yearMonth] = year + '03';
          }else if(month>=6&&month<9){
            this[yearMonth] = year + '06';
          }else{
            this[yearMonth] = year + '09';
          }
        }
      },
      getTemplateData(key,name,value){
        this.type = key;
        this.calYearMonth(key,'yearMonth',true);
      },
      getComName(key, name, value){
        this.comcode1 = key;
      },
      getCorporation(key, name, value){
        this.corporation = key;
      },
      getState(key, name, value){
        this.state=key;
      },
      getType2(key, name, value){
        this.type2 = key;
        this.calYearMonth(key,'yearMonth2',false);
      },
      downloadTemplateFn(){
        var url = this.URL_PREFIX + '/broker/score/downloadModule.do';
        this.$http.post(url,{
          operator : '001',
          comcode : '9900000000',
          comcode1 : this. comcode1,
          type : this.type,
          yearMonth : this.yearMonth
        }).then((res)=>{
          console.log(res);
        })
      },
      queryFn(){
        var url = this.URL_PREFIX + '/broker/score/queryScoreLog.do';
        this.$http.get(url,{
          params : {
            corporation : this.corporation,
            yearmonth : this.yearMonth2,
            type : this.type2,
            state : this.state
          }
        }).then((res)=>{
          console.log(res);
        });
      }
    },
    components : hdComponents
  }
</script>
