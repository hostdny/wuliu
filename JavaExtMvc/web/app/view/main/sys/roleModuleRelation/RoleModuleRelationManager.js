/**
 * Created by LvXL on 2016/7/1.
 */

Ext.define('ExtFrame.view.main.sys.roleModuleRelation.RoleModuleRelationManager', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Ext.ux.CheckColumn',
        'ExtFrame.view.main.sys.roleModuleRelation.RoleModuleRelationController'
    ],
    xtype: 'tree-grid',
    controller: 'roleModuleRelationController',
    id: 'roleModuleRelationManager',
    ename: '',
    reserveScrollbar: true,
    rootVisible: false,
    fit: true,
    stripeRows: true,
    listeners: {
        checkchange: 'checkChange'
    },
    initComponent: function () {
        var me = this;
        me.store = Ext.create('ExtFrame.store.ModuleTree', {
            //root: {
            //    oid: '00000000000000000000000000000000',
            //    name: '',
            //    id: '00000000000000000000000000000000',
            //    expanded: true
            //},
            proxy: {
                type: 'ajax',
                //url: Tools.Method.getAPiRootPath() + '/module/queryModuleTree.do',
                url: Tools.Method.getAPiRootPath() + '/module/queryModuleTreeSync.do',
                //扩展参数
                extraParams: {
                    'moduleId': '00000000000000000000000000000000',
                    'roleId':''
                }
            }
            //listeners: {
            //    nodebeforeexpand: function (node, eOpts) {
            //        //点击父亲节点的菜单会将节点的id通过ajax请求，将到后台
            //        if (node.id == '00000000000000000000000000000000') {
            //            this.proxy.extraParams.moduleId = node.id;
            //        } else {
            //            this.proxy.extraParams.moduleId = node.data.id;
            //        }
            //    }
            //},
            //clearOnLoad: true
        }),

            me.columns = [{
                xtype: 'treecolumn', //this is so we know which column will show the tree
                text: '菜单',
                width: 200,
                dataIndex: 'name'
            }, {
                xtype: 'templatecolumn',
                text: '工具栏按钮',
                flex: 3,
                dataIndex: 'toolbarBtns',
                //add in the custom tpl for the rows
                tpl: Ext.create('Ext.XTemplate', '{toolbarBtns:this.formatActions}', {
                    formatActions: function (toolbarBtns) {
                        var str_actions = "";
                        //alert("toolbarBtns--------" + toolbarBtns);
                        if (toolbarBtns.length > 0) {
                            $.each(toolbarBtns, function (index, toolbarBtn) {
                                if (toolbarBtn.checked) {
                                    str_actions += "<div style=\"width:100px; float:left; text-align:left;\"><input class=\"action\" onclick=\"RoleModuleClick(this,'toolbarBtns');\" id=\"" + toolbarBtn.id + "\" type=\"checkbox\" checked=\"checked\" />" + toolbarBtn.name + "</div>";
                                } else {
                                    str_actions += "<div style=\"width:100px; float:left; text-align:left;\"><input class=\"action\" onclick=\"RoleModuleClick(this,'toolbarBtns');\" id=\"" + toolbarBtn.id + "\" type=\"checkbox\" />" + toolbarBtn.name + "</div>";
                                }
                            });
                        }
                        return str_actions;
                    }
                })
            }, {
                xtype: 'templatecolumn',
                text: '行操作按钮',
                flex: 3,
                dataIndex: 'operationBtns',
                //add in the custom tpl for the rows
                tpl: Ext.create('Ext.XTemplate', '{operationBtns:this.formatActions}', {
                    formatActions: function (operationBtns) {
                        var str_actions = "";
                        if (operationBtns.length > 0) {
                            $.each(operationBtns, function (index, operationBtn) {
                                if (operationBtn.checked) {
                                    str_actions += "<div style=\"width:100px; float:left; text-align:left;\"><input class=\"action\" onclick=\"RoleModuleClick(this,'operationBtn');\" id=\"" + operationBtn.id + "\" type=\"checkbox\" checked=\"checked\" />" + operationBtn.name + "</div>";
                                } else {
                                    str_actions += "<div style=\"width:100px; float:left; text-align:left;\"><input class=\"action\" onclick=\"RoleModuleClick(this,'operationBtn');\" id=\"" + operationBtn.id + "\" type=\"checkbox\" />" + operationBtn.name + "</div>";
                                }
                            });
                        }
                        return str_actions;
                    }
                })
            }, {
                xtype: 'templatecolumn',
                text: '页面按钮',
                flex: 3,
                dataIndex: 'pageBtns',
                //add in the custom tpl for the rows
                tpl: Ext.create('Ext.XTemplate', '{pageBtns:this.formatActions}', {
                    formatActions: function (pageBtns) {
                        var str_actions = "";
                        if (pageBtns.length > 0) {
                            $.each(pageBtns, function (index, pageBtn) {
                                if (pageBtn.checked) {
                                    str_actions += "<div style=\"width:100px; float:left; text-align:left;\"><input class=\"action\" onclick=\"RoleModuleClick(this,'pageBtn');\" id=\"" + pageBtn.id + "\" type=\"checkbox\" checked=\"checked\" />" + pageBtn.name + "</div>";
                                } else {
                                    str_actions += "<div style=\"width:100px; float:left; text-align:left;\"><input class=\"action\" onclick=\"RoleModuleClick(this,'pageBtn');\" id=\"" + pageBtn.id + "\" type=\"checkbox\" />" + pageBtn.name + "</div>";
                                }
                            });
                        }
                        return str_actions;
                    }
                })
            }, {
                xtype: 'templatecolumn',
                text: '请求',
                flex: 3,
                dataIndex: 'actions',
                //add in the custom tpl for the rows
                tpl: Ext.create('Ext.XTemplate', '{actions:this.formatActions}', {
                    formatActions: function (actions) {
                        var str_actions = "";
                        if (actions.length > 0) {
                            $.each(actions, function (index, action) {
                                if (action.checked) {
                                    str_actions += "<div style=\"width:120px; float:left; text-align:left;\"><input class=\"action\" onclick=\"RoleModuleClick(this,'action');\" id=\"" + action.id + "\" type=\"checkbox\" checked=\"checked\" />" + action.name + "</div>";
                                } else {
                                    str_actions += "<div style=\"width:120px; float:left; text-align:left;\"><input class=\"action\" onclick=\"RoleModuleClick(this,'action');\" id=\"" + action.id + "\" type=\"checkbox\" />" + action.name + "</div>";
                                }
                            });
                        }
                        return str_actions;
                    }
                })
            }];
        //grid 停靠item
        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            hasSearch: false,
            ename: me.ename,
            items: [{
                xtype: 'combo',
                itemId: 'rolePicker',
                fieldLabel: '角色名称',
                displayField: 'name',
                valueField: 'id',
                forceSelection: true,// 只能选择下拉框里面的内容
                emptyText: '请选择',
                blankText: '请选择',// 该项如果没有选择，则提示错误信息
                labelWidth: 60,
                editable: false,
                //  rootVisible: false,
                store: Ext.create('ExtFrame.store.Role', {
                    proxy: {
                        type: 'ajax',
                        url: Tools.Method.getAPiRootPath() + "/role/queryRoleToCombo.do",
                        reader: {
                            type: 'json',
                        },
                        //扩展参数
                        extraParams: {
                            'swhere': ""
                        },
                        listeners: {
                            //捕捉异常处理
                            exception: function (theproxy, response, operation, options) {
                                Tools.Method.ExceptionEncap(response);
                            }
                        }
                    }
                }),
                listeners: {
                    select: function (me, record, eOpts) {
                        Ext.getCmp('roleModuleRelationManager').store.getProxy().extraParams = {
                            'moduleId': '00000000000000000000000000000000',
                            "roleId": record.data.id
                        };
                        Ext.getCmp('roleModuleRelationManager').store.reload();
                    }
                }
            }]
        }];
        me.callParent();
    }
});
