/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define(
    'ExtFrame.view.main.car.carCostCount.CarCostCountManager',
    {
        requires: [
            'ExtFrame.view.main.car.carCostCount.CarCostCountModel',
            'ExtFrame.view.main.car.carCostCount.CarCostCountController',
            'ExtFrame.view.main.car.carCostCount.CarCostCountGrid',
            'ExtFrame.view.main.car.carCostCount.CarCostCountForm'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'carCostCountManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'carCostCountController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'carCostCountForm',
                    itemId: 'carCostCountForm',
                    ename: 'carCostCount',
                    region: 'north'
                },{
                    xtype: 'carCostCountGrid',
                    itemId: 'carCostCountGrid',
                    ename: 'carCostCount',
                    region:'center'
                }
            ];
            me.callParent();
        }


    });