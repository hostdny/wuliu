/**
 * Created by LvXL on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.correct.correctActivity.CorrectActivityController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.correctActivityController',

    onClickSelectedImage: function (dv, nodes) {
        window.open(nodes[0].data.fileUrl);
    },
    onClickButtonLook: function () {
        if (!Tools.Method.IsLogin) {
            return;
        }
        var view = this.getView();
        var pnGrid = view.down('#correctActivityGrid');//获取当前grid控件
        var selectRecords = pnGrid.getSelection();
        if (Tools.Method.IsEditData(selectRecords)) {
            var win = Ext.create('Ext.Window', {
                width: 950,
                height: 550,
                plain: true,
                layout: 'fit',
                modal: true,
                closeAction: 'destroy',
                title: '活动信息',
                autoShow: true,
                closable: true,
                items: {
                    xtype: 'correctActivityWindow',
                    itemId: 'correctActivityWindow',
                    requires: ['ExtFrame.view.main.correct.correctActivity.CorrectActivityController'],
                    controller: 'correctActivityController'
                }
            }).show();
            var correctActivityWindow = Ext.getCmp("correctActivityWindowId");
            correctActivityWindow.down('#correctActivityForm').getForm().loadRecord(selectRecords[0]);
            correctActivityWindow.store.getProxy().extraParams = {
                'id': selectRecords[0].data.id
            };
            correctActivityWindow.store.reload();
        }
    }
});