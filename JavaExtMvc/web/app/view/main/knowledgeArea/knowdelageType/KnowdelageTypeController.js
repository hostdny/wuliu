/**
 * Created by Jia on 2016/8/30.
 */
Ext.define('ExtFrame.view.main.knowledgeArea.knowdelageType.KnowdelageTypeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.knowdelageTypeController',


    onClickButtonAdd: function () {
        var view = this.getView();
        var win = view.up("panel").down('#' + view.ename + 'Window');
        var form = win.down('#' + view.ename + 'Form');
        form.down("#parentName").show();
        form.getForm().reset();
        view.down('#knowdelageTypeWindow').expand();
    },

    onClickButtonEdit: function () {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/knowdelageType/loadKnowdelageType.do';
        var view = this.getView();
        var win = view.up("panel").down('#' + view.ename + 'Window');
        var form = win.down('#' + view.ename + 'Form');
        form.down("#parentName").hide();
        form.getForm().reset();
        var knowdelageTypeGrid = view.down("#knowdelageTypeGrid");
        var selectRows = knowdelageTypeGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsEditData(selectRows)) {
            var knowdelageTypeTree = view.down('#knowdelageTypeTree');
            var data = {typeId: selectRows[0].data.id};
            Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'GET', data, true, function (jsonData) {
                if (jsonData) {
                    var dict = jsonData.dictListist;
                    var org = jsonData.orgList;
                    var dictIds = [];
                    var orgIds = [];
                    for(var i = 0;i<dict.length;i++){
                        dictIds.push(dict[i].dictValue);
                    }
                    for(var i = 0;i<org.length;i++){
                        orgIds.push(org[i].id);
                    }
                    form.getForm().loadRecord(selectRows[0]);
                    var parentOid = selectRows[0].data.parentOid;
                    form.down("#parentOid").setValue(parentOid);
                    form.down("#dictName").setValue(dictIds);
                    form.down("#orgName").setValue(orgIds);
                    win.expand();
                } else {
                    Ext.MessageBox.alert('提示', '数据不对！');
                }
            });
        }
    },

    onClickButtonSave: function () {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/knowdelageType/save.do';
        var view = this.getView();
        var win = view.up("panel").down('#' + view.ename + 'Window');
        var form = win.down('#' + view.ename + 'Form');
        if (form.isValid()) {
            var record = view.getViewModel().getData().rec;
            var pnGrid = view.up("panel").down('#' + view.ename + 'Grid');
            var knowdelageTypeTree = view.up("panel").down('#knowdelageTypeTree');
            var parentName = form.down("#parentName");
            var parentOid = form.down("#parentOid").getValue();
            var dictName = win.down("#dictName").getValue();
            var orgName = win.down("#orgName").getValue();
            var dictNames = "";
            var orgNames = "";
            for (var i = 0; i < dictName.length; i++) {
                dictNames += dictName[i] + ","
            }
            for (var i = 0; i < orgName.length; i++) {
                orgNames += orgName[i] + ","
            }
            record.zws = dictNames;
            record.kws = orgNames;
            record.parentOid = parentOid;
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        view.down('#' + view.ename + 'Form').getForm().reset();
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                        parentName.store.reload();
                        knowdelageTypeTree.store.reload();
                        pnGrid.store.reload();
                        view.up("panel").down('#' + view.ename + 'Window').collapse();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            }
        }else {
            Ext.MessageBox.alert('提示', '请先填写数据！');
        }
    },

    onClickButtonDel: function () {
        var JudgeBeforeDel = Tools.Method.getAPiRootPath() + '/knowdelageType/judgeBeforeDel.do';
        var ActionDelete = Tools.Method.getAPiRootPath() + '/knowdelageType/delete.do';
        var panel = this.getView();
        var knowdelageTypeGrid = panel.up("panel").down('#knowdelageTypeGrid');
        var knowdelageTypeTree = panel.up("panel").down('#knowdelageTypeTree');
        var selectRows = knowdelageTypeGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var id = '';
            $.each(selectRows, function (index, row) {
                id += row.data.id;
            });
            var dataDelete = {ids: id};
            var dataSelect = {typeId: id};
            Tools.Method.ExtAjaxRequestEncap(JudgeBeforeDel, 'GET', dataSelect, true, function (jsonData) {
                if (jsonData.resultCode == "0") {
                    Ext.MessageBox.confirm('提醒', '该分类下存在关联文档确定要删除选中行？', function (btn) {
                        if (btn == 'yes') {
                            Tools.Method.ExtAjaxRequestEncap(ActionDelete, 'POST', dataDelete, true, function (jsonData) {
                                if (jsonData.resultCode == "1") {
                                    knowdelageTypeTree.store.reload();
                                    knowdelageTypeGrid.store.reload();
                                    Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG0020), '4000', '1', null);
                                }else{
                                    Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                                }
                            });
                        }
                    });
                }else{
                    Tools.Method.ExtAjaxRequestEncap(ActionDelete, 'POST', dataDelete, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            knowdelageTypeTree.store.reload();
                            knowdelageTypeGrid.store.reload();
                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG0020), '4000', '1', null);
                        }else{
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });

        }
    },

    onSelectTree: function (me, record, eOpts) {
        var panel = this.getView();
        var knowdelageTypeGrid = panel.down('#knowdelageTypeGrid');
        var knowdelageTypeTree = panel.down('#knowdelageTypeTree');
        var knowdelageTypeWindow = panel.down('#knowdelageTypeWindow');
        var parentOid = record.data.id;
        var oId = record.data.addMark;
        //带附加参数重构grid store数据
        knowdelageTypeGrid.store.getProxy().extraParams = {
            'addMark': oId
        };
        //重新加载grid
        knowdelageTypeGrid.store.reload();
    },
    onSelectTreepicker: function (ppp, record, eOpts) {
        var knowdelageTypeWindow = this.getView();
        var parentOid = knowdelageTypeWindow.down('#parentOid');
        parentOid.setValue(record.data.id);
    }
});