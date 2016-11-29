/**
 * Created by wangBin on 2016/8/8.
 */
Ext.define(
    'ExtFrame.view.main.appointment.appointmentDispose.AppointmentDisposeManager',
    {
        requires: [
            'ExtFrame.view.main.appointment.appointmentDispose.AppointmentDisposeModel',
            'ExtFrame.view.main.appointment.appointmentDispose.AppointmentDisposeController',
            'ExtFrame.view.main.appointment.appointmentDispose.AppointmentDisposeGrid',
            'ExtFrame.view.main.appointment.appointmentDispose.AppointmentDisposeWindowGrid',
            'ExtFrame.view.main.appointment.appointmentDispose.AppointmentDisposeWindowForm',
            'ExtFrame.view.main.appointment.appointmentDispose.AppointmentDisposeWindow'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'appointmentDisposeManager',
        id:'appointmentDisposeManagerId',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'appointmentDisposeController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'appointmentDisposeGrid',
                    itemId: 'appointmentDisposeGrid',
                    ename: 'appointmentDispose',
                    region:'center'
                },
                {
                    xtype: 'appointmentDisposeWindow',
                    itemId: 'appointmentDisposeWindow',
                    ename: 'appointmentDispose',
                    region:'east'
                }
            ];
            me.callParent();
        }


    });