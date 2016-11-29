/**
 * Created by wangBin on 2016/8/1.
 */
Ext.define('ExtFrame.view.main.weeklyFood.menu.MenuWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.menuWindow',
    viewModel: {type: 'menuModel'},
    layout: {type: 'border'},
    width: 700,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '菜单信息',
    buttonAlign: 'center',
    autoScroll:true,
    fit: true,
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'menuForm',
                id: 'menuForm',
                itemId: 'menuForm',
                region: 'center',
                height: '70%',
                width: '100%'
            }
            ,
            {
                xtype: 'menuUpload',
                itemId: 'menuUpload',
                region: 'north',
                height: '30%',
                width: '100%'
            }
        ];
        me.callParent();
    }
});
