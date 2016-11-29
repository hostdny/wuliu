Ext.define(
  'ExtFrame.view.main.region.Top',
  {
      extend: 'Ext.toolbar.Toolbar',
      alias: 'widget.maintop',
      require: 'Ext.toolbar.Spacer',
      style: 'background: url(login/css/images/banner.png)',
      viewModel: { type: 'main' },//指定后可获取MainModel中data数据块
      initComponent: function () {
          var orgs = this.getViewModel().getData().userOrgs;//获取用户所有组织机构
          var curOrg = this.getViewModel().getData().defaultOrgId;//获取用户选择的当前组织机构
          this.items = [{
                //xtype:'button',默认就是button
                text: '首页',
                hidden: false,
                glyph: 0xf015,//首页图标
                handler: 'onIndexClick'
            },
            {
                xtype: 'tbspacer',
                width: 100
            },
              '->',//右对齐面板
              '-',//一个竖直的分隔条
            {
                xtype: 'combo',
                itemId: 'changeOrg',
                name: 'changeOrg',
                labelWidth: 60,
                fieldLabel: '组织机构',
                editable: false,// 是否允许输入
                store: Ext.create('Ext.data.Store', {
                    fields: ['oid', 'name'],
                    data: orgs
                }),
                queryMode: 'local',
                displayField: 'name',
                valueField: 'oid',
                value: curOrg,
                listeners: {
                    change: function (me, newValue, oldValue) {
                        //if (!Tools.Method.IsLogin())
                        //    return;
                        //var CurUser = Ext.decode($.cookie('CurUser'));
                        //CurUser[2] = newValue;
                        //Tools.Method.AddCookie("CurUser", Ext.encode(CurUser), 20);
                        location.reload();
                    }
                }
            }, '-',
            {
                text: '注销',
                glyph: 0xf011,
                handler: 'onSignoutClick'
            }];
          
          this.callParent();
      }
  }
);