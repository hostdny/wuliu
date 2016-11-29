/**
 * Created by zzw on 2016/7/18.
 */
Ext.define(
    'ExtFrame.view.main.irs.irsEquipmentMonitor.IrsEquipmentMonitorManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.irs.irsEquipmentMonitor.IrsEquipmentMonitorController',
            'ExtFrame.view.main.irs.irsEquipmentMonitor.IrsEquipmentMonitorModel',
            'ExtFrame.view.main.irs.irsEquipmentMonitor.IrsEquipmentMonitorGrid'],//请求MainController类
        layout: {type: 'border'},
        controller: 'irsEquipmentMonitorController',
        viewModel: {type: 'irsEquipmentMonitorModel'},
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'irsEquipmentMonitorGrid',
                itemId: me.ename + 'Grid',
                id: 'irsEquipmentMonitorGrid',
                ename: me.ename,
                region: 'center'
            }];
            me.callParent();
        }
    }
);
