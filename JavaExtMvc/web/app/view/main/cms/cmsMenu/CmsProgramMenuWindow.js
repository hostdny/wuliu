/**
 * Created by Administrator on 2016/10/25.
 */
Ext.define('ExtFrame.view.main.cms.cmsMenu.CmsProgramMenuWindow', {
    //extend: 'Ext.panel.Panel',
    extend: 'Ext.window.Window',
    alias: 'widget.cmsProgramMenuWindow',
    viewModel: {type: 'cmsMenuModel'},
    //layout: {type: 'border'},
    //collapsible: true,
    //collapsed: true,
    width: 550,
    height: 350,
    plain: true,
    layout: 'fit',
    modal: true,
    closeAction: 'close',
    title: '栏目信息预览与编辑',
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'cmsProgramWindowForm',
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
                title: '栏目信息',
                itemId: 'column1',
                collapsible: true,
                defaults: {
                    labelWidth: 89,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [{
                    xtype: 'hiddenfield',
                    itemId: 'hfOid',
                    id: "hfMenuOid",
                    name: 'id',
                    fieldLabel: '栏目ID',
                    bind: '{rec.id}',
                    readOnly: true
                }, {
                    xtype: 'hiddenfield',
                    itemId: 'siteId',
                    name: 'siteId',
                    fieldLabel: '站点ID',
                    bind: '{rec.siteId}',
                    readOnly: true
                }, {
                    xtype: 'combo',
                    itemId: 'siteName',
                    allowNegative: false,
                    name: 'siteName',
                    fieldLabel: '站点名',
                    emptyText: '请输入站点名',
                    allowDecimals: false,
                    editable: false,
                    store: Ext.create('ExtFrame.store.Org', {
                        pageSize: 0,
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/cmsSite/queryAll.do",
                            reader: {
                                type: 'json'
                            }
                        }
                    }),
                    queryMode: 'local',
                    displayField: 'siteName',
                    valueField: 'id',
                    listeners: {
                        select: function (ppp, record, eOpts) {
                            me.down("#siteId").setValue(record.data.id);
                            var store = me.down("#proName").store;
                            store.getProxy().extraParams = {
                                'siteId': record.data.id
                            };
                            store.reload();
                        }
                    }
                },
                    {
                        xtype: 'combo',
                        name: 'proName',
                        itemId: 'proName',
                        bind: '{rec.proName}',
                        emptyText: '导航栏目',
                        fieldLabel: '导航栏目',
                        rootVisible: false,
                        displayField: 'name',
                        valueField: 'pid',
                        store: Ext.create('ExtFrame.store.OrgTree', {
                            root: {
                                typeName: '',
                                parentId: "",
                                expanded: true
                            },
                            proxy: {
                                type: 'ajax',
                                url: Tools.Method.getAPiRootPath() + 'cmsMenu/queryAllMenu.do',
                                reader: {
                                    type: 'json'
                                },
                                extraParams: {
                                    siteId: "-1"
                                }
                            }
                        }),
                        listeners: {
                            select: function (ppp, record, eOpts) {
                                var id = Ext.getCmp("hfMenuOid").getValue();
                                if (id == record.data.pid) {
                                    Ext.MessageBox.alert('提示', '不能选自身栏目！');
                                    return;
                                }
                                me.down('#parentId').setValue(record.data.pid);
                              //  me.down('#isMain').setValue(record.data.isMain);
                            //    me.up().down('#akey').hide();
                              //  me.up().down('#akey').setValue(record.data.akey);

                            },
                            nodebeforeexpand: function (node, eOpts) {
                                //点击父亲节点的菜单会将节点的id通过ajax请求，
                                if (node.id != "root") {
                                    this.proxy.extraParams.parentId = node.raw.id;
                                } else {
                                    this.proxy.extraParams.parentId = "";
                                }
                            }
                        }
                    }, {
                        xtype: 'textfield',
                        hidden: true,
                        name: 'parentId',
                        itemId: 'parentId',
                        bind: '{rec.parentId}',
                        emptyText: '栏目父ID',
                        fieldLabel: '栏目父ID',
                        allowDecimals: false
                    }, {
                        xtype: 'textfield',
                        itemId: 'programName',
                        name: 'programName',
                        bind: '{rec.programName}',
                        emptyText: '导航名称',
                        fieldLabel: '导航名称',
                        allowDecimals: false,
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        name: 'url',
                        itemId: 'url',
                        bind: '{rec.url}',
                        emptyText: '导航url',
                        fieldLabel: '导航url',
                        allowDecimals: false
                    }, {
                        xtype: 'combo',
                        name: 'isShow',
                        itemId: 'isShow',
                        bind: '{rec.isShow}',
                        emptyText: '是否在网站端显示',//是否在网站端显示 0显示 1 不显示
                        editable: false,// 是否允许输入
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'abbr',
                        fieldLabel: '是否在网站端显示',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['abbr', 'name'],
                            data: [{'abbr': '0', 'name': '显示'}, {'abbr': '1', 'name': '不显示'}]
                        })
                    }, {
                        xtype: 'combo',
                        name: 'isNeedLogin',
                        itemId: 'isNeedLogin',
                        bind: '{rec.isNeedLogin}',
                        emptyText: '是否需要登录',//是否在网站端显示 0显示 1 不显示
                        editable: false,// 是否允许输入
                        queryMode: 'local',
                        displayField: 'text',
                        valueField: 'value',
                        fieldLabel: '是否需要登录',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['text', 'value'],
                            data: [{'value': '0', 'text': '不需要登录'}, {'value': '1', 'text': '需要登录'}]
                        })
                    },{
                        xtype: 'numberfield',
                        name: 'sortNo',
                        itemId: 'sortNo',
                        bind: '{rec.sortNo}',
                        emptyText: '数值越大排序越靠前',
                        fieldLabel: '排序数值',
                        allowDecimals: false
                    }, {
                        xtype: 'textfield',
                        name: 'remark',
                        itemId: 'remark',
                        bind: '{rec.remark}',
                        emptyText: '备注',
                        fieldLabel: '备注',
                        allowDecimals: false
                    }]
            }, {
                xtype: 'displayfield',
                labelAlign: 'left',
                fieldLabel: '文章内容',
                whidth: '100%'

            }, {
                xtype: 'ueditor',
                itemId: 'artilceContext',
                width: '100%'
            }, {
                xtype: 'hiddenfield',
                itemId: 'hiddenArtilceContext',
                name: 'artilceContext',
                bind: '{rec.artilceContext}',
                listeners: {
                    change: function (me, newValue, oldValue, eOpts) {
                        me.up('#cmsProgramWindowForm').down('#artilceContext').setValue(newValue);
                    }
                }
            }]
        }];
        me.buttons = [
            {xtype: "button", text: "保存", handler: 'onClickButtonSave'},
            {
                xtype: "button", text: "关闭", handler: 'cancel'
            }
        ];
        this.callParent();
    }
});