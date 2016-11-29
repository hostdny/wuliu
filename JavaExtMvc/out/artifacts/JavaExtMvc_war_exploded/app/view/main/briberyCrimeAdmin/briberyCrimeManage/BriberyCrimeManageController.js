/**
 * Created by wangBin on 2016/9/21.
 */
Ext.define('ExtFrame.view.main.briberyCrimeAdmin.briberyCrimeManage.BriberyCrimeManageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.briberyCrimeManageController',

    onClickButtonEdit: function () {
        var view = this.getView();
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        var win = view.down('window');
        var form = win.down('form');
        form.getForm().reset();
        if(Tools.Method.IsEditData(selectRecords)){
            var content = form.down('#content');
            form.down('#hiddenContent').setValue(selectRecords[0].data.content);
            setTimeout(function () {
                if (content.getValue() != null) {
                    var old = win.down('#hiddenContent').getValue();
                    win.down('#hiddenContent').setValue("");
                    win.down('#hiddenContent').setValue(old);
                }
            }, 1000);
            form.getForm().loadRecord(selectRecords[0]);
            win.show();
        }
    },
    onClickButtonSave: function (btn) {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/briberyCrimeManage/save.do';
        var view = this.getView();
        var win = view.up("panel").down('#' + view.ename + 'Window');
        var form = win.down('form');
        if (form.isValid()) {
            var record = view.getViewModel().getData().rec;
            if (win.down('#content').getValue() != "") {
                record.content = win.down('#content').getValue();
            }
            record.id = form.down('#hfOID').getValue();
            var pnGrid = view.up("panel").down('#' + view.ename + 'Grid');
            if (record) {
                //var content = form.down("#contentId").rawValue;
                //record.siteName=siteName;
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        view.down('#briberyCrimeManageForm').getForm().reset();
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
    cancel: function (btn) {
        var win = btn.up('window');
        win.close();
    }
});