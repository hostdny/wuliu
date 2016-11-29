/**
 * Created by admin on 2016/7/14.
 */
Ext.define('ExtFrame.view.main.irs.irsInformationRelease.IrsInformationReleaseForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.irsInformationReleaseForm',
    controller: 'irsInformationReleaseController',
    viewModel: {type: 'irsInformationReleaseModel'},
    layout: {type: 'border'},
    buttonAlign: 'center',
    autoScroll: 'true',
    fit: true,
    height: "100%",
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: me.ename + 'Form',
            ename: me.ename,
            region: 'center',
            autoScroll: true,
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
                    xtype: 'hiddenfield',
                    id: 'irsInformationReleaseForm_attachmentIds',//附件主键
                    name: 'attIds'
                }, {
                    xtype: 'textfield',
                    name: 'infoTitle',
                    itemId: 'infoTitle',
                    id: 'infoTitle',
                    bind: '{rec.infoTitle}',
                    allowBlank: false,
                    fieldLabel: '标题',
                    maxLength: 100
                }, {
                    xtype: 'textfield',
                    name: 'infoDesc',
                    itemId: 'infoDesc',
                    id: 'infoDesc',
                    bind: '{rec.infoDesc}',
                    fieldLabel: '描述',
                    maxLength: 100
                }, {
                    xtype: 'combo',
                    name: 'infoLevel',
                    bind: '{rec.infoLevel}',
                    itemId: 'infoLevel',
                    editable: false,// 是否允许输入
                    emptyText: '请选择',
                    allowBlank: false,// 不允许为空
                    blankText: '请选择',// 该项如果没有选择，则提示错误信息,
                    store: Ext.create('ExtFrame.store.Org', {
                        pageSize: 0,
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/dict/queryToCombo.do?dictType=INFO_LEVEL",
                            reader: {
                                type: 'json'
                            }
                        }
                    }),
                    queryMode: 'local',
                    displayField: 'dictName',
                    valueField: 'dictValue',
                    fieldLabel: '信息级别'
                }, {
                    xtype: 'combo',
                    name: 'infoType',
                    bind: '{rec.infoType}',
                    itemId: 'infoType',
                    editable: false,// 是否允许输入
                    emptyText: '请选择',
                    allowBlank: false,// 不允许为空
                    blankText: '请选择',// 该项如果没有选择，则提示错误信息,
                    store: Ext.create('ExtFrame.store.Org', {
                        pageSize: 0,
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/dict/queryToCombo.do?dictType=INFO_TYPE",
                            reader: {
                                type: 'json'
                            }
                        }
                    }),
                    queryMode: 'local',
                    displayField: 'dictName',
                    valueField: 'dictValue',
                    fieldLabel: '信息类型'
                }, {
                    xtype: 'numberfield',
                    name: 'playTime',
                    itemId: 'playTime',
                    bind: '{rec.playTime}',
                    emptyText: '请输入展示时间',
                    fieldLabel: '展示时间(秒)',
                    maxLength: 200
                }, {
                    xtype: 'hiddenfield',
                    itemId: 'equipmentFlag',
                    name: 'equipmentFlag'
                }, {
                    xtype: 'hiddenfield',
                    itemId: 'equipmentIds',
                    name: 'equipmentIds',
                    bind: '{rec.equipmentIds}',
                }, {
                    xtype: 'textfield',
                    itemId: 'equipmentNames',
                    name: 'equipmentNames',
                    allowBlank: false,
                    emptyText: '请选择设备',
                    editable: false,// 是否允许输入
                    bind: '{rec.equipmentNames}',
                    fieldLabel: '终端设备',
                }, {
                    xtype: 'button',
                    text: '选择设备',
                    width: 100,
                    iconAlign: 'right',
                    listeners: {
                        click: 'onClickSelectEquipment'
                    }
                }, {
                    xtype: 'textfield',
                    name: 'remark',
                    itemId: 'remark',
                    bind: '{rec.remark}',
                    emptyText: '请输入备注',
                    fieldLabel: '备注',
                    maxLength: 200
                }]
            }, {
                xtype: 'ueditor',
                id: 'infoContentContext',
                itemId: 'infoContentContext',
                name: 'infoContent',
                bind: '{rec.infoContent}',
                width: '100%'
            }, {
                xtype: 'irsInformationAttachmentGrid',
                itemId: 'irsInformationAttachmentGrid',
                id: 'irsInformationAttachmentGrid',
                width: '100%'
            }]
        }];
        me.buttons = [
            {
                xtype: "button",
                id: "irsInformationReleaseForm_button",
                text: "保存",
                handler: 'onClickButtonSave'
            }
            //,
            //{
            //    xtype: "button",
            //    text: "关闭",
            //    handler: 'onClickButtonCloseWindow'
            //}
        ];
        this.callParent();
    }
});