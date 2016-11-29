/**
 * Created by wangBin on 2016/11/15.
 */
Ext.define('ExtFrame.view.main.caseTrackingManage.caseBacklog.CaseBacklogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.caseBacklogController',

    onClickRestart: function () {
        if (!Tools.Method.IsLogin) {
            return;
        }
        var ActionSave = Tools.Method.getAPiRootPath() + '/caseInfo/save.do';
        var caseBacklogManager = Ext.getCmp("caseBacklogManagerId");
        var caseBacklogGrid = caseBacklogManager.down("#caseBacklogGrid");

        var selectRecords = caseBacklogGrid.getSelection();//获取grid选中行records
        if (Tools.Method.IsEditData(selectRecords)) {
            var record = {
                id:selectRecords[0].data.id,
                delFlag:0
            };
            Tools.Method.ExtAjaxRequestEncap(ActionSave, 'POST', record, true, function (jsonData) {
                if (jsonData) {
                    caseBacklogGrid.store.reload();
                }
            });
        }
    }
});