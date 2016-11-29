/**
 * Created by wangBin on 2016/7/14.
 */
Ext.define('ExtFrame.view.main.caseTrackingManage.caseTracking.CaseTrackingTimeLine',{
        extend: 'Ext.panel.Panel',
        itemId: 'caseTrackingTimeLine',
        id:'timeLine',
        alias: 'widget.caseTrackingTimeLine',
        fit: true,
        html:'<iframe id="timeLineShow" width="100%" height="100%" src="/app/view/main/caseTrackingManage/caseTracking/timeLine.html?caseId='+''+'"><iframe/>'

});