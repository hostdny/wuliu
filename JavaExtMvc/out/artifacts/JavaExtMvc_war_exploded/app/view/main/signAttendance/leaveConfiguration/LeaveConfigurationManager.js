/**
 * Created by zzw on 2016/11/1.
 */
Ext.define(
    'ExtFrame.view.main.signAttendance.leaveConfiguration.LeaveConfigurationManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.signAttendance.leaveConfiguration.LeaveConfigurationController',
            'ExtFrame.view.main.signAttendance.leaveConfiguration.LeaveConfigurationGrid',
            'ExtFrame.view.main.signAttendance.leaveConfiguration.LeaveConfigurationModel',
            'ExtFrame.view.main.signAttendance.leaveConfiguration.LeaveConfigurationWindow'
        ],
        layout: {type: 'border'},
        controller: 'leaveConfigurationController',
        viewModel: {type: 'leaveConfigurationModel'},
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'leaveConfigurationGrid',
                    itemId: 'leaveConfigurationGrid',
                    id:'leaveConfigurationGrid',
                    region: 'center',
                    ename: me.ename
                },{
                    xtype: 'leaveConfigurationWindow',
                    itemId: 'leaveConfigurationWindow',
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