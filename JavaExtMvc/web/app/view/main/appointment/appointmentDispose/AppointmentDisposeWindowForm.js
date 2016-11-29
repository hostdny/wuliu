/**
 * Created by wangBin on 2016/8/8.
 */
Ext.define('ExtFrame.view.main.appointment.appointmentDispose.AppointmentDisposeWindowForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.appointmentDisposeWindowForm',
    viewModel: {type: 'appointmentDisposeModel'},
    region: 'center',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 60,
        padding: 5
    },
    id:"appointmentDisposeWindowFormId",
    bodyBorder: false,
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                layout: 'column',
                items: [{
                    xtype: 'datefield',
                    name: 'appointmentDate',
                    itemId: 'appointmentDate',
                    bind: '{rec.appointmentDate}',
                    emptyText: '请输入日期',
                    fieldLabel: '日期',
                    format: 'Y-m-d',
                    allowBlank: false,
                    editable: false
                }]
            },{
                layout: 'column',
                items: [{
                    xtype: 'timefield',
                    name: 'appointmentStartTime',
                    itemId: 'appointmentStartTime',
                    bind: '{rec.appointmentStartTime}',
                    emptyText: '请输入开始时间',
                    fieldLabel: '开始时间',
                    format: "H:i:s",
                    allowBlank: false,
                    editable: false
                }]
            },{
                layout: 'column',
                items: [{
                    xtype: 'timefield',
                    name: 'appointmentEndTime',
                    itemId: 'appointmentEndTime',
                    bind: '{rec.appointmentEndTime}',
                    emptyText: '请输入结束时间',
                    fieldLabel: '结束时间',
                    format: "H:i:s",
                    allowBlank: false,
                    editable: false
                }]
            },{
                layout: 'column',
                items: [{
                    xtype: 'textareafield',
                    name: 'consultationBack',
                    itemId: 'consultationBack',
                    bind: '{rec.consultationBack}',
                    emptyText: '请输入回复内容',
                    fieldLabel: '回复内容',
                    width:"95%",
                    height:150,
                    allowBlank: false,
                    allowDecimals: false
                }]
            }
        ];
        me.buttons = [
            {
                xtype: "button",
                text: "提交",
                itemId:'search',
                handler: 'onClickWindowSave'
            },
            {
                xtype: "button",
                text: "关闭",
                itemId:'clear',
                handler: 'onClickWindowClear'
            }
        ];
        me.callParent();
    }


});
