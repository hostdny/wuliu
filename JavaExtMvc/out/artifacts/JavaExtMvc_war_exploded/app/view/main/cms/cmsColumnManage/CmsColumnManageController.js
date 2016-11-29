Ext.define('ExtFrame.view.main.cms.cmsColumnManage.CmsColumnManageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cmsColumnManageController',

    onClickButtonAdd: function () {
        var panel = this.getView();
        var cmsColumnManageWindow = panel.down("#cmsColumnManageWindow");
        var cmsColumnManageForm = cmsColumnManageWindow.down("#cmsColumnManageForm");
        var parentName = cmsColumnManageForm.down('#parentName');
        parentName.show();
        cmsColumnManageForm.getForm().reset();
        cmsColumnManageWindow.expand();
    },
    onClickButtonEdit: function () {
        var panel = this.getView();
        var cmsColumnManageGrid = panel.down('#cmsColumnManageGrid');
        var cmsColumnManageWindow = panel.down("#cmsColumnManageWindow");
        var cmsColumnManageForm = cmsColumnManageWindow.down("#cmsColumnManageForm");
        var parentName = cmsColumnManageForm.down('#parentName');
        cmsColumnManageForm.getForm().reset();
        var selections = cmsColumnManageGrid.getSelection();
        if (Tools.Method.IsEditData(selections)) {
            cmsColumnManageForm.down('#hfOID').setValue(selections[0].data.pid);
            cmsColumnManageForm.down('#programCode').setValue(selections[0].data.code);
            cmsColumnManageForm.down('#programName').setValue(selections[0].data.name);
            cmsColumnManageForm.down('#url').setValue(selections[0].data.url);
            cmsColumnManageForm.down('#akey').setValue(selections[0].data.akey);
            parentName.hide();
            cmsColumnManageWindow.expand();
        }
    },
    onClickButtonSave: function () {
        var panel = this.getView().up("panel");
        var cmsColumnManageWindow = panel.down("#cmsColumnManageWindow");
        var cmsColumnManageForm = cmsColumnManageWindow.down("#cmsColumnManageForm");
        var cmsColumnManageGrid = panel.down('#cmsColumnManageGrid');
        var parentName = cmsColumnManageForm.down('#parentName');
        var record = cmsColumnManageForm.getViewModel().getData().rec;
        var programCode = record.programCode;
        if(programCode != ""){
            if (cmsColumnManageForm.isValid()) {
                Ext.getBody().mask("请稍等，正在保存中...","x-mask-loading");
                Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/cmsProgram/save.do', 'POST', record, true, function (jsonData) {
                    if (jsonData) {
                        if(record.oid){
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                        }else{
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0005, '4000', '1', null);
                        }
                        cmsColumnManageForm.getForm().reset();
                        var parentName = cmsColumnManageForm.down('#parentName');
                        Ext.getBody().unmask();
                        //重新加载grid
                        parentName.store.reload();
                        cmsColumnManageGrid.store.reload();
                        cmsColumnManageWindow.collapse();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            }else{
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }else{
            Ext.MessageBox.alert('提示', '请选择所属分类！');
        }
    },
    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/cmsProgram/delete.do';
        var panel = this.getView();
        var cmsColumnManageGrid = panel.down('#cmsColumnManageGrid');
        var selections = cmsColumnManageGrid.getSelection();
        if (Tools.Method.IsEditData(selections)) {
            if (selections[0].data.isMain == 1) {
                var data = {ids: selections[0].data.pid};
                Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
                    if (btn == 'yes') {
                        Tools.Method.ExtAjaxRequestEncap(ActionDelete, 'POST', data, true, function (jsonData) {
                            if (jsonData) {
                                Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG00141, [jsonData.sCount, jsonData.fCount]), '4000', '1', null);
                                //重新加载grid
                                cmsColumnManageGrid.store.reload();
                            }
                            else {
                                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                            }
                        });
                    }
                });
            }
        }
    },
    onSelectTreePicker: function (me, record, eOpts) {
        var panel = this.getView();
        Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/cmsProgram/queryChildren.do', 'GET', { 'code': record.data.code}, false, function (jsonData) {
            panel.down('#programCode').setValue(jsonData.code);
        });
    },
    onClickClear: function () {
        var panel = this.getView().up("panel");
        var cmsColumnManageWindow = panel.down("#cmsColumnManageWindow");
        var cmsColumnManageForm = cmsColumnManageWindow.down("#cmsColumnManageForm");
        cmsColumnManageForm.getForm().reset();
        cmsColumnManageWindow.collapse();
    }
});