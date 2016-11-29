/**
 * Created by wangBin on 2016/8/8.
 */
Ext.define('ExtFrame.view.main.appointment.appointmentDispose.AppointmentDisposeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.appointmentDisposeController',

    onClickButtonLook: function () {
        var panel = this.getView();
        var appointmentDisposeGrid = panel.down("#appointmentDisposeGrid");
        var appointmentDisposeWindow = panel.down("#appointmentDisposeWindow");
        var appointmentDisposeForm = panel.down("#appointmentDisposeForm");
        var appointmentDisposeWindowGrid = appointmentDisposeWindow.down("#appointmentDisposeWindowGrid");
        var selectRecords = appointmentDisposeGrid.getSelection();//获取grid选中行records
        appointmentDisposeForm.getForm().reset();//表单清空
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            appointmentDisposeWindow.down('form').getForm().loadRecord(selectRecords[0]);
            var consultationTime = selectRecords[0].data.consultationTime;
            if(consultationTime != "" && consultationTime != null){
                var startTime = selectRecords[0].data.startTime;
                var endTime = selectRecords[0].data.endTime;
                var appointmentDateTimeS = startTime.split(" ");
                var appointmentDateTimeE = endTime.split(" ");
                var appointmentDate = appointmentDateTimeS[0];
                var appointmentStartTime = appointmentDateTimeS[1];
                var appointmentEndTime = appointmentDateTimeE[1];
                appointmentDisposeWindow.down("#appointmentDate").setValue(appointmentDate);
                appointmentDisposeWindow.down("#appointmentStartTime").setValue(appointmentStartTime);
                appointmentDisposeWindow.down("#appointmentEndTime").setValue(appointmentEndTime);

                appointmentDisposeWindow.down("#saveButton").setDisabled(true);
                appointmentDisposeWindow.down("#consultationBack").setDisabled(true);
                appointmentDisposeWindow.down("#appointmentStartTime").setDisabled(true);
                appointmentDisposeWindow.down("#appointmentEndTime").setDisabled(true);
                appointmentDisposeWindow.down("#appointmentDate").setDisabled(true);
            }else{
                appointmentDisposeWindow.down("#saveButton").enable();
                appointmentDisposeWindow.down("#consultationBack").enable();
                appointmentDisposeWindow.down("#appointmentStartTime").enable();
                appointmentDisposeWindow.down("#appointmentEndTime").enable();
                appointmentDisposeWindow.down("#appointmentDate").enable();
            }
            appointmentDisposeWindowGrid.store.getProxy().extraParams = {
                'businessData': selectRecords[0].data.id
            };
            appointmentDisposeWindowGrid.store.reload();
            appointmentDisposeWindow.expand();
        }
    },
    onClickButtonAdd: function () {
    },
    onClickButtonEdit: function () {
    },
    onClickButtonSave: function () {
        var ActionSave = Tools.Method.getAPiRootPath() + '/appointment/save.do';
        var panel = this.getView();
        var appointmentDisposeWindow = panel.down("#appointmentDisposeWindow");
        var appointmentDisposeForm = appointmentDisposeWindow.down("#appointmentDisposeForm");
        var appointmentDisposeWindowGrid = appointmentDisposeWindow.down("#appointmentDisposeWindowGrid");
        var appointmentDisposeGrid = panel.down("#appointmentDisposeGrid");
        if (appointmentDisposeForm.isValid()) {
            var id = appointmentDisposeWindow.down("#hfOID").getValue();
            var consultationBack = appointmentDisposeWindow.down("#consultationBack").getValue();
            var appointmentDate = appointmentDisposeWindow.down("#appointmentDate").getRawValue();
            var appointmentStartTime = appointmentDisposeWindow.down("#appointmentStartTime").getRawValue();
            var appointmentEndTime = appointmentDisposeWindow.down("#appointmentEndTime").getRawValue();
            var startTime = appointmentDate + " " + appointmentStartTime;
            var endTime = appointmentDate + " " + appointmentEndTime;
            var record = {
                id:id,
                consultationBack:consultationBack,
                startTimes:startTime,
                endTimes:endTime
            };
            Tools.Method.ExtAjaxRequestEncap(ActionSave, 'POST', record, true, function (jsonData) {
                if (jsonData.resultCode == "1") {
                    if(record.id){
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                    }else{
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0005, '4000', '1', null);
                    }
                    appointmentDisposeWindowGrid.store.getProxy().extraParams = {
                        'businessData': -1
                    };
                    appointmentDisposeWindowGrid.store.reload();
                    appointmentDisposeGrid.store.reload();
                    appointmentDisposeForm.getForm().reset();
                    appointmentDisposeWindow.collapse();
                } else {
                    Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                }
            });
        }else {
            Ext.MessageBox.alert('提示', '请先填写数据！');
        }
    },
    onClickButtonDel: function () {
    },
    onClickSearch: function () {
    },
    onClickAddSearch: function () {
    },
    onClickClear: function () {
        var panel = this.getView();
        var appointmentDisposeWindow = panel.down("#appointmentDisposeWindow");
        var appointmentDisposeForm = appointmentDisposeWindow.down("#appointmentDisposeForm");
        var appointmentDisposeWindowGrid = appointmentDisposeWindow.down("#appointmentDisposeWindowGrid");
        appointmentDisposeWindowGrid.store.getProxy().extraParams = {
            'businessData': -1
        };
        appointmentDisposeWindowGrid.store.reload();
        appointmentDisposeForm.getForm().reset();
        appointmentDisposeWindow.collapse();
    },
    onClickWindowClear: function () {
        var panel = this.getView();
        var appointmentDisposeWindowForm = panel.up("window");
        appointmentDisposeWindowForm.close();
    },
    onClickWindowSave: function () {
        var ActionSave = Tools.Method.getAPiRootPath() + '/appointment/save.do';
        var panel = this.getView();
        var appointmentDisposeWindow = panel.up("window");
        var appointmentDisposeWindowForm = appointmentDisposeWindow.down("#appointmentDisposeWindowForm");
        var appointmentDisposeGrid = Ext.getCmp("appointmentDisposeGridId");
        if (appointmentDisposeWindowForm.isValid()) {
            var appointmentId = appointmentDisposeWindowForm.appointmentId;
            var consultationBack = appointmentDisposeWindow.down("#consultationBack").getValue();
            var appointmentDate = appointmentDisposeWindow.down("#appointmentDate").getRawValue();
            var appointmentStartTime = appointmentDisposeWindow.down("#appointmentStartTime").getRawValue();
            var appointmentEndTime = appointmentDisposeWindow.down("#appointmentEndTime").getRawValue();
            var startTime = appointmentDate + " " + appointmentStartTime;
            var endTime = appointmentDate + " " + appointmentEndTime;
            var record = {
                id:appointmentId,
                consultationBack:consultationBack,
                startTimes:startTime,
                endTimes:endTime
            };
            Tools.Method.ExtAjaxRequestEncap(ActionSave, 'POST', record, true, function (jsonData) {
                if (jsonData.resultCode == "1") {
                    if(record.id){
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                    }else{
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0005, '4000', '1', null);
                    }
                    appointmentDisposeWindowForm.reset();
                    appointmentDisposeWindowForm.getViewModel().getData().rec = null;
                    appointmentDisposeGrid.store.reload();
                    appointmentDisposeWindow.close();
                } else {
                    Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                }
            });
        }else {
            Ext.MessageBox.alert('提示', '请先填写数据！');
        }
    },
    onClickReply: function (value) {
        Ext.create('Ext.Window', {
            width: Ext.getBody().getWidth() / 2,
            height: Ext.getBody().getHeight() / 2,
            plain: true,
            layout: 'fit',
            title: '回复',
            autoShow: true,
            closable: false,
            items: {
                xtype: 'appointmentDisposeWindowForm',
                itemId: 'appointmentDisposeWindowForm',
                appointmentId:value,
                requires: ['ExtFrame.view.main.appointment.appointmentDispose.AppointmentDisposeController'],
                controller: 'appointmentDisposeController'
            }
        }).show();
    }
});