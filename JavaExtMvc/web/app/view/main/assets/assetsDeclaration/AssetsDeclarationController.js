/**
 * Created by zzw on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.assets.assetsDeclaration.AssetsDeclarationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.assetsDeclarationController',

    onClickButtonLook: function () {
    },
    onClickButtonAdd: function () {
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var view = this.getView();
        view.down('#' + view.ename + 'Window').down('form').getForm().reset();
        view.down('#' + view.ename + 'Window').expand();
    },
    onClickButtonEdit: function () {
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
    },
    onClickButtonSave: function () {
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var view = this.getView();
        var form = view.down('#' + view.ename + 'Form');
        var record = view.getViewModel().getData().rec;
        if (form.isValid()) {
            var Grid = view.ownerCt.down('#' + view.ename + 'Grid');
            if (record) {
                Ext.getBody().mask("请稍等，正在保存中...","x-mask-loading");
                Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/assentRecord/saveAssent.do', 'POST', record, true, function (jsonData) {
                    if (jsonData) {
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                        Grid.store.reload();
                        view.down('#' + view.ename + 'Window').collapse();
                        Ext.getBody().unmask();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    },
    onClickButtonDel: function () {
        Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath()+'/assentRecord/delete.do');
    },
    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchEncapNoMany(this);
    },
    onClickAddSearch: function () {
        alert("onClickAddSearch");
    },
    onClickClear: function () {
        alert("onClickClear");
    }
});