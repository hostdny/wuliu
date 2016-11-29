/**
 * Created by wangBin on 2016/9/20.
 */
Ext.define('ExtFrame.view.main.booksManagement.booksBorrowBackRenew.BooksBorrowBackRenewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.booksBorrowBackRenewController',

    //借书
    onClickBorrow: function () {
        var view = this.getView();
        var booksBorrowBackRenewWindow = view.down('#booksBorrowBackRenewWindow');
        var booksBorrowBackRenewForm = booksBorrowBackRenewWindow.down('#booksBorrowBackRenewForm');
        booksBorrowBackRenewForm.getForm().reset();
        booksBorrowBackRenewWindow.expand();
    },
    //还书
    onClickBack: function () {
        var view = this.getView();
        var booksBorrowBackRenewWindow = view.down('#booksBorrowBackRenewWindow');
        var booksBorrowBackRenewForm = booksBorrowBackRenewWindow.down('#booksBorrowBackRenewForm');
        booksBorrowBackRenewForm.getForm().reset();
        booksBorrowBackRenewWindow.expand();
    },
    //续借
    onClickRenew: function () {
        var view = this.getView();
        var booksBorrowBackRenewWindow = view.down('#booksBorrowBackRenewWindow');
        var booksBorrowBackRenewForm = booksBorrowBackRenewWindow.down('#booksBorrowBackRenewForm');
        booksBorrowBackRenewForm.getForm().reset();
        booksBorrowBackRenewWindow.expand();
    },
    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchNoAddEncap(this);
    },
    onClickButtonSave: function () {
        var booksBorrowBackRenewWindow = this.getView();
        var booksBorrowBackRenewForm = booksBorrowBackRenewWindow.down("#booksBorrowBackRenewForm");
        booksBorrowBackRenewForm.getForm().reset();
        booksBorrowBackRenewWindow.collapse();
    },

    onSelectTree: function (me, record, eOpts) {
    },
    onSelectTreePicker: function (ppp, record, eOpts) {
    },
    onClickClear: function () {
        var booksBorrowBackRenewWindow = this.getView();
        var booksBorrowBackRenewForm = booksBorrowBackRenewWindow.down("#booksBorrowBackRenewForm");
        booksBorrowBackRenewForm.getForm().reset();
        booksBorrowBackRenewWindow.collapse();
    }
});