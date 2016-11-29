/**
 * Created by jiayp on 2016/7/15.
 */
Ext.define(
    'ExtFrame.view.main.irs.irsEquipment.IrsEquipmentManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.irs.irsEquipment.IrsEquipmentController',
            'ExtFrame.view.main.irs.irsEquipment.IrsEquipmentModel',
            'ExtFrame.view.main.irs.irsEquipment.IrsEquipmentGrid',
            'ExtFrame.view.main.irs.irsEquipment.IrsEquipmentWindow',
            'ExtFrame.view.extEncap.TreeCombo'],//请求MainController类
        layout: {type: 'border'},
        controller: 'irsEquipmentController',
        viewModel: {type: 'irsEquipmentModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'irsEquipmentGrid',
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center'
            }, {
                xtype: 'irsEquipmentWindow',
                itemId: me.ename + 'Window',
                ename: me.ename,
                region: 'east',
                split: true
            }];
            me.callParent();
        }
    }
);