/**
 * Created by zzw on 2016/8/3.
 */
Ext.define(
    'ExtFrame.view.main.satisfaction.evaluationOverall.EvaluationOverallManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.satisfaction.evaluationOverall.EvaluationOverallController',
            'ExtFrame.view.main.satisfaction.evaluationOverall.EvaluationOverallModel',
            'ExtFrame.view.main.satisfaction.evaluationOverall.EvaluationOverallGrid'],
        layout: {type: 'border'},
        controller: 'evaluationOverallController',
        viewModel: {type: 'evaluationOverallModel'},
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'evaluationOverallGrid',
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center'
            }];
            me.callParent();
        }
    }
);
