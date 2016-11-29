/**
 * Created by zzw on 2016/11/1.
 */
Ext.define(
    'ExtFrame.view.main.signAttendance.redundantTime.RedundantTimeManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.signAttendance.redundantTime.RedundantTimeController',
            'ExtFrame.view.main.signAttendance.redundantTime.RedundantTimeGrid',
            'ExtFrame.view.main.signAttendance.redundantTime.RedundantTimeModel',
            'ExtFrame.view.main.signAttendance.redundantTime.RedundantTimeWindow'
        ],
        layout: {type: 'border'},
        controller: 'redundantTimeController',
        viewModel: {type: 'redundantTimeModel'},
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'redundantTimeGrid',
                    itemId: 'redundantTimeGrid',
                    id:'redundantTimeGrid',
                    region: 'center',
                    ename: me.ename
                },{
                    xtype: 'redundantTimeWindow',
                    itemId: 'redundantTimeWindow',
                    ename: me.ename,
                    region: 'east',
                    width: 750,
                    height: 500,
                    split: true
                }
            ];
            me.callParent();
        }
    }
);