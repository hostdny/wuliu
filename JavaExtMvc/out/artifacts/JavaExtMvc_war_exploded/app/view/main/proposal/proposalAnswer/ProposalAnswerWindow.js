/**
 * Created by wangBin on 2016/9/29.
 */
Ext.define('ExtFrame.view.main.proposal.proposalAnswer.ProposalAnswerWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.proposalAnswerWindow',
    viewModel: {type: 'proposalAnswerModel'},
    layout: {type: 'border'},
    width: 700,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '人员信息',
    buttonAlign: 'center',
    autoScroll:true,
    fit: true,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'proposalAnswerForm',
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
                    xtype: 'displayfield',
                    name: 'title',
                    itemId: 'title',
                    bind: '{rec.title}',
                    fieldLabel: '提案题目'
                },{
                    xtype: 'textareafield',
                    name: 'content',
                    itemId: 'content',
                    disabled:true,
                    height:300,
                    bind: '{rec.content}',
                    fieldLabel: '提案内容'
                },{
                    xtype: 'textareafield',
                    name: 'replyContent',
                    itemId: 'replyContent',
                    allowBlank: false,
                    bind: '{rec.replyContent}',
                    height:300,
                    fieldLabel: '答复内容'
                }]
            },{
                xtype: 'downLoadGrid',
                itemId: 'downLoadGrid',
                ename: "proposalAnswer",
                region: 'south',
                split: true
            }]
        }];
        me.buttons = [
            {
                xtype: "button",
                text: "保存",
                handler: 'onClickButtonSave'
            },{
                xtype: "button",
                text: "关闭",
                handler: 'onClickClear'
            }
        ];
        me.callParent();
    }
});
