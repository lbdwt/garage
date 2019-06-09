//输入框
var hdInput = {
  template : `
		<div class="hdInput">
			  <div class="hdTitle bs">{{title}}</div><!--
		 --><div class="hdInputArea bs">
		      <input :type="type" :disabled="disabled" type="text" :placeholder="placeholder" :name="name" v-model="innervalue" @blur="blurFn" :required="required" :readonly="readonly"/>
		    </div>
		    <font v-show="required" color="red">*</font>
		</div>
	`,
  props : [
    'title',
    'type',
    'name',
    'value',
    'hdModel',		//变量名
    'required',
    'readonly',
    'disabled',
    'placeholder'
  ],
  data : function(){
    return {

    }
  },
  watch : {
    value(val){
      var that = this;
      this.innervalue = val;
      this.$emit('getdata', that.innervalue, that.hdModel);
    }
  },
  computed : {
    innervalue : {
      get(){
        return this.value ? this.value : '';
      },
      set(val){
        var that = this;
        that.$emit('getdata', val, that.hdModel);
      }
    }
  },
  mounted(){
    // console.log(this.value);
  },
  methods : {
    blurFn : function () {
      var that = this;
      that.$emit('blur');
    }
  }
};
var hdInputDate = {
  template : `
		<div class="hdInput">
			  <div class="hdTitle bs">{{title}}</div><!--
		 --><div class="hdInputArea bs inputIndex">
		      <input type="text" class="inputIndex" :name="value" v-model="innervalue" @blur="blurFn(innervalue,hdModel)" :required="required" :readonly="readonly" />
		      <span  class="slot-hdInputDate"><slot></slot></span>
		    </div>
		    <font v-show="required" color="red">*</font>
		</div>
	`,
  props : [
    'title',
    'name',
    'value',
    'hdModel',		//变量名
    'required',
    'readonly'
  ],
  data : function(){
    return {
      //innervalue : this.value  //双向数据绑定
    }
  },
  computed : {
    innervalue : {
      get : function(){
        return this.value ? this.value : '';
      },
      set : function(val){
        var that = this;
        that.$emit('getdata', val, that.hdModel);
      }
    }
  },
  methods : {
    blurFn : function (val,name) {
      var that = this;
      that.$emit('blur', val, name);
    }
  }
};
//下拉选择框
var hdSelect = {
  template : `
		<div class="hdSelect">
			<div class="hdTitle">{{title}}</div><!--
	 --><div class="hdSelectArea bs">
				<input type="text" class="bs hdShowlist" v-model="selectedData.key" :title="selectedData.key" @focus="listShow = !isshow" 
				  readonly="readonly" :required="required" @blur="blurFn(selectedData)" :disabled="disabled"/><!--
		 --><input @focus="listShow = !isshow" class="bs hdSelectText" v-model="selectedData.value" :title="selectedData.value" 
		      type="text" readonly="readonly" :required="required" @blur="blurFn(selectedData)" :disabled="disabled" />
				<ul class="bs" v-show="listShow">
					<li @click="itemSelectedFn(item)" v-for="item in selectitems">
						<b>{{item.key}}</b>-<i>{{item.value}}</i>
					</li>
				</ul>
			</div>
			<font color="red" v-show="required">*</font>
		</div>
	`,
  data : function(){
    return {
      listShow : false
    }
  },
  props : [
    'title',
    'selectitems',    //下拉列表展示数据
    'value',
    'required',
    'hdModel',
    'isshow',
    'disabled'
  ],
  computed : {
    selectedData : {
      get : function(){
        return this.value ? this.value : {key:'',value:''};
      }
    }
  },
  watch : {
    value(val){
      var that = this;
      if(!val){
        return;
      }
      that.selectedData.key = val.key;
      that.selectedData.value = val.value;
      that.$emit('getdata',that.selectedData.key, that.hdModel, that.selectedData.value);
    }
  },
  methods : {
    itemSelectedFn : function(item){
      var that = this;
      that.selectedData.key = item.key;
      that.selectedData.value = item.value;
      that.$emit('getdata',that.selectedData.key, that.hdModel, that.selectedData.value);
    },
    blurFn : function(selectedData){
      var that = this;
      that.$emit('blur', selectedData.key, that.hdModel, that.selectedData.value);
    }
  },
  mounted : function(){
    var that = this;
    $(document).on("click", function(e){
      if($(e.target).closest(".hdShowlist").length==0 && $(e.target).closest(".hdSelectText").length==0 ){
        that.listShow = false;
      }
    });
  }
};

//单下拉选择框
var hdSingleSelect = {
  template : `
		<div class="hdSingleSelect">
			<div class="hdTitle">{{title}}</div><!--
	 --><div class="hdSelectArea bs">
		<input @focus="listShow = !isshow" class="bs hdSelectText" v-model="selectedData.value" :title="selectedData.value" 
		      type="text" readonly="readonly" :required="required" @blur="blurFn(selectedData)" :disabled="disabled" />
				<ul class="bs" v-show="listShow">
					<li @click="itemSelectedFn(item)" v-for="item in selectitems">
						<i>{{item.value}}</i>
					</li>
				</ul>
			</div>
			<font color="red" v-show="required">*</font>
		</div>
	`,
  data : function(){
    return {
      listShow : false
    }
  },
  props : [
    'title',
    'selectitems',    //下拉列表展示数据
    'value',
    'required',
    'hdModel',
    'isshow',
    'disabled'
  ],
  computed : {
    selectedData : {
      get : function(){
        return this.value ? this.value : {value:''};
      }
    }
  },
  watch : {
    value(val){
      var that = this;
      if(!val){
        return;
      }
      that.selectedData.value = val.value;
      that.$emit('getdata',that.selectedData.value, that.hdModel);
    }
  },
  methods : {
    itemSelectedFn : function(item){
      var that = this;
      that.selectedData.value = item.value;
      that.$emit('getdata',that.selectedData.value, that.hdModel);
    },
    blurFn : function(selectedData){
      var that = this;
      that.$emit('blur', selectedData.value, that.hdModel);
    }
  },
  mounted : function(){
    var that = this;
    $(document).on("click", function(e){
      if($(e.target).closest(".hdShowlist").length==0 && $(e.target).closest(".hdSelectText").length==0 ){
        that.listShow = false;
      }
    });
  }
};

