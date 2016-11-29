/**
 * Created by wangBin on 2016/8/18.
 */
Ext.define('ExtFrame.view.main.exam.examStudent.register.RegisterWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.registerWindow',
    viewModel: {type: 'registerModel'},
    layout: {type: 'border'},
    width: 700,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '考生信息',
    buttonAlign: 'center',
    autoScroll:true,
    fit: true,
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'registerForm',
                itemId: 'registerForm',
                region: 'center',
                height: '70%',
                width: '100%'
            }
            ,
            {
                xtype: 'registerDisPlayForm',
                itemId: 'registerDisPlayForm',
                region: 'center',
                height: '70%',
                hidden:true,
                width: '100%'
            },
            {
                xtype: 'registerUpload',
                itemId: 'registerUpload',
                region: 'north',
                height: '30%',
                width: '100%'
            }

        ];
        me.callParent();
    }
});
