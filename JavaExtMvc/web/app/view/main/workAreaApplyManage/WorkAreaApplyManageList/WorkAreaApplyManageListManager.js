/**
 * Created by zzw on 2016/8/31.
 */
Ext.define(
    'ExtFrame.view.main.workAreaApplyManage.WorkAreaApplyManageList.WorkAreaApplyManageListManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.workAreaApplyManage.WorkAreaApplyManageList.WorkAreaApplyManageListController',
            'ExtFrame.view.main.workAreaApplyManage.WorkAreaApplyManageList.WorkAreaApplyManageListGrid',
            'ExtFrame.view.main.workAreaApplyManage.WorkAreaApplyManageList.WorkAreaApplyManageListModel',
            'ExtFrame.view.main.workAreaApplyManage.WorkAreaApplyManageList.WorkAreaApplyManageListWindow'],
        layout: {type: 'border'},
        controller: 'workAreaApplyManageListController',
        viewModel: {type: 'workAreaApplyManageListModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'workAreaApplyManageListGrid',
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center'
            },{
                xtype: 'workAreaApplyManageListWindow',
                itemId: me.ename + 'Window',
                ename: me.ename,
                region: 'east',
                split: true
            }];
            me.callParent();
        }
    }
);