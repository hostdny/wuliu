/**
 * Created by wangBin on 2016/8/1.
 */
Ext.define(
    'ExtFrame.view.main.weeklyFood.menu.MenuManager',
    {
        requires: [
            'ExtFrame.view.main.weeklyFood.menu.MenuModel',
            'ExtFrame.view.main.weeklyFood.menu.MenuController',
            'ExtFrame.view.main.weeklyFood.menu.MenuGrid',
            'ExtFrame.view.main.weeklyFood.menu.MenuUpload',
            'ExtFrame.view.main.weeklyFood.menu.MenuForm',
            'ExtFrame.view.main.weeklyFood.menu.MenuWindow'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'menuManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'menuController',
        stripeRows: true,
        id:"menuManagerId",
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'menuGrid',
                    itemId: 'menuGrid',
                    ename: 'menu',
                    region:'center'
                },
                {
                    xtype: 'menuWindow',
                    itemId: 'menuWindow',
                    ename: 'menu',
                    region:'east'
                }
            ];
            me.callParent();
        }


    });