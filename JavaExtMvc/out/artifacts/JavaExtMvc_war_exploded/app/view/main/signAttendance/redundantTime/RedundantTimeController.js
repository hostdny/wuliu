/**
 * Created by zzw on 2016/11/1.
 */
Ext.define('ExtFrame.view.main.signAttendance.redundantTime.RedundantTimeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.redundantTimeController',

    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/signAttendanceList/delete.do';
        var panel = this.getView();
        var redundantTimeGrid = Ext.getCmp('redundantTimeGrid');
        var selectRows = redundantTimeGrid.selModel.selected.items;//获取grid选中行
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
                            redundantTimeGrid.store.reload();
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    },

    cancel: function (btn) {
        var win = btn.up('window');
        win.close();
    },
    //新增方法
    onClickButtonAdd: function () {
        if(!Tools.Method.IsLogin){
            return;
        }
        var view =this.getView();
        var win = view.down('#redundantTimeWindow');
        var form = win.down('form');
        form.getForm().reset();
        win.show();
    },

    onClickButtonEdit: function () {
        if (!Tools.Method.IsLogin) {
            return;
        }
        var view = this.getView();
        var grid = view.down("#redundantTimeGrid");//获取当前grid控件
        var selectRecords = grid.getSelectionModel().getSelection();
        if (selectRecords.length > 1) {
            Ext.MessageBox.alert('提示', '很抱歉，请选择一条数据！');
            return;
        }
        if (selectRecords.length == 0) {
            Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
            return;
        }
        var view =this.getView();
        var win = view.down('#redundantTimeWindow');
        win.show();
        var form = win.down('form');
        form.getForm().loadRecord(selectRecords[0]);
    },
    onClickButtonSave: function (btn) {
        if (!Tools.Method.IsLogin())
            return;
        var view = this.getView();
        var form = view.down('#redundantTimeWindowForm');
        var grid = Ext.getCmp("redundantTimeGrid");//获取当前grid控件
        var win = btn.up('window');
        var id = form.down('#hfOid').getValue();
        var record = {
            id: id,
            type: 4
        };
        record.reTime = form.down('#reTime').getValue();
        Ext.getBody().mask("请稍等，正在保存中...", "x-mask-loading");
        Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/signAttendanceList/save.do', 'POST', record, true, function (jsonData) {
            if (jsonData) {
                view.getViewModel().getData().rec = null;
                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                grid.store.reload();
                win.close();
                Ext.getBody().unmask();
            } else {
                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
            }
        });
    }

});