//三级联动（省市区）下拉控件
var hdTreble = {
  template : `
    <div class="hdTreble">
      <div class="hdTitle bs">{{title}}</div><!--
   --><div class="hdTrebleArea">
        <b>
          <span @click="prvHandleFn">
            <input class="hdProvince" style="border-left:none;" :title="province" v-model="province"  type="text" readonly >
          </span>省
          <div>
            <ul v-show="prvShow" v-if="!disable">
              <li v-for="item in prvList"><a @click="selPrv(item)">{{item.areaName}}</a></li>
            </ul> 
          </div>
        </b>
        <b>
          <input class="hdCity" type="text" :title="city" v-model="city" readonly @click="cityHandleFn(prvId,province)" >市
          <ul v-show="cityShow" v-if="!disable">
            <li @click="selCity(item)" v-for="item in cityList">{{item.areaName}}</li>
          </ul>
        </b>
        <b>
           <input class="hdDistrict" :title="district" v-model="district" type="text" readonly @click="districtHandleFn(cityId,city)" >区
           <ul v-show="districtShow" v-if="!disable">
            <li @click="selDistrict(item)" v-for="item in districtList">{{item.areaName}}</li>
           </ul>
        </b>
      </div>
    </div>
  `,
  props : [
    'title',
    'hdModel',
    'pcdObj',
    'disable'
  ],
  watch : {
    pcdObj(val){
      if(!val){
        return;
      }
      this.prvId = val.prv.prvId;
      this.province = val.prv.prvText;
      this.cityId = val.city.cityId;
      this.city = val.city.cityText;
      this.districtId = val.district.districtId;
      this.district = val.district.districtText;
      console.log(this.district);
    }
  },
  data : function(){
    return {
      prvShow : false,
      cityShow : false,
      districtShow : false,
      province : '',
      prvId : '',
      city : '',
      cityId : '',
      district : '',
      districtId : '',
      prvList : [],
      cityList : [],
      districtList : [],
      url : this.URL_PREFIX+'/member/managerControl/queryPriCityRelateInfo.do?'
    }
  },
  mounted : function(){
    var that = this;
    $(document).on('click',function(e){
      if($(e.target).closest(".hdProvince").length==0){
        that.prvShow = false;
      }
      if($(e.target).closest(".hdCity").length==0){
        that.cityShow = false;
      }
      if($(e.target).closest(".hdDistrict").length==0){
        that.districtShow = false;
      }
    })
  },
  methods : {
    prvHandleFn : function(){   //@@
      var that = this;
      that.prvShow = true;
      that.cityList = [];
      that.districtList = [];
      //向后台请求省份数据
      var url = this.url+'areaType=01';
      $.ajax({
        url : url,
        type : 'get',
        success : function(res){
          if(res.code=='200'){
            that.prvList = res.data;
          }
        }
      });
    },
    selPrv : function (item) {
      var that = this;
      that.prvId = item.areaCode;
      that.province = item.areaName;
      that.cityId = '';
      that.city = '';
      that.districtId = '';
      that.district = '';
      that.prvShow = false;
      //获取城市数据
      var url = that.url + 'areaType=02&areaCode='+item.areaCode;
      $.ajax({
        url : url,
        type : 'get',
        success : function(res){
          if(res.code=='200'){
            that.cityList = res.data;
            var obj = {
              prv : {
                prvId : that.prvId,       //obj.prv.prvId
                prvText : that.province
              },
              city : {
                cityId : that.cityId,
                cityText : that.city
              },
              district : {
                districtId : that.districtId,
                districtText : that.district
              }
            };
            that.$emit('getdata', obj);
          }
        }
      })
    },
    cityHandleFn : function (prvId,province) {    //city
      var that = this;
      // that.cityShow = true;
      var url = that.url + 'areaType=02&areaCode='+prvId;
      $.ajax({
        url : url,
        type : 'get',
        success : function(res){
          if(res.code=='200'){
            that.cityList = res.data;
            that.cityShow = true;
            var obj = {
              prv : {
                prvId : that.prvId,       //obj.prv.prvId
                prvText : that.province
              },
              city : {
                cityId : that.cityId,
                cityText : that.city
              },
              district : {
                districtId : that.districtId,
                districtText : that.district
              }
            };
            that.$emit('getdata', obj);
          }
        }
      })
    },
    selCity : function(item){
      var that = this;
      that.cityId = item.areaCode;
      that.city = item.areaName;
      that.districtId = '';
      that.district = '';
      //获取区级数据
      var url = that.url + 'areaType=03&areaCode='+item.areaCode;
      $.ajax({
        url : url,
        type : 'get',
        success : function(res){
          if(res.code=='200'){
            that.districtList = res.data;
            var obj = {
              prv : {
                prvId : that.prvId,
                prvText : that.province
              },
              city : {
                cityId : that.cityId,
                cityText : that.city
              },
              district : {
                districtId : that.districtId,
                districtText : that.district
              }
            };
            that.$emit('getdata', obj);
          }
        }
      });
    },
    districtHandleFn : function(cityId,city){
      var that = this;
      var url = that.url + 'areaType=03&areaCode='+cityId;
      $.ajax({
        url : url,
        type : 'get',
        success : function(res){
          if(res.code=='200'){
            that.districtList = res.data;
            that.districtShow=true;
            var obj = {
              prv : {
                prvId : that.prvId,
                prvText : that.province
              },
              city : {
                cityId : that.cityId,
                cityText : that.city
              },
              district : {
                districtId : that.districtId,
                districtText : that.district
              }
            };
            that.$emit('getdata', obj);
          }
        }
      });
    },
    selDistrict : function(item){
      var that = this;
      that.districtId = item.areaCode;
      that.district = item.areaName;
      var obj = {
        prv : {
          prvId : that.prvId,
          prvText : that.province
        },
        city : {
          cityId : that.cityId,
          cityText : that.city
        },
        district : {
          districtId : that.districtId,
          districtText : that.district
        }
      };
      that.$emit('getdata', obj);
    }
  }

};

//二选一控件 ##
var hdAlternative = {
  template : `
    <div class="hdAlternative">
      <div class="hdTitle bs">{{title}}</div><!--
   --><div class="hdAlternativeArea">
        <label @click="selectedFn(options[0].key)"><input type="radio" :disabled="disabled" :name="name" :checked="selectedItem==options[0].key" />{{options[0].value}}</label><!--
     --><label @click="selectedFn(options[1].key)"><input type="radio" :disabled="disabled" :name="name" :checked="selectedItem==options[1].key" />{{options[1].value}}</label>
      </div>
    </div>
  `,
  props : [
    'title',
    'name',
    'options',
    'hdModel',
    'selectedItem',
    'disabled'
  ],
  data : function(){
    return {
      selectedValue : this.selectedItem
    }
  },
  mounted : function(){
    var that = this;
    that.$emit('getdata', that.selectedItem, that.hdModel);
  },
  methods : {
    selectedFn : function(val){
      var that = this;
      that.selectedValue = val;
      that.$emit('getdata', that.selectedValue, that.hdModel);
    }
  }
};

