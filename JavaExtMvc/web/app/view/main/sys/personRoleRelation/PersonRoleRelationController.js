Ext.define('ExtFrame.view.main.sys.personRoleRelation.PersonRoleRelationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.personRoleRelationController',

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

        var ActionEdit = Tools.Method.getAPiRootPath() + '/personRoleRelation/saveRelation.do';
        var view = this.getView();
        // 人员  personRoleRelationGrid
        var personIds = "";
        var personGrid = view.up("panel").down('#' + view.ename + 'Grid');//获取当前grid控件
        var personSelects = personGrid.getSelection();//获取grid选中行records
        $.each(personSelects, function (index, row) {
            personIds += row.data.id + ",";
        });
        if(personIds == "" || personIds == null){
            Ext.MessageBox.alert('提示', '请选择人员！');
            return;
        }
        // 角色
        var roleIds = "";
        var roleGrid = view.down('#' + view.ename + 'RoleGrid');//获取当前grid控件
        var roleSelects = roleGrid.getSelection();
        $.each(roleSelects, function (index, row) {
            roleIds += row.data.id + ",";
        });
        if(roleIds == "" || roleIds == null){
            Ext.MessageBox.alert('提示', '请选择要分配的角色！');
            return;
        }
        // 参数
        var data = {personIds: personIds, roleIds: roleIds};
        Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', data, true, function (jsonData) {
            if (jsonData.resultCode == "1") {
                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                personGrid.store.reload();
                view.up("panel").down('#' + view.ename + 'Window').collapse();
            } else {
                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
            }
        });
    },
    onClickButtonDel: function () {
        Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath() + '/personInfo/deleteById.do');
    },
    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchEncap(this);
    },
    onClickAddSearch: function () {
        Tools.GridSearchToolbar.ClickAddSearch(this);
    },
    onClickClear: function () {
        Tools.GridSearchToolbar.ClickClear(this);
    },
    onClickButtonAssigned: function () {
        var view = this.getView();
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        if (selectRecords == undefined || selectRecords == "" || selectRecords.length == 0) {
            Ext.MessageBox.alert('提示', '请先选择人员！');
        } else {
            view.down('#' + view.ename + 'Window').down('form').getForm().reset();
            view.down('#' + view.ename + 'Window').expand();
        }
    }
});