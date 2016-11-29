/**
 * Created by zzw on 2016/8/8.
 */
Ext.define(
    'ExtFrame.view.main.appointment.subscribeList.SubscribeListManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.appointment.subscribeList.SubscribeListController',
            'ExtFrame.view.main.appointment.subscribeList.SubscribeListModel',
            'ExtFrame.view.main.appointment.subscribeList.SubscribeListGrid',
            'ExtFrame.view.main.appointment.subscribeList.SubscribeListWindow'],
        layout: {type: 'border'},
        controller: 'subscribeListController',
        viewModel: {type: 'subscribeListModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'subscribeListGrid',
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center'
            }, {
                xtype: 'subscribeListWindow',
                itemId: me.ename + 'Window',
                ename: me.ename,
                region: 'east',
                split: true
            }];
            me.callParent();
        }
    }
);