/**
 * Created by wangBin on 2016/8/2.
 */
Ext.define('ExtFrame.view.main.weeklyFood.weeklyMenu.WeeklyMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.weeklyMenuController',

    onClickButtonLook: function () {
    },
    onClickButtonAdd: function () {
        var panel = this.getView();
        var weeklyMenuWindow = panel.down("#weeklyMenuWindow");
        var weeklyMenuForm = weeklyMenuWindow.down("#weeklyMenuForm");
        var weeklyMenuGrid = panel.down("#weeklyMenuGrid");
        var weekStartTime = weeklyMenuGrid.down("#weekStartTime").getRawValue();
        if(weekStartTime != ""){
            var weeklyMenuWindowGrid = weeklyMenuWindow.down("#weeklyMenuWindowGrid");
            weeklyMenuWindowGrid.store.getProxy().extraParams = {
                'id': '-1'
            };
            weeklyMenuWindowGrid.store.reload();
            weeklyMenuWindow.down('form').getForm().reset();
            weeklyMenuWindow.expand();
        }else{
            Ext.MessageBox.alert('提示', '请输入周开始时间！');
        }
    },
    onClickButtonEdit: function () {
        var panel = this.getView();
        var weeklyMenuWindow = panel.down("#weeklyMenuWindow");
        var weeklyMenuForm = weeklyMenuWindow.down("#weeklyMenuForm");
        var weeklyMenuWindowGrid = weeklyMenuWindow.down("#weeklyMenuWindowGrid");
        var weeklyMenuGrid = panel.down("#weeklyMenuGrid");
        var selectRows = weeklyMenuGrid.getSelection();
        if (Tools.Method.IsEditData(selectRows)) {
            var id = selectRows[0].data.id;
            weeklyMenuWindow.down('form').getForm().reset();
            weeklyMenuWindow.expand();
            weeklyMenuForm.down("#hfOID").setValue(id);
            weeklyMenuWindowGrid.store.getProxy().extraParams = {
                'id': id
            };
            weeklyMenuWindowGrid.store.reload();
        }
    },
    onClickButtonSave: function () {
        var ActionIsExist = Tools.Method.getAPiRootPath() + '/weekFoodRecord/isExist.do';
        var ActionEdit = Tools.Method.getAPiRootPath() + '/weekFoodRecord/save.do';
        var panel = this.getView();
        var weeklyMenuWindow = panel.down("#weeklyMenuWindow");
        var weeklyMenuForm = weeklyMenuWindow.down("#weeklyMenuForm");
        var weeklyMenuWindowGrid = weeklyMenuWindow.down("#weeklyMenuWindowGrid");
        var weeklyMenuGrid = panel.down("#weeklyMenuGrid");
        var weekStartTime = weeklyMenuGrid.down("#weekStartTime").getRawValue();
        var weeklyMenuGrid = panel.down("#weeklyMenuGrid");
        var id = weeklyMenuForm.down("#hfOID").getValue();
        var data = {
                id:id,
                weekStartTime:weekStartTime
            };
        Tools.Method.ExtAjaxRequestEncap(ActionIsExist, 'GET', data, true, function (jsonData) {
            if (jsonData.resultCode == "1") {
                var items = new Array();
                var item= weeklyMenuWindowGrid.getStore().data.items;
                var foodIdString = "";
                for(var i=0;i<item.length;i++){
                    delete item[i].data["pid"];
                    var foodId = item[i].data["foodId"];
                    if(!Ext.isString(foodId)){
                        for(var k = 0;k<foodId.length;k++){
                            if(k == 0){
                                foodIdString =  foodId[0];
                            }else{
                                foodIdString =  foodIdString +","+foodId[k]
                            }
                        }
                        item[i].data["foodId"] = foodIdString;
                        items.push(item[i].data);
                    }else{
                        items.push(item[i].data);
                    }
                }
                items=JSON.stringify(items);
                var data = {
                    id:id,
                    'detailJson':items,
                    'weekStartTime':weekStartTime
                };
                Ext.getBody().mask("请稍等，正在保存中...","x-mask-loading");
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', data, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                        weeklyMenuWindow.getViewModel().getData().rec = null;
                        weeklyMenuGrid.store.reload();
                        weeklyMenuWindowGrid.store.getProxy().extraParams = {
                            'id': -1
                        };
                        weeklyMenuWindowGrid.store.reload();
                        weeklyMenuForm.getForm().reset();
                        weeklyMenuWindow.collapse();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                    Ext.getBody().unmask();
                });
            } else {
                Tools.Method.ShowTipsMsg("周菜单已存在", '4000', '2', null);//修改失败
            }
        });
    },
    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/weekFoodRecord/deleteAll.do';
        var panel = this.getView();
        var weeklyMenuGrid = panel.down("#weeklyMenuGrid");
        var selectRows = weeklyMenuGrid.selModel.selected.items;//获取grid选中行
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
                            Tools.Method.ShowTipsMsg("删除成功", '4000', '1', null);
                            weeklyMenuGrid.store.reload();
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
        var weeklyMenuWindow = panel.down("#weeklyMenuWindow");
        var weeklyMenuForm = panel.down("#weeklyMenuForm");
        var weeklyMenuWindowGrid = weeklyMenuWindow.down("#weeklyMenuWindowGrid");
        weeklyMenuWindowGrid.store.getProxy().extraParams = {
            'id': -1
        };
        weeklyMenuWindowGrid.store.reload();
        weeklyMenuForm.getForm().reset();
        weeklyMenuWindow.collapse();
    },
    onClickCopy: function () {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/weekFoodRecord/copy.do';
        var panel = this.getView();
        var weeklyMenuGrid = panel.down("#weeklyMenuGrid");
        var weekStartTime = weeklyMenuGrid.down("#weekStartTime").getRawValue();
        var selectRows = weeklyMenuGrid.getSelection();
        if (Tools.Method.IsEditData(selectRows)) {
            if(weekStartTime != ""){
                var data = {
                    id:selectRows[0].data.id,
                    weekStartTime:weekStartTime
                };
                Ext.getBody().mask("请稍等，正在复制中...","x-mask-loading");
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', data, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                        weeklyMenuGrid.store.reload();
                    }
                    else {
                        Tools.Method.ShowTipsMsg(jsonData.resultDesc, '4000', '2', null);//修改失败
                    }
                    Ext.getBody().unmask();
                });
            }else{
                Ext.MessageBox.alert('提示', '请输入周开始时间！');
            }
        }
    },
    onClickWindowAdd: function () {
        var panel = this.getView();
        var weeklyMenuWindow = panel.down("#weeklyMenuWindow");
        var weeklyMenuForm = panel.down("#weeklyMenuForm");
        var weeklyMenuWindowGrid = weeklyMenuWindow.down("#weeklyMenuWindowGrid");
        if(weeklyMenuForm.isValid()){
            var record = weeklyMenuWindow.getViewModel().getData().rec;
            var foodName = weeklyMenuForm.down("#foodId").getRawValue();
            var weekId = weeklyMenuForm.down("#weekId").getValue();
            if(weekId == null){
                Ext.MessageBox.alert('提示', '请选择星期！');
                return;
            }
            var timePoint = weeklyMenuForm.down("#timePoint").getRawValue();
            record.id = "";
            record.weekId = weekId;
            record.foodName = foodName;
            record.timePoint = timePoint;
            weeklyMenuWindowGrid.store.insert(0,record);
            weeklyMenuWindow.getViewModel().getData().rec = null;
            weeklyMenuForm.down("#weekId").setValue("");
            weeklyMenuForm.down("#timePoint").setValue("");
            weeklyMenuForm.down("#foodId").setValue("");
        }else{
            Ext.MessageBox.alert('提示', '请先填写数据！');
        }
    },
    onClickWindowEdit: function () {
        var panel = this.getView();
        var weeklyMenuForm = panel.down("#weeklyMenuForm");
        var weeklyMenuWindow = panel.down("#weeklyMenuWindow");
        var weeklyMenuWindowGrid = weeklyMenuWindow.down("#weeklyMenuWindowGrid");
        weeklyMenuForm.getForm().updateRecord();
        var selectRecords = weeklyMenuWindowGrid.getSelectionModel().getSelection();
        selectRecords[0].set("foodName",weeklyMenuForm.down("#foodId").getRawValue());
        selectRecords[0].set("foodId", weeklyMenuForm.down("#foodId").getValue());
    },
    onClickWindowDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/weekFoodRecord/deleteDetail.do';
        var panel = this.getView();
        var weeklyMenuForm = panel.down("#weeklyMenuForm");
        var weeklyMenuWindowGrid = panel.down("#weeklyMenuWindowGrid");
        var selectRecords = weeklyMenuWindowGrid.getSelectionModel().getSelection();
        if (Tools.Method.IsEditData(selectRecords)) {
            var detailId = selectRecords[0].data.id;
            if(detailId != ""){
                var data = {detailId: detailId};
                Tools.Method.ExtAjaxRequestEncap(ActionDelete, 'POST', data, true, function (jsonData) {
                });
            }
            weeklyMenuWindowGrid.store.remove(selectRecords[0]);
            weeklyMenuForm.down("#weekId").setValue("");
            weeklyMenuForm.down("#timePoint").setValue("");
            weeklyMenuForm.down("#foodId").setValue("");
        }
    },
    onClickWindowSelect: function () {
        var panel = this.getView();
        var weeklyMenuForm = panel.down("#weeklyMenuForm");
        weeklyMenuForm.down("#weekId").setValue("");
        weeklyMenuForm.down("#timePoint").setValue("");
        weeklyMenuForm.down("#foodId").setValue("");
        var weeklyMenuWindowGrid = panel.down("#weeklyMenuWindowGrid");
        var selectRecords = weeklyMenuWindowGrid.getSelectionModel().getSelection();
        var foodIds;
        if(Ext.isString(selectRecords[0].data.foodId)){
            foodIds = selectRecords[0].data.foodId.split(",");
        }else{
            foodIds = selectRecords[0].data.foodId;
        }
        selectRecords[0].data.foodId = foodIds;
        weeklyMenuForm.getForm().loadRecord(selectRecords[0]);
    }
});