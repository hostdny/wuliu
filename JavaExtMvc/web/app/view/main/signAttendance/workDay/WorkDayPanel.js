/**
 * Created by zzw on 2016/11/7.
 */
Ext.define('ExtFrame.view.main.signAttendance.workDay.WorkDayPanel', {
    extend: 'Ext.panel.Panel',
    itemId: 'workDayPanel',
    id: 'workDayPanel',
    alias: 'widget.workDayPanel',
    fit: true,
    html: '<iframe id="workDayPanel" width=1000 height=650  src="/app/view/main/signAttendance/workDay/index.html"><iframe/>'

});