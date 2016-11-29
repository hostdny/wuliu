/**
 * Created by wangBin on 2016/9/21.
 */
Ext.define('ExtFrame.view.main.eBookManage.eBook.EBookController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eBookController',

    onClickButtonAdd: function () {
        var panel = this.getView();
        var eBookUpload = panel.down("#eBookUpload");
        var eBookForm = panel.down("#eBookForm");
        eBookUpload.show();
        eBookForm.hide();
    },
    onClickButtonEdit: function () {
        var panel = this.getView();
        var eBookUpload = panel.down("#eBookUpload");
        var eBookForm = panel.down("#eBookForm");
        eBookUpload.hide();
        eBookForm.show();
        var eBookGrid = panel.down("#eBookGrid");
        var selectRows = eBookGrid.selModel.selected.items;
        if (Tools.Method.IsEditData(selectRows)) {
            eBookForm.getForm().loadRecord(selectRows[0]);
        }
    },
    onClickButtonSave: function () {
        var ActionSave = Tools.Method.getAPiRootPath() + '/ebook/save.do';
        var panel = this.getView().up("panel");
        var eBookForm = panel.down("#eBookForm");
        var eBookGrid = panel.down("#eBookGrid");
        if (eBookForm.isValid()) {
            var record = eBookForm.getViewModel().getData().rec;
            record.bookClassification = eBookForm.down("#classificationId").getRawValue();
            debugger;
            Tools.Method.ExtAjaxRequestEncap(ActionSave, 'POST', record, true, function (jsonData) {
                if (jsonData.resultCode == "1") {
                    if(record.id){
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                    }else{
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0005, '4000', '1', null);
                    }
                    eBookForm.reset();
                    eBookForm.getViewModel().getData().rec = null;
                    eBookGrid.store.reload();
                } else {
                    Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                }
            });
        }else {
            Ext.MessageBox.alert('提示', '请先填写数据！');
        }
    },
    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/ebook/delete.do';
        var panel = this.getView();
        var eBookGrid = panel.down("#eBookGrid");
        var selectRows = eBookGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var ids = '';
            $.each(selectRows, function (index, row) {
                ids += row.data.id + ',';
            });
            var data = {ids: ids};
            //用户确认删除操作-----点击“是”
            Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionDelete, 'POST', data, true, function (jsonData) {
                        if (jsonData) {
                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG00141, [jsonData.sCount, jsonData.fCount]), '4000', '1', null);
                            eBookGrid.store.reload();
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    }
});