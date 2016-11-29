/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define(
    'ExtFrame.view.main.car.carMessage.CarMessageManager',
    {
        requires: [
            'ExtFrame.view.main.car.carMessage.CarMessageModel',
            'ExtFrame.view.main.car.carMessage.CarMessageController',
            'ExtFrame.view.main.car.carMessage.CarMessageGrid',
            'ExtFrame.view.main.car.carMessage.CarMessageWindow'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'carMessageManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'carMessageController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'carMessageGrid',
                    itemId: 'carMessageGrid',
                    ename: 'carMessage',
                    region:'center'
                },{
                    xtype: 'carMessageWindow',
                    itemId: 'carMessageWindow',
                    ename: 'carMessage',
                    region: 'east'
                }
            ];
            me.callParent();
        }


    });