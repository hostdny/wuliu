/**
 * Created by Administrator on 2016/11/28.

 */



Ext.define(
    'ExtFrame.view.main.bankManage.bankAccountManage',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.bankManage.bankAccountManage',
            'ExtFrame.view.main.bankManage.bankAccountModel',
            'ExtFrame.view.main.bankManage.bankAccountGrid'],

       //  controller: 'bankAccountManage',
       // viewModel: {type: 'bankAccountModel'},
       // ename: '',//用于构造itemId，很重要，要和数据库存储的模块ename对应
       // layout: {type: 'border'},
        layout: "fit",
        initComponent:function(){
            var me=this;
            me.items=[

                {
                    xtype: 'form',
                    itemId: me.ename + 'Form',
                    ename: me.ename,
                    region: 'north',
                    bodyPadding: 5,
                    padding: 2,
                    defaults: {
                        bodyPadding: 5,
                        labelWidth: 60
                    },
                    fieldDefaults: {
                        labelAlign: 'right'
                    },
                    items: [{
                        xtype: 'hiddenfield',
                        itemId: 'hfOID',
                        name: 'id',
                        bind: '{rec.id}'
                    }, {
                        xtype: 'hiddenfield',
                        itemId: 'lt',
                        name: 'lt',
                        bind: '{rec.lt}'
                    },
                {
                    xtype: 'hiddenfield',
                    itemId: 'rt',
                    name: 'rt',
                    bind: '{rec.rt}'
                }, {
                    xtype: 'hiddenfield',
                    itemId: 'treeLevel',
                    name: 'treeLevel',
                    bind: '{rec.treeLevel}'

                },

                         {
                            layout: 'column',
                            itemId: 'column1',
                            items: [{
                                xtype: 'combo',
                                name: 'flag',
                                bind: '{rec.flag}',
                                itemId: 'moduleManagerFlag',
                                editable: false,// 是否允许输入
                                emptyText: '请选择',
                                allowBlank: false,// 不允许为空
                                blankText: '请选择',// 该项如果没有选择，则提示错误信息,
                                store: Ext.create('ExtFrame.store.Org', {
                                    pageSize: 0,
                                    proxy: {
                                        type: 'ajax',
                                        url: Tools.Method.getAPiRootPath() + "/dict/queryToCombo.do?dictType=MENU_TYPE",
                                        reader: {
                                            type: 'json'
                                        }
                                    }
                                }),
                                queryMode: 'local',
                                displayField: 'dictName',
                                valueField: 'dictValue',
                                fieldLabel: '类型'
                            }, {
                                xtype: 'hiddenfield',
                                itemId: 'hfModule',
                                name: 'parentOid',
                                bind: '{rec.parentOid}',
                                listeners: {
                                    change: function (me, newValue, oldValue, eOpts) {
                                        me.up('#column1').down('#modulePicker').setValue(newValue);
                                    }
                                }
                            }, {
                                xtype: 'treepicker',
                                itemId: 'modulePicker',
                                fieldLabel: '上级菜单',
                                displayField: 'cName',
                                valueField: 'id',
                                forceSelection: true,// 只能选择下拉框里面的内容
                                emptyText: '请选择',
                                blankText: '请选择',// 该项如果没有选择，则提示错误信息
                                rootVisible: false,
                                initComponent: function () {
                                    var treepicker = this;
                                    treepicker.store = Ext.create('ExtFrame.store.ModuleTree', {
                                        root: {
                                            name: '',
                                            id: '00000000000000000000000000000000',
                                            expanded: true
                                        },
                                        proxy: {
                                            type: 'ajax',
                                            url: Tools.Method.getAPiRootPath() + '/module/queryModuleToCombo.do',
                                            reader: {
                                                type: 'json'
                                            },
                                            extraParams: {
                                                'parentOid': '00000000000000000000000000000000'
                                            }
                                        },
                                        listeners: {
                                            nodebeforeexpand: function (node, eOpts) {
                                                this.proxy.extraParams.parentOid = node.id;
                                            }
                                        },
                                        clearOnLoad: true
                                    });
                                    treepicker.callParent();
                                },
                                listeners: {
                                    select: function (me, record, eOpts) {
                                        me.up('#column1').down('#hfModule').setValue(record.data.id);
                                    }
                                }
                            }, {
                                xtype: 'textfield',
                                name: 'pathHandler',
                                bind: '{rec.pathHandler}',
                                fieldLabel: '类名/事件',
                                maxLength: 100
                            }, {
                                xtype: 'combo',
                                name: 'buttonId',
                                itemId: 'buttonId',
                                bind: '{rec.buttonId}',
                                editable: false,// 是否允许输入
                                emptyText: '请选择',
                                queryMode: 'local',
                                displayField: 'cName',
                                valueField: 'id',
                                fieldLabel: '所属按钮',
                                store: Ext.create('ExtFrame.store.Module', {
                                    proxy: {
                                        type: 'ajax',
                                        url: Tools.Method.getAPiRootPath() + "/buttons/queryToCombo.do",
                                        reader: {
                                            type: 'json',
                                            rootProperty: 'buttons'//数据根节点名称
                                        }
                                    },
                                    listeners: {
                                        load: function (store, records, successful, eOpts) {
                                            if (records.length > 0) {
                                                var record = {name: '无', oid: ''};
                                                store.insert(0, record)
                                            }
                                        }
                                    }
                                }),
                                listeners: {
                                    //捕捉异常处理
                                    select: function (combo, record, index) {
                                        var data = record.getData();
                                        if (data.id != '') {
                                            var json = this.up("#ModuleManagerForm").getForm().getValues();
                                            json.cName = data.cName;
                                            json.ico = data.ico;
                                            json.eName = data.eName;
                                            json.description = data.description;
                                            json.sortNo = data.sortNo;
                                            json.pathHandler = data.eventMethod;
                                            json.permissions = null;
                                            this.up("#ModuleManagerForm").getForm().setValues(json);
                                        }
                                    },
                                    exception: function (theproxy, response, operation, options) {
                                        Tools.Method.ExceptionEncap(response);
                                    }
                                }
                            }]
                        }, {
                            layout: 'column',
                            items: [{
                                xtype: 'textfield',
                                name: 'cName',
                                itemId: 'cName',
                                bind: '{rec.cName}',
                                fieldLabel: '中文名称',
                                allowBlank: false,// 不允许为空
                                maxLength: 25
                            }, {
                                xtype: 'textfield',
                                name: 'eName',
                                itemId: 'eName',
                                bind: '{rec.eName}',
                                fieldLabel: '英文名称',
                                vtype: 'OnlyEnglishAndNum',
                                allowBlank: false,// 不允许为空
                                listeners: {
                                    change: function (me, newValue, oldValue, eOpts) {
                                        var value = me.getValue();
                                        var FlagValue = me.up('#ModuleManagerForm').down('#moduleManagerFlag').getValue();
                                        if(FlagValue == 0){
                                            if (value == ''){
                                                valid = "请输入英文名称";
                                            }else {
                                                var id = me.up('#ModuleManagerForm').down('#hfOID').getValue();
                                                Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/module/getIsExist.do?eName=' + value + '&id=' + id, 'GET', null, false, function (jsonData) {
                                                    if (jsonData.resultCode == "0") {
                                                        valid = "英文名称已存在，请重新输入";
                                                    } else {
                                                        valid = true;
                                                    }
                                                });
                                            }
                                        }else{
                                            valid = true;
                                        }
                                        me.validation = valid;
                                    }
                                }
                            }, {
                                xtype: 'textfield',
                                name: 'url',
                                itemId: 'url',
                                bind: '{rec.url}',
                                fieldLabel: 'action路径',
                                maxLength: 200
                            }, {
                                xtype: 'displayfield',
                                name: 'ico',
                                itemId: 'ico',
                                id: 'MemuIco',
                                bind: '{rec.ico}',
                                fieldLabel: '图  标',
                                maxLength: 50,
                                width: 200

                            }, {
                                xtype: 'button',
                                scale: 'small',
                                text: '选择图标',
                                glyph: 0xf03e,
                                ename: 'ChoiceIco',
                                handler: 'onClickButtonIco',
                                listeners: {
                                    beforerender: function (btn, eOpts) {
                                        if (Tools.Method.getPageBtnPower(btn.ename, me.ename))
                                            btn.hidden = false;
                                        else {
                                            btn.hidden = true;
                                        }
                                    }
                                }
                            }]
                        },
                        {
                            layout: 'column',
                            items: [{
                                xtype: 'textfield',
                                name: 'code',
                                itemId: 'code',
                                bind: '{rec.code}',
                                fieldLabel: '编号',
                                allowBlank: false,// 不允许为空
                                maxLength: 25
                            }, {
                                xtype: 'textfield',
                                name: 'sortNo',
                                itemId: 'sortNo',
                                bind: '{rec.sortNo}',
                                fieldLabel: '排序编号'
                            },

                                {
                                    xtype: 'combo',
                                    name: 'state',
                                    bind: '{rec.state}',
                                    // value: 0,//默认值
                                    editable: false,// 是否允许输入
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['text', 'value'],
                                        data: [{'value': '0', 'text': '启用'}, {'value': '1', 'text': '停用'}]
                                    }),
                                    queryMode: 'local',
                                    displayField: 'text',
                                    valueField: 'value',
                                    fieldLabel: '状态',
                                    listeners: {
                                        afterRender: function (combo) {
                                            combo.setValue(combo.getStore().getAt(0).data.abbr);
                                        }
                                    }
                                }]

                        },
                        {
                            layout: 'column',
                            items: [{
                                xtype: 'textareafield',
                                name: 'description',
                                bind: '{rec.description}',
                                fieldLabel: '描述',
                                emptyText: '请书写描述内容',
                                width: 450,
                                maxLength: 100
                            }]
                        }]
                }
                , {
                    xtype: 'bankAccountgrid',
                    itemId: me.ename + 'Grid',
                    id: 'bankAccountGrid',
                    ename: me.ename,
                    region: 'center'
                }
            ];
            me.callParent();
        }
    }
)



