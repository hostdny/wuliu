/**
 * Created by wangBin on 2016/8/2.
 */
Ext.define('ExtFrame.view.main.weeklyFood.menu.MenuForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.menuForm',
    itemId: 'menuForm',
    region: 'center',
    viewModel: { type: 'menuModel' },
    layout: {type: 'border'},
    closeAction: 'destroy',
    buttonAlign: 'center',
    autoScroll:'true',
    fit: true,
    height:"100%",
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
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
                    name: 'foodNum',
                    itemId: 'foodNum',
                    bind: '{rec.foodNum}',
                    emptyText: '请输入编号',
                    fieldLabel: '编号',
                    allowDecimals: false,
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    name: 'foodName',
                    itemId: 'foodName',
                    bind: '{rec.foodName}',
                    emptyText: '请输入菜名',
                    fieldLabel: '菜名',
                    allowDecimals: false,
                    allowBlank: false
                },{
                    xtype: 'numberfield',
                    name: 'foodPrice',
                    itemId: 'foodPrice',
                    bind: '{rec.foodPrice}',
                    emptyText: '请输入价格',
                    fieldLabel: '价格(￥)',
                    allowBlank: false,
                    allowDecimals: false
                }]
            }]
        }];
        me.buttons = [
            {
                xtype: "button", text: "保存",handler: 'onClickButtonSave'
            },{
                xtype: "button", text: "关闭", handler: 'onClickClear'
            }
        ];
        me.callParent();
    }
});