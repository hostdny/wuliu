Ext.define(
    'ExtFrame.view.main.sys.roleManager.RoleManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.sys.roleManager.RoleManagerController', 'ExtFrame.view.main.sys.roleManager.RoleManagerModel', 'ExtFrame.view.main.sys.roleManager.RoleGrid'],//请求MainController类
        layout: {type: 'border'},
        controller: 'roleManagerController',
        viewModel: {type: 'roleManagerModel'},
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'form',
                itemId: me.ename + 'Form',
                ename: me.ename,
                region: 'north',
                bodyPadding: 5,
                padding: 2,
                defaults: {
                    bodyPadding: 5
                },
                fieldDefaults: {
                    labelAlign: 'right'
                },
                items: [{
                    layout: 'column',
                    items: [{
                        xtype: 'hiddenfield',
                        itemId: 'hfOID',//注意，此itemId要写固定，functionjs中重置from有用到
                        name: 'id',
                        bind: '{rec.id}'
                    }, {
                        xtype: 'textfield',
                        name: 'name',
                        itemId: 'name',
                        bind: '{rec.name}',
                        emptyText: '请输入角色名称',
                        fieldLabel: '角色名称',
                        maxLength: 30,
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        name: 'code',
                        itemId: 'code',
                        bind: '{rec.code}',
                        emptyText: '请输入角色编码',
                        fieldLabel: '角色编码',
                        maxLength: 30,
                        allowBlank: false,
                        listeners: {
                            change: function (me, newValue, oldValue, eOpts) {
                                var value = me.getValue();
                                if (value == '') {
                                    valid = "请输入角色编码";
                                } else {
                                    var code = me.up('#RoleForm').down('#code').getValue();
                                    var id;
                                    if (me.id != undefined && me.id != '') {
                                        id = me.id;
                                        me.id = '';
                                    } else {
                                        id = me.up('#RoleForm').down('#hfOID').getValue();
                                    }
                                    if (code != null && code != "") {
                                        Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/role/checkCode.do?code=' + value + '&id=' + id, 'GET', null, false, function (jsonData) {
                                            if (jsonData.resultCode == "0") {
                                                valid = "角色编码已存在，请重新输入";
                                            } else {
                                                valid = true;
                                            }
                                        });
                                    } else {
                                        valid = true;
                                    }
                                }
                                me.validation = valid;
                            }
                        }
                    }, {
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
                        fieldLabel: '状态'
                    }, {
                        xtype: 'textfield',
                        name: 'systemCode',
                        bind: '{rec.systemCode}',
                        value: '-1',
                        emptyText: '请输入系统编码',
                        fieldLabel: '系统编码',
                        maxLength: 100
                    }, {
                        xtype: 'textareafield',
                        name: 'remark',
                        bind: '{rec.remark}',
                        emptyText: '请输入备注',
                        fieldLabel: '备注',
                        growMin: 30,
                        maxLength: 100
                    }]
                }]
            }, {
                xtype: 'rolegrid',
                itemId: me.ename + 'Grid',
                id: 'RoleManagerGrid',
                ename: me.ename,
                region: 'center'
            }];
            me.callParent();
        }
    }
);


