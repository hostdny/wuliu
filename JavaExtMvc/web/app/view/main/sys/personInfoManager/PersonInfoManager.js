Ext.define(
    'ExtFrame.view.main.sys.personInfoManager.PersonInfoManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.sys.personInfoManager.PersonInfoController',
                    'ExtFrame.view.main.sys.personInfoManager.PersonInfoModel',
                    'ExtFrame.view.main.sys.personInfoManager.PersonInfoGrid',
                    'ExtFrame.view.main.sys.personInfoManager.PersonInfoWindow',
                    'ExtFrame.view.main.sys.personInfoManager.OrganizationTreeGrid',
                    'ExtFrame.view.extEncap.TreeCombo'],//请求MainController类
        layout: {type: 'border'},
        controller: 'personInfoController',
        viewModel: {type: 'personInfoModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'organizationTreeGrid',
                itemId: 'organizationTree',
                ename: me.ename,
                region: 'west',
                width: 300,
                split: true
            }, {
                xtype: 'personInfoGrid',
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center'
            }, {
                xtype: 'personInfoWindow',
                itemId: me.ename + 'Window',
                ename: me.ename,
                region: 'east',
                split: true
            }];
            me.callParent();
        }
    }
);