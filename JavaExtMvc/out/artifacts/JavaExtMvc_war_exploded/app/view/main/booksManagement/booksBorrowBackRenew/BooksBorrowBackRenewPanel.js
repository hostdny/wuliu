/**
 * Created by wangBin on 2016/9/21.
 */
Ext.define(
    'ExtFrame.view.main.booksManagement.booksBorrowBackRenew.BooksBorrowBackRenewPanel',
    {
        extend: 'Ext.panel.Panel',
        itemId: 'booksBorrowBackRenewPanel',
        alias: 'widget.booksBorrowBackRenewPanel',
        layout: {type: 'border'},
        buttonAlign: 'center',
        autoScroll:true,
        fit: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'booksBorrowBackRenewForm',
                    itemId: 'booksBorrowBackRenewForm',
                    height:"100%",
                    region: 'center'
                }
            ];
            me.callParent();
        }


    });