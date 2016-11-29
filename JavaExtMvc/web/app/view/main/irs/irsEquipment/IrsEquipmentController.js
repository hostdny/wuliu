/**
 * Created by LvXL on 2016/7/14.
 */
Ext.define('ExtFrame.view.main.irs.irsEquipment.IrsEquipmentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.irsEquipmentController',

    onClickButtonLook: function () {
        var panel = this.getView();
        var IrsEquipmentGrid = panel.down('#IrsEquipmentGrid');
        var IrsEquipmentWindow = panel.down('#IrsEquipmentWindow');
        var selectRecords = IrsEquipmentGrid.getSelectionModel().getSelection();
        if (selectRecords[0]) {
            var form = panel.down('#IrsEquipmentForm');
            form.getForm().loadRecord(selectRecords[0]);
            //IrsEquipmentWindow.expand();
            IrsEquipmentWindow.show();
        } else {
            Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
        }
    },
    onClickButtonAdd: function () {
        var view = this.getView();
        view.down('#' + view.ename + 'Window').down('form').getForm().reset();
        //view.down('#' + view.ename + 'Window').expand();
        view.down('#' + view.ename + 'Window').show();
    },
    onClickButtonEdit: function () {
        var view = this.getView();
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        var window = view.down('#' + view.ename + 'Window');
        window.down('form').getForm().reset();//表单清空
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            //window.expand();
            window.show();
            window.down('form').getForm().loadRecord(selectRecords[0]);
        }
    },
    onClickButtonSave: function () {

        var ActionEdit = Tools.Method.getAPiRootPath() + '/irsEquipment/save.do';
        var ActionisExist = Tools.Method.getAPiRootPath() + '/irsEquipment/isExist.do';
        var view = this.getView();
        var win = view.up("panel").down('#' + view.ename + 'Window');
        var form = win.down('#' + view.ename + 'Form');
        if (form.isValid()) {
            var record = view.getViewModel().getData().rec;
            //debugger;
            var pnGrid = view.up("panel").down('#' + view.ename + 'Grid');
            if (record) {
                var id = form.down("#hfOID").getValue();
                var name = form.down("#name").getValue();
                // 设备名称是否存在
                var data = {id: id, name: name};
                Tools.Method.ExtAjaxRequestEncap(ActionisExist, 'POST', data, true, function (jsonData) {
                    if (jsonData.resultCode == "0") {
                        Ext.MessageBox.confirm('提醒', '设备名称已存在，是否覆盖？', function (btn) {
                            if (btn == 'yes') {
                                // 如果不重复，保存
                                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                                    if (jsonData.resultCode == "1") {
                                        view.down('#' + view.ename + 'Form').getForm().reset();
                                        view.getViewModel().getData().rec = null;
                                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                                        pnGrid.store.reload();
                                        //view.up("panel").down('#' + view.ename + 'Window').collapse();
                                        view.up("panel").down('#' + view.ename + 'Window').close();
                                    } else {
                                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                                    }
                                });
                            }
                        });
                    } else {
                        Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                            if (jsonData.resultCode == "1") {
                                view.down('#' + view.ename + 'Form').getForm().reset();
                                view.getViewModel().getData().rec = null;
                                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                                pnGrid.store.reload();
                                //view.up("panel").down('#' + view.ename + 'Window').collapse();
                                view.up("panel").down('#' + view.ename + 'Window').close();
                            } else {
                                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                            }
                        });
                    }

                });
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    },
    onClickButtonDel: function () {
        Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath() + '/irsEquipment/delete.do');
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
    onClickButtonDisable: function () {
        // 禁用
        var ActionDisable = Tools.Method.getAPiRootPath() + '/irsEquipment/operation.do';
        var view = this.getView();//获取当前grid控件
        var pnGrid = view.down('#' + view.ename + 'Grid');
        var selectRows = pnGrid.getSelectionModel().getSelection();//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var ids = '';
            $.each(selectRows, function (index, row) {
                ids += row.data.id + ',';
            });
            var data = {ids: ids, status: '1'};
            //用户确认禁用操作-----点击“是”
            Ext.MessageBox.confirm('提醒', '确定要禁用选中设备？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionDisable, 'POST', data, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
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
    onClickButtonEnable: function () {
        // 启用
        var ActionDisable = Tools.Method.getAPiRootPath() + '/irsEquipment/operation.do';
        var view = this.getView();//获取当前grid控件
        var pnGrid = view.down('#' + view.ename + 'Grid');
        var selectRows = pnGrid.getSelectionModel().getSelection();//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var ids = '';
            $.each(selectRows, function (index, row) {
                ids += row.data.id + ',';
            });
            var data = {ids: ids, status: '0'};
            //用户确认禁用操作-----点击“是”
            Ext.MessageBox.confirm('提醒', '确定要启用选中设备？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionDisable, 'POST', data, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
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
    onClickButtonMonitorRefresh: function () {
        var view = this.getView();//获取当前grid控件
        var pnGrid = view.down('#' + view.ename + 'Grid');
        pnGrid.store.reload();
    },
    cancel : function(btn) {
        var win = btn.up('window');
        win.close();
    }
});