/**
 * Created by wangBin on 2016/8/29.
 */
Ext.define(
    'ExtFrame.view.main.workAreaApplyManage.workAreaManage.WorkAreaManageManager',
    {
        requires: [
            'ExtFrame.view.main.workAreaApplyManage.workAreaManage.WorkAreaManageModel',
            'ExtFrame.view.main.workAreaApplyManage.workAreaManage.WorkAreaManageController',
            'ExtFrame.view.main.workAreaApplyManage.workAreaManage.WorkAreaManageGrid',
            'ExtFrame.view.main.workAreaApplyManage.workAreaManage.WorkAreaManageWindow'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'workAreaManageManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'workAreaManageController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'workAreaManageGrid',
                    itemId: 'workAreaManageGrid',
                    ename: 'workAreaManage',
                    region:'center'
                },
                {
                    xtype: 'workAreaManageWindow',
                    itemId: 'workAreaManageWindow',
                    ename: 'workAreaManage',
                    region:'east'
                }
            ];
            me.callParent();
        }


    });