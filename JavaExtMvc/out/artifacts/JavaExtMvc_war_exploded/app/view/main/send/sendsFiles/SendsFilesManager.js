/**
 * Created by jiayp on 2016/7/22.
 */
Ext.define(
    'ExtFrame.view.main.send.sendsFiles.SendsFilesManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.send.sendsFiles.SendsFilesController',
            'ExtFrame.view.main.send.sendsFiles.SendsFilesModel',
            'ExtFrame.view.main.send.sendsFiles.SendsFilesGrid',
            'ExtFrame.view.main.send.sendsFiles.SendsFilesWindow',
            'ExtFrame.view.extEncap.TreeCombo'],//请求MainController类
        layout: {type: 'border'},
        controller: 'sendsFilesController',
        viewModel: {type: 'sendsFilesModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'sendsFilesGrid',
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center'
            }, {
                xtype: 'sendsFilesWindow',
                itemId: me.ename + 'Window',
                ename: me.ename,
                region: 'east',
                split: true
            }];
            me.callParent();
        }
    }
);