//按钮
var hdButton = {
  template : `
		<div class="hdBtnBox">
			<button :style="{background:btnContent.color}"><img v-if="btnContent.url" :src="btnContent.url" />{{btnContent.text}}</button>
		</div>
	`,
  props : [
    "type",
    "btnstyle"
  ],
  data : function(){
    return {
      btnContent : ''
    }
  },
  mounted : function(){
    var that = this;
    switch(this.type)
    {
      case 'query': that.btnContent = {
        url : require('../assets/img/querylen_icon.png'),
        text : '查 询',
        color : '#222'
      };
        break;
      case 'refresh' : that.btnContent = {
        url : require('../assets/img/refresh_icon.png'),
        text : '刷 新',
        color : '#30395e'
      };
        break;
      case 'add' : that.btnContent = {
        url : require('../assets/img/add_icon.png'),
        text : '增 加',
        color : '#ec9524'
      };
        break;
      case 'modify' : that.btnContent = {
        url : require('../assets/img/modify_icon.png'),
        text : '修 改',
        color : '#3f9a41'
      };
        break;
      case 'unshelve' : that.btnContent = {
        url : require('../assets/img/unshelve_icon.png'),
        text : '下 架',
        color : '#7f404b'
      };
        break;
      case 'delete' : that.btnContent = {
        url : require('../assets/img/delete_icon.png'),
        text : '删 除',
        color : '#db3434'
      };
        break;
      default : that.btnContent = {
        url : that.btnstyle.url,
        text : that.btnstyle.text,
        color : that.btnstyle.color
      }
    }
  }
};
var hdDate = {
  template: `
    <div class="hdDate">
      <div class="hdDateTitle bs">{{title}}</div><!--
   --><div class="hdSelDateArea bs cf">
        <span @click="showCalendar">      <!--calendarShow = !calendarShow-->
          <b>{{result}}</b>
          <a class="fr">
            <img :src="icon_src" />
          </a>
        </span>
        
        <div class="hdCalendar bs" v-show="calendarShow">
          <div class="hdYearMonthArea bs cf">
            <a class="fl">
              <b @click="toLastYear"><<</b>
              <i @click="toLastMonth"><</i>
            </a>
            
            <span class="yearcontentor" @click="showYearList" v-show="!selYear">{{year}}年</span>
            <div class="hdYearList" v-show="selYear">
              <input class="bs" v-model="year" type="text" readonly />
              <ul class="yearlist bs">
                <li v-for="yearItem in yearList" @click="selYearFn(yearItem)">{{yearItem}}</li>
              </ul>
            </div>

            <span class="monthcontentor" v-show="!selMonth"  @click="showMonthList">{{month}}月</span>
            <div class="hdMonthList" v-show="selMonth">
              <input class="bs" v-model="month" type="text" readonly />
              <ul class="monthlist bs">
                <li v-for="monthItem in monthList" @click="selMonthFn(monthItem)">{{monthItem}}</li>
              </ul>
            </div>

            <a class="fr">
              <i @click="toNextMonth">></i>
              <b @click="toNextYear">>></b>
              <i style="font-size: 12px;" @click="clearTime">清除</i>
            </a>
          </div>
          <table class="hdWeekTitle bs" cell-spacing="0">
            <thead>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
            </thead>
            <tbody>
                <tr v-for="item in dateList">
                  <td @click="selDate(date)" :class="{ hdBlank:date==' ',hdCurDate : date == new Date().getDate(), hdOn:(seledDate == (date<10? '0'+date : date)) && (date!=' ') }"
                      v-for="date in item" v-html="date">{{date}}</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
      <font color="red" v-show="required">*</font>
    </div>
  `,
  data : function(){
    return {
      icon_src : require("../assets/img/date_icon.png"),
      calendarShow : false,
      year : '',
      month : '',
      seledDate : new Date().getDate(),
      startDate : null,
      endDate : null,
      result : '',
      yearList : [],
      monthList : [],
      dateList : [],
      selYear : false,
      selMonth : false
    }
  },
  props : [
    'datescope',    //起止日期范围  {startDate : '2014-06-12', endDate : '2016-11-31'}
    'title',
    'type',
    'hdModel',
    'required',
    'dateData',      //在外部设置日期
    'disable'
  ],

  watch : {
    dateData : function(val){
      var that = this;
      that.result = val;
    },
    datescope(val,oldval){
      var that = this;
      var isChanged = false;
      for(var attr in val){
        if(val[attr] != oldval[attr]){
          isChanged = true;
          break;
        }
      }
      if(!isChanged){
        return;
      }
      if(val && val.startDate){
        that.startDate = {};
        var start_arr = val.startDate.split('-');
        that.startDate.startYear = start_arr[0];
        that.startDate.startMonth = start_arr[1]<10 ? '0'+(start_arr[1]-0) : start_arr[1];
        that.startDate.startDate = start_arr[2]<10 ? '0'+(start_arr[2]-0) : start_arr[2];
      }
      if(val && val.endDate){
        that.endDate = {};
        var end_arr = val.endDate.split('-');
        that.endDate.endYear = end_arr[0];
        that.endDate.endMonth = end_arr[1]<10 ? '0'+(end_arr[1]-0) : end_arr[1];
        that.endDate.endDate = end_arr[2]<10 ? '0'+(end_arr[2]-0) : end_arr[2];
        that.init(that.endDate.endYear,that.endDate.endMonth, that.endDate.endDate);
      }else{
        that.init();
      }
    }
  },
  mounted : function(){
    var that = this;
    $(document).on("click", function(e){
      if($(e.target).closest(".hdSelDateArea").length==0){
        that.calendarShow = false;
      }
      if($(e.target).closest(".yearcontentor").length==0){
        that.selYear = false;
      }
      if($(e.target).closest(".monthcontentor").length==0){
        that.selMonth = false;
      }
    });
    if(that.datescope && that.datescope.startDate){   //@@
      that.startDate = {};
      var start_arr = that.datescope.startDate.split('-');
      that.startDate.startYear = start_arr[0];
      that.startDate.startMonth = start_arr[1]<10 ? '0'+(start_arr[1]-0) : start_arr[1];
      that.startDate.startDate = start_arr[2]<10 ? '0'+(start_arr[2]-0) : start_arr[2];
    }
    if(that.datescope &&  that.datescope.endDate){
      that.endDate = {};
      var end_arr = that.datescope.endDate.split('-');
      that.endDate.endYear = end_arr[0];
      that.endDate.endMonth = end_arr[1]<10 ? '0'+(end_arr[1]-0) : end_arr[1];
      that.endDate.endDate = end_arr[2]<10 ? '0'+(end_arr[2]-0) : end_arr[2];
      that.init(that.endDate.endYear,that.endDate.endMonth, that.endDate.endDate);
    }else{
      that.init();
    }
  },
  methods : {
    showCalendar(){
      if(this.disable){
        return;
      }
      this.calendarShow = !this.calendarShow
    },
    clearTime(){
      this.result = '';
      this.calendarShow = false;
      this.$emit('getdata', this.result);
    },
    addZero : function(){
      var that = this;
      that.month = (that.month-0)<10 ? '0' + (that.month-0) : that.month;
      that.seledDate = (that.seledDate-0)<10 ? '0' + (that.seledDate-0) : that.seledDate;
      that.result = that.year + '-' + that.month + '-' + that.seledDate;
      that.$emit('getdata', that.result, that.hdModel);
    },
    init : function(y, m, d){   //y:截止年份； m：截止月份； d：截止日期
      var year,month;		//
      var date = new Date();
      //设置截止年份
      if(y){
        year = y;
      }else{
        year = date.getFullYear();    //当前年份截止
      }

      //设置截止月份
      if(m){
        month = m;
      }else{
        month = date.getMonth()+1;    //当前月份截止
      }
      month = month<10 ? '0'+(month-0) : month;
      console.log(year,month);
      var that = this;
      that.dateList=[];     //存储日历展示的数组
      that.year = year;
      console.log(year);
      console.log('year:'+that.year);

      that.month = month;
      // console.log('month:'+that.month);

      //当前月的第一天的日期
      var firstDay = new Date(year,month-1,1);

      //第一天是星期几
      var weekday = firstDay.getDay();

      //求当前月一共有多少天
      //new Date(year,month+1,0) ： month+1是下一个月，day为0代表的是上一个月的最后一天，即我们所需的当前月的最后一天。
      //getDate（）则返回这个日期对象是一个月中的第几天，我们由最后一天得知这个月一共有多少天
      var days;
      days = new Date(year,month,0).getDate();

      that.dateList.push([]);

      //计算上个月末尾的空格
      for(var i=0; i<weekday; i++){
        that.dateList[0].push(' ');
      }
      var plen = that.dateList[0].length;	//起始空白格的个数
      var l = 0;    //that.dateList的行号
      var d = 1;		//日期，从1号开始
      //如果传入的是起始年月，计算当月起始日期之前的日期，以灰色样式存入that.dateList
      if(that.startDate && year==that.startDate.startYear && month==that.startDate.startMonth){		//##
        d=that.startDate.startDate-0;   //日期从起始日期开始
        //计算当月起始日期之前的日期，以灰色样式存入that.dateList
        for(var x=1; x<that.startDate.startDate-0 ; x++){
          var len = parseInt((x+weekday)/7);  //计算当前是第几行（逢7天换一行）
          //满七天换行
          if((x+weekday)%7==0){
            that.dateList[len-1].push('<span class="hdBlank" style="color:#aaa; display:inline-block; width:100%; height:42px; line-height:42px;">'+x+'</span>');
            that.dateList.push([]);
            l++;
          }else{
            that.dateList[len].push('<span class="hdBlank" style="color:#aaa; display:inline-block; width:100%; height:42px; line-height:42px;">'+x+'</span>');
          }
        }
      }

      var lastDate = days ;
      //如果传入的是最后日期所在的年月
      if(that.endDate && year==that.endDate.endYear && month==that.endDate.endMonth ){
        //把endDate之后的日期变灰
        lastDate = that.endDate.endDate;
      }

      for(var j=0; j<(days+plen); j++){
        var line = that.dateList.length;	//从已有的行数算起
        //逢周日换行
        if(that.dateList[line-1].length%7 == 0 && (d-1)!=days){
          l++;
          that.dateList.push([]);
        }
        if(j<plen){		//跳过起始空白天数
          continue;
        }else if(d>lastDate){ //如果超过最后日期，则全部置灰
          that.dateList[l].push('<span class="hdBlank" style="color:#aaa; display:inline-block; width:100%; height:42px; line-height:42px;">'+d+'</span>');
          d++;
          weekday++;
        }else{
          that.dateList[l].push(d);
          d++;
          weekday++;
        }
        if(d>days){
          break;
        }
      }
      for(var k=that.dateList[l].length; k<7; k++){		//补全最后空白天数
        that.dateList[l].push(" ");
      }
    },
    toLastMonth(){    //@@
      if(this.startDate && this.year == this.startDate.startYear){
        if(this.month == this.startDate.startMonth){
          return;
        }
      }else if(this.month == 1){
        return;
      }
      this.month --;
      this.init(this.year,this.month);
      this.addZero();
    },
    toNextMonth(){
      if(this.endDate && this.year == this.endDate.endYear){
        if(this.month == this.endDate.endMonth){
          return;
        }
      }else if(this.month==12){
        return;
      }
      this.month ++;
      this.init(this.year,this.month);
      this.addZero();
    },
    toLastYear(){
      if(this.startDate){
        if(this.year == this.startDate.startYear){
          return;
        }else{
          this.year--;
          this.init(this.year,this.month);
          this.addZero();
        }
      }else if(this.year == 1900){
        return;
      }else{
        this.year--;
        this.init(this.year,this.month);
        this.addZero();
      }
    },
    toNextYear(){
      if(this.endDate){
        if(this.year == this.endDate.endYear){
          return;
        }else{
          this.year++;
          this.init(this.year,this.month);
          this.addZero();
        }
      }else if(this.year == new Date().getFullYear()){
        return;
      }else{
        this.year++;
        this.init(this.year,this.month);
        this.addZero();
      }
    },
    selDate : function(date){
      if((''+date).indexOf('<')!=-1 || date==' '){	//如果date包含标签或者为空白则不赋值
        return;
      }
      var that = this;
      that.seledDate = date;
      that.calendarShow = false;
      that.addZero();

    },
    showYearList : function(){
      var that = this;
      that.selYear = true;
      that.selMonth = false;
      var startYear, endYear;
      var curYear = new Date().getFullYear();
      if(that.datescope && that.datescope.startDate){
        startYear = that.datescope.startDate.split("-")[0];
      }else{
        startYear = 1900;
      }
      if(that.datescope && that.datescope.endDate){
        endYear = that.datescope.endDate.split("-")[0];
      }else{
        endYear = curYear;
      }
      that.yearList = [];
      for(var i=endYear; i>=startYear; i--){
        that.yearList.push(i);
      }
    },
    selYearFn : function(data){   //##
      var that = this;
      that.selYear = false;
      that.year = data;
      if(that.startDate && that.year == that.startDate.startYear){
        that.month = that.startDate.startMonth;
      }
      console.log(that.year,that.month);
      that.init(that.year,that.month);
      that.addZero();
    },
    showMonthList : function(){
      var that = this;
      that.selMonth = true;
      that.selYear = false;
      var from, to;
      that.monthList = [];
      var startMonth, endMonth;
      if(that.startDate && that.year == that.startDate.startYear){
        from = that.startDate.startMonth-0;
      }else{
        from = 1;
      }
      if(that.endDate && that.year == that.endDate.endYear){
        to = that.endDate.endMonth-0;
      }else{
        to = 12;
      }

      for(var j=from; j<to+1; j++){
        that.monthList.push(j);
      }
    },
    selMonthFn : function(data){
      var that = this;
      that.selMonth = false;
      that.month = data;
      that.init(that.year,that.month);
      that.addZero();
    }
  }
};


