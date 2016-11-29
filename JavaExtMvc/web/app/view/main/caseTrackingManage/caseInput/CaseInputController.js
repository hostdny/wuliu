/**
 * Created by wangBin on 2016/11/2.
 */
Ext.define('ExtFrame.view.main.caseTrackingManage.caseInput.CaseInputController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.caseInputController',

    onClickButtonAdd: function () {
        if (!Tools.Method.IsLogin) {
            return;
        }
        Ext.create('Ext.Window', {
            width: 950,
            height: 550,
            plain: true,
            layout: 'fit',
            modal: true,
            closeAction: 'destroy',
            title: '案件信息录入',
            autoShow: true,
            closable: true,
            items: {
                xtype: 'caseInputWindow',
                itemId: 'caseInputWindow',
                requires: ['ExtFrame.view.main.caseTrackingManage.caseInput.CaseInputController'],
                controller: 'caseInputController'
            }
        }).show();
        var caseInputWindow = Ext.getCmp("caseInputWindowId");
        caseInputWindow.down('form').reset();
    },

    onClickButtonEdit: function () {
        if (!Tools.Method.IsLogin) {
            return;
        }
        var caseInputManager = Ext.getCmp("caseInputManagerId");
        var caseInputGrid = caseInputManager.down("#caseInputGrid");
        var selectRecords = caseInputGrid.getSelection();//获取grid选中行records
        if (Tools.Method.IsEditData(selectRecords)) {
            Ext.create('Ext.Window', {
                width: 950,
                height: 550,
                plain: true,
                layout: 'fit',
                modal: true,
                closeAction: 'destroy',
                title: '案件信息录入',
                autoShow: true,
                closable: true,
                items: {
                    xtype: 'caseInputWindow',
                    itemId: 'caseInputWindow',
                    requires: ['ExtFrame.view.main.caseTrackingManage.caseInput.CaseInputController'],
                    controller: 'caseInputController'
                }
            }).show();
            var caseInputWindow = Ext.getCmp("caseInputWindowId");
            var caseInputForm = caseInputWindow.down("#caseInputForm");
            var caseType = caseInputWindow.down("#caseType");
            var caseLineId = caseInputWindow.down("#caseLineId");
            var undertakingPersonId = caseInputWindow.down("#undertakingPersonId");
            var caseTypeValue = selectRecords[0].data.caseType;
            caseLineId.store.getProxy().extraParams = {
                'caseType': caseTypeValue
            };
            caseLineId.store.reload();

            var undertakingDepartmentId = selectRecords[0].data.undertakingDepartmentId;
            undertakingPersonId.store.getProxy().extraParams = {
                'deptId': undertakingDepartmentId
            };
            undertakingPersonId.store.reload();

            caseInputForm.getForm().loadRecord(selectRecords[0]);
        }
    },

    onClickButtonSave: function () {
        if (!Tools.Method.IsLogin) {
            return;
        }
        var ActionSave = Tools.Method.getAPiRootPath() + '/caseInfo/save.do';
        var caseInputManager = Ext.getCmp("caseInputManagerId");
        var caseInputWindow = Ext.getCmp("caseInputWindowId");
        var caseInputGrid = caseInputManager.down("#caseInputGrid");
        var form = caseInputWindow.down("#caseInputForm");
        if (form.isValid()) {
            var record = caseInputWindow.getViewModel().getData().rec;
            record.undertakingPersonId = form.down("#undertakingPersonId").getValue();
            record.undertakingPerson = form.down("#undertakingPersonId").getRawValue();
            record.undertakingDepartmentId = form.down("#undertakingDepartmentId").getValue();
            record.undertakingDepartment = form.down("#undertakingDepartmentId").getRawValue();
            Tools.Method.ExtAjaxRequestEncap(ActionSave, 'POST', record, true, function (jsonData) {
                if (jsonData) {
                    caseInputGrid.store.reload();
                    form.getForm().reset();
                    caseInputWindow.up().close();
                }
            });
        }else{
            Ext.MessageBox.alert('提示', '请填写必填数据！');
        }
    },

    onClickButtonDel: function () {
        if (!Tools.Method.IsLogin) {
            return;
        }
        var ActionDelete = Tools.Method.getAPiRootPath() + '/caseInfo/delete.do';
        var panel = this.getView();
        var caseInputGrid = panel.down("#caseInputGrid");
        var selectRecords = caseInputGrid.getSelection();//获取grid选中行records
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRecords)) {
            var ids = '';
            $.each(selectRecords, function (index, row) {
                ids += row.data.id + ',';
            });

            var data = {ids: ids};
            //用户确认删除操作-----点击“是”
            Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionDelete, 'POST', data, true, function (jsonData) {
                        if (jsonData) {
                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG00141, [jsonData.sCount, jsonData.fCount]), '4000', '1', null);
                            caseInputGrid.store.reload();
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    },

    onClickClose: function () {
        if (!Tools.Method.IsLogin) {
            return;
        }
        var caseInputWindow = this.getView();
        caseInputWindow.down('form').reset();
        caseInputWindow.up().close();
    },
    onClickFlowSheetClose: function () {
        if (!Tools.Method.IsLogin) {
            return;
        }
        var caseInputFlowSheet = this.getView();
        caseInputFlowSheet.up().close();
    },
    onClickShow: function () {
        if (!Tools.Method.IsLogin) {
            return;
        }
        var caseInputWindow = Ext.getCmp("caseInputWindowId");
        var caseLineId = caseInputWindow.down("#caseLineId").getValue();
        if(caseLineId != null && caseLineId != ""){
            Ext.create('Ext.Window', {
                width: 900,
                height: 200,
                plain: true,
                layout: 'fit',
                modal: true,
                closeAction: 'destroy',
                title: '案件流程',
                autoShow: true,
                closable: true,
                items: {
                    xtype: 'caseInputFlowSheet',
                    itemId: 'caseInputFlowSheet',
                    requires: ['ExtFrame.view.main.caseTrackingManage.caseInput.CaseInputController'],
                    controller: 'caseInputController'
                }
            }).show();
            var caseInputFlowSheet = Ext.getCmp("caseInputFlowSheetId");
            caseInputFlowSheet.store.getProxy().extraParams = {
                configId:caseLineId
            };
            caseInputFlowSheet.store.reload();
        }else{
            Ext.MessageBox.alert('提示', '请选择一条所属流程！');
        }

    }
});