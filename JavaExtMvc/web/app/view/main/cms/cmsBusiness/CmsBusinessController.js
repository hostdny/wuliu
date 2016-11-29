/**
 * Created by Jia on 2016/10/25.
 */
Ext.define('ExtFrame.view.main.cms.cmsBusiness.CmsBusinessController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cmsBusinessController',

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

    onSelectTree: function (me, record, eOpts) {
        var view = this.getView();
        var window = view.down('#' + view.ename + 'Window');
        var form = window.down('#' + view.ename + 'Form');
        var cmsBusinessGrid = view.down('#cmsBusinessGrid');
        var siteId = record.data.id;
        //带附加参数重构grid store数据
        cmsBusinessGrid.store.getProxy().extraParams = {
            'siteId': siteId
        };
        form.down('#programName').show();
        //重新加载grid
        cmsBusinessGrid.store.reload();
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
            form.down("#businessLogoFile").setRawValue(selectRecords[0].data.businessLogo);
            img.setSrc(selectRecords[0].data.businessLogo);
            win.show();
        }
    },
    //保存
    onClickButtonSave: function (btn) {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/cmsBusiness/saveCmsBusiness.do';
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
        } else {
            Ext.MessageBox.alert('提示', '请先填写数据,并确认上传LOGO是否是图片格式！');
        }
    },
    //删除
    onClickButtonDel: function () {
        Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath() + '/cmsBusiness/delete.do');
    },

    cancel : function(btn) {
        var win = btn.up('window');
        var img = win.down('image');
        img.setSrc("");
        win.close();
    }
});