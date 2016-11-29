/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.car.carCostInput.CarCostInputWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.carCostInputWindow',
    viewModel: {type: 'carCostInputModel'},
    layout: {type: 'border'},
    width: 700,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '费用录入',
    buttonAlign: 'center',
    autoScroll:true,
    fit: true,
    initComponent: function () {
        var me = this;
        me.items = [
            {
            xtype: 'carCostInputForm',
            id: 'carCostInputForm',
            itemId: 'carCostInputForm',
            region: 'center',
            height: '70%',
            width: '100%'
        }
            ,
            {
            xtype: 'carCostInputUpload',
            itemId: 'carCostInputUpload',
            region: 'north',
            height: '30%',
            width: '100%'
        }
        ];
        me.callParent();
    }
});
