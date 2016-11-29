/**
 * Created by wangBin on 2016/8/18.
 */
Ext.define('ExtFrame.view.main.exam.examStudent.register.RegisterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.registerController',

    onClickButtonLook: function () {
        var panel = this.getView();
        var registerGrid = panel.down("#registerGrid");
        var registerWindow = panel.down("#registerWindow");
        var registerForm = registerWindow.down("#registerForm");
        var registerUpload = registerWindow.down("#registerUpload");
        var registerDisPlayForm = registerWindow.down("#registerDisPlayForm");
        var selectRecords = registerGrid.getSelection();//获取grid选中行records
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            registerForm.hide();
            registerUpload.hide();
            registerDisPlayForm.show();
            registerDisPlayForm.down('form').getForm().reset();//表单清空
            registerWindow.expand();
            registerDisPlayForm.down('form').getForm().loadRecord(selectRecords[0]);
            var photoUrl = selectRecords[0].data.photoUrl;
            var sex = selectRecords[0].data.sex;
            if(sex == "0"){
                registerDisPlayForm.down("#sex").setValue("男");
            }else if(sex == "1"){
                registerDisPlayForm.down("#sex").setValue("女");
            }
            if(photoUrl != "" && photoUrl != null){
                var photoUrlValue = '<div class="thumb"><img src="'+photoUrl+'" height="200" width="150"></div>';
                registerDisPlayForm.down("#photoUrl").setValue(photoUrlValue);
            }
        }
    },
    onClickButtonAdd: function () {
        var panel = this.getView();
        var registerWindow = panel.down("#registerWindow");
        var registerForm = registerWindow.down("#registerForm");
        var registerDisPlayForm = registerWindow.down("#registerDisPlayForm");
        var registerUpload = registerWindow.down("#registerUpload");
        registerForm.down('form').getForm().reset();
        registerDisPlayForm.hide();
        registerForm.show();
        registerUpload.show();
        registerWindow.expand();
    },
    onClickButtonEdit: function () {
        var panel = this.getView();
        var registerGrid = panel.down("#registerGrid");
        var registerWindow = panel.down("#registerWindow");
        var registerForm = registerWindow.down("#registerForm");
        var registerDisPlayForm = registerWindow.down("#registerDisPlayForm");
        var registerUpload = registerWindow.down("#registerUpload");
        var selectRecords = registerGrid.getSelection();//获取grid选中行records
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            if(selectRecords[0].data.checkFlag == "1"){
                Ext.MessageBox.alert('提示', '审核通过的信息不能修改！');
                return;
            }else{
                registerDisPlayForm.hide();
                registerForm.show();
                registerUpload.show();
                registerForm.down('form').getForm().reset();//表单清空
                registerWindow.expand();
                registerForm.down('form').getForm().loadRecord(selectRecords[0]);
            }
        }
    },
    onClickButtonSave: function () {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/examStudent/save.do';
        // 获取页面附件id
        var upload = document.getElementById('registerUploadId').contentWindow;
        var attachmentIds = upload.document.getElementById("attachmentIds").value;
        var panel = Ext.getCmp('registerManagerId');
        var registerWindow = panel.down("#registerWindow");
        var registerForm = registerWindow.down("#registerForm");
        var registerGrid = panel.down("#registerGrid");
        if (registerForm.isValid()) {
            var record = registerForm.getViewModel().getData().rec;
            // 附件ids
            record.attachmentIds = attachmentIds;
            Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                if (jsonData.resultCode == "1") {
                    if(record.id){
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                    }else{
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0005, '4000', '1', null);
                    }
                    registerForm.reset();
                    registerForm.getViewModel().getData().rec = null;
                    registerGrid.store.reload();
                    registerWindow.collapse();
                } else {
                    Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                }
            });
        }else {
            Ext.MessageBox.alert('提示', '请先填写数据！');
        }
    },
    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/examStudent/delete.do';
        var panel = this.getView();
        var registerGrid = panel.down("#registerGrid");
        var selectRows = registerGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var returnFlag = true;
            var ids = '';
            $.each(selectRows, function (index, row) {
                if(row.data.checkFlag == "1"){
                    Ext.MessageBox.alert('提示', '审批通过的信息不能删除！');
                    returnFlag = false;
                    return false;
                }else{
                    ids += row.data.id + ',';
                }
            });
            if(!returnFlag){
                return;
            }
            var data = {ids: ids};
            //用户确认删除操作-----点击“是”
            Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionDelete, 'POST', data, true, function (jsonData) {
                        if (jsonData) {
                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG00141, [jsonData.sCount, jsonData.fCount]), '4000', '1', null);
                            registerGrid.store.reload();
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
        var registerWindow = panel.down("#registerWindow");
        var registerForm = panel.down("#registerForm");
        registerForm.getForm().reset();
        registerWindow.collapse();

    }
});