//单录子控件
var hdSingleDate = {
  template: `
       <div class="hdSelDateArea_db bs cf">
        <span @click="calendarShow = !calendarShow">
          <b>{{result}}</b>
          <a class="fr">
            <img :src="icon_src" />
          </a>
        </span>
        <div class="hdCalendar bs" v-show="calendarShow">
          <div class="hdYearMonthArea bs cf">
            <a class="fl">
              <b @click="reduceYear"><<</b>
              <i @click="reduceMonth"><</i>
            </a>
            
            <span class="yearcontentor" @click="showYearList" v-show="!selYear">{{year}}年</span>
            <div class="hdYearList" v-show="selYear">
              <input class="bs" v-model="year" type="text" readonly />
              <ul class="yearlist bs">
                <li v-for="yearItem in yearList" @click="selYearFn(yearItem)">{{yearItem}}</li>
              </ul>
            </div>

            <span class="monthcontentor" v-show="!selMonth"  @click="showMonthList">{{month}}月</span>
            <div class="hdMonthList" v-show="selMonth">
              <input class="bs" v-model="month" type="text" readonly />
              <ul class="monthlist bs">
                <li v-for="monthItem in monthList" @click="selMonthFn(monthItem)">{{monthItem}}</li>
              </ul>
            </div>

            <a class="fr">
              <i @click="addMonth">></i>
             <b @click="addYear">>></b>
             <i style="font-size: 12px;" @click="clearTime">清除</i>
            </a>
          </div>
          <table class="hdWeekTitle bs" cell-spacing="0">
            <thead>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
            </thead>
            <tbody>
                <tr v-for="item in dateList">
                  <td @click="selDate(date)" :class="{ hdBlank:date==' ',hdCurDate : date == new Date().getDate(), hdOn:(seledDate == (date<10? '0'+date : date)) && (date!=' ') }"
                      v-for="date in item" v-html="date">{{date}}</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  data: function () {
    return {
      icon_src: require("../assets/img/date_icon.png"),
      calendarShow: false,
      year: '',
      month: '',
      seledDate: new Date().getDate(),
      startDate: null,
      endDate: null,
      result: '',
      yearList: [],
      monthList: [],
      dateList: [],
      selYear: false,
      selMonth: false
    }
  },
  props: [
    'datescope',
    'dateData'      //在外部设置日期
  ],
  watch : {
    dateData : function(val){
      var that = this;
      that.result = val;
  },
    datescope(val,oldval){
      var that = this;
      var isChanged = false;
      for(var attr in val){
        if(val[attr] != oldval[attr]){
          isChanged = true;
          break;
        }
      }
      if(!isChanged){
        return;
      }
      if (val && val.startDate) {
        that.startDate = {};
        var start_arr = val.startDate.split('-');
        that.startDate.startYear = start_arr[0];
        that.startDate.startMonth = start_arr[1]<10 ? '0'+(start_arr[1]-0) : start_arr[1];
        that.startDate.startDate = start_arr[2]<10 ? '0'+(start_arr[2]-0) : start_arr[2];
      }
      if (val && val.endDate) {
        that.endDate = {};
        var end_arr = val.endDate.split('-');
        that.endDate.endYear = end_arr[0];
        that.endDate.endMonth = end_arr[1]<10 ? '0'+(end_arr[1]-0) : end_arr[1];
        that.endDate.endDate = end_arr[2]<10 ? '0'+(end_arr[2]-0) : end_arr[2];
        that.init(that.endDate.endYear, that.endDate.endMonth, that.endDate.endDate);
      } else {
        that.init();
      }
    }
  },
  mounted: function () {
    var that = this;
    $(document).on("click", function (e) {
      if ($(e.target).closest(".hdSelDateArea_db").length == 0) {
        that.calendarShow = false;
      }
      if ($(e.target).closest(".yearcontentor").length == 0) {
        that.selYear = false;
      }
      if ($(e.target).closest(".monthcontentor").length == 0) {
        that.selMonth = false;
      }
    });
    if (that.datescope && that.datescope.startDate) {
      that.startDate = {};
      var start_arr = that.datescope.startDate.split('-');
      that.startDate.startYear = start_arr[0];
      that.startDate.startMonth = start_arr[1]<10 ? '0'+(start_arr[1]-0) : start_arr[1];
      that.startDate.startDate = start_arr[2]<10 ? '0'+(start_arr[2]-0) : start_arr[2];
    }
    if (that.datescope && that.datescope.endDate) {
      that.endDate = {};
      var end_arr = that.datescope.endDate.split('-');
      that.endDate.endYear = end_arr[0];
      that.endDate.endMonth = end_arr[1]<10 ? '0'+(end_arr[1]-0) : end_arr[1];
      that.endDate.endDate = end_arr[2]<10 ? '0'+(end_arr[2]-0) : end_arr[2];
      that.init(that.endDate.endYear, that.endDate.endMonth, that.endDate.endDate);
    } else {
      that.init();
    }
    that.result = that.dateData;
  },
  methods: {
    clearTime(){
      this.result = '';
      this.calendarShow = false;
      this.$emit('getdata', this.result);
    },
    addZero: function () {
      var that = this;
      that.month = (that.month - 0) < 10 ? '0' + (that.month - 0) : that.month;
      that.seledDate = (that.seledDate - 0) < 10 ? '0' + (that.seledDate - 0) : that.seledDate;
      that.result = that.year + '-' + that.month + '-' + that.seledDate;
      that.$emit('getdata', that.result);
    },
    init: function (y, m, d) {   //y:截止年份； m：截止月份； d：截止日期
      var year, month;		//
      var date = new Date();
      //设置截止年份
      if (y) {
        year = y;
      } else {
        year = date.getFullYear();
      }

      //设置截止月份
      if (m) {
        month = m;
      } else {
        month = date.getMonth() + 1;
      }
      month = month < 10 ? '0' + (month - 0) : month;
      var that = this;
      that.dateList = [];     //存储日历展示的数组
      that.year = year;
      console.log('year:' + that.year);

      that.month = month;
      // console.log('month:'+that.month);

      //当前月的第一天的日期
      var firstDay = new Date(year, month - 1, 1);
      // console.log('firstDay:'+firstDay);

      //第一天是星期几
      var weekday = firstDay.getDay();

      //求当前月一共有多少天
      //new Date(year,month+1,0) ： month+1是下一个月，day为0代表的是上一个月的最后一天，即我们所需的当前月的最后一天。
      //getDate（）则返回这个日期对象是一个月中的第几天，我们由最后一天得知这个月一共有多少天
      var days;
      days = new Date(year, month, 0).getDate();

      that.dateList.push([]);

      //计算上个月末尾的空格
      for (var i = 0; i < weekday; i++) {
        that.dateList[0].push(' ');
      }
      var plen = that.dateList[0].length;	//起始空白格的个数
      var l = 0;    //that.dateList的行号
      var d = 1;		//日期，从1号开始
      //如果传入的是起始年月，计算当月起始日期之前的日期，以灰色样式存入that.dateList
      if (that.startDate && year == that.startDate.startYear && month == that.startDate.startMonth) {		//##
        d = that.startDate.startDate - 0;   //日期从起始日期开始
        //计算当月起始日期之前的日期，以灰色样式存入that.dateList
        for (var x = 1; x < that.startDate.startDate - 0; x++) {
          var len = parseInt((x + weekday) / 7);  //计算当前是第几行（逢7天换一行）
          //满七天换行
          if ((x + weekday) % 7 == 0) {
            that.dateList[len - 1].push('<span class="hdBlank" style="color:#aaa; display:inline-block; width:100%; height:42px; line-height:42px;">' + x + '</span>');
            that.dateList.push([]);
            l++;
          } else {
            that.dateList[len].push('<span class="hdBlank" style="color:#aaa; display:inline-block; width:100%; height:42px; line-height:42px;">' + x + '</span>');
          }
        }
      }

      var lastDate = days;
      //如果传入的是最后日期所在的年月
      if (that.endDate && year == that.endDate.endYear && month == that.endDate.endMonth) {
        //把endDate之后的日期变灰
        lastDate = that.endDate.endDate;
      }

      for (var j = 0; j < (days + plen); j++) {
        var line = that.dateList.length;	//从已有的行数算起
        //逢周日换行
        if (that.dateList[line - 1].length % 7 == 0 && (d - 1) != days) {
          l++;
          that.dateList.push([]);
        }
        if (j < plen) {		//跳过起始空白天数
          continue;
        } else if (d > lastDate) { //如果超过最后日期，则全部置灰
          that.dateList[l].push('<span class="hdBlank" style="color:#aaa; display:inline-block; width:100%; height:42px; line-height:42px;">' + d + '</span>');
          d++;
          weekday++;
        } else {
          that.dateList[l].push(d);
          d++;
          weekday++;
        }
        if (d > days) {
          break;
        }
      }
      for (var k = that.dateList[l].length; k < 7; k++) {		//补全最后空白天数
        that.dateList[l].push(" ");
      }

    },
    selDate: function (date) {
      if (('' + date).indexOf('<') != -1 || date == ' ') {	//如果date包含标签或者为空白则不赋值
        return;
      }
      var that = this;
      that.seledDate = date;
      that.calendarShow = false;
      that.addZero();

    },
    showYearList: function () {
      var that = this;
      that.selYear = true;
      that.selMonth = false;
      var startYear, endYear;
      var curYear = new Date().getFullYear();
      if (that.datescope && that.datescope.startDate) {
        startYear = that.datescope.startDate.split("-")[0];
      } else {
        startYear = 1900;
      }
      if (that.datescope && that.datescope.endDate) {
        endYear = that.datescope.endDate.split("-")[0];
      } else {
        endYear = curYear;
      }
      that.yearList = [];
      for (var i = endYear; i >= startYear; i--) {
        that.yearList.push(i);
      }
    },
    selYearFn: function (data) {
      var that = this;
      that.selYear = false;
      that.year = data;
      // if(that.startDate && that.year == that.startDate.startYear){
      //   that.month = that.startDate.startMonth;
      // }
      if (data == that.datescope.endDate.split("-")[0]) {
        that.month = (that.datescope.endDate.split("-")[1]) < 10 ? '0' + (that.datescope.endDate.split("-")[1]) : (that.datescope.endDate.split("-")[1]);
      }
      that.init(that.year, that.month);
      that.addZero();
    },
    showMonthList: function () {
      var that = this;
      that.selMonth = true;
      that.selYear = false;
      var from, to;
      that.monthList = [];
      var startMonth, endMonth;
      if (that.startDate && that.year == that.startDate.startYear) {
        from = that.startDate.startMonth - 0;
      } else {
        from = 1;
      }
      if (that.endDate && that.year == that.endDate.endYear) {
        to = that.endDate.endMonth - 0;
      } else {
        to = 12;
      }

      for (var j = from; j < to + 1; j++) {
        that.monthList.push(j);
      }
    },
    selMonthFn: function (data) {
      var that = this;
      that.selMonth = false;
      that.month = data;
      that.init(that.year, that.month);
      that.addZero();
    },
    reduceYear() {
      if(this.startDate){
        if(this.year == this.startDate.startYear){
          return;
        }else{
          this.year--;
          this.init(this.year,this.month);
          this.addZero();
        }
      }else if(this.year == 1900){
        return;
      }else{
        this.year--;
        this.init(this.year,this.month);
        this.addZero();
      }
    },
    reduceMonth() {
      if(this.startDate && this.year == this.startDate.startYear){
        if(this.month == this.startDate.startMonth){
          return;
        }
      }else if(this.month == 1){
        return;
      }
      this.month --;
      this.init(this.year,this.month);
      this.addZero();
    },
    addYear() {
        if(this.endDate){
          if(this.year == this.endDate.endYear){
            return;
          }else{
            this.year++;
            if(this.year == this.endDate.endYear){
              this.month = this.endDate.endMonth;
            }
            this.init(this.year,this.month);
            this.addZero();
          }
        }else if(this.year == new Date().getFullYear()){
          return;
        }else{
          this.year++;
          this.init(this.year,this.month);
          this.addZero();
        }
    },
    addMonth() {
      if(this.endDate && this.year == this.endDate.endYear){
        if(this.month == this.endDate.endMonth){
          return;
        }
      }else if(this.month==12){
        return;
      }
      this.month ++;
      this.init(this.year,this.month);
      this.addZero();
  }
 }
};

//输入框时间录入
var hdSingleInputDate = {
  template: `
       <div class=" bs cf hdSingleInputDate">
        <span @click="calendarShow = !calendarShow" style="position:relative">
          <a class="fr icon_src">
            <img :src="icon_src" />
          </a>
        </span>
        <div class="hdCalendar bs" v-show="calendarShow">
          <div class="hdYearMonthArea bs cf">
            <a class="fl">
               <b @click="reduceYear"><<</b>
              <i @click="reduceMonth"><</i>
            </a>
            
            <span class="yearcontentor" @click="showYearList" v-show="!selYear">{{year}}年</span>
            <div class="hdYearList" v-show="selYear">
              <input class="bs" v-model="year" type="text" readonly />
              <ul class="yearlist bs">
                <li v-for="yearItem in yearList" @click="selYearFn(yearItem)">{{yearItem}}</li>
              </ul>
            </div>

            <span class="monthcontentor" v-show="!selMonth"  @click="showMonthList">{{month}}月</span>
            <div class="hdMonthList" v-show="selMonth">
              <input class="bs" v-model="month" type="text" readonly />
              <ul class="monthlist bs">
                <li v-for="monthItem in monthList" @click="selMonthFn(monthItem)">{{monthItem}}</li>
              </ul>
            </div>

            <a class="fr">
            <i @click="addMonth">></i>
             <b @click="addYear">>></b>
             <i style="font-size: 12px;" @click="clearTime">清除</i>
            </a>
          </div>
          <table class="hdWeekTitle bs" cell-spacing="0">
            <thead>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
            </thead>
            <tbody>
                <tr v-for="item in dateList">
                  <td @click="selDate(date)" :class="{ hdBlank:date==' ',hdCurDate : date == new Date().getDate(), hdOn:(seledDate == (date<10? '0'+date : date)) && (date!=' ') }"
                      v-for="date in item" v-html="date">{{date}}</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  data : function(){
    return {
      icon_src : require("../assets/img/date_icon.png"),
      calendarShow : false,
      year : '',
      month : '',
      seledDate : new Date().getDate(),
      startDate : null,
      endDate : null,
      result : '',
      yearList : [],
      monthList : [],
      dateList : [],
      selYear : false,
      selMonth : false
    }
  },
  props : [
    'datescope',
    'dateData'      //在外部设置日期
  ],
  mounted : function(){
    var that = this;
    $(document).on("click", function(e){
      if($(e.target).closest(".hdSingleInputDate").length==0){
        that.calendarShow = false;
      }
      if($(e.target).closest(".yearcontentor").length==0){
        that.selYear = false;
      }
      if($(e.target).closest(".monthcontentor").length==0){
        that.selMonth = false;
      }
    });
    if(that.datescope && that.datescope.startDate){
      that.startDate = {};
      that.startDate.startYear = that.datescope.startDate.split('-')[0];
      that.startDate.startMonth = that.datescope.startDate.split('-')[1];
      that.startDate.startDate = that.datescope.startDate.split('-')[2];
    }
    if(that.datescope &&  that.datescope.endDate){
      that.endDate = {};
      that.endDate.endYear = that.datescope.endDate.split('-')[0];
      that.endDate.endMonth = that.datescope.endDate.split('-')[1];
      that.endDate.endDate = that.datescope.endDate.split('-')[2];
      that.init(that.endDate.endYear,that.endDate.endMonth, that.endDate.endDate);
    }else{
      that.init();
    }
  },
  watch : {
    dateData : function(val) {
      var that = this;
      that.result = val;
      }
    },
  methods : {
    clearTime(){
      this.result = '';
      this.calendarShow = false;
      this.$emit('getdata', this.result);
    },
    addZero : function(){
      var that = this;
      that.month = (that.month-0)<10 ? '0' + (that.month-0) : that.month;
      that.seledDate = (that.seledDate-0)<10 ? '0' + (that.seledDate-0) : that.seledDate;
      that.result = that.year + '-' + that.month + '-' + that.seledDate;
      that.$emit('getdata', that.result);
    },
    init : function(y, m, d){   //y:截止年份； m：截止月份； d：截止日期
      var year,month;		//
      var date = new Date();
      //设置截止年份
      if(y){
        year = y;
      }else{
        year = date.getFullYear();
      }

      //设置截止月份
      if(m){
        month = m;
      }else{
        month = date.getMonth()+1;
      }
      var that = this;
      that.dateList=[];     //存储日历展示的数组
      that.year = year;
      console.log('year:'+that.year);

      that.month = month;
      // console.log('month:'+that.month);

      //当前月的第一天的日期
      var firstDay = new Date(year,month-1,1);
      // console.log('firstDay:'+firstDay);

      //第一天是星期几
      var weekday = firstDay.getDay();

      //求当前月一共有多少天
      //new Date(year,month+1,0) ： month+1是下一个月，day为0代表的是上一个月的最后一天，即我们所需的当前月的最后一天。
      //getDate（）则返回这个日期对象是一个月中的第几天，我们由最后一天得知这个月一共有多少天
      var days;
      days = new Date(year,month,0).getDate();

      that.dateList.push([]);

      //计算上个月末尾的空格
      for(var i=0; i<weekday; i++){
        that.dateList[0].push(' ');
      }
      var plen = that.dateList[0].length;	//起始空白格的个数
      var l = 0;    //that.dateList的行号
      var d = 1;		//日期，从1号开始
      //如果传入的是起始年月，计算当月起始日期之前的日期，以灰色样式存入that.dateList
      if(that.startDate && year==that.startDate.startYear && month==that.startDate.startMonth){		//##
        d=that.startDate.startDate-0;   //日期从起始日期开始
        //计算当月起始日期之前的日期，以灰色样式存入that.dateList
        for(var x=1; x<that.startDate.startDate-0 ; x++){
          var len = parseInt((x+weekday)/7);  //计算当前是第几行（逢7天换一行）
          //满七天换行
          if((x+weekday)%7==0){
            that.dateList[len-1].push('<span class="hdBlank" style="color:#aaa; display:inline-block; width:100%; height:42px; line-height:42px;">'+x+'</span>');
            that.dateList.push([]);
            l++;
          }else{
            that.dateList[len].push('<span class="hdBlank" style="color:#aaa; display:inline-block; width:100%; height:42px; line-height:42px;">'+x+'</span>');
          }
        }
      }

      var lastDate = days ;
      //如果传入的是最后日期所在的年月
      if(that.endDate && year==that.endDate.endYear && month==that.endDate.endMonth ){
        //把endDate之后的日期变灰
        lastDate = that.endDate.endDate;
      }

      for(var j=0; j<(days+plen); j++){
        var line = that.dateList.length;	//从已有的行数算起
        //逢周日换行
        if(that.dateList[line-1].length%7 == 0 && (d-1)!=days){
          l++;
          that.dateList.push([]);
        }
        if(j<plen){		//跳过起始空白天数
          continue;
        }else if(d>lastDate){ //如果超过最后日期，则全部置灰
          that.dateList[l].push('<span class="hdBlank" style="color:#aaa; display:inline-block; width:100%; height:42px; line-height:42px;">'+d+'</span>');
          d++;
          weekday++;
        }else{
          that.dateList[l].push(d);
          d++;
          weekday++;
        }
        if(d>days){
          break;
        }
      }
      for(var k=that.dateList[l].length; k<7; k++){		//补全最后空白天数
        that.dateList[l].push(" ");
      }

    },
    selDate : function(date){
      if((''+date).indexOf('<')!=-1 || date==' '){	//如果date包含标签或者为空白则不赋值
        return;
      }
      var that = this;
      that.seledDate = date;
      that.calendarShow = false;
      that.addZero();

    },
    showYearList : function(){
      var that = this;
      that.selYear = true;
      that.selMonth = false;
      var startYear, endYear;
      var curYear = new Date().getFullYear();
      if(that.datescope && that.datescope.startDate){
        startYear = that.datescope.startDate.split("-")[0];
      }else{
        startYear = 1900
      }
      if(that.datescope && that.datescope.endDate){
        endYear = that.datescope.endDate.split("-")[0];
      }else{
        endYear = curYear;
      }
      that.yearList = [];
      for(var i=endYear; i>=startYear; i--){
        that.yearList.push(i);
      }
    },
    selYearFn : function(data){
      var that = this;
      that.selYear = false;
      that.year = data;
      if(data==new Date().getFullYear()){
        that.month = (new Date().getMonth()+1)<10?'0' + (new Date().getMonth()+1):(new Date().getMonth()+1);
      }
      that.init(that.year,that.month);
      that.addZero();
    },
    showMonthList : function(){
      var that = this;
      that.selMonth = true;
      that.selYear = false;
      var from, to;
      that.monthList = [];
      var startMonth, endMonth;
      if(that.startDate && that.year == that.startDate.startYear){
        from = that.startDate.startMonth-0;
      }else{
        from = 1;
      }
      if(that.endDate && that.year == that.endDate.endYear){
        to = that.endDate.endMonth-0;
      }else{
        to = 12;
      }

      for(var j=from; j<to+1; j++){
        that.monthList.push(j);
      }
    },
    selMonthFn : function(data){
      var that = this;
      that.selMonth = false;
      that.month = data;
      that.init(that.year,that.month);
      that.addZero();
    },
    reduceYear() {
      if(this.startDate){
        if(this.year == this.startDate.startYear){
          return;
        }else{
          this.year--;
          this.init(this.year,this.month);
          this.addZero();
        }
      }else if(this.year == 1900){
        return;
      }else{
        this.year--;
        this.init(this.year,this.month);
        this.addZero();
      }
    },
    reduceMonth() {
      if(this.startDate && this.year == this.startDate.startYear){
        if(this.month == this.startDate.startMonth){
          return;
        }
      }else if(this.month == 1){
        return;
      }
      this.month --;
      this.init(this.year,this.month);
      this.addZero();
    },
    addYear() {
      if(this.endDate){
        if(this.year == this.endDate.endYear){
          return;
        }else{
          this.year++;
          if(this.year == this.endDate.endYear){
            this.month = this.endDate.endMonth;
          }
          this.init(this.year,this.month);
          this.addZero();
        }
      }else if(this.year == new Date().getFullYear()){
        return;
      }else{
        this.year++;
        this.init(this.year,this.month);
        this.addZero();
      }
    },
    addMonth() {
      if(this.endDate && this.year == this.endDate.endYear){
        if(this.month == this.endDate.endMonth){
          return;
        }
      }else if(this.month==12){
        return;
      }
      this.month ++;
      this.init(this.year,this.month);
      this.addZero();
    }
  }
}


