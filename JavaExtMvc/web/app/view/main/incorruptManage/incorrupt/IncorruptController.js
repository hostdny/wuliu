/**
 * Created by Administrator on 2016/8/1.
 */
Ext.define('ExtFrame.view.main.incorruptManage.incorrupt.IncorruptController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.incorruptController',

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
            var downLoadGrid = window.down('#downLoadAttachmentGrid');
            var form = window.down('form');
            form.getForm().reset();//表单清空
            window.expand();
            form.getForm().loadRecord(selectRecords[0]);
            downLoadGrid.store.getProxy().extraParams = {
                'swhere': "businessData|String|"+selectRecords[0].data.id
            };
            //重新加载grid
            downLoadGrid.store.reload();
        }
    }
});