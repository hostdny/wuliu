Ext.define(
    'ExtFrame.view.main.sys.personRoleRelation.PersonRoleRelationManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.sys.personRoleRelation.PersonRoleRelationController',
                    'ExtFrame.view.main.sys.personRoleRelation.PersonRoleRelationModel',
                    'ExtFrame.view.main.sys.personRoleRelation.PersonRoleRelationGrid',
                    'ExtFrame.view.main.sys.personRoleRelation.PersonRoleRelationWindow',
                    'ExtFrame.view.main.sys.personRoleRelation.OrganizationTree',
                    'ExtFrame.view.main.sys.personRoleRelation.PersonRoleRelationRoleGrid',
                    'ExtFrame.view.extEncap.TreeCombo'],//请求MainController类
        layout: {type: 'border'},
        controller: 'personRoleRelationController',
        viewModel: {type: 'personRoleRelationModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'organizationTree',
                itemId: 'organizationTree',
                ename: me.ename,
                region: 'west',
                width: 300,
                split: true
            }, {
                xtype: 'personRoleRelationGrid',
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center'
            }, {
                xtype: 'personRoleRelationWindow',
                itemId: me.ename + 'Window',
                ename: me.ename,
                region: 'east',
                split: true
            }];
            me.callParent();
        }
    }
);