/**
 * Created on 2016/9/26.
 */
Ext.define('ExtFrame.view.main.cms.cmsMenu.CmsMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cmsMenuController',

    //onSelectProgramTree: function (me, record, eOpts) {
    //    var view = this.getView();
    //    //var cmsMenuGrid = view.down('#cmsMenuGrid');
    //    var cmsProgramMenuGrid = view.down('#cmsProgramMenuGrid');
    //    var programId = record.data.pid;
    //    var siteId = record.data.id;
    //    //带附加参数重构grid store数据
    //    cmsProgramMenuGrid.store.getProxy().extraParams = {
    //        'programId':programId,
    //        'siteId': cmsProgramMenuGrid.down("#siteName").getValue()
    //    };
    //    //重新加载grid
    //    cmsProgramMenuGrid.store.reload();
    //},

    onSelectTree: function (me, record, eOpts) {
        var view = this.getView();
        var cmsProgramMenuGrid = view.down('#cmsProgramMenuGrid');
        var siteId = record.data.id;
        //带附加参数重构grid store数据
        cmsProgramMenuGrid.store.getProxy().extraParams = {
            'siteId': siteId
        };
        //重新加载grid
        cmsProgramMenuGrid.store.reload();
    },

    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/cmsMenu/delete.do';
        var panel = this.getView();
        var cmsProgramGrid = panel.down("cmsProgramMenuGrid");
        var selectRows = cmsProgramGrid.selModel.selected.items;//获取grid选中行

        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var isMain = selectRows[0].data.isMain;
            var data = {ids: selectRows[0].data.pid};

            //用户确认删除操作-----点击“是”
            Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionDelete, 'POST', data, true, function (jsonData) {
                        if (jsonData) {
                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG0020), '4000', '1', null);
                            cmsProgramGrid.store.reload();
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    },

    //新增方法
    onClickButtonAdd: function () {
        if (!Tools.Method.IsLogin) {
            return;
        }
        var view = this.getView();
        var win = view.down('#cmsProgramWindowFormWindow');
        win.show();
        var form = win.down('form');
        form.getForm().reset();
        var pnGrid = view.down('#cmsProgramMenuGrid');
        form.down('#siteName').enable();
        //form.down('#akey').show();
        form.down('#siteName').setRawValue(pnGrid.down("#siteName").getRawValue());
        form.down('#siteId').setValue(pnGrid.down("#siteName").getValue());
        var store = form.down("#proName").store;
        store.getProxy().extraParams = {
            'siteId': pnGrid.down("#siteName").getValue()
        };
        store.reload({
            callback: function () {
                form.down('#proName').setValue("");
                form.down('#parentId').setValue("");
            }
        });
    },

    onClickButtonEdit: function () {
        var view = this.getView();
        var pnGrid = view.down('#cmsProgramMenuGrid');//获取当前grid控件
        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        var win = this.getView().down('cmsProgramMenuWindow');
        var form = win.down('form');
        //form.down('#akey').show();
        var proName = form.down("#proName");
        win.down('form').getForm().reset();//表单清空
        if (Tools.Method.IsEditData(selectRecords)) {
            proName.store.getProxy().extraParams = {
                'siteId': pnGrid.down("#siteName").getValue()
            };
            proName.store.reload({
                callback: function () {
                    form.down('#proName').setValue(selectRecords[0].data.parentOid);
                }
            });
            var artilceContext = form.down('#artilceContext');
            form.down('#hiddenArtilceContext').setValue(selectRecords[0].data.artilceContext);
            setTimeout(function () {
                if (artilceContext.getValue() != null) {
                    var old = win.down('#hiddenArtilceContext').getValue();
                    win.down('#hiddenArtilceContext').setValue("");
                    win.down('#hiddenArtilceContext').setValue(old);
                }
            }, 1000);
            form.down('#hfOid').setValue(selectRecords[0].data.pid);
            form.down('#parentId').setValue(selectRecords[0].data.parentOid);
            form.down('#siteId').setValue(pnGrid.down("#siteName").getValue());
            //form.down('#siteName').setRawValue(pnGrid.down("#siteName").getRawValue());
            form.down('#siteName').setValue(pnGrid.down("#siteName").getValue());
            form.down('#siteName').setDisabled(true);
            form.down('#url').setValue(selectRecords[0].data.url);
            form.down('#programName').setValue(selectRecords[0].data.name);
            form.down('#sortNo').setValue(selectRecords[0].data.sortNo);
            form.down('#remark').setValue(selectRecords[0].data.remark);
            form.down('#isShow').setValue(selectRecords[0].data.isShow);
            form.down('#isNeedLogin').setValue(selectRecords[0].data.isNeedLogin);
            //var isMain = selectRecords[0].data.isMain;
            //if (isMain != "0") {
            //    form.down('#akey').hide();
            //} else {
            //    form.down('#akey').show();
            //}
            //form.down('#isMain').setValue(isMain);
            win.show();
        }
    },

    onClickButtonSave: function (btn) {
        var ActionSave = Tools.Method.getAPiRootPath() + '/cmsMenu/save.do';
        var view = this.getView();
        var win = this.getView().down('cmsProgramMenuWindow');
        var form = win.down('form');
        if (form.isValid()) {
            var record = win.getViewModel().getData().rec;
            if (win.down('#artilceContext').getValue() != "") {
                record.artilceContext = win.down('#artilceContext').getValue();
            }
            record.siteName = form.down("#siteName").getValue();
            record.siteId = form.down('#siteId').getValue();
            record.parentOid = form.down('#parentId').getValue();
            record.id = form.down('#hfOid').getValue();
            var pnGrid = view.down('#cmsProgramMenuGrid');
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionSave, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        view.down('#cmsProgramWindowForm').getForm().reset();
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                        pnGrid.store.reload();
                        win.close();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    },
    cancel: function (btn) {
        var win = btn.up('window');
        win.close();
    }
});

