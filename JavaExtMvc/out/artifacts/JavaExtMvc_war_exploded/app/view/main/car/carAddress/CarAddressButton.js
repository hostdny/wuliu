/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.car.carAddress.CarAddressButton', {
    extend: 'Ext.form.Panel',
    alias: 'widget.carAddressButton',
    controller: 'carAddressController',
    layout: {type: 'border'},
    buttonAlign: 'center',
    autoScroll:true,
    fit: true,
    initComponent: function () {
        var me = this;
        me.buttons = [
            {
                xtype: "button", text: "关闭", handler: 'onClickClear'
            }
        ];
        me.callParent();
    }
});