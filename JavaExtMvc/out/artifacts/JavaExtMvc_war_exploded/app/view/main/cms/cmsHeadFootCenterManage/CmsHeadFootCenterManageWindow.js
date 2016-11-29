/**
 * Created by MSI on 2016/9/25.
 */
Ext.define('ExtFrame.view.main.cms.cmsHeadFootCenterManage.CmsHeadFootCenterManageWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cmsHeadFootCenterManageWindow',
    controller: 'cmsHeadFootCenterManageController',
    viewModel: {type: 'cmsHeadFootCenterManageModel'},
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 700,
    closeAction: 'destroy',
    title: '查看与修改',
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
                title: '回复信息',
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
                    xtype: 'textareafield',
                    name: 'reply',
                    ItemId: 'reply',
                    bind: '{rec.reply}',
                    allowBlank: false,
                    fieldLabel: '回复内容'
                }, {
                    xtype: 'textfield',
                    name: 'artilceLink',
                    itemId: 'artilceLink',
                    bind: '{rec.artilceLink}',
                    emptyText: '请输入文章链接',
                    fieldLabel: '文章链接',
                    allowDecimals: false
                }]
            }]
        }];
        me.buttons = [
            {xtype: "button", text: "保存", handler: 'onClickButtonSave'},
            {
                xtype: "button", text: "关闭", handler: function () {
                this.up("panel").collapse();
            }
            }
        ];
        this.callParent();
    }
});