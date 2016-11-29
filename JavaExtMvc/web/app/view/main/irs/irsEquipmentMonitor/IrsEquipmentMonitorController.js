/**
 * Created by zzw on 2016/7/18.
 */
Ext.define('ExtFrame.view.main.irs.irsEquipmentMonitor.IrsEquipmentMonitorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.irsEquipmentMonitorController',
    //点击刷新按钮
    onClickButtonRefresh: function (){
        var panel=this.getView();
        var irsEquipmentMonitorGrid = panel.down('irsEquipmentMonitorGrid');
        irsEquipmentMonitorGrid.store.reload();
    }
});
