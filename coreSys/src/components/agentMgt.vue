<style scoped>
  .btn{
    text-align:center; padding:20px 0;
  }
  .btn *{
    margin:0 20px;
  }
  .tableBox{
    overflow-x:auto;
  }
</style>
<template>
  <main id="app">
    <h2 class="hdHeadline">顾问查询</h2>
    <div class="cf">
      <hd-input class="fl" title="姓 名" hd-model="name" :value="name" @getdata="getData"></hd-input><!--
   --><hd-input class="fl" :value="name" title="手机号" ></hd-input><!--
   --><hd-input class="fl" title="证 件" hd-model="certificate" :value="certificate" @getdata="getData"></hd-input><!--
   --><hd-select class="fl" title="省 份" :selectitems="provinceList" @getdata="getProvince"></hd-select><!--
   --><hd-input class="fl" title="推荐人" :value="certificate" ></hd-input><!--
   --><hd-select class="fl" title="审核状态" :selectitems="status"></hd-select>
    </div>
    <div class="btn">
      <hd-button :btnstyle='{"url":require("../assets/img/export_icon.png"),"text":"导 出","color":"#49a7ad"}'></hd-button>
      <hd-button type="query"></hd-button>
    </div>
    <h2 class="hdHeadline">预增员列表</h2>
    <div class="tableBox">
      <table class="hdTable">
        <thead>
        <tr>
          <th></th><th>省 份</th><th>顾问编码</th><th>姓 名</th><th>性 别</th></th><th>手机号码</th><th>身份证号</th><th>所属团队</th>
          <th>BDM编码</th><th>BDM</th><th>推荐人编码</th><th>推荐人</th><th>申请日期</th><th>是否顾问代理</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in consultants">
          <td><input type="radio" name="one" /></td>
          <td @click="tonewurl">{{item.province}}</td>
          <td>{{item.consultantcode}}</td>
          <td>{{item.name}}</td>
          <td>{{item.sex}}</td>
          <td>{{item.mobile}}</td>
          <td>{{item.idno}}</td>
          <td>{{item.group}}</td>
          <td>{{item.bdmcode}}</td>
          <td>{{item.bdmname}}</td>
          <td>{{item.recommender}}</td>
          <td>{{item.recommendername}}</td>
          <td>{{item.applydate}}</td>
          <td>{{item.isagent}}</td>
        </tr>
        <tr>
          <td><input type="radio" name="one" /></td><td>执剑人</td><td>执剑人</td><td>执剑人</td><td>执剑人</td><td>执剑人</td>
          <td>执剑人</td><td>执剑人</td><td>执剑人</td><td>执剑人</td><td>执剑人</td><td>执剑人</td><td>执剑人</td><td>执剑人</td>
        </tr>
        </tbody>
      </table>
      <hd-turnpage :turnPageData="{url:'',curPage:18,pageNum:18,pageSize:10}"></hd-turnpage>
    </div>
    <h2 class="hdHeadline">基本信息</h2>
    <div class="cf">
      <hd-input class="fl" title="顾问编码"></hd-input>
      <hd-input class="fl" title="姓 名"></hd-input>
      <hd-input class="fl" title="手机号码"></hd-input>
      <hd-select class="fl" title="证 件" :selectitems="provinceList"></hd-select>
      <hd-select class="fl" title="性 别" :selectitems="provinceList"></hd-select>
      <hd-date :datescope="{startDate : '2014-06-12', endDate : '2016-11-31'}" class="fl" title="出生日期"></hd-date>
      <hd-select class="fl" title="省 份" :selectitems="provinceList"></hd-select>
      <hd-input class="fl" title="申请日期"></hd-input>
    </div>
    <h2 class="hdHeadline">团队信息</h2>
    <div class="cf">
      <hd-select class="fl" title="所属团队" :selectitems="provinceList"></hd-select>
      <hd-select class="fl" title="所属团队" :selectitems="provinceList"></hd-select>
      <hd-select class="fl" title="所属团队" :selectitems="provinceList"></hd-select>
      <hd-select class="fl" title="所属团队" :selectitems="provinceList"></hd-select>
      <hd-select class="fl" title="所属团队" :selectitems="provinceList"></hd-select>
      <hd-select class="fl" title="所属团队" :selectitems="provinceList"></hd-select>
    </div>
    <div class="btn" style="padding-bottom:150px;">
      <a @click="saveFn"><hd-button :btnstyle='{"url":require("../assets/img/export_icon.png"),"text":"保 存","color":"#375382"}'></hd-button></a>
    </div>
  </main>
</template>
<script>
  import {hdComponents} from "../js/components.js";
  export default{
    name : 'agentMgt',
    data : function(){
      return {
        name : "",
        certificate : '',
        provinceList : [
          { key : "01", value : "广东"},
          { key : "02", value : "湖北"},
          { key : "03", value : "江苏"},
          { key : "04", value : "河南"},
          { key : "05", value : "陕西"},
          { key : "06", value : "湖南"},
          { key : "07", value : "四川"},
          { key : "08", value : "重庆"},
          { key : "09", value : "山东"}
        ],
        status : [
          { key : "01", value : "审核中"},
          { key : "02", value : "已通过"},
          { key : "01", value : "未通过"}
        ],
        consultants : [
          {
            province : '123',
            consultantcode : '',
            name : '',
            sex : '',
            mobile : '',
            idno : '',
            group : '',
            bdmcode :'',
            bdmname : '',
            recommender : '',
            recommendername : '',
            applydate : '',
            isagent : ''
          }
        ]
      }
    },
    components : hdComponents,
    methods : {
      tonewurl : function(){
        location.href="http://127.0.0.1:8080/#/agentMgt"
      },
      getData : function(data, name){
        this[name]=data;
      },
      // getName : function(data,name){
      //   // this.name = data;
      //   // console.log(this.name);
      //   console.log(data,name);
      //   this[name] = data;
      // },
      // getTel : function(data){
      //
      // },
      // getCertificate : function(data){
      //
      // },
      // getReferrer : function(data){
      //
      // },
      getProvince : function(data){

      },
      // getBirthday : function(data){
      //   console.log(data)
      // },
      saveFn : function(){
        this.name = "昔有佳人公孙氏，一舞剑器动四方。观者如山色沮丧，天地为之久低昂。";
        console.log(this.name);
        this.$alert(this.name);
      }
    }
  }
</script>
