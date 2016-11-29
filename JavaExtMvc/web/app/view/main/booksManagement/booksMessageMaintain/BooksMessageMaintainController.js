/**
 * Created by zzw on 2016/9/20.
 */
Ext.define('ExtFrame.view.main.booksManagement.booksMessageMaintain.BooksMessageMaintainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.booksMessageMaintainController',
    //excel文件导入
    onClickButtonImport: function () {
        var view = this.getView();
        var booksMessageMaintainTree = view.down('#booksMessageMaintainTree');
        var record = booksMessageMaintainTree.getSelection();
        if (record.length > 0) {
            var pid = record[0].data.id;
            Ext.create('Ext.Window', {
                width: Ext.getBody().getWidth() / 3,
                height: Ext.getBody().getHeight() / 2,
                title: '文件导入',
                plain: true,
                layout: 'fit',
                autoShow: true,
                closable: true,
                items: {
                    xtype: 'booksMessageMaintainUpload',
                    itemId: 'booksMessageMaintainUpload',
                    requires: ['ExtFrame.view.main.booksManagement.booksMessageMaintain.BooksMessageMaintainController'],
                    controller: 'booksMessageMaintainController'
                }
            }).show();
        } else {
            Ext.MessageBox.alert('提示', '请选择一条类别！');
        }
    },
    //导出报表
    onClickButtonExport: function () {
        var panel = this.getView();
        var booksMessageMaintainGrid = panel.down('#booksMessageMaintainGrid');
        var pnGrid = panel.down('#' + panel.ename + 'Grid');
        var booksMessageMaintainTree = panel.down('#booksMessageMaintainTree');
        var record = booksMessageMaintainTree.getSelection();
        if (record.length > 0) {
            var parentOid = record[0].data.id;
            var url = '/jasperjsp/ToReport.jsp?fid=11&type=excel&parentOid=' + parentOid;
            window.open(url);
        } else {
            Ext.MessageBox.alert('提示', '请选择一条类别！');
        }
    },
    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchNoAddEncap(this);
    },
    onClickAddSearch: function () {
        Tools.GridSearchToolbar.ClickAddSearch(this);
    },
    onSelectTree: function (me, record, eOpts) {
        var panel = this.getView();
        var booksMessageMaintainGrid = panel.down('#booksMessageMaintainGrid');
        var booksMessageMaintainTree = panel.down('#booksMessageMaintainTree');
        var parentOid = record.data.id;
        //带附加参数重构grid store数据
        booksMessageMaintainGrid.store.getProxy().extraParams = {
            'parentOid': parentOid
        };
        //重新加载grid
        booksMessageMaintainGrid.store.reload();
    },
    onSelectTreePicker: function (ppp, record, eOpts) {
        var booksMessageMaintainWindow = this.getView();
        var parentOid = booksMessageMaintainWindow.down('#parentOid');
        parentOid.setValue(record.data.id);
    },
    onClickButtonEdit: function () {
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var view = this.getView();
        var pnGrid = view.down('#' + view.ename + 'Grid');
        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        var window = view.down('#' + view.ename + 'Window');
        window.down('form').getForm().reset();//表单清空
        // 编辑器
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            var booksMessageMaintainTree = view.down('#booksMessageMaintainTree');
            window.down('form').getForm().loadRecord(selectRecords[0]);
            var form = window.down('form');
            var parentOid = selectRecords[0].data.parentOid;
            form.down("#bookSort").setValue(parentOid);
            window.expand();
        }
    },
    onClickButtonAdd: function () {
        var view = this.getView();
        var booksMessageMaintainTree = view.down('#booksMessageMaintainTree');
        var record = booksMessageMaintainTree.getSelection();
        if (record.length > 0) {
            var pid = record[0].data.id;
            view.down('#booksMessageMaintainWindow').expand();
        } else {
            Ext.MessageBox.alert('提示', '请选择一条类别！');
        }
    },
    onSelectTreePicker: function (ppp, record, eOpts) {
        var booksMessageMaintainWindow = this.getView();
        var parentOid = booksMessageMaintainWindow.down('#parentOid');
        parentOid.setValue(record.data.id);
    },
    onClickButtonSave: function () {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/bookManage/save.do';
        var booksMessageMaintainWindow = this.getView();
        var view = booksMessageMaintainWindow.up("panel");
        var booksMessageMaintainGrid = view.down("#booksMessageMaintainGrid");
        var booksMessageMaintainTree = view.down('#booksMessageMaintainTree');
        var win = view.down('#booksMessageMaintainWindow');
        var form = win.down('#booksMessageMaintainForm');
        if (form.isValid()) {
            var pnGrid = view.down('#booksMessageMaintainGrid');
            var record = booksMessageMaintainWindow.getViewModel().getData().rec;
            var parentOid = booksMessageMaintainWindow.down("#parentOid").getValue();
            var parentName = form.down('#parentName').getValue();
            var bookSort = form.down('#bookSort').getValue();
            var bookSort=form.down('#parentName').setValue(parentName);
            record.parentOid = parentOid;
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        view.down('#' + view.ename + 'Form').getForm().reset();
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                        booksMessageMaintainTree.store.reload();
                        pnGrid.store.reload();
                        booksMessageMaintainWindow.collapse();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    },
    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/bookManage/delete.do';
        var panel = this.getView();
        var booksMessageMaintainGrid = panel.down('#booksMessageMaintainGrid');
        var selectRows = booksMessageMaintainGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var ids = '';
            $.each(selectRows, function (index, row) {
                ids += row.data.id + ',';
            });
            var data = {ids: ids};
            //用户确认删除操作-----点击“是”
            Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionDelete, 'POST', data, true, function (jsonData) {
                        if (jsonData) {
                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG0020), '4000', '1', null);
                            booksMessageMaintainGrid.store.reload();
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    }
});