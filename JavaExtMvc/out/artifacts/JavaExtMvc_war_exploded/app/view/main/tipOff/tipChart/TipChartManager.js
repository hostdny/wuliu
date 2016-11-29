/**
 * Created by Jiayunpeng on 2016/7/8.
 */
Ext.define(
    'ExtFrame.view.main.tipOff.tipChart.TipChartManager',
    {
        extend: 'Ext.panel.Panel',
        requires: [
            'ExtFrame.view.main.tipOff.tipChart.TipChartController',
            'ExtFrame.view.main.tipOff.tipChart.TipChartPanel',
            'ExtFrame.view.main.tipOff.tipChart.TipChartPie',
            'ExtFrame.view.main.tipOff.tipChart.TipChartModel'
        ],
        layout: {type: 'border'},
        controller: 'tipChartController',
        viewModel: {type: 'tipChartModel'},
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'tipChartPanel',
                    itemId: 'tipChartPanel',
                    width:'50%',
                    region: 'center'
                },{
                    xtype: 'tipChartPie',
                    itemId: 'tipChartPie',
                    width:'50%',
                    region: 'west'
                }
            ];
            me.callParent();
        }
    }
);