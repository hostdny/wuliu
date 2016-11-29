/**
 * Created by wangBin on 2016/8/1.
 */
Ext.define('ExtFrame.view.main.weeklyFood.menu.MenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menuController',

    onClickButtonLook: function () {
    },
    onClickButtonAdd: function () {
        var panel = this.getView();
        var menuWindow = panel.down("#menuWindow");
        menuWindow.down('form').getForm().reset();
        menuWindow.expand();
    },
    onClickButtonEdit: function () {
        var panel = this.getView();
        var menuGrid = panel.down("#menuGrid");
        var menuWindow = panel.down("#menuWindow");
        var menuForm = panel.down("#menuForm");
        var selectRecords = menuGrid.getSelection();//获取grid选中行records
        menuForm.down('form').getForm().reset();//表单清空
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            menuWindow.expand();
            menuWindow.down('form').getForm().loadRecord(selectRecords[0]);
        }
    },
    onClickButtonSave: function () {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/foodsDict/save.do';
        // 获取页面附件id
        var upload = document.getElementById('menuUploadId').contentWindow;
        var attachmentIds = upload.document.getElementById("attachmentIds").value;
        var panel = Ext.getCmp('menuManagerId');
        var menuWindow = panel.down("#menuWindow");
        var form = menuWindow.down("#menuForm");
        var menuGrid = panel.down("#menuGrid");
        if (form.isValid()) {
            var record = form.getViewModel().getData().rec;
            // 附件ids
            record.attachmentIds = attachmentIds;
            Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                if (jsonData.resultCode == "1") {
                    if(record.id){
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                    }else{
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0005, '4000', '1', null);
                    }
                    form.reset();
                    form.getViewModel().getData().rec = null;
                    menuGrid.store.reload();
                    menuWindow.collapse();
                } else {
                    Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                }
            });
        }else {
            Ext.MessageBox.alert('提示', '请先填写数据！');
        }
    },
    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/foodsDict/delete.do';
        var panel = this.getView();
        var menuGrid = panel.down("#menuGrid");
        var selectRows = menuGrid.selModel.selected.items;//获取grid选中行
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
                            menuGrid.store.reload();
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
        var panel = Ext.getCmp('menuManagerId');
        var menuGrid = panel.down("#menuGrid");
        var dishesName = menuGrid.down("#dishesName").getValue();
        menuGrid.store.getProxy().extraParams = {
            'swhere': "foodName|String|"+dishesName
        };
        menuGrid.store.reload();

    },
    onClickAddSearch: function () {
    },
    onClickClear: function () {
        var panel = this.getView();
        var menuWindow = panel.down("#menuWindow");
        var menuForm = panel.down("#menuForm");
        menuForm.getForm().reset();
        menuWindow.collapse();
    }
});