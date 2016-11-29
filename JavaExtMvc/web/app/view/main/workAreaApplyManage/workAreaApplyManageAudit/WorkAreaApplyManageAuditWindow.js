/**
 * Created by jia on 2016/8/30.
 */
Ext.define('ExtFrame.view.main.workAreaApplyManage.workAreaApplyManageAudit.WorkAreaApplyManageAuditWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.workAreaApplyManageAuditWindow',
    controller: 'workAreaApplyManageAuditController',
    viewModel: {type: 'workAreaApplyManageAuditModel'},
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
            itemId: 'workAreaApplyManageAuditForm',
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
                    name: 'areaName',
                    itemId: 'areaName',
                    bind: '{rec.areaName}',
                    emptyText: '请输入工作区名称',
                    fieldLabel: '工作区名称',
                    allowBlank: false,
                    allowDecimals: false
                },{
                    xtype: 'datefield',
                    name: 'startTime',
                    itemId: 'startTime',
                    bind: '{rec.startTime}',
                    emptyText: '请输入开始时间',
                    fieldLabel: '开始时间',
                    format: 'Y年m月d日',
                    allowBlank: false,
                    editable: false
                },{
                    xtype: 'datefield',
                    name: 'endTime',
                    itemId: 'endTime',
                    bind: '{rec.endTime}',
                    emptyText: '请输入结束时间',
                    fieldLabel: '结束时间',
                    format: 'Y年m月d日',
                    allowBlank: false,
                    editable: false
                },{
                    xtype: 'datefield',
                    name: 'createTime',
                    itemId: 'createTime',
                    bind: '{rec.createTime}',
                    emptyText: '请输入添加时间',
                    fieldLabel: '添加时间',
                    format: 'Y年m月d日',
                    allowBlank: false,
                    editable: false
                },{
                    xtype: 'numberfield',
                    name: 'personNum',
                    itemId: 'personNum',
                    bind: '{rec.personNum}',
                    emptyText: '请输入法警人数',
                    fieldLabel: '法警人数',
                    allowBlank: false,
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'createPerson',
                    itemId: 'createPerson',
                    bind: '{rec.createPerson}',
                    emptyText: '请输入申请人',
                    fieldLabel: '申请人',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'createTelephone',
                    itemId: 'createTelephone',
                    bind: '{rec.createTelephone}',
                    emptyText: '请输入申请人电话',
                    fieldLabel: '申请人电话',
                    allowDecimals: false
                },{
                    xtype: 'textfield',
                    name: 'applyReason',
                    itemId: 'applyReason',
                    bind: '{rec.applyReason}',
                    emptyText: '请输入申请原因',
                    fieldLabel: '申请原因',
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
