/**
 * Created by wangBin on 2016/9/20.
 */
Ext.define('ExtFrame.view.main.booksManagement.booksTypeManagement.BooksTypeManagementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.booksTypeManagementController',

    onClickButtonAdd: function () {
        var view = this.getView();
        var booksTypeManagementWindow = view.down('#booksTypeManagementWindow');
        var booksTypeManagementForm = booksTypeManagementWindow.down('#booksTypeManagementForm');
        booksTypeManagementForm.down("#parentName").show();
        booksTypeManagementForm.getForm().reset();
        booksTypeManagementWindow.expand();
    },

    onClickButtonEdit: function () {
        var view = this.getView();
        var booksTypeManagementWindow = view.down('#booksTypeManagementWindow');
        var booksTypeManagementForm = booksTypeManagementWindow.down('#booksTypeManagementForm');
        booksTypeManagementForm.down("#parentName").hide();
        booksTypeManagementForm.getForm().reset();
        var booksTypeManagementGrid = view.down("#booksTypeManagementGrid");
        var selectRows = booksTypeManagementGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsEditData(selectRows)) {
            var booksTypeManagementTree = view.down('#booksTypeManagementTree');
            booksTypeManagementForm.getForm().loadRecord(selectRows[0]);
            var parentOid = selectRows[0].data.parentOid;
            booksTypeManagementForm.down("#parentOid").setValue(parentOid);
            booksTypeManagementWindow.expand();
        }
    },

    onClickButtonSave: function () {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/bookType/save.do';
        var booksTypeManagementWindow = this.getView();
        var view = booksTypeManagementWindow.up("panel");
        var booksTypeManagementForm = booksTypeManagementWindow.down('#booksTypeManagementForm');
        if (booksTypeManagementForm.isValid()) {
            var record = booksTypeManagementWindow.getViewModel().getData().rec;
            var booksTypeManagementGrid = view.down("#booksTypeManagementGrid");
            var booksTypeManagementTree = view.down('#booksTypeManagementTree');
            var parentName = booksTypeManagementForm.down("#parentName");
            var parentOid = booksTypeManagementForm.down("#parentOid").getValue();
            record.parentOid = parentOid;
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData) {
                        booksTypeManagementForm.getForm().reset();
                        booksTypeManagementWindow.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                        parentName.store.reload();
                        booksTypeManagementTree.store.reload();
                        booksTypeManagementGrid.store.reload();
                        booksTypeManagementWindow.collapse();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            }
        } else {
            Ext.MessageBox.alert('提示', '请先填写数据！');
        }
    },

    onClickButtonDel: function () {
        var JudgeBeforeDel = Tools.Method.getAPiRootPath() + '/booksTypeManagement/judgeBeforeDel.do';
        var ActionDelete = Tools.Method.getAPiRootPath() + '/booksTypeManagement/delete.do';
        var panel = this.getView();
        var booksTypeManagementGrid = panel.down('#booksTypeManagementGrid');
        var booksTypeManagementTree = panel.down('#booksTypeManagementTree');
        var selectRows = booksTypeManagementGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var id = '';
            $.each(selectRows, function (index, row) {
                id += row.data.id;
            });
            var dataDelete = {ids: id};
            var dataSelect = {typeId: id};
            Tools.Method.ExtAjaxRequestEncap(JudgeBeforeDel, 'GET', dataSelect, true, function (jsonData) {
                if (jsonData.resultCode == "0") {
                    Ext.MessageBox.confirm('提醒', '该分类下存在关联文档确定要删除选中行？', function (btn) {
                        if (btn == 'yes') {
                            Tools.Method.ExtAjaxRequestEncap(ActionDelete, 'POST', dataDelete, true, function (jsonData) {
                                if (jsonData.resultCode == "1") {
                                    booksTypeManagementTree.store.reload();
                                    booksTypeManagementGrid.store.reload();
                                    Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG0020), '4000', '1', null);
                                } else {
                                    Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                                }
                            });
                        }
                    });
                } else {
                    Tools.Method.ExtAjaxRequestEncap(ActionDelete, 'POST', dataDelete, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            booksTypeManagementTree.store.reload();
                            booksTypeManagementGrid.store.reload();
                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG0020), '4000', '1', null);
                        } else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });

        }
    },

    onSelectTree: function (me, record, eOpts) {
        var panel = this.getView();
        var booksTypeManagementGrid = panel.down('#booksTypeManagementGrid');
        var booksTypeManagementTree = panel.down('#booksTypeManagementTree');
        var addMark = record.data.addMark;
        //带附加参数重构grid store数据
        booksTypeManagementGrid.store.getProxy().extraParams = {
            'addMark': addMark
        };
        //重新加载grid
        booksTypeManagementGrid.store.reload();
    },
    onSelectTreePicker: function (ppp, record, eOpts) {
        var booksTypeManagementWindow = this.getView();
        var parentOid = booksTypeManagementWindow.down('#parentOid');
        parentOid.setValue(record.data.id);
    },
    onClickClear: function () {
        var booksTypeManagementWindow = this.getView();
        var booksTypeManagementForm = booksTypeManagementWindow.down("#booksTypeManagementForm");
        booksTypeManagementForm.getForm().reset();
        booksTypeManagementWindow.collapse();
    }
});