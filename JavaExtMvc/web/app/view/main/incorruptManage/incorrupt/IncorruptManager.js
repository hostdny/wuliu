/**
 * Created by zzw on 2016/8/1.
 */
Ext.define(
    'ExtFrame.view.main.incorruptManage.incorrupt.IncorruptManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.incorruptManage.incorrupt.IncorruptController',
            'ExtFrame.view.main.incorruptManage.incorrupt.IncorruptGrid',
            'ExtFrame.view.main.attorneyBoxManage.attorneyBox.DownLoadGrid',
            'ExtFrame.view.main.incorruptManage.incorrupt.IncorruptModel',
            'ExtFrame.view.main.incorruptManage.incorrupt.IncorruptWindow'],
        layout: {type: 'border'},
        controller: 'incorruptController',
        viewModel: {type: 'incorruptModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'incorruptGrid',
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center'
            }, {
                xtype: 'incorruptWindow',
                itemId: me.ename + 'Window',
                ename: me.ename,
                region: 'east',
                split: true
            }];
            me.callParent();
        }
    }
);