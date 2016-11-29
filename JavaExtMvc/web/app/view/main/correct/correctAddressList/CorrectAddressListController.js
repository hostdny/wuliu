/**
 * Created by wangBin on 2016/7/28.
 */
Ext.define('ExtFrame.view.main.correct.correctAddressList.CorrectAddressListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.correctAddressListController',

    onClickButtonLook: function () {
    },
    onClickButtonAdd: function () {
        var panel = this.getView();
        var correctAddressListWindow = panel.down("#correctAddressListWindow");
        var correctAddressListForm = panel.down("#correctAddressListForm");
        correctAddressListWindow.down('form').getForm().reset();
        correctAddressListForm.down("#nameAndMid").enable();
        correctAddressListWindow.expand();
    },
    onClickButtonEdit: function () {
        var panel = this.getView();
        var correctAddressListGrid = panel.down("#correctAddressListGrid");
        var correctAddressListWindow = panel.down("#correctAddressListWindow");
        var correctAddressListForm = panel.down("#correctAddressListForm");
        var selectRecords = correctAddressListGrid.getSelection();//获取grid选中行records
        correctAddressListWindow.down('form').getForm().reset();//表单清空
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            correctAddressListWindow.expand();
            correctAddressListWindow.down('form').getForm().loadRecord(selectRecords[0]);
            var nameAndMid = selectRecords[0].data.correctName + selectRecords[0].data.mid;
            correctAddressListForm.down("#nameAndMid").setValue(nameAndMid);
            correctAddressListForm.down("#nameAndMid").setDisabled(true);
        }
    },
    onClickButtonSave: function () {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/correctLinker/save.do';
        var panel = this.getView();
        var correctAddressListWindow = panel.down("#correctAddressListWindow");
        var correctAddressListGrid = panel.down("#correctAddressListGrid");
        var form = panel.down('#correctAddressListForm');
        if (form.isValid()) {
            var record = correctAddressListWindow.getViewModel().getData().rec;
            if(record.stateTime != "" || record.stateTime != null){
                record.stateTime = record.stateTime.toString().split("T")[0];
            }
            if(record.endTime != "" || record.endTime != null){
                record.endTime = record.endTime.toString().split("T")[0];
            }
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        if(record.id){
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                        }else{
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0005, '4000', '1', null);
                        }
                        form.reset();
                        correctAddressListWindow.getViewModel().getData().rec = null;
                        correctAddressListGrid.store.reload();
                        correctAddressListWindow.collapse();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            }
        }else {
            Ext.MessageBox.alert('提示', '请先填写数据！');
        }
    },
    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/correctLinker/delete.do';
        var panel = this.getView();
        var correctAddressListGrid = panel.down("#correctAddressListGrid");
        var selectRows = correctAddressListGrid.selModel.selected.items;//获取grid选中行
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
                            correctAddressListGrid.store.reload();
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
        var correctAddressListWindow = panel.down("#correctAddressListWindow");
        var correctAddressListForm = panel.down("#correctAddressListForm");
        correctAddressListForm.getForm().reset();
        correctAddressListWindow.collapse();

    },
    onSelectCombo: function (combo, record, index) {
        var ActionSelect = Tools.Method.getAPiRootPath() + '/correctLinker/getByMid.do';
        var panel = this.getView();
        var correctAddressListWindow = panel.down("#correctAddressListWindow");
        var correctAddressListForm = panel.down("#correctAddressListForm");
        var correctName = record.data.userCName;
        var correctSex = record.data.userSex;
        var personNum = record.data.userCode;
        var telephone = record.data.telephone;
        var mid = record.data.userCard;
        var data = {mid:mid};
        Tools.Method.ExtAjaxRequestEncap(ActionSelect, 'GET', data, true, function (jsonData) {
            if (jsonData.resultCode == "1") {
                Tools.Method.ShowTipsMsg("该人员已存在", '4000', '2', null);
                correctAddressListForm.down("#correctName").setValue("");
                correctAddressListForm.down("#correctSex").setValue("");
                correctAddressListForm.down("#personNum").setValue("");
                correctAddressListForm.down("#telephone").setValue("");
                correctAddressListForm.down("#mid").setValue("");
            } else {
                correctAddressListForm.down("#correctName").setValue(correctName);
                if(correctSex == 0){
                    correctAddressListForm.down("#correctSex").setValue("男");
                }else if(correctSex == 1){
                    correctAddressListForm.down("#correctSex").setValue("女");
                }
                correctAddressListForm.down("#personNum").setValue(personNum);
                correctAddressListForm.down("#telephone").setValue(telephone);
                correctAddressListForm.down("#mid").setValue(mid);
            }
        });
    }
});