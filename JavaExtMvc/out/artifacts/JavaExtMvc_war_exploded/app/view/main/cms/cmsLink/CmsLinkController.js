/**
 * Created by lihaiyue on 2016/9/26.
 */
Ext.define('ExtFrame.view.main.cms.cmsLink.CmsLinkController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cmsLinkController',

    //新增
    onClickButtonAdd: function(){
        if(!Tools.Method.IsLogin){
            return;
        }
        var win = this.getView().down('window');
        win.down('form').getForm().reset();
        var img = win.down('image');
        img.setSrc("");
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
            var img = win.down('image');
            img.setSrc("");
            form.getForm().loadRecord(selectRecords[0]);
            form.down("#siteLogoFile").setRawValue(selectRecords[0].data.siteLogo);
            img.setSrc(selectRecords[0].data.siteLogo);
            win.show();
        }
    },
    //保存
    onClickButtonSave: function (btn) {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/cmsLink/saveCmsLink.do';
        var view = this.getView();
        var win = view.up("panel").down('#' + view.ename + 'Window');
        var form = win.down('#' + view.ename + 'Form');
        if (form.isValid()) {
            var pnGrid = view.up("panel").down('#' + view.ename + 'Grid');
            form.form.doAction('submit', {
                submitEmptyText : false,
                url : ActionEdit,
                method : 'POST',
                success : function(form1, action) {
                    if (action.result.success) {
                        form.getForm().reset();
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                        pnGrid.store.reload();
                        var win = btn.up('window');
                        var img = win.down('image');
                        img.setSrc("");
                        win.close();
                    }else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                },
                failure : function(form, action) {
                    Ext.MessageBox.alert('提示', '请选择正确的文件类型！');
                }
            });










            //var record = view.getViewModel().getData().rec;
            //var pnGrid = view.up("panel").down('#' + view.ename + 'Grid');
            //if (record) {
            //    record.siteName=form.down("#siteId").rawValue;
            //    Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
            //        if (jsonData.resultCode == "1") {
            //            view.down('#' + view.ename + 'Form').getForm().reset();
            //            view.getViewModel().getData().rec = null;
            //            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
            //            pnGrid.store.reload();
            //            var win = btn.up('window');
            //            var img = win.down('image');
            //            img.setSrc("");
            //            win.close();
            //        } else {
            //            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
            //        }
            //    })
            //}
        } else {
            Ext.MessageBox.alert('提示', '请先填写数据,并确认上传LOGO是否是图片格式！');
        }
    },
    //删除
    onClickButtonDel: function () {
        Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath() + '/cmsLink/delete.do');
    },
    onClickSearch: function () {
        var panel = Ext.getCmp('cmsLinkManagerId');
        var cmsLinkGrid = panel.down("#cmsLinkGrid");
        var siteId = cmsLinkGrid.down("#siteName").value;
        var siteName = cmsLinkGrid.down("#siteName").rawValue;
        if(siteName == ""){
            siteId = "";
        }
        var linkName = cmsLinkGrid.down("#linkName").getValue();
        cmsLinkGrid.store.getProxy().extraParams = {
            siteId:siteId,
            linkName:linkName
        };
        cmsLinkGrid.store.reload();
    },
    onClickBack: function () {
        var panel = Ext.getCmp('cmsLinkManagerId');
        var cmsLinkGrid = panel.down("#cmsLinkGrid");
        cmsLinkGrid.down("#siteName").setValue("");
        cmsLinkGrid.down("#linkName").setValue("");
        cmsLinkGrid.store.getProxy().extraParams = {
            linkName:""
        };
        cmsLinkGrid.store.reload();
    },
    cancel : function(btn) {
        var win = btn.up('window');
        var img = win.down('image');
        img.setSrc("");
        win.close();
    }
});

