/**
 * Created by Jia on 2016/9/29.
 */
Ext.define('ExtFrame.view.main.proposal.proposalStatistics.ProposalStatisticsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.proposalStatisticsController',


    onClickClear: function () {
        var panel = Ext.getCmp("proposalStatisticsManagerId");
        var proposalStatisticsGrid = panel.down("#proposalStatisticsGrid");
        panel.down("#startTime").setValue("");
        panel.down("#endTime").setValue("");
        proposalStatisticsGrid.store.getProxy().extraParams = {
            'startTime':"",
            'endTime':""
        };
        proposalStatisticsGrid.store.reload();
    },
});