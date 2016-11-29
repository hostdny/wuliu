/**
 * Created by zzw on 2016/9/20.
 */
Ext.define('ExtFrame.view.main.booksManagement.booksMessageMaintain.BooksMessageMaintainWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.booksMessageMaintainWindow',
    controller: 'booksMessageMaintainController',
    viewModel: {type: 'booksMessageMaintainModel'},
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 700,
    closeAction: 'destroy',
    title: '图书信息维护',
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'booksMessageMaintainForm',
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
                title: '图书信息维护',
                itemId: 'column1',
                collapsible: true,
                defaults: {
                    labelWidth: 89,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [
                    {
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
                        itemId: 'bookName',
                        name: 'bookName',
                        bind: '{rec.bookName}',
                        emptyText: '图书名称',
                        fieldLabel: '图书名称'
                    },{
                        xtype: 'textfield',
                        itemId: 'bookIsbn',
                        name: 'bookIsbn',
                        bind: '{rec.bookIsbn}',
                        emptyText: '国际标准书号',
                        fieldLabel: '国际标准书号'
                    },{
                        xtype: 'textfield',
                        itemId: 'bookIssn',
                        name: 'bookIssn',
                        bind: '{rec.bookIssn}',
                        emptyText: '国际标准连续出版物编号',
                        fieldLabel: '国际标准连续出版物编号'
                    },{
                        xtype: 'textfield',
                        name: 'bookAuthor',
                        itemId: 'bookAuthor',
                        bind: '{rec.bookAuthor}',
                        emptyText: '著者',
                        fieldLabel: '著者'
                    },{
                        xtype: 'textfield',
                        hidden:true,
                        itemId: 'bookSort',
                        name: 'bookSort',
                        bind: '{rec.bookSort}'
                    },{
                        xtype: 'treepicker',
                        name: 'parentName',
                        itemId: 'parentName',
                        bind: '{rec.bookSort}',
                        emptyText: '分类',
                        fieldLabel: '分类',
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
                        xtype: 'textfield',
                        name: 'bookPress',
                        itemId: 'bookPress',
                        bind: '{rec.bookPress}',
                        emptyText: '出版社',
                        fieldLabel: '出版社'
                    },{
                        xtype: 'textfield',
                        name: 'collectionPosition',
                        itemId: 'collectionPosition',
                        bind: '{rec.collectionPosition}',
                        emptyText: '藏书位置',
                        fieldLabel: '藏书位置'
                    },{
                        xtype: 'datefield',
                        name: 'dateOfRegistration',
                        itemId: 'dateOfRegistration',
                        bind: '{rec.dateOfRegistration}',
                        editable: false,
                        format:'Y-m-d',
                        fieldLabel: '登记日期'
                    }]
            }]
        }];
        me.buttons = [
            {xtype: "button", text: "保存", handler: 'onClickButtonSave'},
            { xtype: "button", text: "关闭", handler: function () {
                this.up("panel").down('form').getForm().reset();
                this.up("panel").collapse();
            }}
        ];
        this.callParent();
    }
});