/**
 * Created by zzw on 2016/9/24.
 */
Ext.define('ExtFrame.view.main.lawyerAcceptManage.lawyerAccept.LawyerAcceptController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.lawyerAcceptController',

    onClickButtonLook: function () {
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var view = this.getView();
        var pnGrid = view.down('#' + view.ename + 'Grid');
        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            var returnFlag = true;
            $.each(selectRecords, function (index, row) {
                if(row.data.lawyerState != '0'){
                    Ext.MessageBox.alert('提示', '仅有未审批的信息能查看！');
                    returnFlag = false;
                    return false;
                }
            });
            if(!returnFlag){
                return;
            }
            var window = view.down('#' + view.ename + 'Window');
            var downLoadGrid = window.down('#downLoadGrid');
            var form = window.down('form');
            form.getForm().reset();//表单清空
            window.expand();
            form.getForm().loadRecord(selectRecords[0]);
            form.down("#lawyerState").setValue("");
            downLoadGrid.store.getProxy().extraParams = {
                businessData:selectRecords[0].data.id
            };
            //重新加载grid
            downLoadGrid.store.reload();
        }
    },

    onClickButtonCheck: function () {
        var ActionCheck = Tools.Method.getAPiRootPath() + '/lawyerAccept/updateState.do';
        var panel = this.getView();
        var lawyerAcceptGrid = panel.down("#lawyerAcceptGrid");
        var selectRows = lawyerAcceptGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var returnFlag = true;
            var oId = '';
            $.each(selectRows, function (index, row) {
                if(row.data.lawyerState != "0"){
                    Ext.MessageBox.alert('提示', '仅有未审批的信息能审核！');
                    returnFlag = false;
                    return false;
                }else{
                    oId += row.data.id+ ',';
                }
            });
            if(!returnFlag){
                return;
            }
            var data = {
                oId: oId,
                lawyerState:"1"
            };
            Ext.MessageBox.confirm('提醒', '确定要审核通过？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionCheck, 'GET', data, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                            lawyerAcceptGrid.store.reload();
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    },
    onClickButtonBack: function () {
        var ActionCheck = Tools.Method.getAPiRootPath() + '/lawyerAccept/updateState.do';
        var panel = this.getView();
        var lawyerAcceptGrid = panel.down("#lawyerAcceptGrid");
        var selectRows = lawyerAcceptGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var returnFlag = true;
            var oId = '';
            $.each(selectRows, function (index, row) {
                if(row.data.lawyerState != "0"){
                    Ext.MessageBox.alert('提示', '仅有未审批的信息能审核！');
                    returnFlag = false;
                    return false;
                }else{
                    oId += row.data.id+ ',';
                }
            });
            if(!returnFlag){
                return;
            }
            var data = {
                oId: oId,
                lawyerState:"2"
            };
            Ext.MessageBox.confirm('提醒', '确定要审核回退？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionCheck, 'GET', data, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                            lawyerAcceptGrid.store.reload();
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
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var view = this.getView();
        var form = view.down('#' + view.ename + 'Form');
        var record = view.getViewModel().getData().rec;
        if (form.isValid()) {
            var Grid = view.ownerCt.down('#' + view.ename + 'Grid');
            var lawyerState = form.down('#lawyerState').getValue();
            var reservationRemark = form.down('#reservationRemark').getValue();
            var reservationAddress = form.down('#reservationAddress').getValue();
            var reservationTime = form.down('#reservationTime').getValue();
            var reason = form.down('#reason').getValue();
            if(lawyerState=='1'){
                if(reservationAddress=='' || reservationTime==null){
                    Ext.MessageBox.alert('提示', '请检查预约时间、预约地点是否填写！');
                    return;
                }
            }
             if(lawyerState=='2'&& reason==''){
                Ext.MessageBox.alert('提示', '请先填写拒绝理由！');
                return;
            }
            if (record) {
                Ext.getBody().mask("请稍等，正在保存中...","x-mask-loading");
                Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/lawyerAccept/save.do', 'POST', record, true, function (jsonData) {
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

});