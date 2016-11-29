/**
 * Created by wangBin on 2016/7/28.
 */
Ext.define(
    'ExtFrame.view.main.correct.correctAddressList.CorrectAddressListManager',
    {
        requires: [
            'ExtFrame.view.main.correct.correctAddressList.CorrectAddressListModel',
            'ExtFrame.view.main.correct.correctAddressList.CorrectAddressListController',
            'ExtFrame.view.main.correct.correctAddressList.CorrectAddressListGrid',
            'ExtFrame.view.main.correct.correctAddressList.CorrectAddressListWindow'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'correctAddressListManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'correctAddressListController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'correctAddressListGrid',
                    itemId: 'correctAddressListGrid',
                    ename: 'correctAddressList',
                    region:'center'
                },
                {
                    xtype: 'correctAddressListWindow',
                    itemId: 'correctAddressListWindow',
                    ename: 'correctAddressList',
                    region:'east'
                }
            ];
            me.callParent();
        }


    });