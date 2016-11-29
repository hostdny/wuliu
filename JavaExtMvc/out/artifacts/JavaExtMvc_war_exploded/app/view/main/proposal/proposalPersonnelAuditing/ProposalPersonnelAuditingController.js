/**
 * Created by wangBin on 2016/9/28.
 */
Ext.define('ExtFrame.view.main.proposal.proposalPersonnelAuditing.ProposalPersonnelAuditingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.proposalPersonnelAuditingController',

    onClickButtonLook: function () {
        var panel = this.getView();
        var proposalPersonnelAuditingGrid = panel.down("#proposalPersonnelAuditingGrid");
        var proposalPersonnelAuditingWindow = panel.down("#proposalPersonnelAuditingWindow");
        var proposalPersonnelAuditingForm = panel.down("#proposalPersonnelAuditingForm");
        var selectRecords = proposalPersonnelAuditingGrid.getSelection();//获取grid选中行records
        proposalPersonnelAuditingForm.getForm().reset();//表单清空
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            proposalPersonnelAuditingWindow.expand();
            proposalPersonnelAuditingForm.getForm().loadRecord(selectRecords[0]);
            var official = proposalPersonnelAuditingForm.down("#official");
            var userSex = proposalPersonnelAuditingForm.down("#userSex");
            if(official.getValue() == "0"){
                official.setValue("人大代表");
            }else{
                official.setValue("政协委员");
            }
            if(userSex.getValue() == "0"){
                userSex.setValue("男");
            }else{
                userSex.setValue("女");
            }

        }
    },
    onClickButtonSave: function () {
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var panel = this.getView();
        var ActionEdit = Tools.Method.getAPiRootPath() + '/commonUser/save.do';
        var proposalPersonnelAuditingGrid = panel.down("#proposalPersonnelAuditingGrid");
        var proposalPersonnelAuditingWindow = panel.down("#proposalPersonnelAuditingWindow");
        var proposalPersonnelAuditingForm = proposalPersonnelAuditingWindow.down("#proposalPersonnelAuditingForm");
        var status = proposalPersonnelAuditingForm.down("#status").getValue();
        var hfOID = proposalPersonnelAuditingForm.down("#hfOID").getValue();
        var record = {
            id:hfOID,
            status:status
        };
        if (proposalPersonnelAuditingForm.isValid()) {
                Ext.getBody().mask("请稍等，正在保存中...","x-mask-loading");
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData) {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                        proposalPersonnelAuditingGrid.store.reload();
                        proposalPersonnelAuditingWindow.collapse();
                        Ext.getBody().unmask();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
        }else {
            Ext.MessageBox.alert('提示', '请先填写数据！');
        }
    },
    onClickClear: function () {
        var panel = this.getView();
        var proposalPersonnelAuditingWindow = panel.down("#proposalPersonnelAuditingWindow");
        var proposalPersonnelAuditingForm = panel.down("#proposalPersonnelAuditingForm");
        proposalPersonnelAuditingForm.getForm().reset();
        proposalPersonnelAuditingWindow.collapse();
    }
});