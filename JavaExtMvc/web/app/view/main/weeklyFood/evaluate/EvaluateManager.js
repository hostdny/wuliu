/**
 * Created by wangBin on 2016/8/1.
 */
Ext.define(
    'ExtFrame.view.main.weeklyFood.evaluate.EvaluateManager',
    {
        requires: [
            'ExtFrame.view.main.weeklyFood.evaluate.EvaluateModel',
            'ExtFrame.view.main.weeklyFood.evaluate.EvaluateController',
            'ExtFrame.view.main.weeklyFood.evaluate.EvaluateGrid',
            'ExtFrame.view.main.weeklyFood.evaluate.EvaluateWindow'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'evaluateManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        id:"evaluateManagerId",
        controller: 'evaluateController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'evaluateGrid',
                    itemId: 'evaluateGrid',
                    ename: 'evaluate',
                    region:'center'
                },
                {
                    xtype: 'evaluateWindow',
                    itemId: 'evaluateWindow',
                    ename: 'evaluate',
                    region:'east'
                }
            ];
            me.callParent();
        }


    });