/**
 * Created by wangBin on 2016/11/15.
 */
Ext.define(
    'ExtFrame.view.main.caseTrackingManage.caseBacklog.CaseBacklogManager',
    {
        requires: [
            'ExtFrame.view.main.caseTrackingManage.caseBacklog.CaseBacklogModel',
            'ExtFrame.view.main.caseTrackingManage.caseBacklog.CaseBacklogController',
            'ExtFrame.view.main.caseTrackingManage.caseBacklog.CaseBacklogGrid'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'caseBacklogManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,
        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'caseBacklogController',
        stripeRows: true,
        id:"caseBacklogManagerId",
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'caseBacklogGrid',
                    itemId: 'caseBacklogGrid',
                    ename: 'caseBacklog',
                    region: 'center'
                }
            ];
            me.callParent();
        }
    }
);