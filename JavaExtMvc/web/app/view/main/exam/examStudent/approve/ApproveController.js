/**
 * Created by wangBin on 2016/8/18.
 */
Ext.define('ExtFrame.view.main.exam.examStudent.approve.ApproveController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.approveController',

    onClickButtonLook: function () {
        var panel = this.getView();
        var approveGrid = panel.down("#approveGrid");
        var approveWindow = panel.down("#approveWindow");
        var selectRecords = approveGrid.getSelection();//获取grid选中行records
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            approveWindow.down('form').getForm().reset();//表单清空
            approveWindow.expand();
            approveWindow.down('form').getForm().loadRecord(selectRecords[0]);
            var photoUrl = selectRecords[0].data.photoUrl;
            var sex = selectRecords[0].data.sex;
            if(sex == "0"){
                approveWindow.down("#sex").setValue("男");
            }else if(sex == "1"){
                approveWindow.down("#sex").setValue("女");
            }
            if(photoUrl != "" && photoUrl != null){
                var photoUrlValue = '<div class="thumb"><img src="'+photoUrl+'" height="200" width="150"></div>';
                approveWindow.down("#photoUrl").setValue(photoUrlValue);
            }
        }
    },
    onClickButtonAdd: function () {
    },
    onClickButtonEdit: function () {
    },
    onClickButtonSave: function () {
    },
    onClickButtonDel: function () {
    },
    onClickButtonBack: function () {
        var ActionCheck = Tools.Method.getAPiRootPath() + '/examStudent/auditingStudentMessage.do';
        var panel = this.getView();
        var approveGrid = panel.down("#approveGrid");
        var approveTree = panel.down("#approveTree");
        var selectTree = approveTree.getSelection();
        var subject = "-1";
        if (Tools.Method.IsDelData(selectTree)) {
            subject = selectTree[0].data.name;
        }else{
            Ext.MessageBox.alert('提示', '请选择一条考试类别！');
            return;
        }
        var selectRows = approveGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var returnFlag = true;
            var ids = '';
            $.each(selectRows, function (index, row) {
                if(row.data.checkFlag != "0"){
                    Ext.MessageBox.alert('提示', '仅有未审批的信息能审核！');
                    returnFlag = false;
                    return false;
                }else{
                    ids += row.data.id + ',';
                }
            });
            if(!returnFlag){
                return;
            }
            var data = {
                ids: ids,
                checkFlag:"2"
            };
            Ext.MessageBox.confirm('提醒', '确定要审核回退？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionCheck, 'POST', data, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                            approveGrid.store.getProxy().extraParams = {
                                'subject': subject
                            };
                            approveGrid.store.reload();
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    },
    onClickButtonCheck: function () {
        var ActionCheck = Tools.Method.getAPiRootPath() + '/examStudent/auditingStudentMessage.do';
        var panel = this.getView();
        var approveGrid = panel.down("#approveGrid");
        var approveTree = panel.down("#approveTree");
        var selectTree = approveTree.getSelection();
        var subject = "-1";
        if (Tools.Method.IsDelData(selectTree)) {
            subject = selectTree[0].data.name;
        }else{
            Ext.MessageBox.alert('提示', '请选择一条考试类别！');
            return;
        }
        var selectRows = approveGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var returnFlag = true;
            var ids = '';
            $.each(selectRows, function (index, row) {
                if(row.data.checkFlag != "0"){
                    Ext.MessageBox.alert('提示', '仅有未审批的信息能审核！');
                    returnFlag = false;
                    return false;
                }else{
                    ids += row.data.id + ',';
                }
            });
            if(!returnFlag){
                return;
            }
            var data = {
                ids: ids,
                checkFlag:"1"
            };
            Ext.MessageBox.confirm('提醒', '确定要审核通过？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionCheck, 'POST', data, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                            approveGrid.store.getProxy().extraParams = {
                                'subject': subject
                            };
                            approveGrid.store.reload();
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    },
    onClickClear: function () {
        var panel = this.getView();
        var approveWindow = panel.down("#approveWindow");
        approveWindow.down('form').getForm().reset();//表单清空
        approveWindow.collapse();

    },
    onSelectTree: function (me, record, eOpts) {
        var panel = this.getView();
        var approveGrid = panel.down('#approveGrid');
        var subject = record.data.name;
        //带附加参数重构grid store数据
        approveGrid.store.getProxy().extraParams = {
            'subject':subject
        };
        //重新加载grid
        approveGrid.store.reload();
    }
});