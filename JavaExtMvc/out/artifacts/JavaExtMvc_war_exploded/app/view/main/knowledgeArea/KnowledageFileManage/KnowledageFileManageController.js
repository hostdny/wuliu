/**
 * Created by zzw on 2016/8/30.
 */
Ext.define('ExtFrame.view.main.knowledgeArea.KnowledageFileManage.KnowledageFileManageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.knowledageFileManageController',

    onSelectTree: function (me, record, eOpts) {
        var view = this.getView();
        var knowledageFileManageGrid = view.down('#knowledageFileManageGrid');
        var pid = record.data.id;
        //带附加参数重构grid store数据
        knowledageFileManageGrid.store.getProxy().extraParams = {
            'pid':pid
        };
        //重新加载grid
        knowledageFileManageGrid.store.reload();
    },
    onClickClear: function () {
        var panel = this.getView();
        var knowledageFileManageGrid = Ext.getCmp('knowledageFileManageGrid');
        var win = Ext.getCmp('knowledageFileManageWindow');
        knowledageFileManageGrid.store.reload();
        win.collapse();
    },
    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/knowledageFile/delete.do';
        var panel = this.getView();
        var knowledageFileManageGrid = Ext.getCmp('knowledageFileManageGrid');
        var selectRows = knowledageFileManageGrid.selModel.selected.items;//获取grid选中行
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
                            knowledageFileManageGrid.store.reload();
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    },
    onClickButtonAdd: function () {
        var view = this.getView();
        var knowledageFileManageTree = view.down('#knowledageFileManageTree');
        var record = knowledageFileManageTree.getSelection();
        if(record.length>0){
            var pid = record[0].data.id;
            var state = record[0].data.state;
            if(state == "0") {
                Ext.MessageBox.alert('提示', '你没有权限访问该类别的内容或该类别被禁用！');
                return;
            }
         //   view.down('#knowledageFileManageWindow').reset();
            view.down('#knowledageFileManageWindow').expand();
            var knowledageFileManageUpload = Ext.getCmp("knowledageFileManageUpload").body;
            knowledageFileManageUpload.update('<iframe id="knowledageFileManageUploadId" width="100%" height="100%" src="/app/view/main/knowledgeArea/KnowledageFileManage/upload.html?pid='+pid+'"><iframe/>');
        }else{
            Ext.MessageBox.alert('提示', '请选择一条类别！');
        }
    },
    onClickButtonCheck: function () {
        var ActionCheck = Tools.Method.getAPiRootPath() + '/knowledageFile/updateFileState.do';
        var panel = this.getView();
        var knowledageFileManageGrid = panel.down("#knowledageFileManageGrid");
        var knowledageFileManageTree = panel.down("#knowledageFileManageTree");
        var selectTree = knowledageFileManageTree.getSelection();
        if (Tools.Method.IsDelData(selectTree)) {
            pid = selectTree[0].data.id;
        }else{
            Ext.MessageBox.alert('提示', '请选择一个类别！');
            return;
        }
        var selectRows = knowledageFileManageGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var returnFlag = true;
            var oId = '';
            $.each(selectRows, function (index, row) {
                if(row.data.fileState != "0"){
                    Ext.MessageBox.alert('提示', '仅有未审批的信息能审核！');
                    returnFlag = false;
                    return false;
                }else{
                    oId += row.data.id;
                }
            });
            if(!returnFlag){
                return;
            }
            var data = {
                oId: oId,
                fileState:"1"
            };
            Ext.MessageBox.confirm('提醒', '确定要审核通过？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionCheck, 'GET', data, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                            knowledageFileManageGrid.store.getProxy().extraParams = {
                                'pid': pid
                            };
                            knowledageFileManageGrid.store.reload();
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
        var ActionCheck = Tools.Method.getAPiRootPath() + '/knowledageFile/updateFileState.do';
        var panel = this.getView();
        var knowledageFileManageGrid = panel.down("#knowledageFileManageGrid");
        var knowledageFileManageTree = panel.down("#knowledageFileManageTree");
        var selectTree = knowledageFileManageTree.getSelection();
        if (Tools.Method.IsDelData(selectTree)) {
            pid = selectTree[0].data.id;
        } else {
            Ext.MessageBox.alert('提示', '请选择一个文件！');
            return;
        }
        var selectRows = knowledageFileManageGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var returnFlag = true;
            var oId = '';
            $.each(selectRows, function (index, row) {
                if (row.data.fileState != "0") {
                    Ext.MessageBox.alert('提示', '仅有未审批的信息能审核！');
                    returnFlag = false;
                    return false;
                } else {
                    oId += row.data.id;
                }
            });
            if (!returnFlag) {
                return;
            }
            var data = {
                oId: oId,
                fileState: "2"
            };
            Ext.MessageBox.confirm('提醒', '确定要审核回退？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionCheck, 'GET', data, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                            knowledageFileManageGrid.store.getProxy().extraParams = {
                                'pid': pid
                            };
                            knowledageFileManageGrid.store.reload();
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    }
});