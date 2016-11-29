/**
 * Created by Jia on 2016/11/02.
 */
Ext.define('ExtFrame.view.main.caseTrackingManage.caseLinkDetailConfig.CaseLinkDetailConfigController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.caseLinkDetailConfigController',

    //新增
    onClickButtonAdd: function (button) {
        if (!Tools.Method.IsLogin) {
            return;
        }
        var view = this.getView();
        var win = this.getView().down('window');
        win.down('form').getForm().reset();
        win.show();
    },

    //修改方法
    onClickButtonEdit: function () {
        if (!Tools.Method.IsLogin) {
            return;
        }
        var view = this.getView();
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        var win = view.down('window');
        var form = win.down('form');
        form.getForm().reset();
        if (Tools.Method.IsEditData(selectRecords)) {
            if(selectRecords[0].data.caseLock==0){
                //修改多选框的数据源
                var linkIds = form.down("#linkIds");
                var store = linkIds.store;
                store.getProxy().extraParams = {
                    'caseType': selectRecords[0].data.caseType
                };
                store.reload();
                var links = selectRecords[0].data.linkIds.split(",");
                selectRecords[0].data.linkIds = links;
                form.getForm().loadRecord(selectRecords[0]);
                win.show();
            }else{
                Tools.Method.ShowTipsMsg(Tools.Msg.MSG00172, '4000', '2', null);
            }

        }
    },
    //保存
    onClickButtonSave: function (btn) {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/caseLinkDetailConfig/save.do';
        var view = this.getView();
        var win = view.up("panel").down('#' + view.ename + 'Window');
        var form = win.down('#' + view.ename + 'Form');
        if (form.isValid()) {
            var pnGrid = view.up("panel").down('#' + view.ename + 'Grid');
            var selectRecords = pnGrid.getSelection();//获取grid选中行records
            var record = view.getViewModel().getData().rec;
            var linkIds = form.down("#linkIds");
            var ids = linkIds.getRawValue();
            if (selectRecords[0] != undefined) {
                record.id = selectRecords[0].data.id;
            }
            record.linkIds = ids;
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        view.down('#' + view.ename + 'Form').getForm().reset();
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                        pnGrid.store.reload();
                        win.close();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                })
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    },
    //删除
    onClickButtonDel: function () {
        var view = this.getView();
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        if (Tools.Method.IsEditData(selectRecords)) {
            if(selectRecords[0].data.caseLock==0){
                Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath() + '/caseLinkDetailConfig/delete.do');
            }else{
                Tools.Method.ShowTipsMsg(Tools.Msg.MSG00171, '4000', '2', null);
            }
        }
    },

    cancel: function (btn) {
        var win = btn.up('window');
        win.close();
    }
});

