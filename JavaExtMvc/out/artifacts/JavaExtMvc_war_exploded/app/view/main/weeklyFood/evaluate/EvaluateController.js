/**
 * Created by wangBin on 2016/8/1.
 */
Ext.define('ExtFrame.view.main.weeklyFood.evaluate.EvaluateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.evaluateController',

    onClickButtonLook: function () {
        var panel = this.getView();
        var evaluateGrid = panel.down("#evaluateGrid");
        var evaluateWindow = panel.down("#evaluateWindow");
        var evaluateForm = panel.down("#evaluateForm");
        evaluateForm.down("#foodId").setDisabled(true);
        evaluateForm.down("#content").setDisabled(true);
        evaluateWindow.down("#saveButtonId").setDisabled(true);
        evaluateWindow.down("#opinionScore").setDisabled(true);
        var selectRecords = evaluateGrid.getSelection();//获取grid选中行records
        evaluateForm.getForm().reset();//表单清空
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            evaluateWindow.expand();
            evaluateWindow.down('form').getForm().loadRecord(selectRecords[0]);
        }
    },
    onClickButtonAdd: function () {
        var panel = this.getView();
        var evaluateWindow = panel.down("#evaluateWindow");
        evaluateWindow.down('form').getForm().reset();
        var evaluateForm = panel.down("#evaluateForm");
        evaluateForm.down("#foodId").enable();
        evaluateForm.down("#content").enable();
        evaluateWindow.down("#saveButtonId").enable();
        evaluateWindow.down("#opinionScore").enable();
        evaluateWindow.expand();
    },
    onClickButtonEdit: function () {
    },
    onClickButtonSave: function () {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/foodOpinion/save.do';
        var panel = this.getView();
        var evaluateWindow = panel.down("#evaluateWindow");
        var evaluateGrid = panel.down("#evaluateGrid");
        var form = panel.down('#evaluateForm');
        if (form.isValid()) {
            var record = evaluateWindow.getViewModel().getData().rec;
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        if(record.id){
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                        }else{
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0005, '4000', '1', null);
                        }
                        form.reset();
                        evaluateWindow.getViewModel().getData().rec = null;
                        evaluateGrid.store.reload();
                        evaluateWindow.collapse();
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
        var ActionDelete = Tools.Method.getAPiRootPath() + '/foodOpinion/delete.do';
        var panel = this.getView();
        var evaluateGrid = panel.down("#evaluateGrid");
        var selectRows = evaluateGrid.selModel.selected.items;//获取grid选中行
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
                            evaluateGrid.store.reload();
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
        var panel = Ext.getCmp('evaluateManagerId');
        var evaluateGrid = panel.down("#evaluateGrid");
        var foodIdSearch = evaluateGrid.down("#foodIdSearch").getValue();
        if(foodIdSearch){
            evaluateGrid.store.getProxy().extraParams = {
                'swhere': "foodId|String|"+foodIdSearch
            };
            evaluateGrid.store.reload();
        }else{
            Ext.MessageBox.alert('提示', '请先填写数据！');
        }

    },
    onClickAddSearch: function () {
    },
    onClickClear: function () {
        var panel = this.getView();
        var evaluateWindow = panel.down("#evaluateWindow");
        var evaluateForm = panel.down("#evaluateForm");
        evaluateForm.getForm().reset();
        evaluateWindow.collapse();
    }
});