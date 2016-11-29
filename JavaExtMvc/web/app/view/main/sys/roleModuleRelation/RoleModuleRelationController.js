/**
 * Created by LvXL on 2016/7/1.
 */

Ext.define('ExtFrame.view.main.sys.roleModuleRelation.RoleModuleRelationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.roleModuleRelationController',

    onClickButtonSave: function () {
        var treeGrid = this.getView();//获取当前grid控件

        var gridSearchToolbar = treeGrid.getDockedItems('gridsearchtoolbar')[0];//获取gridSearchbar搜索栏
        var roleId = gridSearchToolbar.down('#rolePicker').getValue();//获取搜索字段
        if (roleId == '' || roleId == undefined) {
            //未选择组织机构
            Tools.Method.ShowTipsMsg(Tools.Msg.MSG00222, '4000', '3', null);
        } else {
            var checkedModule = new Array(0);
            var selectRecords = treeGrid.getChecked();//treeGrid.getSelection();
            $.each(selectRecords, function (index, rec) {
                checkedModule.push(rec.get('id'));
            })
            $.each(treeGrid.store.getData().items, function (index, Module) {
                $.each(Module.data.toolbarBtns, function (i, action) {
                    if (action.checked)
                        checkedModule.push(action.id);
                });
                $.each(Module.data.operationBtns, function (i, action) {
                    if (action.checked)
                        checkedModule.push(action.id);
                });
                $.each(Module.data.pageBtns, function (i, action) {
                    if (action.checked)
                        checkedModule.push(action.id);
                });
                $.each(Module.data.actions, function (i, action) {
                    if (action.checked)
                        checkedModule.push(action.id);
                });
            });
            if (checkedModule.length == 0) {
                //未选择任何权限给出提示，确定是否提交操作
                Ext.MessageBox.confirm('提醒', '确定要删除所选角色的所有权限吗？', function (btn) {
                    if (btn == 'yes') {

                        var data = { 'roleId': roleId, 'moduleIds': checkedModule};
                        //alert(Ext.encode(data));
                        Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/roleModuleRelation/saveRoleModule.do', 'POST', data, true, function (jsonData) {
                            if (jsonData.resultCode == "1") {
                                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                                ExtBtns = {};
                            } else {
                                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                            }
                        });
                    }
                });
            } else {
                Ext.MessageBox.confirm('提醒', '确定要修改所选角色的权限吗？', function (btn) {
                    if (btn == 'yes') {
                        var data = { 'roleId': roleId, 'moduleIds': checkedModule};
                        // 页面这遮罩
                        Ext.getBody().mask("请稍等，正在保存...","x-mask-loading");
                        Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/roleModuleRelation/saveRoleModule.do', 'POST', data, true, function (jsonData) {
                            Ext.getBody().unmask();
                            if (jsonData.resultCode == "1") {
                                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                                ExtBtns = {};
                            } else {
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
                $('#' + toolbarBtn.id).attr("checked", "checked");
                $('#' + toolbarBtn.id).prop("checked", "checked");
                toolbarBtn.checked = true;
            });
            $.each(node.raw.operationBtns, function (index, operationBtn) {
                $('#' + operationBtn.id).attr("checked", "checked");
                $('#' + operationBtn.id).prop("checked", "checked");
                operationBtn.checked = true;
            });
            $.each(node.raw.pageBtns, function (index, pageBtn) {
                $('#' + pageBtn.id).attr("checked", "checked");
                $('#' + pageBtn.id).prop("checked", "checked");
                pageBtn.checked = true;
            });
            $.each(node.raw.actions, function (index, action) {
                $('#' + action.id).attr("checked", "checked");
                $('#' + action.id).prop("checked", "checked");
                action.checked = true;
            });
        } else {
            $.each(node.raw.toolbarBtns, function (index, toolbarBtn) {
                $('#' + toolbarBtn.id).removeAttr("checked");
                toolbarBtn.checked = false;
            });
            $.each(node.raw.operationBtns, function (index, operationBtn) {
                $('#' + operationBtn.id).removeAttr("checked");
                operationBtn.checked = false;
            });
            $.each(node.raw.pageBtns, function (index, pageBtn) {
                $('#' + pageBtn.id).removeAttr("checked");
                pageBtn.checked = false;
            });
            $.each(node.raw.actions, function (index, action) {
                $('#' + action.id).removeAttr("checked");
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
                    $('#' + toolbarBtn.id).attr("checked", "checked");
                    $('#' + toolbarBtn.id).prop("checked", "checked");
                    toolbarBtn.checked = true;
                });
                $.each(child.raw.operationBtns, function (index, operationBtn) {
                    $('#' + operationBtn.id).attr("checked", "checked");
                    $('#' + operationBtn.id).prop("checked", "checked");
                    operationBtn.checked = true;
                });
                $.each(child.raw.pageBtns, function (index, pageBtn) {
                    $('#' + pageBtn.id).attr("checked", "checked");
                    $('#' + pageBtn.id).prop("checked", "checked");
                    pageBtn.checked = true;
                });
                $.each(child.raw.actions, function (index, action) {
                    $('#' + action.id).attr("checked", "checked");
                    $('#' + action.id).prop("checked", "checked");
                    action.checked = true;
                });
            } else {
                $.each(child.raw.toolbarBtns, function (index, toolbarBtn) {
                    $('#' + toolbarBtn.id).removeAttr("checked");
                    toolbarBtn.checked = false;
                });
                $.each(child.raw.operationBtns, function (index, operationBtn) {
                    $('#' + operationBtn.id).removeAttr("checked");
                    operationBtn.checked = false;
                });
                $.each(child.raw.pageBtns, function (index, pageBtn) {
                    $('#' + pageBtn.id).removeAttr("checked");
                    pageBtn.checked = false;
                });
                $.each(child.raw.actions, function (index, action) {
                    $('#' + action.id).removeAttr("checked");
                    action.checked = false;
                });
            }

            checkChild(child, checked);
        });
    }
}
function RoleModuleClick(o, actionType) {
    var orgModuleManagerGrid = Ext.getCmp('roleModuleRelationManager');
    $.each(orgModuleManagerGrid.store.getData().items, function (index, Module) {
        if (actionType == 'toolbarBtns') {
            $.each(Module.data.toolbarBtns, function (i, btn) {
                if (btn.id == $(o).attr('id')) {
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
                if (btn.id == $(o).attr('id')) {
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
                if (btn.id == $(o).attr('id')) {
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
                if (btn.id == $(o).attr('id')) {
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