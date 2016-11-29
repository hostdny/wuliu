/**
 * Created by zzw on 2016/9/7.
 */
Ext.define('ExtFrame.view.main.officeDesk.newsInfo.NewsInfoWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.newsInfoWindow',
    controller: 'newsInfoController',
    viewModel: {type: 'newsInfoModel'},
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 700,
    closeAction: 'destroy',
    title: '公管理告',
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
                title: '公管理告',
                itemId: 'column1',
                collapsible: true,
                defaults: {
                    labelWidth: 89,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        itemId: 'hfOID',//注意，此itemId要写固定，functionjs中重置from有用到
                        name: 'id',
                        bind: '{rec.id}'
                    },{
                        xtype: 'textfield',
                        itemId: 'title',
                        name: 'title',
                        bind: '{rec.title}',
                        emptyText: '标题',
                        fieldLabel: '标题'
                   },{
                        xtype: 'textareafield',
                        hidden:true,
                        itemId: 'contentTxt',
                        name: 'contentTxt',
                        bind: '{rec.contentTxt}',
                        emptyText: '内容',
                        fieldLabel: '内容'
                    },{
                        xtype: 'numberfield',
                        name: 'orderNo',
                        itemId: 'orderNo',
                        bind: '{rec.orderNo}',
                        emptyText: '数值越大排序越靠前',
                        fieldLabel: '排序',
                        allowDecimals: false
                    }]
            },{
                xtype: 'ueditor',
                id: 'content',
                itemId: 'content',
                name: 'content',
                bind: '{rec.content}',
                fieldLabel: '内容',
                width: '100%'
            }]
        }];
        me.buttons = [
            {xtype: "button", text: "保存", handler: 'onClickButtonSave'},
            { xtype: "button", text: "关闭", handler: function () {
                this.up("panel").down('form').getForm().reset();
                this.up("panel").collapse();
            }}
        ];
        this.callParent();
    }
});