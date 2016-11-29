/**
 * Created by zzw on 2016/11/1.
 */
Ext.define(
    'ExtFrame.view.main.signAttendance.leaveOut.LeaveOutManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.signAttendance.leaveOut.LeaveOutController',
            'ExtFrame.view.main.signAttendance.leaveOut.LeaveOutGrid',
            'ExtFrame.view.main.signAttendance.leaveOut.LeaveOutModel',
            'ExtFrame.view.main.signAttendance.leaveOut.LeaveOutWindow',
            'ExtFrame.view.extEncap.DateTime'
        ],
        layout: {type: 'border'},
        controller: 'leaveOutController',
        viewModel: {type: 'leaveOutModel'},
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'leaveOutGrid',
                    itemId: 'leaveOutGrid',
                    id:'leaveOutGrid',
                    region: 'center',
                    ename: me.ename
                },{
                    xtype: 'leaveOutWindow',
                    itemId: 'leaveOutWindow',
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