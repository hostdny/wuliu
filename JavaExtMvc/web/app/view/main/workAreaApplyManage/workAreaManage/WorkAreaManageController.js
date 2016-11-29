/**
 * Created by wangBin on 2016/8/29.
 */
Ext.define('ExtFrame.view.main.workAreaApplyManage.workAreaManage.WorkAreaManageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workAreaManageController',

    onClickButtonLook: function () {
    },
    onClickButtonAdd: function () {
        var panel = this.getView();
        var workAreaManageWindow = panel.down("#workAreaManageWindow");
        var workAreaManageForm = panel.down("#workAreaManageForm");
        workAreaManageForm.getForm().reset();
        workAreaManageWindow.expand();
    },
    onClickButtonEdit: function () {
        var panel = this.getView();
        var workAreaManageGrid = panel.down("#workAreaManageGrid");
        var workAreaManageWindow = panel.down("#workAreaManageWindow");
        var workAreaManageForm = panel.down("#workAreaManageForm");
        var selectRecords = workAreaManageGrid.getSelection();//获取grid选中行records
        workAreaManageWindow.down('form').getForm().reset();//表单清空
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            workAreaManageWindow.expand();
            workAreaManageForm.getForm().loadRecord(selectRecords[0]);
        }
    },
    onClickButtonSave: function () {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/WorkAreaManage/save.do';
        var panel = this.getView();
        var workAreaManageWindow = panel.down("#workAreaManageWindow");
        var workAreaManageGrid = panel.down("#workAreaManageGrid");
        var form = panel.down('#workAreaManageForm');
        if (form.isValid()) {
            var record = workAreaManageWindow.getViewModel().getData().rec;
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        if(record.id){
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                        }else{
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0005, '4000', '1', null);
                        }
                        form.reset();
                        workAreaManageWindow.getViewModel().getData().rec = null;
                        workAreaManageGrid.store.reload();
                        workAreaManageWindow.collapse();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            }
        }else {
            Ext.MessageBox.alert('提示', '请先填写数据！');
        }
    },
    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/WorkAreaManage/delete.do';
        var panel = this.getView();
        var workAreaManageGrid = panel.down("#workAreaManageGrid");
        var selectRows = workAreaManageGrid.selModel.selected.items;//获取grid选中行
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
                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG00141, [jsonData.sCount, jsonData.fCount]), '4000', '1', null);
                            workAreaManageGrid.store.reload();
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    },
    onClickSearch: function () {
    },
    onClickAddSearch: function () {
    },
    onClickClear: function () {
        var panel = this.getView();
        var workAreaManageWindow = panel.down("#workAreaManageWindow");
        var workAreaManageForm = panel.down("#workAreaManageForm");
        workAreaManageForm.getForm().reset();
        workAreaManageWindow.collapse();

    }
});