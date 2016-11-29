/**
 * Created by zzw on 2016/7/22.
 */
Ext.define(
    'ExtFrame.view.main.assets.sortManagement.SortManagementManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.assets.sortManagement.SortManagementController',
            'ExtFrame.view.main.assets.sortManagement.SortManagementGrid',
            'ExtFrame.view.main.assets.sortManagement.SortManagementModel',
            'ExtFrame.view.main.assets.sortManagement.SortManagementWindow'],//请求MainController类
        layout: {type: 'border'},
        controller: 'sortManagementController',
        viewModel: {type: 'sortManagementModel'},
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'sortManagementGrid',
                    itemId: me.ename + 'Grid',
                    region: 'center',
                    ename: me.ename
                },
                {
                    xtype: 'sortManagementWindow',
                    itemId: me.ename + 'Window',
                    ename: me.ename,
                    region: 'east',
                    split: true
                }];
            me.callParent();
        }
    }
);