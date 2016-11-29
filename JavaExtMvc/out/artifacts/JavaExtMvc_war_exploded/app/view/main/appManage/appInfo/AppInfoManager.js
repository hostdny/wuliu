Ext.define(
    'ExtFrame.view.main.appManage.appInfo.AppInfoManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.appManage.appInfo.AppInfoController',
            'ExtFrame.view.main.appManage.appInfo.AppInfoModel',
            'ExtFrame.view.main.appManage.appInfo.AppInfoGrid'],
        layout: {type: 'border'},
        controller: 'appInfoController',
        viewModel: {type: 'appInfoModel'},
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
                    items: [{
                            xtype: 'textfield',
                            name: 'appCName',
                            bind: '{rec.appCName}',
                            fieldLabel: '中文名称',
                            emptyText: '请输入中文名称',
                            allowBlank: false,
                            maxLength: 100
                        }, {
                            xtype: 'textfield',
                            name: 'appEName',
                            bind: '{rec.appEName}',
                            fieldLabel: '英文名称',
                            emptyText: '请输入英文名称',
                            allowBlank: false,
                            maxLength: 100
                        }, {
                            xtype: 'combo',
                            name: 'appType',
                            bind: '{rec.appType}',
                            emptyText: '请选择',
                            blankText: '请选择',
                            allowBlank: false,
                            editable: false,
                            store: Ext.create('ExtFrame.store.Dict', {
                                pageSize: 0,
                                proxy: {
                                    type: 'ajax',
                                    url: Tools.Method.getAPiRootPath() + "/dict/queryCombo.do?dictType=AppType",
                                    reader: {
                                        type: 'json'
                                    }
                                }
                            }),
                            queryMode: 'local',
                            displayField: 'text',
                            valueField: 'value',
                            fieldLabel: '应用类别'
                        }
                    ]
                }, {
                    layout: 'column',
                    itemId: 'column2',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'appCode',
                            itemId: 'appCode',
                            bind: '{rec.appCode}',
                            fieldLabel: '应用编码',
                            emptyText: '应用编码',
                            allowBlank: false,
                            maxLength: 100
                        }, {
                            xtype: 'combo',
                            name: 'status',
                            itemId: 'status',
                            bind: '{rec.status}',
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
                            xtype: 'textfield',
                            name: 'remark',
                            bind: '{rec.remark}',
                            fieldLabel: '备注'
                        }
                    ]
                }]
            }, {
                xtype: 'appInfoGrid',
                itemId: me.ename + 'Grid',
                id: 'appInfoGrid',
                ename: me.ename,
                region: 'center'
            }];
            me.callParent();
        }
    }
);