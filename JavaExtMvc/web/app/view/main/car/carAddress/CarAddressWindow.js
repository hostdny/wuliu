/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.car.carAddress.CarAddressWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.carAddressWindow',
    viewModel: {type: 'carAddressModel'},
    layout: {type: 'border'},
    width: 700,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '车辆轨迹',
    buttonAlign: 'center',
    autoScroll:true,
    fit: true,
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'carAddressButton',
                itemId: 'carAddressButton',
                id:"carAddressOid",
                region: 'center',
                height: '6%',
                width: '100%'
            },  {
                xtype: 'carAddressHtmlPanel',
                itemId: 'carAddressHtmlPanel',
                region: 'north',
                height: '94%',
                width: '100%'
            }
        ];
        me.callParent();
    }
});
