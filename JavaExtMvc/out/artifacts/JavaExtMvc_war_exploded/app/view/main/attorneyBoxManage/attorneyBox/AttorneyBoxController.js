/**
 * Created by Jia on 2016/8/1.
 */
Ext.define('ExtFrame.view.main.attorneyBoxManage.attorneyBox.AttorneyBoxController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.attorneyBoxController',

    onClickButtonSend: function (btn) {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/attorneyBox/sendEmail.do';
        var view = this.getView();
        var grid = Ext.getCmp("attorneyBoxGrid");//获取当前grid控件
        var win = btn.up('window');
        var form = win.down('#attorneyBoxPanelForm');
        if (form.isValid()) {
            var record = view.getViewModel().getData().rec;
            record.id = form.down('#hfOID').getValue();
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        view.down('#attorneyBoxPanelForm').getForm().reset();
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                        grid.store.reload();
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
    },
//信息查看弹窗
    onClickButtonReply: function () {
        if (!Tools.Method.IsLogin) {
            return;
        }
        var view = this.getView();
        var grid = view.down("#attorneyBoxGrid");//获取当前grid控件
        var selectRecords = grid.getSelectionModel().getSelection();
        if (selectRecords.length > 1) {
            Ext.MessageBox.alert('提示', '很抱歉，请选择一条数据！');
            return;
        }
        if (selectRecords.length == 0) {
            Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
            return;
        }
        var win = Ext.create('Ext.Window', {
            width: 850,
            height: 500,
            plain: true,
            layout: 'fit',
            modal: true,
            closeAction: 'destroy',
            title: '信息预览与回复',
            autoShow: true,
            closable: true,
            itemId: 'attorneyBoxPanel',
            items: {
                xtype: 'attorneyBoxPanel',
                'attorneyBoxGrid': '',
                itemId: 'attorneyBoxPanel',
                requires: ['ExtFrame.view.main.attorneyBoxManage.attorneyBox.AttorneyBoxController'],
                controller: 'attorneyBoxController'
            }
        }).show();
        var attorneyBoxPanel = win.down('#attorneyBoxPanel');
        var downLoadGrid = attorneyBoxPanel.down('#downLoadAttachmentGrid');
        if (selectRecords[0]) {
            var form = win.down('#attorneyBoxPanelForm');
            form.getForm().loadRecord(selectRecords[0]);
            //带附加参数重构grid store数据
            downLoadGrid.store.getProxy().extraParams = {
                'swhere': "businessData|String|" + selectRecords[0].data.id
            };
            //重新加载grid
            downLoadGrid.store.reload();
            var form = win.down('#attorneyBoxPanelForm');
            form.getForm().loadRecord(selectRecords[0]);
        } else {
            return;
        }

    },

    onClickButtonLook: function () {
        if (!Tools.Method.IsLogin())
            return;
        var panel = this.getView();
        var attorneyBoxGrid = panel.down('#attorneyBoxGrid');
        var attorneyBoxWindow = panel.down('#attorneyBoxWindow');
        var downLoadGrid = attorneyBoxWindow.down('#downLoadAttachmentGrid');
        var selectRecords = attorneyBoxGrid.getSelectionModel().getSelection();
        if (selectRecords[0]) {
            var form = panel.down('#attorneyBoxForm');
            form.getForm().loadRecord(selectRecords[0]);
            //带附加参数重构grid store数据
            downLoadGrid.store.getProxy().extraParams = {
                'swhere': "businessData|String|" + selectRecords[0].data.id
            };
            //重新加载grid
            downLoadGrid.store.reload();
            //attorneyBoxWindow.expand();
            var win = Ext.create('Ext.Window', {
                width: 850,
                height: 500,
                plain: true,
                layout: 'fit',
                modal: true,
                closeAction: 'destroy',
                title: '信息预览与回复',
                autoShow: true,
                closable: true,
                itemId: 'attorneyBoxForm',
                items: {
                    xtype: 'attorneyBoxWindow',
                    'attorneyBoxGrid': '',
                    itemId: 'attorneyBoxWindow',
                    requires: ['ExtFrame.view.main.attorneyBoxManage.attorneyBox.AttorneyBoxWindow'],
                    controller: 'attorneyBoxController'
                }
            }).show();
        } else {
            Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
        }
    },
    onClickButtonSave: function (btn) {
        if (!Tools.Method.IsLogin())
            return;
        var view = this.getView();
        var form = view.down('#attorneyBoxPanelForm');
        var grid = Ext.getCmp("attorneyBoxGrid");//获取当前grid控件
        var win = btn.up('window');
        var replyFlag = form.down('#replyFlag').getValue();
        var id = form.down('#hfOID').getValue();
        var record = {
            id: id,
            replyFlag: replyFlag
        };
        Ext.getBody().mask("请稍等，正在保存中...", "x-mask-loading");
        Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/attorneyBox/save.do', 'POST', record, true, function (jsonData) {
            if (jsonData) {
                view.getViewModel().getData().rec = null;
                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                grid.store.reload();
                win.close();
                Ext.getBody().unmask();
            } else {
                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
            }
        });
    }
});