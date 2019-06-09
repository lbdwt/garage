<style>
  @import './css/common.css';
  @import './css/index.css';
  @import './css/components.css';
</style>
<template>
  <main>
    <div class="top">
      <img _src="./assets/img/logo.png"/>
    </div>
    <div class="contentBox cf">
      <div class="leftArea">  <!-- ##l -->
        <div class="personalMsg">
          <div class="portrait">
            <img src="./assets/img/portrait.png"/>
          </div>
          <div class="article">
            <p>
              <b>信息技术部：</b><span>HDBX</span>
            </p>
            <div style="white-space:nowrap;">
              <a style="margin-right:14px;">修改密码</a>
              <a>退出</a>
            </div>
          </div>
        </div>
        <div class="catalog bs">
          <ul>
            <li class="level level_1" v-for="(item, index) in catalogTree">
              <p @click="level_1_click_fn(item,index)" :class="{level_1_on : item.childrenShow}">  <!-- 第一级  -->
                <span><img :src="item.iconUrl"/></span>{{item.text}}
              </p>
              <ul v-show="item.childrenShow">
                <li class="level level_2" v-for="(item2, index2) in item.children">
                  <!-- 第二级  -->
                  <p @click="unfold_level_2_list(index, item2, index2)" v-if="item2.children"
                     :class="{level_2_on : item2.childrenShow}">
                    {{item2.text}}
                    <span><img src="./assets/img/plus_negtive_icon.png"/></span>
                  </p>
                  <p v-else @click="level_2_click_fn($event, index, item2, index2)"
                     :class="{level_2_on : item2.childrenShow}">
                    <router-link :to="item2.path">
                      {{item2.text}}
                    </router-link>
                  </p>
                  <ul v-show="item2.childrenShow">
                    <li class="level level_3" v-for="(item3, index3) in item2.children">
                      <!-- 第3级  -->
                      <p @click="level3_click_fn($event,item3)">
                        <router-link :to="item3.path">{{item3.text}}</router-link>
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="rightArea">  <!-- ##r -->
        <div class="position bs cf">
          <div class="breadcrumb fl">
            <span>当前位置：</span>
            <span>首页</span>
            <span v-show="pos_lev1">></span>
            <span>{{pos_lev1}}</span>
            <span v-show="pos_lev2">></span>
            <span>{{pos_lev2}}</span>
            <span v-show="pos_lev3">></span>
            <span>{{pos_lev3}}</span>
          </div>
          <div class="inputArea fr">
            <input class="bs" type="text"/>
          </div>
        </div>
        <div class="viewArea bs">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </main>
</template>

<script src="./js/catalogTree.js"></script>
<script>
  import {catalogTree} from "./js/catalogTree.js";

  export default {
    name: 'app',
    data: function () {
      return {
        catalogTree: catalogTree,
        pos_lev1: '',
        pos_lev2: '',
        pos_lev3: ''
      }
    },
    mounted: function () {

    },
    methods: {
      level_1_click_fn: function (item, index) {
        var that = this;
        for (var i = 0; i < this.catalogTree.length; i++) {
          if (i != index) {
            this.catalogTree[i].childrenShow = false;
          }
        }
        this.catalogTree[index].childrenShow = !this.catalogTree[index].childrenShow;
        that.pos_lev1 = item.text;
        that.pos_lev2 = '';
        that.pos_lev3 = '';
      },
      unfold_level_2_list: function (index, item2, index2) {	//展开第2级目录子项列表
        $(".level_2 p").removeClass("level_2_on");	//去掉第2级目录“被选中”样式
        //二级菜单全部收起
        for (var i = 0; i < this.catalogTree.length; i++) {
          for (var j = 0; j < this.catalogTree[i].children.length; j++) {
            if (this.catalogTree[i].children[j].childrenShow != undefined && !(i == index && j == index2)) {
              this.catalogTree[i].children[j].childrenShow = false;
            }
          }
        }
        this.catalogTree[index].children[index2].childrenShow = !this.catalogTree[index].children[index2].childrenShow;
        this.pos_lev2 = item2.text;
        this.pos_lev3 = '';
      },
      level_2_click_fn: function (ev, index, item2, index2) {
        $(".level_3").removeClass("on");	//去掉第3级目录“被选中”样式
        $(".level_2 p").removeClass("level_2_on");	//去掉第2级目录“被选中”样式
        $(ev.target).closest("p").addClass("level_2_on");	//当前被点击条目赋予“被选中”样式
        //二级菜单全部收起
        for (var i = 0; i < this.catalogTree.length; i++) {
          for (var j = 0; j < this.catalogTree[i].children.length; j++) {
            if (typeof this.catalogTree[i].children[j].childrenShow != undefined) {
              this.catalogTree[i].children[j].childrenShow = false;
            }
          }
        }
        this.pos_lev2 = item2.text;
        this.pos_lev3 = '';
      },
      level3_click_fn: function (ev, item3) {
        $(".level_3").removeClass("on");
        $(ev.target).closest(".level_3").addClass("on");
        this.pos_lev3 = item3.text;
      }
    }
  }
</script>

