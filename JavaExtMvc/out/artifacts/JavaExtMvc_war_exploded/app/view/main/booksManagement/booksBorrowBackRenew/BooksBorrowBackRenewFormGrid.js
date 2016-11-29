/**
 * Created by wangBin on 2016/9/21.
 */
Ext.define('ExtFrame.view.main.booksManagement.booksBorrowBackRenew.BooksBorrowBackRenewFormGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.booksBorrowBackRenewFormGrid',
    viewModel: {type: 'booksBorrowBackRenewModel'},
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        me.columns = [
            {
                text: '标题',
                width: 200,
                sortable: true,
                dataIndex: ''
            }, {
                text: '发布时间',
                width: 100,
                sortable: true,
                dataIndex: ''
            }

        ];
        //grid 停靠item
        me.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                itemId: 'add',
                text: '移除',
                handler: ""
            }]
        }];
        me.callParent();
    }
});