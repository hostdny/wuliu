/**
 * Created by wangBin on 2016/9/20.
 */
Ext.define('ExtFrame.view.main.booksManagement.booksTypeManagement.BooksTypeManagementWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.booksTypeManagementWindow',
    controller: 'booksTypeManagementController',
    viewModel: {type: 'booksTypeManagementModel'},
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 600,
    closeAction: 'destroy',
    title: '图书分类管理',
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'booksTypeManagementForm',
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
                },{
                    xtype: 'hiddenfield',
                    itemId: 'parentOid',//注意，此itemId要写固定，functionjs中重置from有用到
                    name: 'parentOid',
                    bind: '{rec.parentOid}'
                },{
                    xtype: 'textfield',
                    name: 'typeName',
                    id: 'typeName',
                    bind: '{rec.typeName}',
                    allowBlank: false,
                    fieldLabel: '分类名称',
                    emptyText: '请填写分类名称',
                    maxLength: 100
                },{
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
                            url: Tools.Method.getAPiRootPath() + '/bookType/queryToTree.do',
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
                    listeners: {
                        select: "onSelectTreePicker"
                    }
                },{
                    xtype: 'numberfield',
                    name: 'sortOrder',
                    id: 'sortOrder',
                    bind: '{rec.sortOrder}',
                    allowBlank: false,
                    emptyText: '请填写排序',
                    fieldLabel: '排序'
                },{
                    xtype: 'datefield',
                    name: 'createTime',
                    itemId: 'createTime',
                    bind: '{rec.createTime}',
                    format: "Y-m-d",
                    emptyText: '请选择时间',
                    fieldLabel: '添加时间',
                    editable: false,
                    allowBlank: false
                },{
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
                }]
            }]
        }];
        me.buttons = [
            {
                xtype: "button", text: "保存", handler: 'onClickButtonSave'
            }, {
                xtype: "button", text: "关闭", handler: 'onClickClear'
            }
        ];
        this.callParent();
    }
});