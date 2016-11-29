/**
 * Created by zzw on 2016/9/26.
 */
Ext.define('ExtFrame.view.main.cms.cmsSiteAd.CmsSiteAdController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cmsSiteAdController',

    onClickSearch: function (button) {
        var siteId = button.up().down("#siteName").value;
        var siteName = button.up().down("#siteName").rawValue;
        var cmsSiteAdGrid = button.up('panel');
        cmsSiteAdGrid.store.getProxy().extraParams = {
            siteId:siteId
        };
        cmsSiteAdGrid.store.reload();
    },

    onSelectTree: function (me, record, eOpts) {
        var view = this.getView();
        var cmsSiteAdGrid = view.down('#cmsSiteAdGrid');
        var siteId = record.data.id;
        //带附加参数重构grid store数据
        cmsSiteAdGrid.store.getProxy().extraParams = {
            'siteId':siteId
        };
        //重新加载grid
        cmsSiteAdGrid.store.reload();
    },
    onClickButtonDel: function () {
        Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath() + '/cmsSiteAd/delete.do');
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
            title: '站点广告预览与编辑',
            autoShow: true,
            closable: true,
            itemId: 'cmsSiteAdWindow',
            items: {
                xtype: 'cmsSiteAdWindow',
                itemId: 'cmsSiteAdWindow',
                'cmsSiteAdGrid': '',
                requires: ['ExtFrame.view.main.cms.cmsSiteAd.CmsSiteAdController'],
                controller: 'cmsSiteAdController'
            }
        }).show();
        //win.down('#cmsSiteWindowForm').reset();
        win.down('form').reset();
        var view = this.getView();
        var win = Ext.getCmp('cmsSiteAdWindow');
        var form = win.down('#cmsSiteAdWindowForm');
        var pnGrid = Ext.getCmp("cmsSiteAdGrid");
        form.down('#siteId').setValue(pnGrid.down("#siteName").getValue());
        form.down('#siteName').setRawValue(pnGrid.down("#siteName").getRawValue());
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
            title: '站点广告预览与编辑',
            autoShow: true,
            closable: true,
            itemId: 'cmsSiteAdWindow',
            items: {
                xtype: 'cmsSiteAdWindow',
                itemId: 'cmsSiteAdWindow',
                'cmsSiteAdGrid': '',
                requires: ['ExtFrame.view.main.cms.cmsSiteAd.CmsSiteAdController'],
                controller: 'cmsSiteAdController'
            }
        }).show();
        win.down('button').enable();
        win.down('#cmsSiteAdWindow').cmsSiteGrid = grid;
        // win.down('form').getForm().loadRecord(selection[0]);
        var img = Ext.getCmp('cmsSiteAdWindow').down('image');
        img.setSrc(selection[0].raw.adUrl);
        var addImg = Ext.getCmp('cmsSiteAdWindow').down('#addImg');
        addImg.setRawValue(selection[0].data.adUrl);
        win.down('#cmsSiteAdWindowForm').getForm().loadRecord(selection[0]);
    },

    onClickButtonSave: function () {
        var ActionSave = Tools.Method.getAPiRootPath() + '/cmsSiteAd/saveCmsSiteAd.do';
        var view = this.getView();
        var win = Ext.getCmp('cmsSiteAdWindow');
        var form = win.down('#cmsSiteAdWindowForm');
        var siteName = win.down('#siteName');
        if (form.isValid()) {
            var record = view.getViewModel().getData().rec;
            var pnGrid = Ext.getCmp("cmsSiteAdGrid");
            if (record) {
                form.form.doAction('submit', {
                    submitEmptyText : false,
                    url : ActionSave,
                    method : 'POST',
                    success : function(form, action) {
                        if (action.result.success) {
                            view.down('#cmsSiteAdWindowForm').getForm().reset();
                            view.getViewModel().getData().rec = null;
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                            pnGrid.store.reload();
                            view.up("panel").down('#cmsSiteAdWindow').up().close();
                        }else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                        }
                    },
                    failure : function(form, action) {
                    }
                });
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    }
});
