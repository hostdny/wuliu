/**
 * Created by zzw on 2016/8/18.
 */
Ext.define('ExtFrame.view.main.exam.examBatch.ExamBatchWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.examBatchWindow',
    controller: 'examBatchController',
    viewModel: {type: 'examBatchModel'},
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 700,
    closeAction: 'destroy',
    title: '批次管理',
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
                title: '批次管理',
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
                    xtype: 'textfield',
                    name: 'name',
                    id: 'name',
                    bind: '{rec.name}',
                    allowBlank: false,
                    fieldLabel: '批次名称',
                    maxLength: 100
                }, {
                    xtype: 'datetimefield',
                    name: 'beginDate',
                    id: 'beginDate',
                    bind: '{rec.beginDate}',
                    editable: false,
                    format:'Y-m-d',
                    fieldLabel: '开始鉴定时间'
                }, {
                    xtype: 'textareafield',
                    name: 'examAddress',
                    id: 'examAddress',
                    bind: '{rec.examAddress}',
                    fieldLabel: '考试地址'
                }, {
                    xtype: 'textfield',
                    name: 'contractPerson',
                    id: 'contractPerson',
                    bind: '{rec.contractPerson}',
                    fieldLabel: '联系人'
                }, {
                    xtype: 'textfield',
                    name: 'contractMethod',
                    id: 'contractMethod',
                    bind: '{rec.contractMethod}',
                    fieldLabel: '联系方式'
                }, {
                    xtype: 'combo',
                    name: 'isScoreView',
                    bind: '{rec.isScoreView}',
                    editable: false,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['text', 'value'],
                        data: [{'value': '0', 'text': '显示'}, {'value': '1', 'text': '不显示'}]
                    }),
                    queryMode: 'local',
                    displayField: 'text',
                    valueField: 'value',
                    fieldLabel: '是否显示分数',
                    listeners: {
                        afterRender: function (combo) {
                            combo.setValue(combo.getStore().getAt(0).data.abbr);
                        }
                    }
                }]
            }]
        }];
        me.buttons = [
            {xtype: "button", text: "保存", handler: 'onClickButtonSave'},
            {
                xtype: "button", text: "关闭", handler: function () {
                this.up("panel").collapse();
            }},
            { xtype: "button", text: "重置", handler: function () {
                this.up("panel").down('form').getForm().reset();
            }}
        ];
        this.callParent();
    }
});