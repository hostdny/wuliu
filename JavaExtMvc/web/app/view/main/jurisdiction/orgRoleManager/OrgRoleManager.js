Ext.define(
  'ExtFrame.view.main.jurisdiction.orgRoleManager.OrgRoleManager',
  {
      extend: 'Ext.panel.Panel',
      requires: ['ExtFrame.view.main.jurisdiction.orgRoleManager.OrgRoleManagerController', 'ExtFrame.view.main.jurisdiction.orgRoleManager.RoleGrid', 'ExtFrame.view.main.jurisdiction.orgRoleManager.OrgTreeGrid'],//请求MainController类
      layout: { type: 'border' },
      controller: 'orgRoleManager',
      viewModel: { type: 'orgRoleManagerModel' },
      ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
      initComponent: function () {
          var me = this;
          me.items = [{
              xtype: 'orgTreeGrid',
              itemId: 'orgTree',
              ename: me.ename,
              region: 'west',
              width: 230,
              split: true
          }, {
              xtype: 'roleGrid',
              id: 'OrgRoleManagerGrid',
              itemId: 'OrgRoleManagerGrid',
              ename: me.ename,
              region: 'center'
          }];
          me.callParent();
      }
  }

);