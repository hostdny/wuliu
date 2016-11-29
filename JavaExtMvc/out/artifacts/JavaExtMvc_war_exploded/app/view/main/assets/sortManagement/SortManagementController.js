/**
 * Created by zzw on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.assets.sortManagement.SortManagementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sortManagementController',

    onClickButtonAdd: function () {
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var view = this.getView();
        view.down('#' + view.ename + 'Window').down('form').getForm().reset();
        view.down('#' + view.ename + 'Window').expand();
    },
    onClickButtonEdit: function () {
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var view = this.getView();

        var pnGrid = view.down('#' + view.ename + 'Grid');

        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {

            var window = view.down('#' + view.ename + 'Window');
            var form = window.down('form');
            form.getForm().reset();//表单清空
            window.expand();
            form.getForm().loadRecord(selectRecords[0]);
        }
    },
    onClickButtonSave: function () {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/assentType/save.do';
        var view = this.getView();
        var win = view.up("panel").down('#' + view.ename + 'Window');
        var form = win.down('#' + view.ename + 'Form');
        if (form.isValid()) {
            var record = view.getViewModel().getData().rec;
            var pnGrid = view.up("panel").down('#' + view.ename + 'Grid');
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        view.down('#' + view.ename + 'Form').getForm().reset();
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                        pnGrid.store.reload();
                        view.up("panel").down('#' + view.ename + 'Window').collapse();
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
        var view = this.getView();
        var win = view.up("panel").down('#' + view.ename + 'Window');
        var pnGrid = view.down('#' + view.ename + 'Grid');
        var form = win.down('#' + view.ename + 'Form');
        var selectRows = pnGrid.selModel.selected.items;
        var ActionDel = Tools.Method.getAPiRootPath() + '/assentType/delete.do?is=true';
        var ActionDel2 = Tools.Method.getAPiRootPath() + '/assentType/delete.do';
        if (Tools.Method.IsDelData(selectRows)) {
            //var ids = '';
            //$.each(selectRows, function (index, row) {
            //    ids += row.data.id + ',';
            //});
            var ActionEdit = Tools.Method.getAPiRootPath() + '/assentRecord/isExist.do?tid='+selectRows[0].data.id;
            var data = {ids: selectRows[0].data.id};
            Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'GET', "", true, function (jsonData) {
                if (jsonData == true) {
                    if (Ext.Msg.confirm("资产已分配！确定要清空数据吗？")) {
                        Tools.Method.ExtAjaxRequestEncap(ActionDel, 'POST', data, true, function (jsonData) {
                            pnGrid.store.reload();
                        });
                    }
                } else {
                    Tools.Method.ExtAjaxRequestEncap(ActionDel2, 'POST', data, true, function (jsonData) {
                        pnGrid.store.reload();
                    });
                }

            });
        }
    },
    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchEncapNoMany(this);
    },
    onClickAddSearch: function () {
        Tools.GridSearchToolbar.ClickAddSearch(this);
    },
    onClickClear: function () {
        Tools.GridSearchToolbar.ClickClear(this);
    }
});