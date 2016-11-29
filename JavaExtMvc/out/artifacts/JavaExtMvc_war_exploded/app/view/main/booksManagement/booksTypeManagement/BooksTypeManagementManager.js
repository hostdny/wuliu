/**
 * Created by wangBin on 2016/9/19.
 * 图书分类管理
 */
Ext.define(
    'ExtFrame.view.main.booksManagement.booksTypeManagement.BooksTypeManagementManager',
    {
        requires: [
            'ExtFrame.view.main.booksManagement.booksTypeManagement.BooksTypeManagementController',
            'ExtFrame.view.main.booksManagement.booksTypeManagement.BooksTypeManagementGrid',
            'ExtFrame.view.main.booksManagement.booksTypeManagement.BooksTypeManagementModel',
            'ExtFrame.view.main.booksManagement.booksTypeManagement.BooksTypeManagementTree',
            'ExtFrame.view.main.booksManagement.booksTypeManagement.BooksTypeManagementWindow'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'booksTypeManagementManager',
        layout: 'border',
        bodyBorder: false,
        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'booksTypeManagementController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    title: '图书类别',
                    xtype: 'booksTypeManagementTree',
                    itemId: 'booksTypeManagementTree',
                    width:'20%',
                    region:'west'
                },
                {
                    title:'分类列表',
                    xtype: 'booksTypeManagementGrid',
                    itemId: 'booksTypeManagementGrid',
                    width:'80%',
                    region: 'center'
                },
                {
                    xtype: 'booksTypeManagementWindow',
                    itemId: 'booksTypeManagementWindow',
                    region: 'east',
                    split: true
                }
            ];
            me.callParent();
        }
    });