/**
 * Created by wangBin on 2016/11/2.
 */
Ext.define('ExtFrame.view.main.caseTrackingManage.caseInput.CaseInputWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.caseInputWindow',
    viewModel: {type: 'caseInputModel'},
    controller: 'caseInputController',
    layout: {type: 'border'},
    closeAction: 'destroy',
    buttonAlign: 'center',
    id: 'caseInputWindowId',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'caseInputForm',
            region: 'center',
            autoScroll: true,
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'right',
                padding: 2
            },
            items: [{
                xtype: 'hiddenfield',
                itemId: 'hfOID',
                name: 'id',
                bind: '{rec.id}'
            }, {
                xtype: 'textfield',
                name: 'caseName',
                itemId: 'caseName',
                bind: '{rec.caseName}',
                emptyText: '请输入案件名称',
                fieldLabel: '案件名称',
                width: "100%",
                allowBlank: false,
                allowDecimals: false
            }, {
                xtype: 'textfield',
                name: 'caseCode',
                itemId: 'caseCode',
                bind: '{rec.caseCode}',
                emptyText: '请输入案件编号',
                fieldLabel: '案件编号',
                allowBlank: false,
                width: "100%",
                allowDecimals: false
            }, {
                xtype: 'combo',
                name: 'caseType',
                itemId: 'caseType',
                bind: '{rec.caseType}',
                editable: false,// 是否允许输入
                emptyText: '请选择案件类型',
                blankText: '请选择案件类型',// 该项如果没有选择，则提示错误信息,
                displayField: 'dictName',
                valueField: 'dictValue',
                fieldLabel: '案件类型',
                allowBlank: false,// 不允许为空
                width: "100%",
                store: Ext.create('ExtFrame.store.ModuleTree', {
                    proxy: {
                        type: 'ajax',
                        url: Tools.Method.getAPiRootPath() + "/dict/queryToCombo.do?dictType=AJLB",
                        reader: {
                            type: 'json'
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
                    select: function (combo, record) {
                        var caseType = record.data.dictValue;
                        var caseLineId = me.down("#caseLineId");
                        caseLineId.store.getProxy().extraParams = {
                            'caseType': caseType
                        };
                        //重新加载grid
                        caseLineId.store.reload();
                        caseLineId.setValue("");
                    }
                }
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: '案件所属流程',
                combineErrors: true,
                layout: 'hbox',
                defaults: {
                    hideLabel: true
                },
                items: [{
                    xtype: 'combo',
                    name: 'caseLineId',
                    itemId: 'caseLineId',
                    bind: '{rec.caseLineId}',
                    editable: false,// 是否允许输入
                    emptyText: '请选择所属流程',
                    blankText: '请选择所属流程',// 该项如果没有选择，则提示错误信息,
                    displayField: 'caseName',
                    valueField: 'id',
                    fieldLabel: '案件所属流程',
                    allowBlank: false,// 不允许为空
                    width: "90%",
                    store: Ext.create('ExtFrame.store.Permission', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/caseInfo/queryConfigByCaseType.do",
                            reader: {
                                type: 'json'
                            },
                            extraParams: {
                                'caseType': "-1"
                            }
                        }
                    })
                }, {
                    xtype: 'button',
                    width: "10%",
                    text: "流程图",
                    handler: 'onClickShow'
                }]
            }, {
                xtype: 'combo',
                name: 'undertakingDepartmentId',
                itemId: 'undertakingDepartmentId',
                bind: '{rec.undertakingDepartmentId}',
                editable: false,// 是否允许输入
                allowBlank: false,// 不允许为空
                emptyText: '请选择承办部门',
                blankText: '请选择承办部门',// 该项如果没有选择，则提示错误信息,
                displayField: 'cName',
                valueField: 'id',
                fieldLabel: '承办部门',
                width: "100%",
                store: Ext.create('ExtFrame.store.ModuleTree', {
                    proxy: {
                        type: 'ajax',
                        url: Tools.Method.getAPiRootPath() + "/organization/queryOrgToCombo.do",
                        reader: {
                            type: 'json'
                        },
                        //扩展参数
                        extraParams: {
                            'swhere': "",
                            parentId:"4028981655e830080155e83792bc0000"
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
                    select: function (combo, record, eOpts) {
                        var deptId = record.data.id;
                        var undertakingPersonId = me.down("#undertakingPersonId");
                        undertakingPersonId.setValue("");
                        undertakingPersonId.store.getProxy().extraParams = {
                            deptId: deptId
                        };
                        //重新加载grid
                        undertakingPersonId.store.reload();
                    }
                }
            }, {
                xtype: 'combo',
                name: 'undertakingPersonId',
                itemId: 'undertakingPersonId',
                bind: '{rec.undertakingPersonId}',
                editable: false,// 是否允许输入
                emptyText: '请承办人员',
                allowBlank: false,// 不允许为空
                blankText: '请承办人员',// 该项如果没有选择，则提示错误信息,
                queryMode: 'local',
                displayField: 'userCName',
                valueField: 'id',
                fieldLabel: '承办人员',
                width: "100%",
                store: Ext.create('ExtFrame.store.User', {
                    proxy: {
                        type: 'ajax',
                        url: Tools.Method.getAPiRootPath() + "/departMent/queryPerson.do",
                        reader: {
                            type: 'json',
                            rootProperty: 'rows'//数据根节点名称
                        },
                        //扩展参数
                        extraParams: {
                            'deptId': ""
                        }
                    }
                })
            }, {
                xtype: 'textareafield',
                name: 'caseMessage',
                itemId: 'caseMessage',
                bind: '{rec.caseMessage}',
                emptyText: '案情描述',
                fieldLabel: '案情描述',
                height:150,
                width: "100%",
                allowDecimals: false
            }]
        }];
        me.buttons = [
            {
                xtype: "button",
                text: "保存",
                handler: 'onClickButtonSave'
            }, {
                xtype: "button",
                text: "关闭",
                handler: 'onClickClose'
            }
        ];
        me.callParent();
    }
});