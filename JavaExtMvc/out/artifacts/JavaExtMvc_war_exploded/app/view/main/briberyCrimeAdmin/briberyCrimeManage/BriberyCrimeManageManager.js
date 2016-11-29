/**
 * Created by wangBin on 2016/9/21.
 */
Ext.define(
    'ExtFrame.view.main.briberyCrimeAdmin.briberyCrimeManage.BriberyCrimeManageManager',
    {
        requires: [
            'ExtFrame.view.main.briberyCrimeAdmin.briberyCrimeManage.BriberyCrimeManageController',
            'ExtFrame.view.main.briberyCrimeAdmin.briberyCrimeManage.BriberyCrimeManageGrid',
            'ExtFrame.view.main.briberyCrimeAdmin.briberyCrimeManage.BriberyCrimeManageWindow',
            'ExtFrame.view.extEncap.UEditor',
            'ExtFrame.view.main.briberyCrimeAdmin.briberyCrimeManage.BriberyCrimeManageModel'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'briberyCrimeManageManager',
        viewModel: {type: 'briberyCrimeManageModel'},
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        id:"briberyCrimeManageManagerId",
        controller: 'briberyCrimeManageController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'briberyCrimeManageGrid',
                    itemId: me.ename + 'Grid',
                    id:'briberyCrimeManageGrid',
                    ename: me.ename,
                    region: 'center'
                },{
                    xtype: 'briberyCrimeManageWindow',
                    itemId: me.ename + 'Window',
                    id:'briberyCrimeManageWindow',
                    ename: me.ename,
                    region: 'east',
                    width: 850,
                    height: 500,
                    split: true
                }
            ];
            me.callParent();
        }


    });