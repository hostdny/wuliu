/**
 * Created by zzw on 2016/10/26.
 */
Ext.define('ExtFrame.view.main.attorneyBoxManage.attorneyBox.AttorneyBoxPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.attorneyBoxPanel',
    controller: 'attorneyBoxController',
    viewModel: {type: 'attorneyBoxModel'},
    layout: {type: 'border'},
    closeAction: 'destroy',
    buttonAlign: 'center',
    fit: true,
    id:'attorneyBoxPanel',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'attorneyBoxPanelForm',
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
                title: '发件人信息',
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
                }, {
                    xtype: 'displayfield',
                    name: 'sendName',
                    itemId:'sendName',
                    bind: '{rec.sendName}',
                    emptyText: '姓名',
                    fieldLabel: '姓名',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'sendPhone',
                    itemId:'sendPhone',
                    bind: '{rec.sendPhone}',
                    emptyText: '电话',
                    fieldLabel: '电话',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'sendMail',
                    itemId:'sendMail',
                    bind: '{rec.sendMail}',
                    emptyText: 'E-Mail',
                    fieldLabel: 'E-Mail',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'sendAddress',
                    itemId:'sendAddress',
                    bind: '{rec.sendAddress}',
                    emptyText: '地址',
                    fieldLabel: '地址',
                    allowDecimals: false
                }]
            }, {
                xtype: 'fieldset',
                title: '邮件信息',
                itemId: 'column2',
                collapsible: true,
                defaults: {
                    labelWidth: 89,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [{
                    xtype: 'displayfield',
                    name: 'mailTitle',
                    itemId: 'mailTitle',
                    bind: '{rec.mailTitle}',
                    fieldLabel: '标题',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'mailContent',
                    itemId: 'mailContent',
                    bind: '{rec.mailContent}',
                    fieldLabel: '内容',
                    width:'100%',
                    allowDecimals: false
                }
                ]
            },{
                    xtype: 'fieldset',
                    title: '下载列表',
                    itemId: 'column3',
                    collapsible: true,
                    defaults: {
                        labelWidth: 89,
                        anchor: '100%',
                        layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                    },
                    items: [{
                        xtype: 'downLoadAttachmentGrid',
                        itemId: 'downLoadAttachmentGrid',
                        ename: me.ename,
                        split: true
                    }]
            },{
                xtype: 'fieldset',
                title: '邮件回复',
                itemId: 'column4',
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
                    name: 'reMailTitle',
                    itemId:'reMailTitle',
                    bind: '{rec.reMailTitle}',
                    emptyText: '题目',
                    fieldLabel: '题目',
                    allowDecimals: false
                },{
                    xtype: 'textareafield',
                    name: 'reMailContent',
                    itemId:'reMailContent',
                    bind: '{rec.reMailContent}',
                    emptyText: '发送内容',
                    fieldLabel: '发送内容',
                    allowDecimals: false
                },{
                    //xtype : 'filefield',
                    //name : 'file',
                    //id:'fileinput',
                    //margin:'5 0 0 0',
                    //fieldLabel : '附件路径',
                    //labelWidth : 60,
                    //msgTarget : 'side',
                    //allowBlank : false,
                    //buttonText : '请选择附件'
                }
                    ]
            }
            ]
        }];
        me.buttons = [
            {xtype: "button", text: "邮件发送", handler: 'onClickButtonSend'}
            //{
            //    xtype: "button", text: "保存", handler: 'onClickButtonSave'
            //}
            ,{
                xtype: "button", text: "关闭", handler: 'cancel'
            }
        ];
        me.callParent();
    }
});
