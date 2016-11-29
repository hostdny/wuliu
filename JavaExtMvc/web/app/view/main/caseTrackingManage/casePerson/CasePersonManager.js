/**
 * Created by wangBin on 2016/11/4.
 */
Ext.define(
    'ExtFrame.view.main.caseTrackingManage.casePerson.CasePersonManager',
    {
        requires: [
            'ExtFrame.view.main.caseTrackingManage.casePerson.CasePersonModel',
            'ExtFrame.view.main.caseTrackingManage.casePerson.CasePersonController',
            'ExtFrame.view.main.caseTrackingManage.casePerson.CasePersonGrid',
            'ExtFrame.view.main.caseTrackingManage.casePerson.CasePersonWindow'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'casePersonManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,
        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'casePersonController',
        stripeRows: true,
        id:"casePersonManagerId",
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'casePersonGrid',
                    itemId: 'casePersonGrid',
                    ename: 'casePerson',
                    region: 'center'
                }
            ];
            me.callParent();
        }
    }
);