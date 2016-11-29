Ext.define('ExtFrame.view.main.sys.moduleManager.ModuleManagerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.moduleManager',

    onClickButtonLook: function () {
        var view = this.getView();
        view.down('#' + view.ename + 'Form').getForm().reset();//表单清空
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.selModel.selected.items;//获取grid选中行record
        // 下拉树
        var modulePicker = view.down('#' + view.ename + 'Form').down('#modulePicker');
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            view.down('#' + view.ename + 'Form').getForm().loadRecord(selectRecords[0]);
            modulePicker.setRawValue(selectRecords[0].data.parentName);
        }
    },
    onClickButtonAdd: function () {
        Tools.GridSearchToolbar.AddEncap(this);
    },
    onClickButtonEdit: function () {
        var view = this.getView();
        view.down('#' + view.ename + 'Form').getForm().reset();//表单清空
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.selModel.selected.items;//获取grid选中行record
        // 下拉树
        var modulePicker = view.down('#' + view.ename + 'Form').down('#modulePicker');
        var hfOID = view.down('#' + view.ename + 'Form').down('#hfOID');
        var cName = view.down('#' + view.ename + 'Form').down('#cName');
        var eName = view.down('#' + view.ename + 'Form').down('#eName');
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            view.down('#' + view.ename + 'Form').getForm().loadRecord(selectRecords[0]);
            modulePicker.setRawValue(selectRecords[0].data.parentName);
            hfOID.setValue(selectRecords[0].data.oid);
            cName.setValue(selectRecords[0].data.name);
            eName.setValue(selectRecords[0].data.ename);
        }
    },
    onClickButtonSave: function () {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/module/save.do';
        var view = this.getView();
        var form = view.down('#' + view.ename + 'Form');
        if (form.isValid()) {
            var record = view.getViewModel().getData().rec;
            if (record.buttonId == '')
                delete record['buttonId'];
            var pnGrid = view.down('#' + view.ename + 'Grid');
            if (record) {
                //if (record.parentOid == undefined || record.parentOid == '')
                //    Tools.Method.ShowTipsMsg('请选择上级菜单', 3000, 3, null);
                //else {
                    Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            view.down('#' + view.ename + 'Form').getForm().reset();
                            view.getViewModel().getData().rec = null;
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                            pnGrid.store.reload();
                        } else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                        }
                    });
                //}
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    },
    onClickButtonDel: function () {
        //Tools.GridSearchToolbar.DeleteEncap(this, Tools.Method.getAPiRootPath()+'/api/ModuleManager/Delete?ct=json');
        var ActionDelete = Tools.Method.getAPiRootPath() + '/module/deleteModule.do';
        var view = this.getView();//获取当前grid控件
        var pnGrid = view.down('#' + view.ename + 'Grid');
        var selectRows = pnGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var ids = "";
            $.each(selectRows, function (index, row) {
                ids += row.data.oid + ",";
            })
            var data = {ids: ids};
            //用户确认3 0操作-----点击“确认”并输入“删除”
            Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionDelete, 'POST', data, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG00141, [jsonData.sCount, jsonData.fCount]), '4000', '1', null);
                            if (view.down('#' + view.ename + 'Form'))
                                view.down('#' + view.ename + 'Form').getForm().reset();
                            view.getViewModel().getData().rec = null;
                            pnGrid.store.reload();
                        } else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    },
    onOperationClickDelete: function (grid, rindex, cindex) {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/module/deleteModule.do';
        var view = grid.up('#tab-ModuleManager-grid').down('#ModuleManagerForm');
        var data = {ids: grid.store.getAt(rindex).getData().oid};
        //用户确认删除操作-----点击“确认”并输入“删除”
        Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
            if (btn == 'yes') {
                Tools.Method.ExtAjaxRequestEncap(ActionDelete, 'POST', data, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG00141, [jsonData.sCount, jsonData.fCount]), '4000', '1', null);
                        grid.store.reload();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                    }
                });
            }
        });
    },
    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchEncap(this);
    },
    onClickButtonIco: function () {
        Ext.create('ExtFrame.view.main.sys.moduleManager.MouduleIco')

    },
    onOperationClickButtonLook: function (grid, rindex, cindex) {
        var view = grid.up('#tab-ModuleManager-grid').down('#ModuleManagerForm');
        var Record = grid.store.getAt(rindex);//获取grid选中行records
        // 下拉树
        var modulePicker = view.down('#modulePicker');
        view.getForm().loadRecord(Record);
        modulePicker.setRawValue(Record.getData().parentName);
    },
    checkChild: function (node, state) {
        checkChild(node, state);
    },
    onOperationClickUp: function (grid, rindex, cindex) {
        var moduleId = grid.store.getAt(rindex).data.oid;//获取grid选中行orgid

        Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/module/moduleTreeMove.do?moveType=up&moduleId=' + moduleId, 'GET', null, true, function (jsonData) {
            if (jsonData.resultCode == "1") {
                Tools.Method.ShowTipsMsg('上移成功！', 3000, 1, null);
                grid.store.reload();
            } else {
                Tools.Method.ShowTipsMsg('上移失败！请联系管理员', 3000, 2, null);
            }
        });
    },
    //下移
    onOperationClickDown: function (grid, rindex, cindex) {
        var moduleId = grid.store.getAt(rindex).data.oid;//获取grid选中行orgid
        Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/module/moduleTreeMove.do?moveType=down&moduleId=' + moduleId, 'GET', null, true, function (jsonData) {
            if (jsonData.resultCode == "1") {
                Tools.Method.ShowTipsMsg('下移成功！', 3000, 1, null);
                grid.store.reload();
            } else {
                Tools.Method.ShowTipsMsg('下移失败！请联系管理员', 3000, 2, null);
            }
        });
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