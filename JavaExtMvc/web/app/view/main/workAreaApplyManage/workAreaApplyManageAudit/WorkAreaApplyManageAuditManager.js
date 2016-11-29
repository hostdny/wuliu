/**
 * Created by jia on 2016/8/30.
 */
Ext.define(
    'ExtFrame.view.main.workAreaApplyManage.workAreaApplyManageAudit.WorkAreaApplyManageAuditManager',
    {
        requires: [
            'ExtFrame.view.main.workAreaApplyManage.workAreaApplyManageAudit.WorkAreaApplyManageAuditModel',
            'ExtFrame.view.main.workAreaApplyManage.workAreaApplyManageAudit.WorkAreaApplyManageAuditController',
            'ExtFrame.view.main.workAreaApplyManage.workAreaApplyManageAudit.WorkAreaApplyManageAuditGrid',
            'ExtFrame.view.main.workAreaApplyManage.workAreaApplyManageAudit.WorkAreaApplyManageAuditWindow'
        ],
        extend: 'Ext.panel.Panel',
        viewModel: {type: 'workAreaApplyManageAuditModel'},
        itemId: 'workAreaApplyManageAuditManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'workAreaApplyManageAuditController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'workAreaApplyManageAuditGrid',
                    itemId: 'workAreaApplyManageAuditGrid',
                    ename: 'workAreaApplyManageAudit',
                    region:'center'
                },
                {
                    xtype: 'workAreaApplyManageAuditWindow',
                    itemId: 'workAreaApplyManageAuditWindow',
                    ename: 'workAreaApplyManageAudit',
                    region:'east'
                }
            ];
            me.callParent();
        }


    });