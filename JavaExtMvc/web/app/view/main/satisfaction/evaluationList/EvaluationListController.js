/**
 * Created by zzw on 2016/8/3.
 */
Ext.define('ExtFrame.view.main.satisfaction.evaluationList.EvaluationListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.evaluationListController',

    open: function () {
        if (!Tools.Method.IsLogin())
            return;
        var view = this.getView();

        var pnGrid = view.down('#' + view.ename + 'Grid');

        var selectRecords = pnGrid.getSelection();
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {

            var window = view.down('#' + view.ename + 'Window');
            var form = window.down('form');
            form.getForm().reset();//表单清空
            window.expand();
            form.getForm().loadRecord(selectRecords[0]);
        }
    },


    onClickButtonDel: function () {
        Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath() + '/evaluation/delete.do');
    },

    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchEncap(this);
    },
    onClickAddSearch: function () {
        Tools.GridSearchToolbar.ClickAddSearch(this);
    },
    onClickClear: function () {
        Tools.GridSearchToolbar.ClickClear(this);
    },
    onClickButtonLook: function () {
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var view = this.getView();

        var pnGrid = view.down('#' + view.ename + 'Grid');

        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {

            var window = view.down('#' + view.ename + 'Window');
            var form = window.down('form');
            form.getForm().reset();//表单清空
            window.expand();
            form.getForm().loadRecord(selectRecords[0]);
        }
    }
});