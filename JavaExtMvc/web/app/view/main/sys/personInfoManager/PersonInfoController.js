Ext.define('ExtFrame.view.main.sys.personInfoManager.PersonInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.personInfoController',

    onClickButtonLook: function () {
        // 图片预览
        var img = Ext.getCmp("img_show");

        var view = this.getView();
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        var window = view.down('#' + view.ename + 'Window');
        window.down('form').getForm().reset();//表单清空
        var orgPicker = window.down('#orgPicker');
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            window.expand();
            window.down('form').getForm().loadRecord(selectRecords[0]);
            orgPicker.setRawValue(selectRecords[0].data.orgName);
            // 其他信息
            var findRecord = {userId: selectRecords[0].data.id};
            Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/personInfoDetail/find.do', 'GET', findRecord, true, function (jsonData) {
                if (jsonData != null && jsonData != "") {
                    window.down('#userMail').setValue(jsonData.userMail);
                    window.down('#userQQ').setValue(jsonData.userQQ);
                    if(jsonData.userPhotoUrl != null && jsonData.userPhotoUrl != ""){
                        img.getEl().dom.src = "/uploadFile" + jsonData.userPhotoUrl;
                    }
                }
            });
            // 按钮禁用
            Ext.getCmp("personInfoWindowSaveButton").setDisabled(true);
        }
    },
    onClickButtonAdd: function () {
        // 按钮启用
        Ext.getCmp("personInfoWindowSaveButton").enable();
        // 图片预览
        var img = Ext.getCmp("img_show");
        img.getEl().dom.src = "";
        var view = this.getView();
        view.down('#' + view.ename + 'Window').down('form').getForm().reset();
        view.down('#' + view.ename + 'Window').expand();
    },
    onClickButtonEdit: function () {
        // 图片预览
        var img = Ext.getCmp("img_show");

        var view = this.getView();
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        var window = view.down('#' + view.ename + 'Window');
        window.down('form').getForm().reset();//表单清空
        var orgPicker = window.down('#orgPicker');
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            window.expand();
            window.down('form').getForm().loadRecord(selectRecords[0]);
            orgPicker.setRawValue(selectRecords[0].data.orgName);
            // 其他信息
            var findRecord = {userId: selectRecords[0].data.id};
            Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/personInfoDetail/find.do', 'GET', findRecord, true, function (jsonData) {
                if (jsonData != null && jsonData != "") {
                    window.down('#userMail').setValue(jsonData.userMail);
                    window.down('#userQQ').setValue(jsonData.userQQ);
                    if(jsonData.userPhotoUrl != null && jsonData.userPhotoUrl != ""){
                        img.getEl().dom.src = "/uploadFile" + jsonData.userPhotoUrl;
                    }
                }
            });
        }
    },
    onClickButtonSave: function () {
        // 附件隐藏值
        var hidAtt = Ext.getCmp("userPhotoUrl_attachmentId");
        // 图片预览
        var img = Ext.getCmp("img_show");

        var ActionEdit = Tools.Method.getAPiRootPath() + '/personInfo/save.do';
        var view = this.getView();
        var form = view.down('#' + view.ename + 'Form');
        if (form.isValid()) {
            var record = view.getViewModel().getData().rec;
            var pnGrid = view.up("panel").down('#' + view.ename + 'Grid');
            if (record) {
                record.attachmentId = hidAtt.getValue();
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        view.down('#' + view.ename + 'Form').getForm().reset();
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                        pnGrid.store.reload();
                        view.up("panel").down('#' + view.ename + 'Window').collapse();
                        img.getEl().dom.src = "";
                        hidAtt.setValue("");
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    },
    onClickButtonDel: function () {
        Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath() + '/personInfo/delete.do');
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
    onClickPhotoUpload: function () {
        // 附件隐藏值
        var hidAtt = Ext.getCmp("userPhotoUrl_attachmentId");
        // 图片预览
        var img = Ext.getCmp("img_show");
        // 上传window
        var win = Ext.create('ExtFrame.view.extEncap.FileUpload', {
            uploadURL: '/attachment/uploadFile.do?businessModel=3&businessType=0',
            frontFlag: '2',
            PlUploadOpts: {
                fileCount: 1,//允许上传文件个数
                mimeType: [{ title: "Image files", extensions: "jpg,gif,png,jpeg" }]
            },
            returnFun: function (data) {
                if (data != null) {
                    $.each(data, function (index, row) {
                        var frontFlag = row.frontFlag;
                        if (frontFlag == '2') {
                            var result = $.parseJSON(row.result);
                            hidAtt.setValue(result.resultData);
                            img.getEl().dom.src = "/uploadFile" + result.object.fileUrl;
                        }
                    });
                }
            }
        }).show();
    }
});