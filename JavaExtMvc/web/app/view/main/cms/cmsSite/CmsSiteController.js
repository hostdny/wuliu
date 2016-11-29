/**
 * Created by zzw on 2016/9/26.
 */
Ext.define('ExtFrame.view.main.cms.cmsSite.CmsSiteController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cmsSiteController',

    onClickButtonDel: function () {
        Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath() + '/cmsSite/delete.do');
    },

    onClickButtonEdit: function () {
        if(!Tools.Method.IsLogin){
            return;
        }
        var view = this.getView();
        var grid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selection =grid.getSelectionModel().getSelection();
        if(selection.length>1){
            Ext.MessageBox.alert('提示', '很抱歉，请选择一条数据！');
            return;
        }
        if(selection.length==0){
            Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
            return;
        }
        var win = Ext.create('Ext.Window', {
            width: 950,
            height: 550,
            plain: true,
            layout: 'fit',
            modal: true,
            closeAction: 'destroy',
            title: '站点信息预览与编辑',
            autoShow: true,
            closable: true,
            itemId: 'cmsSiteWindow',
            items: {
                xtype: 'cmsSiteWindow',
                itemId: 'cmsSiteWindow',
                'cmsSiteGrid': '',
                requires: ['ExtFrame.view.main.cms.cmsSite.CmsSiteController'],
                controller: 'cmsSiteController'
            }
        }).show();
        var img = Ext.getCmp('cmsSiteWindow').down('image');
        img.setSrc(selection[0].raw.bannerUrl);
        var addImg = Ext.getCmp('cmsSiteWindow').down('#addImg');
        addImg.setRawValue(selection[0].data.bannerUrl);
        win.down('button').enable();
        win.down('#cmsSiteWindow').cmsSiteGrid = grid;
        var footInfo = win.down('#footInfo');
        win.down('#cmsSiteWindowForm').getForm().loadRecord(selection[0]);
        win.down('#hiddenfootInfo').setValue(selection[0].data.footInfo);
        setTimeout(function () {
            if (footInfo.getValue() != null) {
                var old = win.down('#hiddenfootInfo').getValue();
                win.down('#hiddenfootInfo').setValue("");
                win.down('#hiddenfootInfo').setValue(old);
            }
        }, 1000);
    },

    onClickButtonAdd: function (button) {
        if (!Tools.Method.IsLogin) {
            return;
        }
        var win = Ext.create('Ext.Window', {
            width: 950,
            height: 550,
            plain: true,
            layout: 'fit',
            modal: true,
            closeAction: 'destroy',
            title: '站点信息预览与编辑',
            autoShow: true,
            closable: true,
            itemId: 'cmsSiteWindow',
            items: {
                xtype: 'cmsSiteWindow',
                itemId: 'cmsSiteWindow',
                'cmsSiteGrid': '',
                requires: ['ExtFrame.view.main.cms.cmsSite.CmsSiteController'],
                controller: 'cmsSiteController'
            }
        }).show();
        //win.down('#cmsSiteWindowForm').reset();
        win.down('form').reset();
    },
    onClickButtonSave: function () {

        var ActionEdit = Tools.Method.getAPiRootPath() + '/cmsSite/saveCmsSite.do';
        var ActionisExist = Tools.Method.getAPiRootPath() + '/cmsSite/checkSiteName.do';
        var view = this.getView();
        var win = view.up("panel").down('#cmsSiteWindow');
        var form = win.down('#cmsSiteWindowForm');
        var footInfo = form.down('#footInfo').getValue();
      //  var footInfo = footInfo.replace(/<.*?>/ig,"");
        if (form.isValid()) {
            var record = win.getViewModel().getData().rec;
            if(win.down('#footInfo').getValue() != ""){
                record.footInfo = win.down('#footInfo').getValue();
            }
            record.footInfo = footInfo;
           // var pnGrid = view.up("panel").down('cmsSiteGrid');
            var pnGrid = Ext.getCmp("cmsSiteGrid");
            if (record) {
                var id = form.down("#hfOID").getValue();
                var siteName = form.down("#siteName").getValue();
                // 设备名称是否存在
                var data = {id: id ,siteName: siteName};
                Tools.Method.ExtAjaxRequestEncap(ActionisExist, 'POST', data, true, function (jsonData) {
                    if (jsonData.resultCode == "0") {
                        Tools.Method.ShowTipsMsg("站点名重复，请重新填写！", '4000', '3', null);//修改失败
                    } else {
                        form.form.doAction('submit', {
                            submitEmptyText : false,
                            url : ActionEdit,
                            method : 'POST',
                            success : function(form, action) {
                                if (action.result.success) {
                                    view.down('#cmsSiteWindowForm').getForm().reset();
                                    view.getViewModel().getData().rec = null;
                                    Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                                    pnGrid.store.reload();
                                    view.up("panel").down('#cmsSiteWindow').up().close();
                                }else {
                                    Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                                }
                            },
                            failure : function(form, action) {
                            }
                        });
                    }

                });
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    }
});
