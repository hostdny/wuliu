/**
 * Created by zzw on 2016/8/1.
 */
Ext.define('ExtFrame.view.main.incorruptManage.incorrupt.IncorruptWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.incorruptWindow',
    controller: 'incorruptController',
    viewModel: {type: 'incorruptModel'},
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 700,
    closeAction: 'destroy',
    title: '廉政举报',
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: me.ename + 'Form',
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
                title: '举报信息',
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
                    name: 'goverTitle',
                    id: 'goverTitle',
                    bind: '{rec.goverTitle}',
                    allowBlank: false,
                    fieldLabel: '标题'
                }, {
                    xtype: 'displayfield',
                    name: 'goverContent',
                    id: 'goverContent',
                    bind: '{rec.goverContent}',
                    editable: false,
                    fieldLabel: '举报简介'
                }, {
                    xtype: 'displayfield',
                    name: 'createTime',
                    id: 'createTime',
                    bind: '{rec.createTime}',
                    format:'Y-m-d',
                    fieldLabel: '举报时间'
                }, {
                    xtype: 'displayfield',
                    name: 'goverAddress',
                    id: 'goverAddress',
                    bind: '{rec.goverAddress}',
                    format:'Y-m-d',
                    fieldLabel: '举报地点'
                }]
            },{
                xtype: 'downLoadAttachmentGrid',
                itemId: 'downLoadAttachmentGrid',
                ename: me.ename,
                region: 'south',
                split: true
            },]
        }];
        me.buttons = [
            {
                xtype: "button", text: "关闭", handler: function () {
                this.up("panel").collapse();
            }
            }
        ];
        this.callParent();
    }
});