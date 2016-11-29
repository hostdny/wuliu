Ext.define(
    'ExtFrame.view.main.sys.buttonsManager.ButtonsManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.sys.buttonsManager.ButtonsManagerController',
            'ExtFrame.view.main.sys.buttonsManager.ButtonsManagerModel',
            'ExtFrame.view.main.sys.buttonsManager.ButtonsIco',
            'ExtFrame.view.main.sys.buttonsManager.ButtonsGrid'],
        layout: {type: 'border'},
        controller: 'buttonsManager',
        viewModel: {type: 'buttonsManagerModel'},
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            //alert(me.down('#RoleManagerGrid'));
            me.items = [{
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
                    layout: 'column',
                    itemId: 'column1',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'cName',
                            bind: '{rec.cName}',
                            fieldLabel: '名称',
                            emptyText: '请输入名称',
                            allowBlank: false,
                            maxLength: 25
                        },
                        {
                            xtype: 'textfield',
                            name: 'eName',
                            bind: '{rec.eName}',
                            fieldLabel: '英文名称',
                            emptyText: '请输入英文名称',
                            allowBlank: false,
                            maxLength: 50,
                            listeners: {
                                change: function (me, newValue, oldValue, eOpts) {
                                    var value = me.getValue();
                                    if (value == ''){
                                        valid = "请输入英文名称";
                                    }else {
                                        var id = "";
                                        var grid = Ext.getCmp("buttonsGrid");
                                        var selectRecords = grid.getSelection();
                                        if(selectRecords.length > 0){
                                            id = selectRecords[0].data.id;
                                        }
                                        Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/buttons/isExist.do?flag=0&eName=' + value + '&id=' + id, 'GET', null, false, function (jsonData) {
                                            if (jsonData.resultCode == "0") {
                                                valid = "英文名称已存在，请重新输入";
                                            } else {
                                                valid = true;
                                            }
                                        });
                                    }
                                    me.validation = valid;
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'eventMethod',
                            bind: '{rec.eventMethod}',
                            fieldLabel: '事件名称',
                            emptyText: '请输入事件名称',
                            allowBlank: false,
                            maxLength: 100,
                            listeners: {
                                change: function (me, newValue, oldValue, eOpts) {
                                    var value = me.getValue();
                                    if (value == ''){
                                        valid = "请输入事件名称";
                                    }else {
                                        var id = "";
                                        var grid = Ext.getCmp("buttonsGrid");
                                        var selectRecords = grid.getSelection();
                                        if(selectRecords.length > 0){
                                            id = selectRecords[0].data.id;
                                        }
                                        Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/buttons/isExist.do?flag=1&eventMethod=' + value + '&id=' + id, 'GET', null, false, function (jsonData) {
                                            if (jsonData.resultCode == "0") {
                                                valid = "事件名称已存在，请重新输入";
                                            } else {
                                                valid = true;
                                            }
                                        });
                                    }
                                    me.validation = valid;
                                }
                            }
                        }
                    ]
                }, {
                    layout: 'column',
                    items: [{
                        xtype: 'textfield',
                        name: 'sortNo',
                        bind: '{rec.sortNo}',
                        fieldLabel: '排序编号',
                        emptyText: '请输入排序编号',
                        allowBlank: false
                    }, {
                        xtype: 'combo',
                        name: 'state',
                        bind: '{rec.state}',
                        editable: false,
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
                                combo.setValue(combo.getStore().getAt(0).data.value);
                            }
                        }
                    }, {
                        xtype: 'displayfield',
                        name: 'ico',
                        itemId: 'ico',
                        id: 'ButtonsIco',
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
                        handler: 'onClickButtonIco'
                    }]
                }, {
                    layout: 'column',
                    items: [{
                        xtype: 'textfield',
                        name: 'description',
                        bind: '{rec.description}',
                        fieldLabel: '描述',
                        emptyText: '请输入按钮描述',
                        maxLength: 100,
                        width: '50%'
                    }]
                }]
            }, {
                xtype: 'buttonsgrid',
                itemId: me.ename + 'Grid',
                id: 'buttonsGrid',
                ename: me.ename,
                region: 'center'
            }];
            me.callParent();
        }
    }
);