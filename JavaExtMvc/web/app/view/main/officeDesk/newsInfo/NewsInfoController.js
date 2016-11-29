/**
 * Created by zzw on 2016/9/7.
 */
Ext.define('ExtFrame.view.main.officeDesk.newsInfo.NewsInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.newsInfoController',

    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchEncap(this);
    },
    onClickButtonSave: function () {
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var view = this.getView();
        var form = view.down('#' + view.ename + 'Form');
        var record = view.getViewModel().getData().rec;
        var content = form.down('#content').getValue();
        record.content = view.down('#content').getValue();
        var contentText = content.replace(/<.*?>/ig,"");
        var contentTxt=form.down('#contentTxt').setValue(contentText);
        if (form.isValid()) {
            var Grid = view.ownerCt.down('#' + view.ename + 'Grid');
            if (record) {
                Ext.getBody().mask("请稍等，正在保存中...","x-mask-loading");
                Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/newsInfo/save.do', 'POST', record, true, function (jsonData) {
                    if (jsonData) {
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                        Grid.store.reload();
                        view.up("panel").down('#' + view.ename + 'Window').collapse();
                        Ext.getBody().unmask();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    }
})