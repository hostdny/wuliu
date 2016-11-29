/**
 * Created by wangBin on 2016/9/19.
 */
Ext.define(
    'ExtFrame.view.main.booksManagement.booksInquiries.BooksInquiriesManager',
    {
        requires: [
            'ExtFrame.view.main.booksManagement.booksInquiries.BooksInquiriesGrid',
            'ExtFrame.view.main.booksManagement.booksInquiries.BooksInquiriesModel',
            'ExtFrame.view.main.booksManagement.booksInquiries.BooksInquiriesController'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'booksInquiriesManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,
        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'booksInquiriesController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'booksInquiriesGrid',
                    itemId: me.ename + 'Grid',
                    region: 'center',
                    ename: me.ename
                }];
            me.callParent();
        }


    });