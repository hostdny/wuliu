/**
 * Created by zzw on 2016/9/26.
 */
Ext.define('ExtFrame.view.main.cms.cmsProgram.CmsProgramWindow', {
    //extend: 'Ext.panel.Panel',
    extend: 'Ext.window.Window',
    alias: 'widget.cmsProgramWindow',
    viewModel: {type: 'cmsProgramModel'},
    //layout: {type: 'border'},
    //collapsible: true,
    //collapsed: true,
    width: 550,
    height:350,
    plain: true,
    layout: 'fit',
    modal : true,
    closeAction:  'close',
    title: '栏目信息预览与编辑',
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: me.ename + 'Form',
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
                    id:"hfOidPid",
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
                },{
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
                        emptyText: '所属栏目',
                        fieldLabel: '所属栏目',
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
                                url: Tools.Method.getAPiRootPath() + '/cmsProgram/queryAllNews.do',
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
                                var id = Ext.getCmp("hfOidPid").getValue();
                                if(id == record.data.pid){
                                    Ext.MessageBox.alert('提示', '不能选自身栏目！');
                                    return;
                                }
                                me.down('#parentId').setValue(record.data.pid);
                                me.down('#isMain').setValue(record.data.isMain);
                                me.up().down('#akey').hide();
                                me.up().down('#akey').setValue(record.data.akey);

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
                    },{
                        xtype: 'textfield',
                        hidden:true,
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
                        emptyText: '栏目名称',
                        fieldLabel: '栏目名称',
                        allowDecimals: false,
                        allowBlank:false
                    },{
                        xtype: 'combo',
                        name: 'akey',
                        itemId: 'akey',
                        bind: '{rec.akey}',
                        width: "100%",
                        emptyText: '请选择栏目代码',
                        editable: false,// 是否允许输入
                        queryMode: 'local',
                        displayField: 'keyText',
                        valueField: 'keyValue',
                        fieldLabel: '栏目代码',
                        allowBlank:false,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['keyValue', 'keyText'],
                            data: [
                                {'keyValue': 'A1', 'keyText': 'A1'},
                                {'keyValue': 'A2', 'keyText': 'A2'},
                                {'keyValue': 'A3', 'keyText': 'A3'},
                                {'keyValue': 'A4', 'keyText': 'A4'},
                                {'keyValue': 'A5', 'keyText': 'A5'},
                                {'keyValue': 'A6', 'keyText': 'A6'},
                                {'keyValue': 'A7', 'keyText': 'A7'},
                                {'keyValue': 'A8', 'keyText': 'A8'},
                                {'keyValue': 'A9', 'keyText': 'A9'},
                                {'keyValue': 'A10', 'keyText': 'A10'},
                                {'keyValue': 'A11', 'keyText': 'A11'},
                                {'keyValue': 'A12', 'keyText': 'A12'},
                                {'keyValue': 'A13', 'keyText': 'A13'},
                                {'keyValue': 'A14', 'keyText': 'A14'},
                                {'keyValue': 'A15', 'keyText': 'A15'},
                                {'keyValue': 'A16', 'keyText': 'A16'},
                                {'keyValue': 'A17', 'keyText': 'A17'},
                                {'keyValue': 'A18', 'keyText': 'A18'},
                                {'keyValue': 'A19', 'keyText': 'A19'},
                                {'keyValue': 'A20', 'keyText': 'A20'},
                                {'keyValue': 'A21', 'keyText': 'A21'},
                                {'keyValue': 'A22', 'keyText': 'A22'},
                                {'keyValue': 'A23', 'keyText': 'A23'},
                                {'keyValue': 'A24', 'keyText': 'A24'},
                                {'keyValue': 'A25', 'keyText': 'A25'},
                                {'keyValue': 'A26', 'keyText': 'A26'},
                                {'keyValue': 'A27', 'keyText': 'A27'},
                                {'keyValue': 'A28', 'keyText': 'A28'},
                                {'keyValue': 'A29', 'keyText': 'A29'}
                            ]
                        })
                    }, {
                        xtype: 'textfield',
                        name: 'url',
                        itemId: 'url',
                        bind: '{rec.url}',
                        emptyText: '栏目url',
                        fieldLabel: '栏目url',
                        allowDecimals: false
                    }, {
                        xtype: 'hiddenfield',
                        name: 'isMain',
                        itemId: 'isMain',
                        bind: '{rec.isMain}',
                        editable: false,
                        allowDecimals: false
                    },  {
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
            }
            ]
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
