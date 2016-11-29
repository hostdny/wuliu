/**
 * Created by wangBin on 2016/9/21.
 */
Ext.define('ExtFrame.view.main.booksManagement.booksBorrowBackRenew.BooksBorrowBackRenewForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.booksBorrowBackRenewForm',
    itemId: 'booksBorrowBackRenewForm',
    buttonAlign: 'center',
    region: 'center',
    viewModel: { type: 'booksBorrowBackRenewModel' },
    autoScroll:'true',
    controller: 'booksBorrowBackRenewController',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 60,
        padding: 5
    },
    initComponent: function () {
        var me = this;
        me.items = [{
            layout: 'column',
            itemId: 'column1',
            items: [{
                xtype: 'hiddenfield',
                itemId: 'hfOID',
                name: 'id',
                bind: '{rec.}'
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
            }
            ]
        }
        ];
        me.buttons = [
            {
                xtype: "button", text: "提交", handler: ''
            }
        ];
        me.callParent();
    }


});