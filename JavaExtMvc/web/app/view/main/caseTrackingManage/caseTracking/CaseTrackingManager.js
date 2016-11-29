/**
 * Created by wangBin on 2016/7/14.
 */
Ext.define(
    'ExtFrame.view.main.caseTrackingManage.caseTracking.CaseTrackingManager',
    {
        requires: [
            'ExtFrame.view.main.caseTrackingManage.caseTracking.CaseTrackingModel',
            'ExtFrame.view.main.caseTrackingManage.caseTracking.CaseTrackingController',
            'ExtFrame.view.main.caseTrackingManage.caseTracking.CaseTrackingGrid',
            'ExtFrame.view.main.caseTrackingManage.caseTracking.CaseTrackingTimeLine',
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'caseTrackingManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'caseTrackingController',
        id:"caseTrackingManagerId",
        stripeRows: true,
        ename:'',
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    title: '案件',
                    xtype: 'caseTrackingGrid',
                    itemId: 'caseTrackingGrid',
                    ename:me.ename,
                    region:'center'
                }
            ];
            me.callParent();
        }


    });