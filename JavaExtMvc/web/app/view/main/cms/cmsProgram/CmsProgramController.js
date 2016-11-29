/**
 * Created by zzw on 2016/9/26.
 */
Ext.define('ExtFrame.view.main.cms.cmsProgram.CmsProgramController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cmsProgramController',

    onClickSearch: function (button) {
        var siteId = button.up().down("#siteName").value;
        var siteName = button.up().down("#siteName").rawValue;
        var cmsProgramGrid = button.up('panel');
        cmsProgramGrid.store.getProxy().extraParams = {
            siteId:siteId
        };
        cmsProgramGrid.store.reload();
    },

    onSelectTree: function (me, record, eOpts) {
        var view = this.getView();
        var window = view.down('#' + view.ename + 'Window');
        var form = window.down('#' + view.ename + 'Form');
        var cmsProgramGrid = view.down('#cmsProgramGrid');
        var siteId = record.data.id;
        //带附加参数重构grid store数据
        cmsProgramGrid.store.getProxy().extraParams = {
            'siteId': siteId
        };
        form.down('#akey').show();
        //重新加载grid
        cmsProgramGrid.store.reload();
    },
    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/cmsProgram/delete.do';
        var panel = this.getView();
        var cmsProgramGrid = panel.down("cmsProgramGrid");
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

    //onClickButtonAdd: function () {
    //    var view = this.getView();
    //    view.down('#' + view.ename + 'Window').down('form').getForm().reset();
    //    var window = view.down('#' + view.ename + 'Window');
    //    var form = window.down('#' + view.ename + 'Form');
    //    var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
    //    form.down('#siteName').enable();
    //    form.down('#akey').show();
    //    form.down('#siteName').setRawValue(pnGrid.down("#siteName").getRawValue());
    //    view.down('#' + view.ename + 'Window').expand();
    //},

    //新增方法
    onClickButtonAdd: function () {
        if(!Tools.Method.IsLogin){
            return;
        }
        var view =this.getView();
        var win = view.down('window');
        var form = win.down('form');
        form.getForm().reset();
        var pnGrid = view.down('#' + view.ename + 'Grid');
        form.down('#siteName').enable();
        form.down('#akey').show();
        form.down('#siteName').setRawValue(pnGrid.down("#siteName").getRawValue());
        form.down('#siteId').setValue(pnGrid.down("#siteName").getValue());

        //form.down("#siteId").setValue(record.data.id);
        var store = form.down("#proName").store;
        store.getProxy().extraParams = {
            'siteId': pnGrid.down("#siteName").getValue()
        };
        store.reload();

        win.show();
    },

    onClickButtonEdit: function () {
        var view = this.getView();
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        var win = this.getView().down('window');
        var form = win.down('form');
        form.down('#akey').show();
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
            form.down('#hfOid').setValue(selectRecords[0].data.pid);
            form.down('#parentId').setValue(selectRecords[0].data.parentOid);
            form.down('#siteId').setValue(pnGrid.down("#siteName").getValue());
            //form.down('#siteName').setRawValue(pnGrid.down("#siteName").getRawValue());
            form.down('#siteName').setValue(pnGrid.down("#siteName").getValue());
            form.down('#siteName').setDisabled(true);

            form.down('#remark').setValue(selectRecords[0].data.remark);
            form.down('#url').setValue(selectRecords[0].data.url);
            form.down('#akey').setValue(selectRecords[0].data.akey);
            form.down('#programName').setValue(selectRecords[0].data.name);
            form.down('#sortNo').setValue(selectRecords[0].data.sortNo);
            form.down('#remark').setValue(selectRecords[0].data.remark);
            form.down('#isShow').setValue(selectRecords[0].data.isShow);

            var isMain = selectRecords[0].data.isMain;
            if(isMain != "0"){
                form.down('#akey').hide();
            }else{
                form.down('#akey').show();
            }
            form.down('#isMain').setValue(isMain);
            win.show();
        }
    },

    //onClickButtonEdit: function () {
    //    var view = this.getView();
    //    var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
    //    var selectRecords = pnGrid.getSelection();//获取grid选中行records
    //    var window = view.down('#' + view.ename + 'Window');
    //    var form = window.down('#' + view.ename + 'Form');
    //    form.down('#akey').show();
    //    var proName = form.down("#proName");
    //    window.down('form').getForm().reset();//表单清空
    //    //仅能选择一项数据
    //    if (Tools.Method.IsEditData(selectRecords)) {
    //        //  form.getForm().loadRecord(selectRecords[0]);
    //        //   var form = window.down('#' + view.ename + 'Form');
    //        proName.store.getProxy().extraParams = {
    //            'siteId': pnGrid.down("#siteName").getValue()
    //        };
    //        proName.store.reload(
    //        //    {
    //        //    callback : function() {
    //        //        var aa = selectRecords[0].data.type;
    //        //        debugger;
    //        //        if(selectRecords[0].data.type == ""){
    //        //
    //        //        }
    //        //        form.down('#proName').setRawValue(selectRecords[0].data.type);
    //        //    }
    //        //}
    //        );
    //
    //
    //        form.down('#hfOid').setValue(selectRecords[0].data.pid);
    //        form.down('#parentId').setValue(selectRecords[0].data.parentOid);
    //        form.down('#siteId').setValue(pnGrid.down("#siteName").getValue());
    //        form.down('#siteName').setRawValue(pnGrid.down("#siteName").getRawValue());
    //        form.down('#siteName').setDisabled(true);
    //        form.down('#remark').setValue(selectRecords[0].data.remark);
    //        form.down('#url').setValue(selectRecords[0].data.url);
    //        form.down('#akey').setValue(selectRecords[0].data.akey);
    //        form.down('#programName').setValue(selectRecords[0].data.name);
    //        form.down('#sortNo').setValue(selectRecords[0].data.sortNo);
    //        form.down('#remark').setValue(selectRecords[0].data.remark);
    //        var isMain = selectRecords[0].data.isMain;
    //        if(isMain != "0"){
    //            form.down('#akey').hide();
    //        }else{
    //            form.down('#akey').show();
    //        }
    //        form.down('#isMain').setValue(isMain);
    //        window.expand();
    //    }
    //},
    onClickButtonSave: function (btn) {
        var ActionSave = Tools.Method.getAPiRootPath() + '/cmsProgram/save.do';
        var view = this.getView();
        var win = view.down('window');
        //var win = view.up("panel").down('#' + view.ename + 'Window');
        //var form = win.down('#' + view.ename + 'Form');
        var form = win.down('form');
        if (form.isValid()) {
            var record = win.getViewModel().getData().rec;
            record.siteName=form.down("#siteName").getValue();
            record.siteId = form.down('#siteId').getValue();
            record.parentOid = form.down('#parentId').getValue();
            record.id = form.down('#hfOid').getValue();
            var pnGrid = view.up("panel").down('#' + view.ename + 'Grid');
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionSave, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        view.down('#' + view.ename + 'Form').getForm().reset();
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                        pnGrid.store.reload();
                        var win = btn.up('window');
                        win.close();
                        //view.up("panel").down('#' + view.ename + 'Window').collapse();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    },
    cancel : function(btn) {
        var win = btn.up('window');
        win.close();
    }
});
