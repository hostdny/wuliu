/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define(
    'ExtFrame.view.main.car.carAddress.CarAddressManager',
    {
        requires: [
            'ExtFrame.view.main.car.carAddress.CarAddressModel',
            'ExtFrame.view.main.car.carAddress.CarAddressController',
            'ExtFrame.view.main.car.carAddress.CarAddressGrid',
            'ExtFrame.view.main.car.carAddress.CarAddressHtmlPanel',
            'ExtFrame.view.main.car.carAddress.CarAddressButton',
            'ExtFrame.view.main.car.carAddress.CarAddressWindow'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'carAddressManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'carAddressController',
        stripeRows: true,
        id:"carAddressManagerId",
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'carAddressGrid',
                    itemId: 'carAddressGrid',
                    ename: 'carAddress',
                    region:'center'
                },{
                    xtype: 'carAddressWindow',
                    itemId: 'carAddressWindow',
                    ename: 'carAddress',
                    region: 'east',
                    split: true
                }
            ];
            me.callParent();
        }


    });