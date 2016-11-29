/**
 * Created by wangBin on 2016/9/19.
 * 借书还书续借
 */
Ext.define(
    'ExtFrame.view.main.booksManagement.booksBorrowBackRenew.BooksBorrowBackRenewManager',
    {
        requires: [
            'ExtFrame.view.main.booksManagement.booksBorrowBackRenew.BooksBorrowBackRenewController',
            'ExtFrame.view.main.booksManagement.booksBorrowBackRenew.BooksBorrowBackRenewGrid',
            'ExtFrame.view.main.booksManagement.booksBorrowBackRenew.BooksBorrowBackRenewPanel',
            'ExtFrame.view.main.booksManagement.booksBorrowBackRenew.BooksBorrowBackRenewForm',
            'ExtFrame.view.main.booksManagement.booksBorrowBackRenew.BooksBorrowBackRenewWindow',
            'ExtFrame.view.main.booksManagement.booksBorrowBackRenew.BooksBorrowBackRenewModel'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'booksBorrowBackRenewManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,
        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'booksBorrowBackRenewController',
        stripeRows: true,

        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'booksBorrowBackRenewGrid',
                    itemId: 'booksBorrowBackRenewGrid',
                    width:'70%',
                    region:'center'
                },
                {
                    xtype: 'booksBorrowBackRenewWindow',
                    itemId: 'booksBorrowBackRenewWindow',
                    region:'east'
                }
            ];
            me.callParent();
        }


    });