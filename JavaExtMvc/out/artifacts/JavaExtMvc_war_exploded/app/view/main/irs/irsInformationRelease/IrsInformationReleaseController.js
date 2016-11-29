/**
 * Created by LvXL on 2016/7/14.
 */
Ext.define('ExtFrame.view.main.irs.irsInformationRelease.IrsInformationReleaseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.irsInformationReleaseController',

    onClickButtonLook: function () {
        // 附件列表
        var attGrid = Ext.getCmp("irsInformationAttachmentGrid");
        var view = this.getView();
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        var window = view.down('#' + view.ename + 'Window');
        window.down('form').getForm().reset();//表单清空
        // 编辑器
        var UEditContext = Ext.getCmp('infoContentContext');
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            //window.expand();
            window.down('form').getForm().loadRecord(selectRecords[0]);
            UEditContext.setValue(selectRecords[0].data.infoContent);
            // 刷新附件列表
            attGrid.store.getProxy().extraParams ={
                'businessData': selectRecords[0].data.id
            }
            attGrid.store.reload();
            // 按钮
            var button = Ext.getCmp("irsInformationReleaseForm_button");
            button.setDisabled(true);// 禁用
            var toolbar = Ext.getCmp("irsInformationAttachmentGrid_toolbar");
            toolbar.setDisabled(true);// 禁用
            //setTimeout(function(){
            //    UEditContext.setValue(selectRecords[0].data.infoContent);
            //}, 1000);
            window.show();
        }
    },

    onClickButtonAdd: function(){
        if(!Tools.Method.IsLogin){
            return;
        }
        var win = this.getView().down('window');
        win.down('form').getForm().reset();
        // 附件列表
        var attGrid = Ext.getCmp("irsInformationAttachmentGrid");
        attGrid.store.getProxy().extraParams ={
            'businessData': "",
            'attIds': ""
        }
        attGrid.store.reload();
        // 按钮
        var button = Ext.getCmp("irsInformationReleaseForm_button");
        button.enable();// 启用
        var toolbar = Ext.getCmp("irsInformationAttachmentGrid_toolbar");
        toolbar.enable();// 启用

        win.show();
    },

    onClickButtonEdit: function () {
        // 按钮
        var button = Ext.getCmp("irsInformationReleaseForm_button");
        button.enable();// 启用
        var toolbar = Ext.getCmp("irsInformationAttachmentGrid_toolbar");
        toolbar.enable();// 启用
        // 附件列表
        var attGrid = Ext.getCmp("irsInformationAttachmentGrid");
        var view = this.getView();
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        var window = view.down('window');
        //var window = view.down('#' + view.ename + 'Window');
        window.down('form').getForm().reset();//表单清空
        // 编辑器
        var UEditContext = Ext.getCmp('infoContentContext');
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            //window.expand();
            window.down('form').getForm().loadRecord(selectRecords[0]);
            // 刷新附件列表
            attGrid.store.getProxy().extraParams ={
                'businessData': selectRecords[0].data.id
            }
            attGrid.store.reload();
            setTimeout(function(){
                UEditContext.setValue(selectRecords[0].data.infoContent);
            }, 1000);
            window.show();
        }

    },

    onClickButtonSave: function (btn) {
        // 附件列表
        var attGrid = Ext.getCmp("irsInformationAttachmentGrid");
        var attIds = "";
        var grid = Ext.getCmp("irsInformationAttachmentGrid");
        var allRows = grid.getStore().data.items;
        $.each(allRows, function (index, row) {
            attIds += row.data.id + ',';
        });

        var ActionSave = Tools.Method.getAPiRootPath() + '/irsInformation/save.do';
        var view = this.getView();
        var win = Ext.getCmp('irsInformationReleaseWindow');
        var form = Ext.getCmp('irsInformationReleaseForm');
        if (form.isValid()) {
            var record = form.getViewModel().getData().rec;
            var pnGrid = Ext.getCmp('irsInformationReleaseGrid');
            // 编辑器
            var UEditContext = Ext.getCmp('infoContentContext').getValue();
            var infoId = form.down('#hfOID').getValue();
            if(record==null){
                record={
                    id:infoId
                };
            }else{
                record.id=infoId
            }

            record.infoContent = UEditContext;
            // 附件ids
            record.attachmentIds = attIds;
            // 设备
            record.equipmentIds = form.down('#equipmentIds').getValue();
            record.equipmentNames = form.down('#equipmentNames').getValue();
            record.equipmentFlag = form.down('#equipmentFlag').getValue();

            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionSave, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        form.getForm().reset();
                        view.getViewModel().getData().rec = null;
                        pnGrid.store.reload();
                        //win.collapse();
                        // 刷新附件列表
                        attGrid.store.getProxy().extraParams ={
                            'businessData': ""
                        }
                        attGrid.store.reload();
                        // 关闭window
                        //win.collapse();
                        //var win = btn.up('window');
                        win.close();
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    },

    /*
     onClickButtonLook: function () {
     // 附件列表
     var attGrid = Ext.getCmp("irsInformationAttachmentGrid");
     var view = this.getView();
     var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
     var selectRecords = pnGrid.getSelection();//获取grid选中行records
     var window = view.down('#' + view.ename + 'Window');
     window.down('form').getForm().reset();//表单清空
     // 编辑器
     var UEditContext = Ext.getCmp('infoContentContext');
     //仅能选择一项数据
     if (Tools.Method.IsEditData(selectRecords)) {
     //window.expand();
     window.down('form').getForm().loadRecord(selectRecords[0]);
     UEditContext.setValue(selectRecords[0].data.infoContent);
     // 刷新附件列表
     attGrid.store.getProxy().extraParams ={
     'businessData': selectRecords[0].data.id
     }
     attGrid.store.reload();
     // 按钮
     var button = Ext.getCmp("irsInformationReleaseForm_button");
     button.setDisabled(true);// 禁用
     var toolbar = Ext.getCmp("irsInformationAttachmentGrid_toolbar");
     toolbar.setDisabled(true);// 禁用
     //setTimeout(function(){
     //    UEditContext.setValue(selectRecords[0].data.infoContent);
     //}, 1000);
     }
     },
    onClickButtonAdd: function () {
        var view = this.getView();
        view.down('#' + view.ename + 'Window').down('form').getForm().reset();
        //view.down('#' + view.ename + 'Window').expand();
        // 附件列表
        var attGrid = Ext.getCmp("irsInformationAttachmentGrid");
        attGrid.store.getProxy().extraParams ={
            'businessData': "",
            'attIds': ""
        }
        attGrid.store.reload();
        // 按钮
        var button = Ext.getCmp("irsInformationReleaseForm_button");
        button.enable();// 启用
        var toolbar = Ext.getCmp("irsInformationAttachmentGrid_toolbar");
        toolbar.enable();// 启用
    },
    onClickButtonEdit: function () {
        // 按钮
        var button = Ext.getCmp("irsInformationReleaseForm_button");
        button.enable();// 启用
        var toolbar = Ext.getCmp("irsInformationAttachmentGrid_toolbar");
        toolbar.enable();// 启用
        // 附件列表
        var attGrid = Ext.getCmp("irsInformationAttachmentGrid");
        var view = this.getView();
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        var window = view.down('#' + view.ename + 'Window');
        window.down('form').getForm().reset();//表单清空
        // 编辑器
        var UEditContext = Ext.getCmp('infoContentContext');
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            //window.expand();
            window.down('form').getForm().loadRecord(selectRecords[0]);
            // 刷新附件列表
            attGrid.store.getProxy().extraParams ={
                'businessData': selectRecords[0].data.id
            }
            attGrid.store.reload();
            setTimeout(function(){
                UEditContext.setValue(selectRecords[0].data.infoContent);
            }, 1000);
        }
    },

    onClickButtonSave: function () {
        // 附件列表
        var attGrid = Ext.getCmp("irsInformationAttachmentGrid");
        var attIds = "";
        var grid = Ext.getCmp("irsInformationAttachmentGrid");
        var allRows = grid.getStore().data.items;
        $.each(allRows, function (index, row) {
            attIds += row.data.id + ',';
        });

        var ActionSave = Tools.Method.getAPiRootPath() + '/irsInformation/save.do';
        var view = this.getView();
        var win = Ext.getCmp('irsInformationReleaseWindow');
        var form = Ext.getCmp('irsInformationReleaseForm');
        if (form.isValid()) {
            var record = form.getViewModel().getData().rec;
            var pnGrid = Ext.getCmp('irsInformationReleaseGrid');
            // 编辑器
            var UEditContext = Ext.getCmp('infoContentContext').getValue();
            record.infoContent = UEditContext;
            // 附件ids
            record.attachmentIds = attIds;
            // 设备
            record.equipmentIds = form.down('#equipmentIds').getValue();
            record.equipmentNames = form.down('#equipmentNames').getValue();
            record.equipmentFlag = form.down('#equipmentFlag').getValue();

            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionSave, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        form.getForm().reset();
                        view.getViewModel().getData().rec = null;
                        pnGrid.store.reload();
                        //win.collapse();
                        // 刷新附件列表
                        attGrid.store.getProxy().extraParams ={
                            'businessData': ""
                        }
                        attGrid.store.reload();
                        // 关闭window
                        //win.collapse();
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    },*/
    onClickButtonDel: function () {
        Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath() + '/irsInformation/delete.do');
    },
    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchEncap(this);
    },
    onClickAddSearch: function () {
        Tools.GridSearchToolbar.ClickAddSearch(this);
    },
    onClickClear: function () {
        Tools.GridSearchToolbar.ClickClear(this);
    },
    onClickButtonCloseWindow: function(){
        var win = Ext.getCmp('irsInformationReleaseWindow');
        win.collapse();
    },
    onClickSelectEquipment: function () {

        // 点击选择设备
        Ext.create('Ext.Window', {
            width: Ext.getBody().getWidth() / 3,
            height: Ext.getBody().getHeight() / 2,
            plain: true,
            layout: 'fit',
            autoShow: true,
            closable: false,
            items:{
                xtype: 'irsInfoReleaseEquipmentGrid',
                itemId: 'irsInfoReleaseEquipmentGrid',
                requires: ['ExtFrame.view.main.irs.irsInformationRelease.IrsInformationReleaseController'],
                controller: 'irsInformationReleaseController'
            }
        }).show();
    },
    onClickEquipmentSelect: function () {
        var selectRows = this.getView().getView().getSelection();
        var equipmentIds = '';
        var equipmentNames = '';
        if (Tools.Method.IsDelData(selectRows)) {
            $.each(selectRows, function (index, row) {
                equipmentIds += row.data.id + ',';
                equipmentNames += row.data.name + ',';
            });
            var form = Ext.getCmp('irsInformationReleaseForm');
            form.down('#equipmentIds').setValue(equipmentIds);
            form.down('#equipmentNames').setValue(equipmentNames);
            form.down('#equipmentFlag').setValue("1");// 指定设备
            this.getView().up("window").close();
        }
    },
    onClickEquipmentAll: function () {
        var form = Ext.getCmp('irsInformationReleaseForm');
        form.down('#equipmentNames').setValue("所有设备");
        form.down('#equipmentFlag').setValue("0");// 所有设备
        this.getView().up("window").close();
    },
    onClickEquipmentClose: function () {
        this.getView().up("window").close();
    },
    onClickUploadFile: function () {
        // 附件隐藏值
        var attIds = Ext.getCmp("irsInformationReleaseForm_attachmentIds");
        var grid = Ext.getCmp("irsInformationAttachmentGrid");
        var stores = grid.getStore().data.items;
        var ids = "";
        if(stores != null && stores.length > 0){
            $.each(stores, function (index, row) {
                ids += row.data.id + ',';
            });
        }
        var win = Ext.create('ExtFrame.view.extEncap.FileUpload', {
            uploadURL: '/attachment/uploadFile.do?businessModel=0&businessType=0',
            frontFlag: '1',
            returnFun: function(data){
                if(data != null){
                    $.each(data, function (index, row) {
                        var frontFlag = row.frontFlag;
                        if(frontFlag == '1'){
                            var result = $.parseJSON(row.result);
                            ids += result.resultData + ',';
                        }
                    });
                }
                attIds.setValue(ids);
                // 刷新grid
                grid.store.getProxy().extraParams ={
                    'attIds': ids
                }
                grid.store.reload();
            }
        }).show();
    },
    onClickButtonDisable: function(){
        // 禁用
        var ActionDisable = Tools.Method.getAPiRootPath() + '/irsInformation/operation.do';
        var view = this.getView();//获取当前grid控件
        var pnGrid = view.down('#' + view.ename + 'Grid');
        var selectRows = pnGrid.getSelectionModel().getSelection();//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var ids = '';
            $.each(selectRows, function (index, row) {
                ids += row.data.id + ',';
            });
            var data = {ids: ids, status: '1'};
            //用户确认禁用操作-----点击“是”
            Ext.MessageBox.confirm('提醒', '确定要禁用选中信息？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionDisable, 'POST', data, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                            pnGrid.store.reload();
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    },
    onClickButtonEnable: function(){
        // 启用
        var ActionDisable = Tools.Method.getAPiRootPath() + '/irsInformation/operation.do';
        var view = this.getView();//获取当前grid控件
        var pnGrid = view.down('#' + view.ename + 'Grid');
        var selectRows = pnGrid.getSelectionModel().getSelection();//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var ids = '';
            $.each(selectRows, function (index, row) {
                ids += row.data.id + ',';
            });
            var data = {ids: ids, status: '0'};
            //用户确认禁用操作-----点击“是”
            Ext.MessageBox.confirm('提醒', '确定要启用选中信息？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionDisable, 'POST', data, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                            pnGrid.store.reload();
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