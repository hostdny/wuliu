/**
 * Created by zzw on 2016/8/3.
 */
Ext.define('ExtFrame.view.main.satisfaction.evaluationOverall.EvaluationOverallController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.evaluationOverallController',

    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchEncap(this);
    },
    onClickAddSearch: function () {
        Tools.GridSearchToolbar.ClickAddSearch(this);
    },
    onClickClear: function () {
        Tools.GridSearchToolbar.ClickClear(this);
    }
});