/**
 * Created by zzw on 2016/11/1.
 */
Ext.define('ExtFrame.view.main.signAttendance.leaveOut.LeaveOutController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.leaveOutController',

    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/signPersonOutState/delete.do';
        var panel = this.getView();
        var leaveOutGrid = Ext.getCmp('leaveOutGrid');
        var selectRows = leaveOutGrid.selModel.selected.items;//获取grid选中行
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
                            leaveOutGrid.store.reload();
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
        var win = view.down('#leaveOutWindow');
        var form = win.down('form');
        form.getForm().reset();
        win.show();
    },

    onClickButtonEdit: function () {
        if (!Tools.Method.IsLogin) {
            return;
        }
        var view = this.getView();
        var grid = view.down("#leaveOutGrid");//获取当前grid控件
        var selectRecords = grid.getSelectionModel().getSelection();
        var win = view.down('#leaveOutWindow');
        var form = win.down('form');
        if (Tools.Method.IsEditData(selectRecords)) {
            win.show();
            form.getForm().loadRecord(selectRecords[0]);
        }
        form.down('#orgPicker').setRawValue(selectRecords[0].data.department);
    },
    onClickButtonSave: function (btn) {
        if (!Tools.Method.IsLogin())
            return;
        var view = this.getView();
        var form = view.down('#leaveOutWindowForm');
        var grid = Ext.getCmp("leaveOutGrid");//获取当前grid控件
        var win = btn.up('window');
        var id = form.down('#hfOid').getValue();
        var record = {
            id: id,
        //    type: 4
        };
        record.department = form.down('#orgPicker').getRawValue();
        record.name = form.down('#name').getRawValue();
        record.startTime = form.down('#startTime').getValue();
        record.endTime = form.down('#endTime').getValue();
        record.state = form.down('#state').getValue();
        record.leaveType = form.down('#leaveType').getValue();
        record.count = form.down('#count').getValue();
        record.outReason = form.down('#outReason').getValue();
        record.remark = form.down('#remark').getValue();
        var startTime = form.down('#startTime').getRawValue();
        var endTime = form.down('#endTime').getRawValue();
        if (startTime >= endTime) {
            Ext.MessageBox.alert('提示', '日期范围错误！');
            return;
        }
        Ext.getBody().mask("请稍等，正在保存中...", "x-mask-loading");
        Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/signPersonOutState/save.do', 'POST', record, true, function (jsonData) {
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