/**
 * Created by jia on 2016/8/30.
 */
Ext.define('ExtFrame.view.main.workAreaApplyManage.workAreaApplyManageAudit.WorkAreaApplyManageAuditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workAreaApplyManageAuditController',

    onClickButtonReply: function () {
        var ActionReply = Tools.Method.getAPiRootPath() + '/workAreaApplyManage/workAreaApproval.do';
        var panel = this.getView();
        var workAreaApplyManageAuditGrid = panel.down("workAreaApplyManageAuditGrid");
        var workAreaApplyManageAuditWindow = panel.down("workAreaApplyManageAuditWindow");
        var selectRows = workAreaApplyManageAuditGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var returnFlag = true;
            var ids = '';
            $.each(selectRows, function (index, row) {
                if (row.data.createState != "0") {
                    Ext.MessageBox.alert('提示', '仅有未审批的信息能审核！');
                    returnFlag = false;
                    return false;
                } else {
                    ids += row.data.id + ',';
                }
            });
            if (!returnFlag) {
                return;
            }
            var data = {
                ids: ids
            };
            Ext.MessageBox.confirm('提醒', '确定要审核通过？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionReply, 'GET', data, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                            workAreaApplyManageAuditGrid.store.reload();
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    },

    onClickButtonEdit: function () {
        var panel = this.getView();
        var workAreaApplyManageAuditGrid = panel.down("#workAreaApplyManageAuditGrid");
        var workAreaApplyManageAuditWindow = panel.down("#workAreaApplyManageAuditWindow");
        var workAreaApplyManageAuditForm = panel.down("#workAreaApplyManageAuditForm");
        var selectRecords = workAreaApplyManageAuditGrid.getSelection();//获取grid选中行records
        workAreaApplyManageAuditWindow.down('form').getForm().reset();//表单清空
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            workAreaApplyManageAuditWindow.expand();
            workAreaApplyManageAuditForm.getForm().loadRecord(selectRecords[0]);
        }
    },
    onClickButtonSave: function () {
        var ActionSave = Tools.Method.getAPiRootPath() + '/workAreaApplyManage/save.do';
        var ActionJudge = Tools.Method.getAPiRootPath() + '/workAreaApplyManage/judgeWorkArea.do';
        var view = this.getView();
        var win = view.up("panel").down('#' + view.ename + 'Window');
        var form = win.down('#' + view.ename + 'Form');
        if (form.isValid()) {
            var record = view.getViewModel().getData().rec;
            var pnGrid = view.up("panel").down('#' + view.ename + 'Grid');
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionJudge, 'GET', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        Tools.Method.ExtAjaxRequestEncap(ActionSave, 'POST', record, true, function (jsonData) {
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
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            }
        } else {
            Ext.MessageBox.alert('提示', '请先填写数据！');
        }
    },

    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/workAreaApplyManage/delete.do';
        var panel = this.getView();
        var workAreaApplyManageAuditGrid = panel.down("#workAreaApplyManageAuditGrid");
        var selectRows = workAreaApplyManageAuditGrid.selModel.selected.items;//获取grid选中行
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
                            workAreaApplyManageAuditGrid.store.reload();
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
        var workAreaApplyManageAuditWindow = this.getView();
        var workAreaApplyManageAuditForm = workAreaApplyManageAuditWindow.down("#workAreaApplyManageAuditForm");
        workAreaApplyManageAuditForm.getForm().reset();
        workAreaApplyManageAuditWindow.collapse();

    }
});