/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define(
    'ExtFrame.view.main.car.carGeneralize.CarGeneralizeManager',
    {
        requires: [
            'ExtFrame.view.main.car.carGeneralize.CarGeneralizeModel',
            'ExtFrame.view.main.car.carGeneralize.CarGeneralizeController',
            'ExtFrame.view.main.car.carGeneralize.CarGeneralizeForm',
            'ExtFrame.view.main.car.carGeneralize.CarGeneralizeChartLine',
            'ExtFrame.view.main.car.carGeneralize.CarGeneralizeChartPie'
        ],
        extend: 'Ext.panel.Panel',
        layout: {type: 'border'},
        viewModel: {type: 'carGeneralizeModel'},
        controller: 'carGeneralizeController',
        ename: '',//用于构造itemId，很重要，要和数据
        itemId: 'carGeneralizeManager',
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'carGeneralizeForm',
                    itemId: 'carGeneralizeForm',
                    ename: 'carGeneralize',
                    height:'15%',
                    width:'100%',
                    region: 'north'
                },
                {
                    xtype: 'carGeneralizeChartLine',
                    itemId: 'carGeneralizeChartLine',
                    width:'50%',
                    region: 'center'
                },
                {
                    xtype: 'carGeneralizeChartPie',
                    itemId: 'carGeneralizeChartPie',
                    width:'50%',
                    region: 'west'
                }
            ];
            me.callParent();
        }


    });