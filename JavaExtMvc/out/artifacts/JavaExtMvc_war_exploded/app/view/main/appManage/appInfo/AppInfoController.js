Ext.define('ExtFrame.view.main.appManage.appInfo.AppInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.appInfoController',

    onClickButtonLook: function () {
        var view = this.getView();
        view.down('#' + view.ename + 'Form').getForm().reset();//表单清空
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            view.down('#' + view.ename + 'Form').getForm().loadRecord(selectRecords[0]);
            view.down('#' + view.ename + 'Form').down("#column2").down("#appCode").setDisabled(true);
        }
    },
    onClickButtonAdd: function () {
        var view = this.getView();
        view.down('#' + view.ename + 'Form').getForm().reset();//表单清空
        view.getViewModel().getData().rec = null;
        view.down('#' + view.ename + 'Form').down("#column2").down("#status").setValue('0');
        view.down('#' + view.ename + 'Form').down("#column2").down("#appCode").enable();
    },
    onClickButtonEdit: function () {
        var view = this.getView();
        view.down('#' + view.ename + 'Form').getForm().reset();//表单清空
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            view.down('#' + view.ename + 'Form').getForm().loadRecord(selectRecords[0]);
            view.down('#' + view.ename + 'Form').down("#column2").down("#appCode").setDisabled(true);
        }
    },
    onClickButtonSave: function () {

        var view = this.getView();
        var form = view.down('#' + view.ename + 'Form');
        if (form.isValid()) {
            var record = view.getViewModel().getData().rec;
            var pnGrid = view.down('#' + view.ename + 'Grid');
            if (record) {
                // 查询应用编码是否已存在
                var id = form.down("#hfOID").getValue();
                var appCode = form.down("#column2").down("#appCode").getValue();
                var ActionExist = Tools.Method.getAPiRootPath()+'/appInfo/isExist.do';
                var data = {id: id, appCode: appCode};
                Tools.Method.ExtAjaxRequestEncap(ActionExist, 'GET', data, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath()+'/appInfo/save.do', 'POST', record, true, function (jsonData) {
                            if (jsonData.resultCode == "1") {
                                view.down('#' + view.ename + 'Form').getForm().reset();
                                view.getViewModel().getData().rec = null;
                                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                                pnGrid.store.reload();
                                form.down("#column2").down("#appCode").enable();
                            } else {
                                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                            }
                        });
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0034, '4000', '2', null);//已存在
                    }
                });
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    },
    onClickButtonDel: function () {
        Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath()+'/appInfo/delete.do');
    },
    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchEncap(this);
    },
    onClickClear: function () {
        Tools.GridSearchToolbar.ClickClear(this);
    },
});