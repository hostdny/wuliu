/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define(
    'ExtFrame.view.main.car.carCostInput.CarCostInputManager',
    {
        requires: [
            'ExtFrame.view.main.car.carCostInput.CarCostInputModel',
            'ExtFrame.view.main.car.carCostInput.CarCostInputController',
            'ExtFrame.view.main.car.carCostInput.CarCostInputGrid',
            'ExtFrame.view.main.car.carCostInput.CarCostInputUpload',
            'ExtFrame.view.main.car.carCostInput.CarCostInputForm',
            'ExtFrame.view.main.car.carCostInput.CarCostInputImg',
            'ExtFrame.view.main.car.carCostInput.CarCostInputWindow'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'carCostInputManager',
        id:'carCostInputManagerId',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'carCostInputController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'carCostInputGrid',
                    itemId: 'carCostInputGrid',
                    ename: 'carCostInput',
                    region:'center'
                },{
                    xtype: 'carCostInputWindow',
                    itemId: 'carCostInputWindow',
                    ename: 'carCostInput',
                    region: 'east'
                }
            ];
            me.callParent();
        }


    });