// 分页组件
var hdTurnpage = {
  template : `
    <div class="hdTurnpage bs">
      <i>
        <input type="text" v-model="page" /><a @click="getPageData(page)" style="color: #fff;background: #2D88C2;">GO</a>
      </i>
      <a @click="getPageData(turnPageData.curPage-1)" :class="{btnDisable : turnPageData.curPage==1}">上一页</a>
      <ul>
        <li v-for="item in items" >
          <a @click="getPageData(item.val)" v-if="item.selectable">{{item.val}}</a><span v-if="!item.selectable">{{item.val}}</span>
        </li>
      </ul>
      <a @click="getPageData((turnPageData.curPage-0)+1)" :class="{btnDisable : turnPageData.curPage==turnPageData.pageNum}">下一页</a>
    </div>
  `,
  props : [
    'turnPageData'
  ],
  data(){
    return {
      items : [],
      page : ''
    }
  },
  mounted(){
    var that = this;
    that.renderPage();
  },
  watch : {
    turnPageData : function(obj){
      this.renderPage();
    }
  },
  methods : {
    renderPage : function(page){
      var that = this;
      var curPage;
      if(!page){
        curPage = that.turnPageData.curPage;
      }else{
        curPage = page;
      }
      var arr1=[], arr2=[];
      for(var i=0; i<that.turnPageData.pageNum; i++){
        arr1.push(i+1);
      }
      if(that.turnPageData.pageNum<7){      //当页数小于7时，不需省略，全部显示
        // arr2=arr1;
        for(var i=0; i<arr1.length; i++){
          if(curPage==arr1[i]){
            arr2.push({
              val : arr1[i],
              selectable : false
            });
          }else{
            arr2.push({
              val : arr1[i],
              selectable : true
            })
          }
        }
      }else{
        var c=2, cen=curPage, len = arr1.length;
        while((cen-c)<=0 || (cen+c)>=len){
          if((cen-c)<=0){
            cen++;
          }
          if((cen+c)>=len){
            cen--;
          }
        }
        for(var j=(cen-c); j<=(cen+c); j++){
          arr2.push({
            val : j,
            selectable : true
          });
        }
        if(arr2[0].val!=1){
          arr2.unshift({
            val : 1,
            selectable : true
          });
        }
        if(arr2[arr2.length-1].val!=arr1[arr2.length-1].val){
          arr2.push({
            val : arr1[len-1],
            selectable : true
          });
        }
        if((arr2[1].val-arr2[0].val)>1){
          arr2.splice(1,0,{
            val : '...',
            selectable : false
          });
        }
        if((arr2[arr2.length-1].val - arr2[arr2.length-2].val) > 1){
          arr2.splice(arr2.length-1,0,{
            val : '...',
            selectable : false
          });
        }
        for(var k=0; k<arr2.length; k++){
          if(arr2[k].val == curPage){
            arr2[k].selectable = false;
          }
        }
      }
      that.items = arr2;
    },
    getPageData : function(page){
      var that = this;
      if(page<1||page>that.turnPageData.pageNum){
        return;
      }
      that.$emit('getdata',page);
      // alert(page);
      that.renderPage(page);
      that.page = ''
    }
  }
};

