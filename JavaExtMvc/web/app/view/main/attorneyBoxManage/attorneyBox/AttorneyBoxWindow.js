/**
 * Created by Jia on 2016/8/1.
 */
Ext.define('ExtFrame.view.main.attorneyBoxManage.attorneyBox.AttorneyBoxWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.attorneyBoxWindow',
    controller: 'attorneyBoxController',
    viewModel: {type: 'attorneyBoxModel'},
    layout: {type: 'border'},
    width: 700,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '详细信息',
    buttonAlign: 'center',
    fit: true,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'attorneyBoxForm',
            ename: me.ename,
            region: 'center',
            autoScroll: true,
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'right',
                padding: 2
            },
            items: [{
                //xtype: 'fieldset',
                //title: '发件人信息',
                //itemId: 'column1',
                //collapsible: true,
                //defaults: {
                //    labelWidth: 89,
                //    anchor: '100%',
                //    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                //},
                //items: [{
                //    xtype: 'hiddenfield',
                //    itemId: 'hfOID',//注意，此itemId要写固定，functionjs中重置from有用到
                //    name: 'id',
                //    bind: '{rec.id}'
                //}, {
                //    xtype: 'displayfield',
                //    name: 'sendName',
                //    itemId:'sendName',
                //    bind: '{rec.sendName}',
                //    emptyText: '姓名',
                //    fieldLabel: '姓名',
                //    allowDecimals: false
                //},{
                //    xtype: 'displayfield',
                //    name: 'sendPhone',
                //    itemId:'sendPhone',
                //    bind: '{rec.sendPhone}',
                //    emptyText: '电话',
                //    fieldLabel: '电话',
                //    allowDecimals: false
                //    },{
                //    xtype: 'displayfield',
                //    name: 'sendMail',
                //    itemId:'sendMail',
                //    bind: '{rec.sendMail}',
                //    emptyText: 'E-Mail',
                //    fieldLabel: 'E-Mail',
                //    allowDecimals: false
                //},{
                //    xtype: 'displayfield',
                //    name: 'sendAddress',
                //    itemId:'sendAddress',
                //    bind: '{rec.sendAddress}',
                //    emptyText: '地址',
                //    fieldLabel: '地址',
                //    allowDecimals: false
                //}]
            },
                //{
            //    xtype: 'fieldset',
            //    title: '邮件信息',
            //    itemId: 'column2',
            //    collapsible: true,
            //    defaults: {
            //        labelWidth: 89,
            //        anchor: '100%',
            //        layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
            //    },
            //    items: [{
            //        xtype: 'displayfield',
            //        name: 'mailTitle',
            //        itemId: 'mailTitle',
            //        bind: '{rec.mailTitle}',
            //        fieldLabel: '标题',
            //        width:'100%',
            //        allowDecimals: false
            //    },{
            //        xtype: 'displayfield',
            //        name: 'mailContent',
            //        itemId: 'mailContent',
            //        bind: '{rec.mailContent}',
            //        fieldLabel: '内容',
            //        width:'100%',
            //        allowDecimals: false
            //    },{
            //        xtype: 'combo',
            //        name: 'replyFlag',
            //        bind: '{rec.replyFlag}',
            //        itemId: 'replyFlag',
            //        editable: false,
            //        store: Ext.create('Ext.data.Store', {
            //            fields: ['text', 'value'],
            //            data: [{'value': '0', 'text': '未回复'}, {'value': '1', 'text': '已回复'}]
            //        }),
            //        queryMode: 'local',
            //        displayField: 'text',
            //        valueField: 'value',
            //        fieldLabel: '回复状态'
            //    }
            //]},
                {
                xtype: 'downLoadAttachmentGrid',
                itemId: 'downLoadAttachmentGrid',
                ename: me.ename,
                region: 'south',
                split: true
            }
            ]
            }];
        me.buttons = [
            //{
            //    xtype: "button", text: "保存", handler: 'onClickButtonSave'
            //},
            {
                xtype: "button", text: "关闭", handler: function () {
                this.up("panel").collapse();
            }
            }
        ];
        me.callParent();
    }
});
