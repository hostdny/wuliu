/**
 * Created by yaonan on 2016/9/1.
 */
Ext.define('ExtFrame.view.main.appManage.appVersionDetail.AppVersionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.appVersionController',

    onClickButtonLook: function () {
        var view = this.getView();
        view.down('#' + view.ename + 'Window').expand();
        view.down('#' + view.ename + 'Form').getForm().reset();//表单清空
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords =  pnGrid.selModel.selected.items;//获取grid选中行records
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            view.down('#' + view.ename + 'Form').getForm().loadRecord(selectRecords[0]);
        }
    },
    onClickUploadFile: function () {
       //获取附件id
        var apkid=this.getView().down('#apk_upload_hidden_oid');
        var fileName=this.getView().down('#appName');
        var appUrl=this.getView().down('#appUrl');
        //获取附件路径
        var win = Ext.create('ExtFrame.view.extEncap.FileUpload', {
            uploadURL: '/appVersionDetail/uploadFile.do?businessModel=0&businessType=0',
            frontFlag: '4',
            PlUploadOpts: {
                fileCount: 1,//允许上传文件个数
                mimeType: [{ title: "Image files", extensions: "apk" }]
            },
            returnFun: function(data){
                if(data != null){
                    $.each(data, function (index, row) {
                        var frontFlag = row.frontFlag;
                        if(frontFlag == '4'){
                            var result = $.parseJSON(row.result);
                            apkid.setValue(result.resultData);
                            fileName.setValue(result.object.fileName);
                            appUrl.setValue(result.object.fileUrl);
                        }
                    });
                }
            }
        }).show();
    },
    onClickButtonAdd: function () {
        var view = this.getView();
        view.down('#' + view.ename + 'Window').down('form').getForm().reset();
        view.down('#' + view.ename + 'Window').expand();
    },
    onClickButtonEdit: function () {
        var view = this.getView();
        view.down('#' + view.ename + 'Form').getForm().reset();//表单清空
        view.down('#' + view.ename + 'Window').expand();
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords =  pnGrid.selModel.selected.items;//获取grid选中行records
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            view.down('#' + view.ename + 'Form').getForm().loadRecord(selectRecords[0]);
        }
    },
    onClickButtonSave: function () {
        // 保存
        var saveUrl = Tools.Method.getAPiRootPath() + '/appVersionDetail/save.do';
        var view = this.getView().up("panel");
        var form = view.down('#' + view.ename + 'Form');
        var window=view.down('#' + view.ename + 'Window');
        var grid = view.down('#' + view.ename + 'Grid');
        if(form.isValid()){
            var record = this.getView().getViewModel().getData().rec;
            if(record){
                Tools.Method.ExtAjaxRequestEncap(saveUrl, 'POST', record, true, function (jsonData) {
                    if (jsonData) {
                        view.down('#' + view.ename + 'Form').getForm().reset();
                        window.collapse();
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                        grid.store.reload()
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            }else{
                Ext.MessageBox.alert('提示', '请将数据填写完整！');
            }
        }
    },
    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/appVersionDetail/delete.do';
        var view = this.getView();//获取当前grid控件
        var pnGrid = view.down('#' + view.ename + 'Grid');
        var selectRows = pnGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var ids = '';
            $.each(selectRows, function (index, row) {
                ids += row.data.id + ',';
            });
            var data = { ids: ids };
            //用户确认删除操作-----点击“是”
            Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionDelete, 'POST', data, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG00141, [jsonData.sCount, jsonData.fCount]), '4000', '1', null);
                            if (view.down('#' + view.ename + 'Form'))
                                view.down('#' + view.ename + 'Form').getForm().reset();
                            view.getViewModel().getData().rec = null;
                            pnGrid.store.reload();
                        } else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    },
    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchEncap(this);
    },
    onClickClear: function () {
        var view = this.getView().up("panel");
        view.down('#' + view.ename + 'Window').down('form').getForm().reset();
        view.down('#' + view.ename + 'Window').collapse();
    }
});
