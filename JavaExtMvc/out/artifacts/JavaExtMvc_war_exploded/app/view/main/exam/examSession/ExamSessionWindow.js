/**
 * Created by Jia on 2016/8/18.
 */
Ext.define('ExtFrame.view.main.exam.examSession.ExamSessionWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.examSessionWindow',
    controller: 'examSessionController',
    viewModel: {type: 'examSessionModel'},
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 400,
    closeAction: 'destroy',
    title: '场次管理',
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'examSessionForm',
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
                    xtype: 'hiddenfield',
                    itemId: 'batchId',//注意，此itemId要写固定，functionjs中重置from有用到
                    name: 'batchId',
                    bind: '{rec.batchId}'
                },{
                    xtype: 'combo',
                    name: 'examType',
                    bind: '{rec.examType}',
                    editable: false,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['text', 'value'],
                        data: [{'value': '0', 'text': '理论'}, {'value': '1', 'text': '实践'}]
                    }),
                    queryMode: 'local',
                    displayField: 'text',
                    valueField: 'value',
                    fieldLabel: '考试类型',
                    listeners: {
                        afterRender: function (combo) {
                            combo.setValue(combo.getStore().getAt(0).data.abbr);
                        }
                    }
                },{
                    xtype: 'combo',
                    name: 'examModle',
                    bind: '{rec.examModle}',
                    editable: false,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['text', 'value',''],
                        data: [{'value': '0', 'text': '竞赛'}, {'value': '1', 'text': '过关'}, {'value': '2', 'text': '练习'}]
                    }),
                    queryMode: 'local',
                    displayField: 'text',
                    valueField: 'value',
                    fieldLabel: '考试模式',
                    listeners: {
                        afterRender: function (combo) {
                            combo.setValue(combo.getStore().getAt(0).data.abbr);
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'examRoom',
                    id: 'examRoom',
                    bind: '{rec.examRoom}',
                    allowBlank: false,
                    fieldLabel: '考场',
                    maxLength: 100
                },{
                    xtype: 'datetimefield',
                    name: 'beginTime',
                    itemId: 'beginTime',
                    bind: '{rec.beginTime}',
                    format:"Y-m-d",
                    emptyText: '请选择开始时间',
                    fieldLabel: '开始时间',
                    editable: false,
                    allowBlank: false
                },{
                    xtype: 'datetimefield',
                    name: 'endTime',
                    itemId: 'endTime',
                    bind: '{rec.endTime}',
                    format: 'Y-m-d',
                    emptyText: '请选择结束时间',
                    fieldLabel: '结束时间',
                    editable: false,
                    allowBlank: false
                },{
                    xtype: 'numberfield',
                    name: 'examTime',
                    id: 'examTime',
                    bind: '{rec.examTime}',
                    allowBlank: false,
                    fieldLabel: '考试时间(分钟)'
                },{
                    xtype: 'combo',
                    name: 'typeOfWork',
                    itemId: 'typeOfWork',
                    bind: '{rec.typeOfWork}',
                    emptyText: '请选择所属类别',
                    editable: false,// 是否允许输入
                    allowBlank: false,
                    queryMode: 'local',
                    displayField: 'dictName',
                    valueField: 'dictName',
                    fieldLabel: '所属类别',
                    store: Ext.create('ExtFrame.store.ModuleTree', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/dict/queryToCombo.do?dictType=EXAM_TYPE",
                            reader: {
                                type: 'json',
                                rootProperty: 'rows',//数据根节点名称
                                totalProerty: 'total',//数据总数节点名称
                                idProperty: 'pttId'//id标示节点名称
                            },
                            //扩展参数
                            extraParams: {
                                'swhere': ""
                            },
                            listeners: {
                                //捕捉异常处理
                                exception: function (theproxy, response, operation, options) {
                                    Tools.Method.ExceptionEncap(response);
                                }
                            }
                        }
                    })
                },{
                    xtype: 'numberfield',
                    name: 'sortNo',
                    id: 'sortNo',
                    bind: '{rec.sortNo}',
                    allowBlank: false,
                    fieldLabel: '排序'
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