/**
 * Created by jiayp on 2016/7/22.
 */
Ext.define(
    'ExtFrame.view.main.correct.correctActivity.CorrectActivityManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.correct.correctActivity.CorrectActivityController',
                    'ExtFrame.view.main.correct.correctActivity.CorrectActivityModel',
                    'ExtFrame.view.main.correct.correctActivity.CorrectActivityWindow',
                    'ExtFrame.view.main.correct.correctActivity.CorrectActivityGrid'],//请求MainController类
        layout: {type: 'border'},
        controller: 'correctActivityController',
        viewModel: {type: 'correctActivityModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'correctActivityGrid',
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center'
            }];
            me.callParent();
        }
    }
);