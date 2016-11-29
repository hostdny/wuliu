/**
 * Created by LvXL on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.correct.correctCount.CorrectCountController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.correctCountController',

    onClickClear: function () {
        var panel = Ext.getCmp("correctCountManagerId");
        var correctCountGrid = panel.down("#correctCountGrid");
        panel.down("#startTime").setValue("");
        panel.down("#endTime").setValue("");
        correctCountGrid.store.getProxy().extraParams = {
            'startTime':"",
            'endTime':""
        };
        correctCountGrid.store.reload();
    }
});