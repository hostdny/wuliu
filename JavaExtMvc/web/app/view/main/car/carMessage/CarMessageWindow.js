/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.car.carMessage.CarMessageWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.carMessageWindow',
    viewModel: {type: 'carMessageModel'},
    layout: {type: 'border'},
    width: 700,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '车辆信息',
    buttonAlign: 'center',
    autoScroll:'true',
    fit: true,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'carMessageForm',
            ename: me.ename,
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
                    name: 'carNum',
                    itemId: 'carNum',
                    bind: '{rec.carNum}',
                    emptyText: '请输入车辆编号',
                    fieldLabel: '车辆编号',
                    allowBlank: false,
                    allowDecimals: false
                }, {
                    xtype: 'textfield',
                    name: 'carType',
                    itemId: 'carType',
                    bind: '{rec.carType}',
                    emptyText: '请输入车辆型号',
                    fieldLabel: '车辆型号',
                    allowBlank: false,
                    allowDecimals: false
                }, {
                    xtype: 'textfield',
                    name: 'carId',
                    itemId: 'carId',
                    bind: '{rec.carId}',
                    emptyText: '请输入车牌号',
                    fieldLabel: '车牌号',
                    allowBlank: false,
                    allowDecimals: false
                }, {
                    xtype: 'datefield',
                    name: 'saleTime',
                    itemId: 'saleTime',
                    bind: '{rec.saleTime}',
                    emptyText: '请输入出厂日期',
                    fieldLabel: '出厂日期',
                    format: 'Y年m月d日',
                    allowBlank: false,
                    editable: false
                }, {
                    xtype: 'numberfield',
                    name: 'costTime',
                    itemId: 'costTime',
                    bind: '{rec.costTime}',
                    emptyText: '请输入使用年限',
                    fieldLabel: '使用年限',
                    allowBlank: false,
                    allowDecimals: false
                }, {
                    xtype: 'numberfield',
                    name: 'costKm',
                    itemId: 'costKm',
                    bind: '{rec.costKm}',
                    emptyText: '请输入公里数',
                    fieldLabel: '公里数',
                    allowBlank: false,
                    allowDecimals: false
                }]
            }]
        }];
        me.buttons = [
            {
                xtype: "button", text: "保存",itemId:'saveButton',handler: 'onClickButtonSave'
            },{
                xtype: "button", text: "关闭", handler: 'onClickClear'
            }
        ];
        me.callParent();
    }
});
