/**
 * Created by wangBin on 2016/11/4.
 */
Ext.define('ExtFrame.view.main.caseTrackingManage.casePerson.CasePersonController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.casePersonController',

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
            title: '案件人员关系录入',
            autoShow: true,
            closable: true,
            items: {
                xtype: 'casePersonWindow',
                itemId: 'casePersonWindow',
                requires: ['ExtFrame.view.main.caseTrackingManage.casePerson.CasePersonController'],
                controller: 'casePersonController'
            }
        }).show();
        var casePersonWindow = Ext.getCmp("casePersonWindowId");
        casePersonWindow.down('form').reset();
    },

    onClickButtonSave: function () {
        if (!Tools.Method.IsLogin) {
            return;
        }
        var ActionSave = Tools.Method.getAPiRootPath() + '/casePersonRela/save.do';
        var casePersonManager = Ext.getCmp("casePersonManagerId");
        var casePersonWindow = Ext.getCmp("casePersonWindowId");
        var casePersonGrid = casePersonManager.down("#casePersonGrid");
        var form = casePersonWindow.down("#casePersonForm");
        var personTeamId = form.down("#personTeamId");
        if (form.isValid()) {
            var record = casePersonWindow.getViewModel().getData().rec;
            if(personTeamId.getRawValue() == ""){
                record.personTeamId = "";
            }

            if(record.personCaseRela == 2){
                if(record.personTeamId == ""){
                    Ext.MessageBox.alert('提示', '请选择人员所属部门！');
                    return;
                }else if(record.personName == ""){
                    Ext.MessageBox.alert('提示', '请选择人员名称！');
                    return;
                }
            }else{
                if(record.personName == "") {
                    Ext.MessageBox.alert('提示', '请填写人员名称！');
                    return;
                }
                record.personUsername = record.personTelephone;
            }
            record.caseName = casePersonWindow.down("#caseId").getRawValue();
            Tools.Method.ExtAjaxRequestEncap(ActionSave, 'POST', record, true, function (jsonData) {
                if (jsonData) {
                    casePersonGrid.store.reload();
                    form.getForm().reset();
                    casePersonWindow.up().close();
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
        var ActionDelete = Tools.Method.getAPiRootPath() + '/casePersonRela/delete.do';
        var panel = this.getView();
        var casePersonGrid = panel.down("#casePersonGrid");
        var selectRecords = casePersonGrid.getSelection();//获取grid选中行records
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
                            casePersonGrid.store.reload();
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
        var casePersonWindow = this.getView();
        casePersonWindow.down('form').reset();
        casePersonWindow.up().close();
    }
});