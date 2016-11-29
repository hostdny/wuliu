/**
 * Created by zzw on 2016/8/31.
 */
Ext.define('ExtFrame.view.main.workAreaApplyManage.WorkAreaApplyManageList.WorkAreaApplyManageListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workAreaApplyManageListController',

    //重置
    onClickButtonReset: function () {
        var ActionReset = Tools.Method.getAPiRootPath() + '/workAreaApplyManage/resetWorkArea.do';
        var panel = this.getView();
        var workAreaApplyManageListGrid = panel.down("workAreaApplyManageListGrid");
        var selectRows = workAreaApplyManageListGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var returnFlag = true;
            var id = '';
            $.each(selectRows, function (index, row) {
                if (row.data.createState != "1") {
                    Ext.MessageBox.alert('提示', '仅有已审批的信息能重置！');
                    returnFlag = false;
                    return false;
                } else {
                    id += row.data.id;
                }
            });
            if (!returnFlag) {
                return;
            }
            var data = {id: id};
            //用户确认删除操作-----点击“是”
            Ext.MessageBox.confirm('提醒', '确定要重置选中行？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionReset, 'POST', data, true, function (jsonData) {
                        if (jsonData) {
                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG0020), '4000', '1', null);
                            workAreaApplyManageListGrid.store.reload();
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
    onClickButtonDel: function () {
        Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath() + '/workAreaApplyManage/delete.do');
    },
    onClickButtonAdd: function () {
        var view = this.getView();
        view.down('#' + view.ename + 'Window').down('form').getForm().reset();
        view.down('#' + view.ename + 'Window').expand();
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
    }
});