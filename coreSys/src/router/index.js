import Vue from 'vue'
import Router from 'vue-router'
import presentDefine from '@/components/presentDefine'
import agentMgt from '@/components/agentMgt'
import commissionCalc from '@/components/commissionCalc'
import commissionProvide from '@/components/commissionProvide'
import userRole from '@/components/userRole'
import userLevel from '@/components/userLevel'
import userRoleQuery from '@/components/userRoleQuery'
import scoreImport from '@/components/sellsmenmanage/examination/scoreImport'       //评分导入

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: "presentDefine",
      path: "/presentdefine",
      component: presentDefine
    },
    {
      name: "agentMgt",
      path: "/agentMgt",
      component: agentMgt
    },
    {
      name: "commissionCalc",
      path: "/commissionCalc",       //佣酬计算
      component: commissionCalc
    },
    {
      name: "commissionProvide",
      path: "/commissionProvide",    //佣酬审核发放
      component: commissionProvide
    },
    {
      name: "userRole",
      path: "/userRole",            //用户角色
      component: userRole
    },
    {
      name: "userLevel",
      path: "/userLevel",          //用户职级
      component: userLevel
    },
    {
      name: "userRoleQuery",
      path: "/userRoleQuery",       //用户查询
      component: userRoleQuery
    },
    {
      name : "scoreImport",
      path : "/sellsmenManage/scoreImport",
      component : scoreImport
    }
  ]
})