var hdAlert = {
  template : `
    <div class="hdAlert" v-show="alertShow">
      <div class="windowArea">
        <p>提示 <a @click="confirmFn">&times;</a></p>
        <div class="content cf">
          <!--<b class="fl">-->
            <!--&lt;!&ndash;<img :src="src" alt="">&ndash;&gt;-->
          <!--</b>-->
          <i style="font-size:16px; text-indent:1em; text-align:center;">
            {{content}}
             <!--昔有佳人公孙氏，一舞剑器动四方。观者如山色沮丧，天地为之久低昂。霍如羿射九日落，矫如群帝骖龙翔。来如雷霆收震怒，罢如江海凝清光。-->
          </i>
        </div>
        <div class="btn">
          <button class="confirm bs" @click="confirmFn">确 定</button>
          <button class="cancel bs" @click="confirmFn">取 消</button>
        </div>
      </div>
    </div>
  `,
  props : [
    'type',
    'content'
  ],
  data : function(){
    return {
      src:require("../assets/img/OK_icon.png"),
      alertShow : true
    }
  },
  methods : {
    removeAlert : function(){
      this.alertShow = false;
    },
    confirmFn : function(){
      this.$emit('showdialog',false);
    }
  }
};

var hdDiolag = {
  template:`
  <div>
  <!--<div class="dialog-wrap">-->
  <div class="dialog-cover"  v-if="isShow" @click="closeMyself"></div>
    <transition name="drop">
    <div class="dialog-content"  v-if="isShow">
    <div class="dialog_top">提示<p class="dialog-close" @click="closeMyself">关闭</p></div>
    <slot>提示</slot>
    </div>
    </transition>
  </div>
  <!--</div>-->
  `,
  props: ['isShow'],
  data () {
    return {
    }
  },
  methods: {
    closeMyself () {
      this.$emit('getdata')
    }
  }
};

