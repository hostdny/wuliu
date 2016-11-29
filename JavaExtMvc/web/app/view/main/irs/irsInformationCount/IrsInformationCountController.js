/**
 * Created by Administrator on 2016/7/20.
 */
Ext.define('ExtFrame.view.main.irs.irsInformationCount.IrsInformationCountController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.irsInformationCountController',
    onClickButtonSearch: function () {
        Tools.GridSearchToolbar.SearchEncap(this);
    }
});