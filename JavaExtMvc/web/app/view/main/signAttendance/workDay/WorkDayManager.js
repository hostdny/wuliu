/**
 * Created by zzw on 2016/10/31.
 */
Ext.define(
    'ExtFrame.view.main.signAttendance.workDay.WorkDayManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.signAttendance.workDay.WorkDayController',
        //    'ExtFrame.view.main.signAttendance.workDay.WorkDayGrid',
            'ExtFrame.view.main.signAttendance.workDay.WorkDayModel',
            'ExtFrame.view.main.signAttendance.workDay.WorkDayWindow',
            'ExtFrame.view.main.signAttendance.workDay.WorkDayPanel'
        ],
        layout: {type: 'border'},
        controller: 'workDayController',
        viewModel: {type: 'workDayModel'},
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                //{
                //    xtype: 'workDayGrid',
                //    itemId: 'workDayGrid',
                //    id:'workDayGrid',
                //    region: 'center',
                //    ename: me.ename,
                //    split: true
                //},
                {
                    xtype: 'workDayPanel',
                    itemId: 'workDayPanel',
                    ename: me.ename,
                    region: 'center',
                    width: 1000,
                    height: 750,
                    split: true
                }

            ];
            me.callParent();
        }
    }
);