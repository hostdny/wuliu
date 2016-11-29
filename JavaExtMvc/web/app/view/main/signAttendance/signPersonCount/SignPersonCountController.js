/**
 * Created by zzw on 2016/11/2.
 */
Ext.define('ExtFrame.view.main.signAttendance.signPersonCount.SignPersonCountController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.signPersonCountController',

    onClickClear: function () {
        var panel = Ext.getCmp("signPersonCountId");
        var signPersonCountGrid = panel.down("#signPersonCountGrid");
        panel.down("#startTime").setValue("");
        panel.down("#endTime").setValue("");
        signPersonCountGrid.store.getProxy().extraParams = {
            'startTime':"",
            'endTime':""
        };
        signPersonCountGrid.store.reload();
    }
});