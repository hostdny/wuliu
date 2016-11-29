/**
 * Created by wangBin on 2016/8/29.
 */
Ext.define('ExtFrame.view.main.workAreaApplyManage.workAreaManage.WorkAreaManageWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.workAreaManageWindow',
    viewModel: {type: 'workAreaManageModel'},
    layout: {type: 'border'},
    width: 700,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '工作区信息',
    buttonAlign: 'center',
    autoScroll:true,
    fit: true,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'workAreaManageForm',
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
                    itemId: 'hfOID',
                    name: 'id',
                    bind: '{rec.id}'
                },{
                    xtype: 'textfield',
                    name: 'houseName',
                    itemId: 'houseName',
                    bind: '{rec.houseName}',
                    emptyText: '请输入工作区名称',
                    fieldLabel: '工作区名称',
                    allowBlank: false,
                    allowDecimals: false
                },{
                    xtype: 'numberfield',
                    name: 'sortOrder',
                    itemId: 'sortOrder',
                    bind: '{rec.sortOrder}',
                    emptyText: '请输入排序',
                    fieldLabel: '排序',
                    allowBlank: false,
                    allowDecimals: false
                },{
                    xtype: 'combo',
                    name: 'houseState',
                    itemId: 'houseState',
                    bind: '{rec.houseState}',
                    emptyText: '请选择状态',
                    editable: false,// 是否允许输入
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
                },{
                    xtype: 'textfield',
                    name: 'telephone',
                    itemId: 'telephone',
                    bind: '{rec.telephone}',
                    emptyText: '请输入电话',
                    fieldLabel: '电话',
                    allowBlank: false,
                    allowDecimals: false
                },{
                    xtype: 'textfield',
                    name: 'linkman',
                    itemId: 'linkman',
                    bind: '{rec.linkman}',
                    emptyText: '请选择负责人',
                    fieldLabel: '负责人',
                    allowBlank: false,
                    allowDecimals: false
                }]
            }]
        }];
        me.buttons = [
            {
                xtype: "button", text: "保存",handler: 'onClickButtonSave'
            },{
                xtype: "button", text: "关闭", handler: 'onClickClear'
            }
        ];
        me.callParent();
    }
});
