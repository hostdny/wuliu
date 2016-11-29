Ext.define('ExtFrame.view.main.cms.cmsMessageRelease.CmsMessageReleaseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cmsMessageReleaseController',

    onSelectTreePicker: function (me, record, eOpts) {
        var panel = this.getView();
        Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/cmsProgram/queryChildren.do', 'GET', {'code': record.data.code}, false, function (jsonData) {
            panel.down('#programCode').setValue(jsonData.code);
        });
    },
    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/cmsProgram/delete.do';
        var panel = this.getView();
        var cmsMessageReleaseGrid = panel.down('#cmsMessageReleaseGrid');
        var selections = cmsMessageReleaseGrid.getSelection();
        if (Tools.Method.IsEditData(selections)) {
            if (selections[0].data.isMain == 1) {
                var data = {ids: selections[0].data.pid};
                Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
                    if (btn == 'yes') {
                        Tools.Method.ExtAjaxRequestEncap(ActionDelete, 'POST', data, true, function (jsonData) {
                            if (jsonData) {
                                Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG00141, [jsonData.sCount, jsonData.fCount]), '4000', '1', null);
                                //重新加载grid
                                cmsMessageReleaseGrid.store.reload();
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
    onClickButtonAdd: function () {
        var view = this.getView();
        view.down('#' + view.ename + 'Window').down('form').getForm().reset();
        view.down('#' + view.ename + 'Window').expand();
    },
    onClickButtonEdit: function () {
        var view = this.getView();
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        var window = view.down('#' + view.ename + 'Window');
        window.down('form').getForm().reset();//表单清空
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            window.expand();
            window.down('form').getForm().loadRecord(selectRecords[0]);
        }
    },
    onClickButtonSave: function () {
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var view = this.getView();
        var form = view.down('#cmsMessageReleaseForm');
        var record = view.getViewModel().getData().rec;
        var artilceContext = form.down('#artilceContext').getValue();
        if (form.isValid()) {
            var cmsGrid = view.ownerCt.down('#' + view.ename + 'Grid');
            if (record) {
                Ext.getBody().mask("请稍等，正在保存中...", "x-mask-loading");
                Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/cmsArticle/save.do?delFlag=0', 'POST', record, true, function (jsonData) {
                    if (jsonData) {
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                        cmsGrid.store.getProxy().extraParams = {
                            'programId': record.programId
                        };
                        cmsGrid.store.reload();
                        view.up("panel").down('#' + view.ename + 'Window').collapse();
                        form.getForm().reset();
                        view.up("panel").down('button').setDisabled(true);
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