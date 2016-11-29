Ext.define('ExtFrame.view.main.jurisdiction.orgModuleManager.OrgModuleManagerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.orgModuleManager',

    onClickButtonSave: function () {
        var treeGrid = this.getView();//获取当前grid控件

        var gridSearchToolbar = treeGrid.getDockedItems('gridsearchtoolbar')[0];//获取gridSearchbar搜索栏
        var orgId = gridSearchToolbar.down('#orgPicker').getValue();//获取搜索字段
        if (orgId == '00000000-0000-0000-0000-000000000000' || orgId == undefined) {
            //未选择组织机构
            Tools.Method.ShowTipsMsg(Tools.Msg.MSG00221, '4000', '3', null);
        } else {
            var checkedModule = new Array(0);
            var selectRecords = treeGrid.getChecked();//treeGrid.getSelection();
            $.each(selectRecords, function (index, rec) {
                checkedModule.push(rec.get('oid'));

            })
            $.each(treeGrid.store.getData().items, function (index, Module) {
                $.each(Module.data.toolbarBtns, function (i, action) {
                    if (action.checked)
                        checkedModule.push(action.oid);
                });
                $.each(Module.data.operationBtns, function (i, action) {
                    if (action.checked)
                        checkedModule.push(action.oid);
                });
                $.each(Module.data.pageBtns, function (i, action) {
                    if (action.checked)
                        checkedModule.push(action.oid);
                });
                $.each(Module.data.actions, function (i, action) {
                    if (action.checked)
                        checkedModule.push(action.oid);
                });
            });
            if (checkedModule.length == 0) {
                //未选择任何权限给出提示，确定是否提交操作
                Ext.MessageBox.confirm('提醒', '确定要删除所选组织机构的所有权限吗？', function (btn) {
                    if (btn == 'yes') {

                        var data = { 'orgId': orgId, 'moduleIds': checkedModule};
                        //alert(Ext.encode(data));
                        Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/baseModuleInfo/updateRelaModuleOrg.do', 'POST', data, true, function (jsonData) {
                            if (jsonData) {
                                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                                ExtBtns = {};
                            }
                            else {
                                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                            }
                        });
                    }
                });
            } else {
                Ext.MessageBox.confirm('提醒', '确定要修改所选组织机构的权限吗？', function (btn) {
                    if (btn == 'yes') {
                        var data = { 'orgId': orgId, 'moduleIds': checkedModule};
                        //alert(Ext.encode(data));
                        Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/baseModuleInfo/updateRelaModuleOrg.do', 'POST', data, true, function (jsonData) {
                            if (jsonData) {
                                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                                ExtBtns = {};
                            }
                            else {
                                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                            }
                        });
                    }
                });
            }
        }
    },
    checkChange: function (node, checked, eOpts) {
        if (checked) {
            $.each(node.raw.toolbarBtns, function (index, toolbarBtn) {
                $('#' + toolbarBtn.oid).attr("checked", "checked");
                $('#' + toolbarBtn.oid).prop("checked", "checked");
                toolbarBtn.checked = true;
            });
            $.each(node.raw.operationBtns, function (index, operationBtn) {
                $('#' + operationBtn.oid).attr("checked", "checked");
                $('#' + operationBtn.oid).prop("checked", "checked");
                operationBtn.checked = true;
            });
            $.each(node.raw.pageBtns, function (index, pageBtn) {
                $('#' + pageBtn.oid).attr("checked", "checked");
                $('#' + pageBtn.oid).prop("checked", "checked");
                pageBtn.checked = true;
            });
            $.each(node.raw.actions, function (index, action) {
                $('#' + action.oid).attr("checked", "checked");
                $('#' + action.oid).prop("checked", "checked");
                action.checked = true;
            });
        } else {
            $.each(node.raw.toolbarBtns, function (index, toolbarBtn) {
                $('#' + toolbarBtn.oid).removeAttr("checked");
                toolbarBtn.checked = false;
            });
            $.each(node.raw.operationBtns, function (index, operationBtn) {
                $('#' + operationBtn.oid).removeAttr("checked");
                operationBtn.checked = false;
            });
            $.each(node.raw.pageBtns, function (index, pageBtn) {
                $('#' + pageBtn.oid).removeAttr("checked");
                pageBtn.checked = false;
            });
            $.each(node.raw.actions, function (index, action) {
                $('#' + action.oid).removeAttr("checked");
                action.checked = false;
            });
        }
        checkChild(node, checked);
    }
});
function checkChild(node, checked) {
    if (node.hasChildNodes()) {
        node.eachChild(function (child) {
            child.set('checked', checked);
            if (checked) {
                $.each(child.raw.toolbarBtns, function (index, toolbarBtn) {
                    $('#' + toolbarBtn.oid).attr("checked", "checked");
                    $('#' + toolbarBtn.oid).prop("checked", "checked");
                    toolbarBtn.checked = true;
                });
                $.each(child.raw.operationBtns, function (index, operationBtn) {
                    $('#' + operationBtn.oid).attr("checked", "checked");
                    $('#' + operationBtn.oid).prop("checked", "checked");
                    operationBtn.checked = true;
                });
                $.each(child.raw.pageBtns, function (index, pageBtn) {
                    $('#' + pageBtn.oid).attr("checked", "checked");
                    $('#' + pageBtn.oid).prop("checked", "checked");
                    pageBtn.checked = true;
                });
                $.each(child.raw.actions, function (index, action) {
                    $('#' + action.oid).attr("checked", "checked");
                    $('#' + action.oid).prop("checked", "checked");
                    action.checked = true;
                });
            } else {
                $.each(child.raw.toolbarBtns, function (index, toolbarBtn) {
                    $('#' + toolbarBtn.oid).removeAttr("checked");
                    toolbarBtn.checked = false;
                });
                $.each(child.raw.operationBtns, function (index, operationBtn) {
                    $('#' + operationBtn.oid).removeAttr("checked");
                    operationBtn.checked = false;
                });
                $.each(child.raw.pageBtns, function (index, pageBtn) {
                    $('#' + pageBtn.oid).removeAttr("checked");
                    pageBtn.checked = false;
                });
                $.each(child.raw.actions, function (index, action) {
                    $('#' + action.oid).removeAttr("checked");
                    action.checked = false;
                });
            }

            checkChild(child, checked);
        });
    }
}
function OrgModuleClick(o, actionType) {
    var orgModuleManagerGrid = Ext.getCmp('orgModuleManager');
    $.each(orgModuleManagerGrid.store.getData().items, function (index, Module) {
        if (actionType == 'toolbarBtns') {
            $.each(Module.data.toolbarBtns, function (i, btn) {
                if (btn.oid == $(o).attr('id')) {
                    if ($(o).attr('checked') == 'checked') {
                        $(o).removeAttr('checked');
                        btn.checked = false;
                    } else {
                        $(o).attr('checked', 'checked');
                        btn.checked = true;
                    }
                    return; return;
                }
            });
        } else if (actionType == 'operationBtn') {
            $.each(Module.data.operationBtns, function (i, btn) {
                if (btn.oid == $(o).attr('id')) {
                    if ($(o).attr('checked') == 'checked') {
                        $(o).removeAttr('checked');
                        btn.checked = false;
                    } else {
                        $(o).attr('checked', 'checked');
                        btn.checked = true;
                    }
                    return; return;
                }
            });
        } else if (actionType == 'pageBtn') {
            $.each(Module.data.pageBtns, function (i, btn) {
                if (btn.oid == $(o).attr('id')) {
                    if ($(o).attr('checked') == 'checked') {
                        $(o).removeAttr('checked');
                        btn.checked = false;
                    } else {
                        $(o).attr('checked', 'checked');
                        btn.checked = true;
                    }
                    return; return;
                }
            });
        } else if (actionType == 'action') {
            $.each(Module.data.actions, function (i, btn) {
                if (btn.oid == $(o).attr('id')) {
                    if ($(o).attr('checked') == 'checked') {
                        $(o).removeAttr('checked');
                        btn.checked = false;
                    } else {
                        $(o).attr('checked', 'checked');
                        btn.checked = true;
                    }
                    return; return;
                }
            });
        }
    });
}


//if($(this).attr('checked')=='checked') {$(this).removeAttr('checked');} else { $(this).attr('checked','checked');}