/**
 * Created by wangBin on 2016/10/19.
 */
Ext.define('ExtFrame.view.main.booksManagement.booksBorrowBackRenew.BooksBorrowBackRenewWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.booksBorrowBackRenewWindow',
    controller: 'booksBorrowBackRenewController',
    viewModel: {type: 'booksBorrowBackRenewModel'},
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 600,
    closeAction: 'destroy',
    title: '图书信息',
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'booksBorrowBackRenewForm',
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
                    itemId: 'hfOID',//注意，此itemId要写固定，functionjs中重置from有用到
                    name: 'id',
                    bind: '{rec.id}'
                },{
                    xtype: 'textfield',
                    itemId: '',
                    name: '',
                    fieldLabel: '图书名称',
                    emptyText: '请输入图书名称',
                    width:"100%",
                    allowBlank: false,
                    bind: '{rec.}'
                },{
                    xtype: 'textfield',
                    itemId: '',
                    name: '',
                    fieldLabel: '科室',
                    emptyText: '请选择科室',
                    width:"100%",
                    bind: '{rec.}'
                },{
                    xtype: 'textfield',
                    itemId: '',
                    name: '',
                    fieldLabel: '姓名',
                    emptyText: '请选择姓名',
                    width:"100%",
                    bind: '{rec.}'
                },{
                    xtype: 'textfield',
                    itemId: '',
                    name: '',
                    fieldLabel: '手机号',
                    emptyText: '请填写手机号',
                    width:"100%",
                    bind: '{rec.}'
                },{
                    xtype: 'datefield',
                    itemId: '',
                    name: '',
                    fieldLabel: '借阅日期',
                    emptyText: '请填写借阅日期',
                    width:"100%",
                    bind: '{rec.}'
                },{
                    xtype: 'datefield',
                    itemId: '',
                    name: '',
                    fieldLabel: '续借日期',
                    emptyText: '请填写续借日期',
                    width:"100%",
                    bind: '{rec.}'
                },{
                    xtype: 'datefield',
                    itemId: '',
                    name: '',
                    fieldLabel: '应还日期',
                    emptyText: '请填写应还日期',
                    width:"100%",
                    bind: '{rec.}'
                }]
            }]
        }];
        me.buttons = [
            {
                xtype: "button", text: "保存", handler: 'onClickButtonSave'
            }, {
                xtype: "button", text: "关闭", handler: 'onClickClear'
            }
        ];
        this.callParent();
    }
});