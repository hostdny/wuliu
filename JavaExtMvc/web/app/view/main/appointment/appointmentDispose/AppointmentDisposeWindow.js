/**
 * Created by wangBin on 2016/8/8.
 */
Ext.define('ExtFrame.view.main.appointment.appointmentDispose.AppointmentDisposeWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.appointmentDisposeWindow',
    viewModel: {type: 'appointmentDisposeModel'},
    layout: {type: 'border'},
    width: 700,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '详细信息',
    buttonAlign: 'center',
    autoScroll:'true',
    fit: true,
    id: 'appointmentDisposeWindow',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'appointmentDisposeForm',
            region: 'center',
            autoScroll: true,
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'right',
                padding: 2
            },
            items: [{
                xtype: 'fieldset',
                title: '预约信息',
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
                    xtype: 'displayfield',
                    name: 'consultationType',
                    itemId: 'consultationType',
                    bind: '{rec.consultationType}',
                    fieldLabel: '预约类型',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'consultationTitle',
                    itemId: 'consultationTitle',
                    bind: '{rec.consultationTitle}',
                    fieldLabel: '预约简介',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'consultationPerson',
                    itemId: 'consultationPerson',
                    bind: '{rec.consultationPerson}',
                    fieldLabel: '预约人',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'telephone',
                    itemId: 'telephone',
                    bind: '{rec.telephone}',
                    fieldLabel: '联系方式',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'consultationRptdate',
                    itemId: 'consultationRptdate',
                    bind: '{rec.consultationRptdate}',
                    fieldLabel: '预约时间',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'consultationContent',
                    itemId: 'consultationContent',
                    bind: '{rec.consultationContent}',
                    fieldLabel: '预约内容',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'datefield',
                    name: 'appointmentDate',
                    itemId: 'appointmentDate',
                    bind: '{rec.appointmentDate}',
                    emptyText: '请输入日期',
                    fieldLabel: '日期',
                    format: 'Y-m-d',
                    allowBlank: false,
                    editable: false
                },{
                    xtype: 'timefield',
                    name: 'appointmentStartTime',
                    itemId: 'appointmentStartTime',
                    bind: '{rec.appointmentStartTime}',
                    emptyText: '请输入开始时间',
                    fieldLabel: '开始时间',
                    format: "H:i:s",
                    allowBlank: false,
                    editable: false
                },{
                    xtype: 'timefield',
                    name: 'appointmentEndTime',
                    itemId: 'appointmentEndTime',
                    bind: '{rec.appointmentEndTime}',
                    emptyText: '请输入结束时间',
                    fieldLabel: '结束时间',
                    format: "H:i:s",
                    allowBlank: false,
                    editable: false
                },{
                    xtype: 'textareafield',
                    name: 'consultationBack',
                    itemId: 'consultationBack',
                    bind: '{rec.consultationBack}',
                    emptyText: '请输入回复内容',
                    fieldLabel: '回复内容',
                    height:100,
                    allowBlank: false,
                    allowDecimals: false
                }]
            },{
                xtype: 'appointmentDisposeWindowGrid',
                itemId: 'appointmentDisposeWindowGrid',
                width:"100%"

            }]
        }];
        me.buttons = [
            {
                xtype: "button", text: "保存",itemId:'saveButton',disabled:"true",handler: 'onClickButtonSave'
            },{
                xtype: "button", text: "关闭", handler: 'onClickClear'
            }
        ];
        me.callParent();
    }
});
