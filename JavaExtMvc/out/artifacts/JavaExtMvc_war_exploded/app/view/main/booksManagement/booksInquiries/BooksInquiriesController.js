/**
 * Created by Jia on 2016/9/20.
 */
Ext.define('ExtFrame.view.main.booksManagement.booksInquiries.BooksInquiriesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.booksInquiriesController',

    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchNoAddEncap(this);
    },
});