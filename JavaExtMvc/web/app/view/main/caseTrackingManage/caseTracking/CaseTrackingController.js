/**
 * Created by wangBin on 2016/7/14.
 */
Ext.define('ExtFrame.view.main.caseTrackingManage.caseTracking.CaseTrackingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.caseTrackingController',

    onClickButtonLook: function () {
        var caseTrackingGrid = Ext.getCmp("caseTrackingGridId");
        var selectRecords = caseTrackingGrid.getSelection();//获取grid选中行records
        if (Tools.Method.IsEditData(selectRecords)) {
            var caseId = selectRecords[0].data.id;
            Ext.create('Ext.Window', {
                width: Ext.getBody().getWidth()*0.9,
                height: Ext.getBody().getHeight()*0.9,
                plain: true,
                layout: 'fit',
                modal: true,
                closeAction: 'destroy',
                title: '案件信息',
                autoShow: true,
                closable: true,
                listeners: {
                    beforeclose: function (panel, eOpts ) {
                        var caseTrackingGrid = Ext.getCmp("caseTrackingGridId");
                        caseTrackingGrid.store.reload();
                    }
                },
                items: {
                    xtype: 'caseTrackingTimeLine',
                    itemId: 'caseTrackingTimeLine',
                    requires: ['ExtFrame.view.main.caseTrackingManage.caseTracking.CaseTrackingTimeLine'],
                    controller: 'caseTrackingController'
                }
            }).show();
            var timeLine = Ext.getCmp("timeLine").body;
            timeLine.update('<iframe id="timeLineShow" width="100%" height="100%" src="/app/view/main/caseTrackingManage/caseTracking/timeLine.html?caseId='+caseId+'"><iframe/>');
        }
    },
    onClickClear: function () {
        var caseTrackingGrid = Ext.getCmp("caseTrackingGridId");
        caseTrackingGrid.store.getProxy().extraParams = {
            'delFlag': 0
        };
        //重新加载grid
        caseTrackingGrid.store.reload();
        caseTrackingGrid.down("#caseType").setValue("");

    }
});