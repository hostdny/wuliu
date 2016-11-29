/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.car.carMessage.CarMessageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.carMessageController',

    onClickButtonLook: function () {
    },
    onClickButtonAdd: function () {
        var panel = this.getView();
        var carMessageWindow = panel.down("#carMessageWindow");
        carMessageWindow.down('form').getForm().reset();
        carMessageWindow.expand();
    },
    onClickButtonEdit: function () {
        var panel = this.getView();
        var carMessageGrid = panel.down("#carMessageGrid");
        var carMessageWindow = panel.down("#carMessageWindow");
        var selectRecords = carMessageGrid.getSelection();//获取grid选中行records
        carMessageWindow.down('form').getForm().reset();//表单清空
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            carMessageWindow.expand();
            carMessageWindow.down('form').getForm().loadRecord(selectRecords[0]);
        }
    },
    onClickButtonSave: function () {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/carMessage/save.do';
        var panel = this.getView();
        var carMessageWindow = panel.down("#carMessageWindow");
        var carMessageGrid = panel.down("#carMessageGrid");
        var form = panel.down('#carMessageForm');
        if (form.isValid()) {
            var record = carMessageWindow.getViewModel().getData().rec;
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        if(record.id){
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                        }else{
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0005, '4000', '1', null);
                        }
                        form.reset();
                        carMessageWindow.getViewModel().getData().rec = null;
                        carMessageGrid.store.reload();
                        carMessageWindow.collapse();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    },
    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/carMessage/delete.do';
        var panel = this.getView();
        var carMessageGrid = panel.down("#carMessageGrid");
        var selectRows = carMessageGrid.selModel.selected.items;//获取grid选中行
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
                            carMessageGrid.store.reload();
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    },
    onClickSearch: function () {
    },
    onClickAddSearch: function () {
    },
    onClickClear: function () {
        var panel = this.getView();
        var carMessageWindow = panel.down("#carMessageWindow");
        carMessageWindow.collapse();
    }
});