var uploader = {
  template : `
    <uploader :options="options" class="uploader-example">
      <uploader-unsupport></uploader-unsupport>
      <uploader-drop>
        <p>拖拽文件至此以导入</p>
        或 <uploader-btn>选择文件</uploader-btn>
        <!--<uploader-btn :attrs="attrs">选择图片</uploader-btn>-->
        <!--<uploader-btn :directory="true">选择文件夹</uploader-btn>-->
      </uploader-drop>
      <uploader-list></uploader-list>
    </uploader>
  `,
  props : [
    'refs'
  ],
  data : function () {
    return {
      options : {
        target : '//localhost:3000/upload',
        testChunks : false
      },
      // autoStart : false,
      attrs : {
        accept : ''
      }
    }
  },
  created : function(){
    var that = this;
    if(that.refs){
    }else{
      var timer = setInterval(function(){
        if(that.refs){
          // that.refs.on('fileSuccess',function(rootFile, file, message){
          //   console.log(rootFile, file, message);
          // });
          clearInterval(timer);
        }
      },50);
    }

  },
  methods : {

  }
};
//全屏提示框
var hdTips = {
  template:`
  <div>
  <div class="tips-wrap">
  <div class="tips-cover"  v-if="istips"></div>
    <transition name="drop-tips">
    <div class="tips-content" v-if="istips">
    <slot>提示</slot>
    </div>
    </transition>
  </div>
  </div>
  `,
  props: ['istips'],
  data () {
    return {
    }
  },
  methods: {
  }
}
var hdConfirm = {
  template:`
  <div>
  <div class="dialog-wrap">
  <div class="dialog-cover"  v-if="isConfirm"></div>
    <transition name="drop">
    <div class="confirm-content"  v-if="isConfirm">
     <div class="dialog_top">提示</div>
    <slot>提示</slot>
     <!--<button class="dialog-confirm" @click="confirmDone">确 定</button>-->
          <!--<button class="dialog-cancel" @click="removeDone">取 消</button>-->
    </div>
    </transition>
  </div>
  </div>
  `,
  props: ['isConfirm'],
  data () {
    return {
    }
  },
  methods: {
    // confirmDone(){
    //   this.$emit('confirmdone',true);
    // },
    // removeDone(){
    //   this.$emit('removedone',false);
    // }
  }
}
// 图片上传
var uploader = {
  template:`
    <span class="hduploadImg1">
      <form>
      <span class="title">{{imgName}}</span>
        <label>浏览<input class="upload_file" :name="name" @change='add_img' type="file" style="display:none;"></label>
      <span class="tips">{{tips}}</span>
      </form>
      <div>
        <!--<button>上传评分</button>-->
      </div>
    </span>
  `,
  data () {
    return {
      imgs: [],
      imgName:'',
      tips:''
    }
  },
  props:['type','name','url'],
  methods:{
    // chooseImg(){
    //   document.getElementsByClassName('upload_file')[0].click();
    // },
    add_img(event){
      var reader =new FileReader();
      var form = new FormData();
      var file=event.target.files[0];
      var type=file.type;//文件的类型，判断是否是图片
      var size=file.size;//文件的大小，判断图片的大小
      var uri = '';
      this.imgName=file.name;//文件的名称
      console.log(file);
      var arr = this.type.split(',');
      var valid = false;
      for(let i=0; i<arr.length; i++){
        if(this.imgName.indexOf(arr[i])!='-1'){
          valid = true;
        }
      }
      if(!valid){
        this.tips = '请选择我们支持的图片格式 : '+this.type;
        return;
      }
      if(size>3145728){
        // this.tips = '请选择3M以内的图片';
        // return;
      }
      form.append('inputFile',img1, img1.name);
      this.$http.post(this.URL_PREFIX + this.url,form,{
        headers:{'Content-Type':'multipart/form-data'}
      }).then(response => {
        // uri = response.data.url;
        // reader.readAsDataURL(img1);
        // var that=this;
        // reader.onloadend=function(){
        //   that.imgs.push(uri);
        // };
        this.tips = '上传成功';
      }).catch(error => {
        this.tips = '上传失败';
      });
      document.getElementsByClassName('upload_file')[0].value = '';   //只有清空了input的value值，才能继续上传同一张图片
    }
  }
};
var hdToTop = {
  template : `
    <a href="#top" class="hdToTop" @click="toTop">
       <img :src="url" alt="">
    </a>
  `,
  data(){
    return {
      url : require("../assets/img/toTop.png")
    }
  },
  methods : {
    toTop (){
      document.scrollTop(0);
    }
  }

};

