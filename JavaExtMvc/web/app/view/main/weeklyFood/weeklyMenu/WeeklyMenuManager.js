/**
 * Created by wangBin on 2016/8/1.
 */
Ext.define(
    'ExtFrame.view.main.weeklyFood.weeklyMenu.WeeklyMenuManager',
    {
        requires: [
            'ExtFrame.view.main.weeklyFood.weeklyMenu.WeeklyMenuModel',
            'ExtFrame.view.main.weeklyFood.weeklyMenu.WeeklyMenuController',
            'ExtFrame.view.main.weeklyFood.weeklyMenu.WeeklyMenuGrid',
            'ExtFrame.view.main.weeklyFood.weeklyMenu.WeeklyMenuWindowGrid',
            'ExtFrame.view.main.weeklyFood.weeklyMenu.WeeklyMenuWindow'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'weeklyMenuManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'weeklyMenuController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'weeklyMenuGrid',
                    itemId: 'weeklyMenuGrid',
                    ename: 'weeklyMenu',
                    height:"80%",
                    region:'center'
                },
                {
                    xtype: 'weeklyMenuWindow',
                    itemId: 'weeklyMenuWindow',
                    ename: 'weeklyMenu',
                    region:'east'
                }
            ];
            me.callParent();
        }


    });