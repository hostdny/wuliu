Ext.define('ExtFrame.view.main.sys.buttonsManager.ButtonsManagerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.buttonsManager',

    onClickButtonLook: function () {
        Tools.GridSearchToolbar.LookEncap(this);
    },
    onClickButtonAdd: function () {
        Tools.GridSearchToolbar.AddEncap(this);
    },
    onClickButtonEdit: function () {
        Tools.GridSearchToolbar.EditEncap(this);
    },
    onClickButtonSave: function () {
        Tools.GridSearchToolbar.SaveEncap(this, Tools.Method.getAPiRootPath()+'/buttons/save.do');
    },
    onClickButtonDel: function () {
        Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath()+'/buttons/delete.do');
    },
    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchEncap(this);
    },
    onClickButtonIco: function(){
        Ext.create('ExtFrame.view.main.sys.buttonsManager.ButtonsIco')
    }
});