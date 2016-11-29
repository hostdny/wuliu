/**
 * Created by zzw on 2016/8/3.
 */
Ext.define('ExtFrame.view.main.satisfaction.evaluationList.EvaluationListWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.evaluationListWindow',
    controller: 'evaluationListController',
    viewModel: {type: 'evaluationListModel'},
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 700,
    closeAction: 'destroy',
    title: '评价列表',
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
                title: '评价列表',
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
                    name: 'evaluationContent',
                    itemId: 'evaluationContent',
                    bind: '{rec.evaluationContent}',
                    allowBlank: false,
                    fieldLabel: '明细'
                }]
            }]
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