// 图片上传
var uploaderImage2 = {
  template:`
    <span class="hduploadImg2">
    <span @click="chooseImg">{{imgName}}<input class="upload_file" @change='add_img'  type="file" style="display: none"></span>
    </span>
  `,
  data () {
    return {
      imgs: [],
      imgName:'浏览',
      tips:'',
      imgData: {
        accept: 'image/gif, image/jpeg, image/png, image/jpg',
      }
    }
  },
  props:['index'],
  methods:{
    chooseImg(){
      document.getElementsByClassName('upload_file')[this.index].click();
    },
    add_img(event){
      var reader =new FileReader();
      var form = new FormData();
      var img1=event.target.files[0];
      var type=img1.type;//文件的类型，判断是否是图片
      var size=img1.size;//文件的大小，判断图片的大小
      var uri = '';
      if(this.imgData.accept.indexOf(type) == -1){
        this.tips = '请选择我们支持的图片格式:gif,jpeg,png,jpg';
        this.imgName = '浏览';
        return;
      }
      if(size>3145728){
        this.tips = '请选择3M以内的图片';
        this.imgName = '浏览';
        return;
      }
      this.imgName=img1.name;//文件的名称
      form.append('file',img1,img1.name);
      console.log(form);
      this.$http.post('/file/upload',form,{
        headers:{'Content-Type':'multipart/form-data'}
      }).then(response => {
        uri = response.data.url
        reader.readAsDataURL(img1);
        var that=this;
        reader.onloadend=function(){
          that.imgs.push(uri);
        }
        this.tips = '上传成功';
      }).catch(error => {
        this.tips = '上传失败';
        // this.imgName = '浏览';
      })
      document.getElementsByClassName('upload_file')[this.index].value = '';   //只有清空了input的value值，才能继续上传同一张图片
    }
  }
}
export var hdComponents = {
  "hd-input" : hdInput,
  "hd-select" : hdSelect,
  "hd-single-select":hdSingleSelect,
  "hd-treble" : hdTreble,
  "hd-alternative" : hdAlternative,
  "hd-button" : hdButton,
  "hd-date" : hdDate,
  "hd-turnpage" : hdTurnpage,
  "hd-alert" : hdAlert,
  "hd-single-date" : hdSingleDate,
  "hd-diolag" : hdDiolag,
  "hd-tips":hdTips,
  "hd-input-date":hdInputDate,
  "hd-single-input-date":hdSingleInputDate,
  "hd-confirm":hdConfirm,
  "hd-toTop" : hdToTop,
  'hd-uploader':uploader,
  'hd-uploaderImage2':uploaderImage2
};











