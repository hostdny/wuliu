/**
 * Created by Administrator on 2016/7/8.
 */
Ext.define(
    'ExtFrame.view.main.tipOff.tipList.TipListManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.tipOff.tipList.TipListController',
            'ExtFrame.view.main.tipOff.tipList.TipListGrid',
            'ExtFrame.view.main.tipOff.tipList.TipListModel',
           'ExtFrame.view.main.tipOff.tipList.DownLoadGrid',
            'ExtFrame.view.main.tipOff.tipList.TipListWindow'],
        layout: {type: 'border'},
        controller: 'tipListController',
        viewModel: {type: 'tipListModel'},
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'tipListGrid',
                    itemId:'tipListGrid',
                    region: 'center',
                    ename: me.ename
                },
                {
                    xtype: 'tipListWindow',
                    itemId: 'tipListWindow',
                    ename: me.ename,
                    region: 'east',
                    split: true
                }
            ];
            me.callParent();
        }
    }
);