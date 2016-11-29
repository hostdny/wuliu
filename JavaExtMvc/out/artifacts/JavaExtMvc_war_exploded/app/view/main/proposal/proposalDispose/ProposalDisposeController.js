/**
 * Created by wangBin on 2016/9/29.
 */
Ext.define('ExtFrame.view.main.proposal.proposalDispose.ProposalDisposeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.proposalDisposeController',

    onClickButtonLook: function () {
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var panel = this.getView();
        var proposalDisposeGrid = panel.down("#proposalDisposeGrid");
        var proposalDisposeWindow = panel.down("#proposalDisposeWindow");
        var proposalDisposeForm = proposalDisposeWindow.down("#proposalDisposeForm");
        var selectRecords = proposalDisposeGrid.getSelection();//获取grid选中行records
        proposalDisposeForm.getForm().reset();//表单清空
        if (Tools.Method.IsEditData(selectRecords)) {
            proposalDisposeForm.getForm().loadRecord(selectRecords[0]);
            proposalDisposeWindow.expand();
        }
    },
    onClickButtonSave: function () {
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var panel = this.getView();
        var ActionEdit = Tools.Method.getAPiRootPath() + '/proposal/save.do';
        var proposalDisposeGrid = panel.down("#proposalDisposeGrid");
        var proposalDisposeWindow = panel.down("#proposalDisposeWindow");
        var proposalDisposeForm = proposalDisposeWindow.down("#proposalDisposeForm");
        var record = proposalDisposeWindow.getViewModel().getData().rec;
        record.personName = proposalDisposeForm.down("#personId").getRawValue();
        record.departmentName = proposalDisposeForm.down("#departmentId").getRawValue();;
        if (proposalDisposeForm.isValid()) {
                Ext.getBody().mask("请稍等，正在保存中...","x-mask-loading");
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData) {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                        proposalDisposeGrid.store.reload();
                        proposalDisposeWindow.collapse();
                        Ext.getBody().unmask();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
        }else {
            Ext.MessageBox.alert('提示', '请先填写数据！');
        }
    },
    onClickSelect: function (me, record, eOpts) {
        var unitId = record.data.id
        var personGrid = me.up("form").down("#personId");
        personGrid.store.getProxy().extraParams = {
            "unitId": unitId
        };
        //重新加载grid
        personGrid.store.reload();
        personGrid.setValue("");
    },
    onClickClear: function () {
        var panel = this.getView();
        var proposalDisposeWindow = panel.down("#proposalDisposeWindow");
        var proposalDisposeForm = panel.down("#proposalDisposeForm");
        proposalDisposeForm.getForm().reset();
        proposalDisposeWindow.collapse();
    }
});