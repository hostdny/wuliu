/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.car.carCostInput.CarCostInputController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.carCostInputController',

    onClickButtonLook: function () {
    },
    onClickButtonAdd: function () {
        var panel = this.getView();
        var carCostInputWindow = panel.down("#carCostInputWindow");
        carCostInputWindow.down('form').getForm().reset();
        var carCostInputForm = panel.down("#carCostInputForm");
        carCostInputForm.down("#carNum").enable();
        carCostInputWindow.expand();
    },
    onClickButtonEdit: function () {
        var panel = this.getView();
        var carCostInputGrid = panel.down("#carCostInputGrid");
        var carCostInputWindow = panel.down("#carCostInputWindow");
        var carCostInputImg = panel.down("#carCostInputImg");
        var carCostInputForm = panel.down("#carCostInputForm");
        carCostInputForm.down("#carNum").setDisabled(true);
        var selectRecords = carCostInputGrid.getSelection();//获取grid选中行records
        carCostInputForm.down('form').getForm().reset();//表单清空
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            carCostInputWindow.expand();
            carCostInputWindow.down('form').getForm().loadRecord(selectRecords[0]);
            carCostInputImg.storeImageModel.getProxy().extraParams = {
                'businessData': selectRecords[0].data.id
            };
            carCostInputImg.storeImageModel.reload();
        }
    },
    onClickButtonSave: function () {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/carCost/save.do';
        // 获取页面附件id
        var upload = document.getElementById('uploadId').contentWindow;
        var attachmentIds = upload.document.getElementById("attachmentIds").value;
        var panel = Ext.getCmp('carCostInputManagerId');
        var carCostInputWindow = panel.down("#carCostInputWindow");
        var carCostInputForm = carCostInputWindow.down("#carCostInputForm");
        var carCostInputGrid = panel.down("#carCostInputGrid");
        var form = panel.down('#carCostInputForm');
        if (form.isValid()) {
            var record = carCostInputForm.getViewModel().getData().rec;
            // 附件ids
            record.attachmentIds = attachmentIds;
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        if(record.id){
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                        }else{
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0005, '4000', '1', null);
                        }
                        form.reset();
                        carCostInputForm.getViewModel().getData().rec = null;
                        carCostInputGrid.store.reload();
                        carCostInputWindow.collapse();
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
        var ActionDelete = Tools.Method.getAPiRootPath() + '/carCost/delete.do';
        var panel = this.getView();
        var carCostInputGrid = panel.down("#carCostInputGrid");
        var selectRows = carCostInputGrid.selModel.selected.items;//获取grid选中行
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
                            carCostInputGrid.store.reload();
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
        var panel = this.up('panel').up('panel').up('panel');
        var tbGrid = panel.down('#approvalPanelCenter');
        tbGrid.setTitle(nodes[0].data.templateName+"模板编辑");
        var tbGridAddButton = tbGrid.down("#add");
        tbGridAddButton.enable();
        tbGrid.store.getProxy().extraParams = {
            'templateID':nodes[0].data.oid
        };
        tbGrid.store.reload();
    },
    onClickAddSearch: function () {
    },
    onClickClear: function () {
        var panel = Ext.getCmp('carCostInputManagerId');
        var carCostInputWindow = panel.down("#carCostInputWindow");
        var form = panel.down('#carCostInputForm');
        form.reset();
        carCostInputWindow.collapse();
    },
    onClickImgShow: function (dv, nodes) {
        window.open(nodes[0].data.fileUrl);
    }
});