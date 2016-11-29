/**
 * Created by zzw on 2016/8/2.
 */
Ext.define('ExtFrame.view.main.satisfaction.policeList.PoliceListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.policeListController',

    onClickButtonAdd: function () {
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var view = this.getView();
        view.down('#' + view.ename + 'Window').down('form').getForm().reset();
        view.down('#' + view.ename + 'Window').expand();
    },
        onClickButtonDel: function () {
            var ActionDelete = Tools.Method.getAPiRootPath() + '/police/deletePolice.do';
            var panel = this.getView();
            var policeListGrid = panel.down("policeListGrid");
            var selectRows = policeListGrid.selModel.selected.items;//获取grid选中行
            //至少选择一项数据
            if (Tools.Method.IsDelData(selectRows)) {
                var ids = '';
                $.each(selectRows, function (index, row) {
                    ids += row.data.id + ',';
                });

                var data = {ids: ids};
                //用户确认删除操作-----点击“是”
                Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
                    if (btn == 'yes') {
                        Tools.Method.ExtAjaxRequestEncap(ActionDelete, 'POST', data, true, function (jsonData) {
                            if (jsonData) {
                                Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG0020), '4000', '1', null);
                                policeListGrid.store.reload();
                            }
                            else {
                                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                            }
                        });
                    }
                });
            }
        },
    onClickButtonSave: function () {

        var ActionEdit = Tools.Method.getAPiRootPath() + '/police/savePoliceMessage.do';
        var view = this.getView();
        var win = view.up("panel").down('#' + view.ename + 'Window');
        var form = win.down('#' + view.ename + 'Form');
        if (form.isValid()) {
            var record = view.getViewModel().getData().rec;
            var pnGrid = view.up("panel").down('#' + view.ename + 'Grid');
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        view.down('#' + view.ename + 'Form').getForm().reset();
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                        pnGrid.store.reload();
                        view.up("panel").down('#' + view.ename + 'Window').collapse();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    }
});