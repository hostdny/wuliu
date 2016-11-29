/**
 * Created by zzw on 2016/11/10.
 */
Ext.define('ExtFrame.view.main.signAttendance.workTimeConfig.WorkTimeConfigController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workTimeConfigController',

    onClickButtonLook: function () {
        var view = this.getView();
        view.down('#' + view.ename + 'Form').getForm().reset();//表单清空
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.selModel.selected.items;//获取grid选中行record
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            view.down('#' + view.ename + 'Form').getForm().loadRecord(selectRecords[0]);
        }
    },
    onClickButtonEdit: function () {
        var view = this.getView();
        view.down('#' + view.ename + 'Form').getForm().reset();//表单清空
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.selModel.selected.items;//获取grid选中行record
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            view.down('#' + view.ename + 'Form').getForm().loadRecord(selectRecords[0]);
        }
    },
    onClickButtonSave: function () {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/signAttendanceList/save.do';
        var view = this.getView();
        var form = view.down('#' + view.ename + 'Form');
        if (form.isValid()) {
            var record = view.getViewModel().getData().rec;
           // var pnGrid = view.down('#' + view.ename + 'Grid');
            var id = form.down('#hfOid').getValue();
            var record = {
                id: id,
                type: 2
            };
            record.workTimeStart = form.down('#workTimeStart').getValue();
            record.workTimeEnd = form.down('#workTimeEnd').getValue();
            record.reTime = form.down('#reTime').getValue();
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                        view.store.reload({
                            callback: function(records, options, success){
                                if(records.length != 0){
                                    view.down("#hfOid").setValue(records[0].data.id);
                                    view.down("#workTimeStart").setValue(records[0].data.workTimeStart);
                                    view.down("#workTimeEnd").setValue(records[0].data.workTimeEnd);
                                    view.down("#reTime").setValue(records[0].data.reTime);
                                }
                            }
                        });
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    }
});