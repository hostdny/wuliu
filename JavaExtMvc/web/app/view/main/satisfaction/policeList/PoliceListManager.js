/**
 * Created by zzw on 2016/8/2.
 */
Ext.define(
    'ExtFrame.view.main.satisfaction.policeList.PoliceListManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.satisfaction.policeList.PoliceListController',
            'ExtFrame.view.main.satisfaction.policeList.PoliceListModel',
            'ExtFrame.view.main.satisfaction.policeList.PoliceListWindow',
            'ExtFrame.view.main.satisfaction.policeList.PoliceListGrid'],
        layout: {type: 'border'},
        controller: 'policeListController',
        viewModel: {type: 'policeListModel'},
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'policeListGrid',
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center'
            },{
                    xtype: 'policeListWindow',
                    itemId: me.ename + 'Window',
                    ename: me.ename,
                    region: 'east',
                    split: true
            }];
            me.callParent();
        }
    }
);
