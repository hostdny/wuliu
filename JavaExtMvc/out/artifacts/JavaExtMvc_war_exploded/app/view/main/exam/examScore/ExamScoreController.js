/**
 * Created by Jia on 2016/8/18.
 */
Ext.define('ExtFrame.view.main.exam.examScore.ExamScoreController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.examScoreController',
    onSelectName: function () {
        var panel = this.getView();
        var examScoreGrid = panel.down("#examScoreGrid");
        var name = panel.down("#name").getValue();
        var typeOfWork = panel.down("#typeOfWork");
        typeOfWork.setValue("");
        typeOfWork.store.getProxy().extraParams = {
            'batchId': name
        };
        //重新加载grid
        typeOfWork.store.reload();
        examScoreGrid.store.getProxy().extraParams = {
            'batchId': name,
            sessionId: ""
        };
        //重新加载grid
        examScoreGrid.store.reload();

    },
    onSelectExamType: function () {
        var panel = this.getView();
        var examScoreGrid = panel.down("#examScoreGrid");
        var name = panel.down("#name").getValue();
        var typeOfWork = panel.down("#typeOfWork");
        var typeOfWorkValue = typeOfWork.getValue();
        examScoreGrid.store.getProxy().extraParams = {
            'batchId': name,
            sessionId: typeOfWorkValue
        };
        //重新加载grid
        examScoreGrid.store.reload();
    },
    onClickButtonExport: function () {
        var panel = this.getView();
        var batchId = panel.down("#name").getValue();
        var sessionId = panel.down("#typeOfWork").getValue();
            if ((batchId != null && batchId != "") && (sessionId ==null || sessionId =="")) {
                var url = '/jasperjsp/ToReport.jsp?fid=7&type=excel&batchId=' + batchId;
                window.open(url);
            } else if((batchId != "" && batchId != null) && (sessionId !=null && sessionId !="")){
                var url = '/jasperjsp/ToReport.jsp?fid=8&type=excel&sessionId=' + sessionId;
                window.open(url);
            }else if(batchId == null || batchId==""){
                return;
            }
        }
});