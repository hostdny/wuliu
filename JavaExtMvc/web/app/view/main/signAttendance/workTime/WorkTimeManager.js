/**
 * Created by zzw on 2016/11/1.
 */
Ext.define(
    'ExtFrame.view.main.signAttendance.workTime.WorkTimeManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.signAttendance.workTime.WorkTimeController',
            'ExtFrame.view.main.signAttendance.workTime.WorkTimeGrid',
            'ExtFrame.view.main.signAttendance.workTime.WorkTimeModel',
            'ExtFrame.view.main.signAttendance.workTime.WorkTimeWindow',
            'ExtFrame.view.extEncap.DateTime'
        ],
        layout: {type: 'border'},
        controller: 'workTimeController',
        viewModel: {type: 'workTimeModel'},
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'workTimeGrid',
                    itemId: 'workTimeGrid',
                    id:'workTimeGrid',
                    region: 'center',
                    ename: me.ename
                },{
                    xtype: 'workTimeWindow',
                    itemId: 'workTimeWindow',
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