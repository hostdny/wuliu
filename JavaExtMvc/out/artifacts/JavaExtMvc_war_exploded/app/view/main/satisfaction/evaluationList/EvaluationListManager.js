/**
 * Created by zzw on 2016/8/3.
 */
Ext.define(
    'ExtFrame.view.main.satisfaction.evaluationList.EvaluationListManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.satisfaction.evaluationList.EvaluationListController',
            'ExtFrame.view.main.satisfaction.evaluationList.EvaluationListGrid',
            'ExtFrame.view.main.satisfaction.evaluationList.EvaluationListModel',
            'ExtFrame.view.main.satisfaction.evaluationList.EvaluationListWindow'],
        layout: {type: 'border'},
        controller: 'evaluationListController',
        viewModel: {type: 'evaluationListModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'evaluationListGrid',
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center'
            },{
                xtype: 'evaluationListWindow',
                itemId: me.ename + 'Window',
                ename: me.ename,
                region: 'east',
                split: true
            }];
            me.callParent();
        }
    }
);