<style scoped>
.btns{
  margin:40px auto; text-align:center;
}
.btns>*{
  margin:0 20px;
}
</style>
<template>
<main>
	<div class="main">
    <div>
      <h2 class="hdHeadline">礼品查询</h2>
      <div class="cf">
        <hd-input class="fl" title="礼品编码"></hd-input>
        <hd-input class="fl" title="礼品名称"></hd-input>
        <hd-select class="fl" title="礼品类型" :selectitems="selectItems"></hd-select>
        <hd-input class="fl" title="礼品面值"></hd-input>
      </div>
      <div class="btns">
        <hd-button type="query"></hd-button>
        <hd-button type="refresh"></hd-button>
        <hd-button type="add"></hd-button>
        <hd-button type="modify"></hd-button>
        <hd-button type="unshelve"></hd-button>
        <hd-button type="delete"></hd-button>
        <a href="http://baidu.com">baidu</a>
      </div>
    </div>
    <hd-date></hd-date>
  </div>
</main>
</template>
<script>
import {hdComponents} from "../js/components.js";
//console.log(hdComponents);
export default {
	name : 'presentdefine',
	components : hdComponents,
	data : function(){
	  return {
	    selectItems : [
      					{ key : "01", value : "精美卡券"},
      					{ key : "02", value : "社区服务"},
      					{ key : "03", value : "汽车生活"},
      					{ key : "04", value : "数码通讯"},
      					{ key : "05", value : "家政服务"},
      					{ key : "06", value : "商旅出行"},
      					{ key : "07", value : "缤纷好礼"},
      					{ key : "08", value : "秒杀专区"},
      					{ key : "09", value : "物业费" },
      					{ key : "10", value : "代办年检"},
      					{ key : "11", value : "生日祝福"}
      				]
	  }
	}
}
</script>
