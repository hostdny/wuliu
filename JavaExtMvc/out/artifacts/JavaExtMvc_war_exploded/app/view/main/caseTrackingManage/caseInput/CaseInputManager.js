/**
 * Created by wangBin on 2016/11/2.
 */
Ext.define(
    'ExtFrame.view.main.caseTrackingManage.caseInput.CaseInputManager',
    {
        requires: [
            'ExtFrame.view.main.caseTrackingManage.caseInput.CaseInputModel',
            'ExtFrame.view.main.caseTrackingManage.caseInput.CaseInputController',
            'ExtFrame.view.main.caseTrackingManage.caseInput.CaseInputGrid',
            'ExtFrame.view.main.caseTrackingManage.caseInput.CaseInputFlowSheet',
            'ExtFrame.view.main.caseTrackingManage.caseInput.CaseInputWindow'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'caseInputManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,
        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'caseInputController',
        stripeRows: true,
        id:"caseInputManagerId",
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'caseInputGrid',
                    itemId: 'caseInputGrid',
                    ename: 'caseInput',
                    region: 'center'
                }
            ];
            me.callParent();
        }
    }
);