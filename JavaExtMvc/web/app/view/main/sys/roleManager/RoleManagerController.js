Ext.define('ExtFrame.view.main.sys.roleManager.RoleManagerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.roleManagerController',
    
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
        Tools.GridSearchToolbar.SaveEncap(this, Tools.Method.getAPiRootPath()+'/role/save.do');
    },
    onClickButtonDel: function () {
        Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath()+'/role/delete.do');
    },
    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchEncap(this);
    },
    checkChild: function (node, state) {
        checkChild(node, state);
    }
});

function checkChild(node, state) {
    if (node.hasChildNodes()) {
        node.eachChild(function (child) {
            child.set('checked', state);
            checkChild(child, state);
        });
    }
}