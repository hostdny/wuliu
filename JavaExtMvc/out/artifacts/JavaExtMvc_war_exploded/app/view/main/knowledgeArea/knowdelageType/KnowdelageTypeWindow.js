/**
 * Created by Jia on 2016/8/30.
 */
Ext.define('ExtFrame.view.main.knowledgeArea.knowdelageType.KnowdelageTypeWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.knowdelageTypeWindow',
    controller: 'knowdelageTypeController',
    viewModel: {type: 'knowdelageTypeModel'},
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 400,
    closeAction: 'destroy',
    title: '分类管理',
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'knowdelageTypeForm',
            ename: me.ename,
            region: 'center',
            autoScroll: true,
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'right',
                padding: 2
            },
            items: [{
                xtype: 'fieldset',
                title: '基本信息',
                itemId: 'column1',
                collapsible: true,
                defaults: {
                    labelWidth: 89,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [{
                    xtype: 'hiddenfield',
                    itemId: 'hfOID',//注意，此itemId要写固定，functionjs中重置from有用到
                    name: 'id',
                    bind: '{rec.id}'
                }, {
                    xtype: 'hiddenfield',
                    itemId: 'parentOid',//注意，此itemId要写固定，functionjs中重置from有用到
                    name: 'parentOid',
                    bind: '{rec.parentOid}'
                }, {
                    xtype: 'textfield',
                    name: 'typeName',
                    id: 'typeName',
                    bind: '{rec.typeName}',
                    allowBlank: false,
                    fieldLabel: '分类名称',
                    maxLength: 100
                }, {
                    xtype: 'treepicker',
                    itemId: 'parentName',
                    name: 'parentName',
                    bind: '{rec.parentName}',
                    forceSelection: true,// 只能选择下拉框里面的内容
                    emptyText: '请选择所属分类',
                    blankText: '请选择所属分类',// 该项如果没有选择，则提示错误信息
                    fieldLabel: '所属分类',
                    rootVisible: false,
                    displayField: 'typeName',
                    valueField: 'id',
                    store: Ext.create('ExtFrame.store.OrgTree', {
                        root: {
                            typeName: '',
                            parentId: "",
                            expanded: true
                        },
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + '/knowdelageType/queryToTreeGrid.do',
                            reader: {
                                type: 'json'
                            },
                            extraParams: {
                                'swhere': "",
                                parentId: ""
                            }
                        },
                        listeners: {
                            nodebeforeexpand: function (node, eOpts) {
                                //点击父亲节点的菜单会将节点的id通过ajax请求，
                                if (node.id != "root") {
                                    this.proxy.extraParams.parentId = node.raw.id;
                                } else {
                                    this.proxy.extraParams.parentId = "";
                                }
                            }
                        }
                    }),
                    listeners : {
                        select: "onSelectTreepicker"
                    }
                }, {
                    xtype: 'numberfield',
                    name: 'sortOrder',
                    id: 'sortOrder',
                    bind: '{rec.sortOrder}',
                    allowBlank: false,
                    fieldLabel: '排序'
                }, {
                    xtype: 'datefield',
                    name: 'createTime',
                    itemId: 'createTime',
                    bind: '{rec.createTime}',
                    format: "Y-m-d",
                    emptyText: '请选择时间',
                    fieldLabel: '添加时间',
                    editable: false,
                    allowBlank: false
                }, {
                    xtype: 'combo',
                    name: 'typeState',
                    itemId: 'typeState',
                    bind: '{rec.typeState}',
                    emptyText: '请选择状态',
                    editable: false,// 是否允许输入
                    allowBlank: false,
                    queryMode: 'local',
                    displayField: 'statusText',
                    valueField: 'statusValue',
                    fieldLabel: '状态',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['statusValue', 'statusText'],
                        data: [
                            {'statusValue': '0', 'statusText': '启用'},
                            {'statusValue': '1', 'statusText': '禁用'}
                        ]
                    })
                }, {
                    xtype: 'combo',
                    name: 'dictName',
                    bind: '{rec.dictName}',
                    itemId: 'dictName',
                    allowBlank: false,
                    emptyText: '请选择职位',
                    fieldLabel: '职位',
                    editable: false,
                    displayField: 'dictName',
                    valueField: 'dictValue',
                    multiSelect: true,
                    store: Ext.create('ExtFrame.store.ModuleTree', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/dict/queryToCombo.do?dictType=ZHIWEI",
                            reader: {
                                type: 'json',
                                rootProperty: 'rows',//数据根节点名称
                                totalProerty: 'total',//数据总数节点名称
                                idProperty: 'pttId'//id标示节点名称
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
                    })
                }, {
                    xtype: 'combo',
                    name: 'orgName',
                    bind: '{rec.orgName}',
                    editable: false,
                    itemId: 'orgName',
                    emptyText: '科室',
                    fieldLabel: '科室',
                    displayField: 'cName',
                    valueField: 'id',
                    multiSelect: true,
                    allowBlank: false,
                    store: Ext.create('ExtFrame.store.ModuleTree', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/organization/queryOrgToCombo.do?parentId=4028981655e830080155e83792bc0000",
                            reader: {
                                type: 'json',
                                rootProperty: 'rows',//数据根节点名称
                                totalProerty: 'total',//数据总数节点名称
                                idProperty: 'pttId'//id标示节点名称
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
                    })
                }]
            }]
        }];
        me.buttons = [
            {xtype: "button", text: "保存", handler: 'onClickButtonSave'},
            {
                xtype: "button", text: "关闭", handler: function () {
                this.up("panel").collapse();
            }
            }
        ];
        this.callParent();
    }
});