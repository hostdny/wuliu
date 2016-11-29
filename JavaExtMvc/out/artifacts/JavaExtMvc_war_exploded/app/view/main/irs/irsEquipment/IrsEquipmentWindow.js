/**
 * Created by admin on 2016/7/14.
 */
Ext.define('ExtFrame.view.main.irs.irsEquipment.IrsEquipmentWindow', {
    //extend: 'Ext.panel.Panel',
    extend: 'Ext.window.Window',
    alias: 'widget.irsEquipmentWindow',
    controller: 'irsEquipmentController',
    viewModel: {type: 'irsEquipmentModel'},

    width: 550,
    height:500,
    plain: true,
    layout: 'fit',
    modal : true,
    closeAction:  'close',

    //layout: {type: 'border'},
    //collapsible: true,
    //collapsed: true,
    //width: 400,
    //closeAction: 'destroy',
    title: '设备管理',
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
                    xtype: 'textfield',
                    itemId: 'name',
                    name: 'name',
                    id: 'name',
                    bind: '{rec.name}',
                    allowBlank: false,
                    fieldLabel: '设备名称',
                    maxLength: 100
                }, {
                    xtype: 'textfield',
                    name: 'code',
                    id: 'code',
                    bind: '{rec.code}',
                    fieldLabel: '设备编码'
                }, {
                    xtype: 'combo',
                    name: 'type',
                    bind: '{rec.type}',
                    editable: false,// 是否允许输入
                    emptyText: '请选择',
                    store: Ext.create('ExtFrame.store.Org', {
                        pageSize: 0,
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/dict/queryToCombo.do?dictType=IRS_SBLX",
                            reader: {
                                type: 'json'
                            }
                        }
                    }),
                    queryMode: 'local',
                    displayField: 'dictName',
                    valueField: 'dictName',
                    fieldLabel: '设备类型'
                }, {
                    xtype: 'combo',
                    name: 'screenSize',
                    bind: '{rec.screenSize}',
                    editable: false,// 是否允许输入
                    emptyText: '请选择',
                    store: Ext.create('ExtFrame.store.Org', {
                        pageSize: 0,
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/dict/queryCombo.do?dictType=SCREEN_SIZE",
                            reader: {
                                type: 'json'
                            }
                        }
                    }),
                    queryMode: 'local',
                    displayField: 'text',
                    valueField: 'value',
                    fieldLabel: '屏幕尺寸'
                }, {
                    xtype: 'textfield',
                    name: 'ip',
                    id: 'ip',
                    bind: '{rec.ip}',
                    fieldLabel: 'IP地址'
                }, {
                    xtype: 'textfield',
                    name: 'mac',
                    id: 'mac',
                    bind: '{rec.mac}',
                    fieldLabel: 'MAC地址'
                }, {
                    xtype: 'combo',
                    name: 'status',
                    bind: '{rec.status}',
                    editable: false,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['text', 'value'],
                        data: [{'value': '0', 'text': '启用'}, {'value': '1', 'text': '禁用'}]
                    }),
                    queryMode: 'local',
                    displayField: 'text',
                    valueField: 'value',
                    fieldLabel: '设备状态',
                    listeners: {
                        afterRender: function (combo) {
                            combo.setValue(combo.getStore().getAt(0).data.abbr);
                        }
                    }
                }]
            }]
        }];
        me.buttons = [
            {xtype: "button", text: "保存", handler: 'onClickButtonSave'},
            {
                //xtype: "button", text: "关闭", handler: function () {
                //this.up("panel").collapse();
                //}
                xtype: "button", text: "关闭", handler: 'cancel'
            }
        ];
        this.callParent();
    }
});