/**
 * Created by wangBin on 2016/8/18.
 */
Ext.define(
    'ExtFrame.view.main.exam.examStudent.register.RegisterManager',
    {
        requires: [
            'ExtFrame.store.Race',
            'ExtFrame.view.main.exam.examStudent.register.RegisterModel',
            'ExtFrame.view.main.exam.examStudent.register.RegisterController',
            'ExtFrame.view.main.exam.examStudent.register.RegisterGrid',
            'ExtFrame.view.main.exam.examStudent.register.RegisterForm',
            'ExtFrame.view.main.exam.examStudent.register.RegisterDisPlayForm',
            'ExtFrame.view.main.exam.examStudent.register.RegisterUpload',
            'ExtFrame.view.main.exam.examStudent.register.RegisterWindow'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'examManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        id:"registerManagerId",
        controller: 'registerController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'registerGrid',
                    itemId: 'registerGrid',
                    ename: 'register',
                    region:'center'
                },
                {
                    xtype: 'registerWindow',
                    itemId: 'registerWindow',
                    ename: 'register',
                    region:'east'
                }
            ];
            me.callParent();
        }


    });