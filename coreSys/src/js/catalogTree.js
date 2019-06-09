export var catalogTree = [
	{
		text : "销售人员管理",     //第一层
		iconUrl : require("../assets/img/sellsmanManageIcon.png"),
		childrenShow : false,
		children : [              //第二层
			{
				text : "人员管理",
				childrenShow : false,
				children : [          //第三层
					{
						text : "顾问管理",
						path : "/agentMgt"
					},
					{
						text : "代理人管理",
						path : ""
					}
				]
			},
      {
        text : "考核评分设置",
        childrenShow : false,
        children : [
          {
            text : "评分导入",
            path : "/sellsmenManage/scoreImport"
          },
          {
            text : "评分审核",
            path : "/"
          }
        ]
      },
      {
        text : "佣酬管理",
        childrenShow : false,
        children : [
          {
            text : "佣酬计算",
            path : "/commissionCalc"
          },
          {
            text : "佣酬审核发放",
            path : "/commissionProvide"
          }
        ]
      },
      {
        text : "用户管理",
        childrenShow : false,
        children : [
          {
            text : "用户角色",
            path : "/userRole"
          },
          {
            text : "用户职级",
            path : "/userLevel"
          }
        ]
      }
		]
	},
	{
		text : "积分管理",
		iconUrl : require("../assets/img/bonusPoints.png"),
		childrenShow : false,
		children : [
			{
				text : "礼品管理",
				childrenShow : false,
				children : [
					{
						text : "礼品定义",
						path : "/presentdefine"
					},
					{
						text : "入库管理",
						path : "/customerSearch"
					},
					{
						text : "出库管理",
						path : "/"
					},
					{
						text : "库存查询",
						path : "/"
					}
				]
			},
			{
				text : "积分查询",
				childrenShow : false,
				children : [
					{
						text : "积分报表查询",
						path : "/"
					},
					{
						text : "积分记录查询",
						path : "/"
					},
					{
						text : "积分兑换记录查询",
						path : "/presentdefine"
					}
				]
			},
			{
				text : "积分比定义",
				path : "/"
			},
			{
				text : "积分试算",
				path : "/"
			},{
				text : "积分兑换",
				path : "/"
			},{
				text : "寄送管理",
				path : ""
			},{
				text : "领取管理",
				path : ""
			},{
				text : "回访管理",
				path : ""
			},{
				text : "积分赠送",
				path : ""
			}
		]
	}
];
