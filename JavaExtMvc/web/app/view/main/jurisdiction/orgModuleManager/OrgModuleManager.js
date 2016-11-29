Ext.define('ExtFrame.view.main.jurisdiction.orgModuleManager.OrgModuleManager', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Ext.ux.CheckColumn',
        'ExtFrame.view.main.jurisdiction.orgModuleManager.OrgModuleManagerController'
    ],
    xtype: 'tree-grid',
    controller: 'orgModuleManager',
    id: 'orgModuleManager',
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
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + '/baseModuleInfo/getOrgModulesList.do',
                //扩展参数
                extraParams: {
                    'orgId': '00000000-0000-0000-0000-000000000000'
                }
            }
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
                    if (toolbarBtns.length > 0) {
                        $.each(toolbarBtns, function (index, toolbarBtn) {
                            if (toolbarBtn.checked) {
                                str_actions += "<div style=\"width:100px; float:left; text-align:left;\"><input class=\"action\" onclick=\"OrgModuleClick(this,'toolbarBtns');\" id=\"" + toolbarBtn.oid + "\" type=\"checkbox\" checked=\"checked\" />" + toolbarBtn.name + "</div>";
                            }
                            else {
                                str_actions += "<div style=\"width:100px; float:left; text-align:left;\"><input class=\"action\" onclick=\"OrgModuleClick(this,'toolbarBtns');\" id=\"" + toolbarBtn.oid + "\" type=\"checkbox\" />" + toolbarBtn.name + "</div>";
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
                                str_actions += "<div style=\"width:100px; float:left; text-align:left;\"><input class=\"action\" onclick=\"OrgModuleClick(this,'operationBtn');\" id=\"" + operationBtn.oid + "\" type=\"checkbox\" checked=\"checked\" />" + operationBtn.name + "</div>";
                            }
                            else {
                                str_actions += "<div style=\"width:100px; float:left; text-align:left;\"><input class=\"action\" onclick=\"OrgModuleClick(this,'operationBtn');\" id=\"" + operationBtn.oid + "\" type=\"checkbox\" />" + operationBtn.name + "</div>";
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
                                str_actions += "<div style=\"width:100px; float:left; text-align:left;\"><input class=\"action\" onclick=\"OrgModuleClick(this,'pageBtn');\" id=\"" + pageBtn.oid + "\" type=\"checkbox\" checked=\"checked\" />" + pageBtn.name + "</div>";
                            }
                            else {
                                str_actions += "<div style=\"width:100px; float:left; text-align:left;\"><input class=\"action\" onclick=\"OrgModuleClick(this,'pageBtn');\" id=\"" + pageBtn.oid + "\" type=\"checkbox\" />" + pageBtn.name + "</div>";
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
                                str_actions += "<div style=\"width:120px; float:left; text-align:left;\"><input class=\"action\" onclick=\"OrgModuleClick(this,'action');\" id=\"" + action.oid + "\" type=\"checkbox\" checked=\"checked\" />" + action.name + "</div>";
                            }
                            else {
                                str_actions += "<div style=\"width:120px; float:left; text-align:left;\"><input class=\"action\" onclick=\"OrgModuleClick(this,'action');\" id=\"" + action.oid + "\" type=\"checkbox\" />" + action.name + "</div>";
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
                xtype: 'treepicker',
                itemId: 'orgPicker',
                fieldLabel: '组织机构',
                displayField: 'name',
                valueField: 'oid',
                forceSelection: true,// 只能选择下拉框里面的内容
                emptyText: '请选择',
                blankText: '请选择',// 该项如果没有选择，则提示错误信息
                labelWidth: 60,
                rootVisible: false,
                store: Ext.create('ExtFrame.store.OrgTree', {
                    root: {
                        oid: '00000000-0000-0000-0000-000000000000',
                        name: '',
                        id: '00000000-0000-0000-0000-000000000000',
                        expanded: true
                    },
                    proxy: {
                        type: 'ajax',
                        url: Tools.Method.getAPiRootPath() + '/baseOrgInfo/getOrgListForTreegrid.do?type=false',
                        timeout: 100000000,
                        reader: {
                            type: 'json',
                            rootproperty: 'children'//数据根节点名称
                        },
                        extraParams: {
                            'orgId': '00000000-0000-0000-0000-000000000000'
                        }
                    },
                    listeners : {
                        nodebeforeexpand:function(node,eOpts){
                            //点击父亲节点的菜单会将节点的id通过ajax请求，将到后台
                            this.proxy.extraParams.orgId = node.id;
                        }
                    },
                    clearOnLoad: true,
                    nodeParam: 'PID'
                }),
                listeners: {
                    select: function (me, record, eOpts) {
                        me.up('#tab-OrgModuleManager-grid').store.getProxy().extraParams = {
                            "orgId": record.data.oid
                        };
                        me.up('#tab-OrgModuleManager-grid').store.reload();
                    }

                }
            }]
        }];
        me.callParent();
    }
});
