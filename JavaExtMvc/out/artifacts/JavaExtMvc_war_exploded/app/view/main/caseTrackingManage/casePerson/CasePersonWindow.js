/**
 * Created by wangBin on 2016/11/4.
 */
Ext.define('ExtFrame.view.main.caseTrackingManage.casePerson.CasePersonWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.casePersonWindow',
    viewModel: {type: 'casePersonModel'},
    controller: 'casePersonController',
    layout: {type: 'border'},
    closeAction: 'destroy',
    buttonAlign: 'center',
    id: 'casePersonWindowId',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'casePersonForm',
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
                xtype: 'combo',
                name: 'caseId',
                itemId: 'caseId',
                bind: '{rec.caseId}',
                editable: false,// 是否允许输入
                emptyText: '请选择案件',
                blankText: '请选择案件',// 该项如果没有选择，则提示错误信息,
                displayField: 'caseName',
                valueField: 'id',
                fieldLabel: '所属案件',
                allowBlank: false,// 不允许为空
                width: "100%",
                store: Ext.create('ExtFrame.store.Permission', {
                    proxy: {
                        type: 'ajax',
                        url: Tools.Method.getAPiRootPath() + "/casePersonRela/queryCaseInfoByDelFlag.do",
                        reader: {
                            type: 'json'
                        },
                        extraParams: {
                            'caseType': "-1"
                        }
                    }
                })
            }, {
                xtype: 'combo',
                name: 'personCaseRela',
                itemId: 'personCaseRela',
                bind: '{rec.personCaseRela}',
                editable: false,// 是否允许输入
                emptyText: '请选择该人员与本案的关系',
                blankText: '请选择该人员与本案的关系',// 该项如果没有选择，则提示错误信息,
                displayField: 'dictName',
                valueField: 'dictValue',
                fieldLabel: '案件人员关系',
                allowBlank: false,// 不允许为空
                width: "100%",
                store: Ext.create('ExtFrame.store.ModuleTree', {
                    proxy: {
                        type: 'ajax',
                        url: Tools.Method.getAPiRootPath() + "/dict/queryToCombo.do?dictType=AJXGRY",
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
                    select: function (combo, record, eOpts) {
                        var dictValue = record.data.dictValue;
                        var personTeamId = me.down("#personTeamId");
                        var userCName = me.down("#userCName");
                        var personCName = me.down("#personCName");
                        var personUsername = me.down("#personUsername");
                        var personId = me.down("#personId");
                        var personTelephone = me.down("#personTelephone");
                        if(dictValue == "2"){
                            personTeamId.show();
                            userCName.show();
                            personCName.hide();
                            personCName.setValue("");

                        }else{
                            personTeamId.hide();
                            userCName.hide();
                            personCName.show();
                            personTeamId.setValue("");
                            userCName.store.getProxy().extraParams = {
                                deptId: ""
                            };
                            //重新加载grid
                            userCName.store.reload();
                        }
                        personUsername.setValue("");
                        personId.setValue("");
                        personTelephone.setValue("");
                        personCName.setValue("");
                    }
                }
            }, {
                xtype: 'combo',
                name: 'personTeamId',
                itemId: 'personTeamId',
                bind: '{rec.personTeamId}',
                hidden:true,
                editable: false,// 是否允许输入
                emptyText: '请选择人员所属部门',
                blankText: '请选择人员所属部门',// 该项如果没有选择，则提示错误信息,
                displayField: 'cName',
                valueField: 'id',
                fieldLabel: '人员所属部门',
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
                        var userCName = me.down("#userCName");
                        userCName.setValue("");
                        userCName.store.getProxy().extraParams = {
                            deptId: deptId
                        };
                        //重新加载grid
                        userCName.store.reload();
                    }
                }
            }, {
                xtype: 'combo',
                name: 'personName',
                itemId: 'userCName',
                bind: '{rec.personName}',
                hidden:true,
                editable: false,// 是否允许输入
                emptyText: '请选择人员名称',
                blankText: '请选择人员名称',// 该项如果没有选择，则提示错误信息,
                queryMode: 'local',
                displayField: 'userCName',
                valueField: 'userCName',
                fieldLabel: '人员名称',
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
                }),
                listeners: {
                    select: function (combo, record, eOpts) {
                        var telephoneValue = record.data.telephone;
                        var userCardValue = record.data.userCard;
                        var userENameValue = record.data.userEName;
                        var personUsername = me.down("#personUsername");
                        var personId = me.down("#personId");
                        var personTelephone = me.down("#personTelephone");
                        personUsername.setValue(userENameValue);
                        personId.setValue(userCardValue);
                        personTelephone.setValue(telephoneValue);
                    }
                }
            }, {
                xtype: 'hiddenfield',
                itemId: 'personUsername',
                name: 'personUsername',
                bind: '{rec.personUsername}'
            }, {
                xtype: 'textfield',
                name: 'personName',
                itemId: 'personCName',
                bind: '{rec.personName}',
                emptyText: '请输入人员名称',
                fieldLabel: '人员名称',
                width: "100%",
                allowDecimals: false
            }, {
                xtype: 'textfield',
                name: 'personId',
                itemId: 'personId',
                bind: '{rec.personId}',
                emptyText: '请输入人员身份证号',
                fieldLabel: '人员身份证号',
                allowBlank: false,
                width: "100%",
                allowDecimals: false
            }, {
                xtype: 'textfield',
                name: 'personTelephone',
                itemId: 'personTelephone',
                bind: '{rec.personTelephone}',
                emptyText: '请输入人员手机号',
                fieldLabel: '人员手机号',
                allowBlank: false,
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