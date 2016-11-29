Ext.define('ExtFrame.view.main.sys.organizationManager.OrganizationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.organizationController',

    onClickButtonLook: function () {
        var view = this.getView();
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.selModel.selected.items;//获取grid选中行records
        //仅能选择一项数据
        var orgPicker = view.down('#' + view.ename + 'Form').down('#orgPicker');
        if (Tools.Method.IsEditData(selectRecords)) {
            view.down('#' + view.ename + 'Form').getForm().loadRecord(selectRecords[0]);
            orgPicker.setRawValue(selectRecords[0].data.parentName);
        }
    },
    onClickButtonAdd: function () {
        Tools.GridSearchToolbar.AddEncap(this);
    },
    onClickButtonEdit: function () {
        var view = this.getView();
        view.down('#' + view.ename + 'Form').getForm().reset();//表单清空
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords =  pnGrid.selModel.selected.items;//获取grid选中行records
        //仅能选择一项数据
        var orgPicker = view.down('#' + view.ename + 'Form').down('#orgPicker');
        if (Tools.Method.IsEditData(selectRecords)) {
            view.down('#' + view.ename + 'Form').getForm().loadRecord(selectRecords[0]);
            orgPicker.setRawValue(selectRecords[0].data.parentName);
        }
    },
    onClickButtonSave: function () {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/organization/save.do';
        var view = this.getView();
        var form = view.down('#' + view.ename + 'Form');
        if (form.isValid()) {
            var record = view.getViewModel().getData().rec;
            var pnGrid = view.down('#' + view.ename + 'Grid');
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        view.down('#' + view.ename + 'Form').getForm().reset();
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                        pnGrid.store.reload()
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            } else {
                Ext.MessageBox.alert('提示', '请将数据填写完整！');
            }
        }
    },
    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/organization/delete.do';
        var view = this.getView();//获取当前grid控件
        var pnGrid = view.down('#' + view.ename + 'Grid');
        var selectRows = pnGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var delOIDs = "";
            $.each(selectRows, function (index, row) {
                delOIDs += row.data.id + ",";
            })
            var data = { ids: delOIDs };
            //用户确认删除操作-----点击“是”
            Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionDelete, 'POST', data, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG00141, [jsonData.sCount, jsonData.fCount]), '4000', '1', null);
                            if (view.down('#' + view.ename + 'Form'))
                                view.down('#' + view.ename + 'Form').getForm().reset();
                            view.getViewModel().getData().rec = null;
                            pnGrid.store.reload();
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    },
    onOperationClickButtonLook: function (grid, rindex, cindex) {
        var view = grid.up('#tab-OrgManager-grid').down('#OrgManagerForm');
        var Record = grid.store.getAt(rindex);//获取grid选中行records
        grid.setSelection(Record);
        view.getForm().loadRecord(Record);
    },
    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchEncap(this);
    },
    checkChild: function (node, state) {
        checkChild(node, state);
    },
    //上移
    onOperationClickUp: function (grid, rindex, cindex) {
        var orgId = grid.store.getAt(rindex).data.oid;//获取grid选中行orgid
        Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/baseOrgInfo/orgTreeMove.do?moveType=up&id='+orgId, 'GET', null, true, function (jsonData) {
            if (jsonData) {
                Tools.Method.ShowTipsMsg('组织机构上移成功！', 3000, 1, null);
                grid.store.reload();
            } else {
                Tools.Method.ShowTipsMsg('组织机构上移失败！请联系管理员', 3000, 2, null);
            }
        });
    },
    //下移
    onOperationClickDown: function (grid, rindex, cindex) {
        var orgId = grid.store.getAt(rindex).data.oid;//获取grid选中行orgid
       // var data = Tools.Method.GetPostData(orgId + '☻down');
        Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/baseOrgInfo/orgTreeMove.do?moveType=down&id='+orgId, 'GET', null, true, function (jsonData) {
            if (jsonData) {
                Tools.Method.ShowTipsMsg('组织机构下移成功！', 3000, 1, null);
                grid.store.reload();
            } else {
                Tools.Method.ShowTipsMsg('组织机构下移失败！请联系管理员', 3000, 2, null);
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