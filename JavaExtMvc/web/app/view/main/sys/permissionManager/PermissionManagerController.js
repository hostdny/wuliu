Ext.define('ExtFrame.view.main.sys.permissionManager.PermissionManagerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.permissionManager',

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
        Tools.GridSearchToolbar.SaveEncap(this, Tools.Method.getAPiRootPath()+'/permissonInfo/postSave.do');
    },
    onClickButtonDel: function () {
        Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath()+'/permissonInfo/deleteById.do');
    },
    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchEncap(this);
    }
});