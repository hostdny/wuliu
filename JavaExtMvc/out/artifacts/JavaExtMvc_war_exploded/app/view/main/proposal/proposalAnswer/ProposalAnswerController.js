/**
 * Created by wangBin on 2016/9/29.
 */
Ext.define('ExtFrame.view.main.proposal.proposalAnswer.ProposalAnswerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.proposalAnswerController',

    onClickButtonLook: function () {
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var panel = this.getView();
        var proposalAnswerGrid = panel.down("#proposalAnswerGrid");
        var proposalAnswerWindow = panel.down("#proposalAnswerWindow");
        var proposalAnswerForm = proposalAnswerWindow.down("#proposalAnswerForm");
        var downLoadGrid = proposalAnswerWindow.down("#downLoadGrid");
        var selectRecords = proposalAnswerGrid.getSelection();//获取grid选中行records
        proposalAnswerForm.getForm().reset();//表单清空
        if (Tools.Method.IsEditData(selectRecords)) {
            proposalAnswerWindow.expand();
            proposalAnswerForm.getForm().loadRecord(selectRecords[0]);
            downLoadGrid.store.getProxy().extraParams = {
                "businessData": selectRecords[0].data.id
            };
            //重新加载grid
            downLoadGrid.store.reload();
        }
    },
    onClickButtonSave: function () {
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var panel = this.getView();
        var ActionEdit = Tools.Method.getAPiRootPath() + '/proposal/save.do';
        var proposalAnswerGrid = panel.down("#proposalAnswerGrid");
        var proposalAnswerWindow = panel.down("#proposalAnswerWindow");
        var proposalAnswerForm = proposalAnswerWindow.down("#proposalAnswerForm");
        var record = proposalAnswerWindow.getViewModel().getData().rec;
        if (proposalAnswerForm.isValid()) {
                Ext.getBody().mask("请稍等，正在保存中...","x-mask-loading");
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData) {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                        proposalAnswerGrid.store.reload();
                        proposalAnswerWindow.collapse();
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
    },
    onClickClear: function () {
        var panel = this.getView();
        var proposalAnswerWindow = panel.down("#proposalAnswerWindow");
        var proposalAnswerForm = panel.down("#proposalAnswerForm");
        proposalAnswerForm.getForm().reset();
        proposalAnswerWindow.collapse();
    }
});