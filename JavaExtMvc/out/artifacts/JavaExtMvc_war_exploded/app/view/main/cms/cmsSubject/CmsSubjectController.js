/**
 * Created by Administrator on 2016/9/27.
 */
Ext.define('ExtFrame.view.main.cms.cmsSubject.CmsSubjectController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cmsSubjectController',
    //新增方法
    //onClickButtonAdd: function () {
    //    var view = this.getView();
    //    view.down('#' + view.ename + 'Window').down('form').getForm().reset();
    //    view.down('#' + view.ename + 'Window').expand();
    //},
    //新增方法
    onClickButtonAdd: function () {
        if(!Tools.Method.IsLogin){
            return;
        }
        var win = this.getView().down('window');
        win.down('form').getForm().reset();
        win.show();
    },

    //修改方法
    onClickButtonEdit: function () {
        var view = this.getView();
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        var win = view.down('window');
        var form = win.down('form');
        form.getForm().reset();
        if(Tools.Method.IsEditData(selectRecords)){
            form.getForm().loadRecord(selectRecords[0]);
            win.show();
        }
    },
    //保存
    onClickButtonSave: function (btn) {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/cmsSubject/save.do';
        var view = this.getView();
        var win = view.up("panel").down('#' + view.ename + 'Window');
        var form = win.down('#' + view.ename + 'Form');
        if (form.isValid()) {
            var record = view.getViewModel().getData().rec;
            var pnGrid = view.up("panel").down('#' + view.ename + 'Grid');
            if (record) {
                var siteName = form.down("#siteName").rawValue;
                record.siteName=siteName;
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
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
                })
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    },
    //删除
    onClickButtonDel: function () {
        Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath() + '/cmsSubject/delete.do');
    },
    onClickSearch: function (me, record, eOpts) {
        var siteId = record.data.id;
        var cmsSubjectGrid = Ext.getCmp("cmsSubjectGrid");
        cmsSubjectGrid.store.getProxy().extraParams = {
            siteId:siteId
        };
        cmsSubjectGrid.store.reload();
    },

    cancel : function(btn) {
        var win = btn.up('window');
        win.close();
    }
});
