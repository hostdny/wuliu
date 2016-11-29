/**
 * Created by wangBin on 2016/7/28.
 */
Ext.define(
    'ExtFrame.view.main.correct.correctSupervise.CorrectSuperviseManager',
    {
        requires: [
            'ExtFrame.view.main.correct.correctSupervise.CorrectSuperviseModel',
            'ExtFrame.view.main.correct.correctSupervise.CorrectSuperviseController',
            'ExtFrame.view.main.correct.correctSupervise.CorrectSuperviseGrid',
            'ExtFrame.view.main.correct.correctSupervise.CorrectSuperviseOpenWindow',
            'ExtFrame.view.main.correct.correctSupervise.CorrectSuperviseWindow'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'correctSuperviseManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'correctSuperviseController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'correctSuperviseGrid',
                    itemId: 'correctSuperviseGrid',
                    ename: 'correctSupervise',
                    region:'center'
                }
            ];
            me.callParent();
        }


    });