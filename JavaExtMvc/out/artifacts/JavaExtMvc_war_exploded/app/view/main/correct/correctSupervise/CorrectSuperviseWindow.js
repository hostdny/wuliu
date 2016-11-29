/**
 * Created by wangBin on 2016/7/28.
 */
Ext.define('ExtFrame.view.main.correct.correctSupervise.CorrectSuperviseWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.correctSuperviseWindow',
    controller: 'CorrectSuperviseController',
    viewModel: {type: 'correctSuperviseModel'},
    layout: {type: 'border'},
    closeAction: 'destroy',
    stripeRows: true,
    buttonAlign: 'center',
    id: 'correctSuperviseWindowId',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'correctSuperviseForm',
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
                    xtype: 'combo',
                    name: 'lid',
                    itemId: 'lid',
                    bind: '{rec.lid}',
                    emptyText: '请选择人员',
                    editable: false,// 是否允许输入
                    multiSelect: true,
                    allowBlank: false,
                    queryMode: 'local',
                    displayField: 'correctName',
                    valueField: 'id',
                    fieldLabel: '人员',
                    store: Ext.create('ExtFrame.store.ModuleTree', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/correctLinker/queryCorrectLinker.do",
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
                    name: 'correctTime',
                    itemId: 'correctTime',
                    bind: '{rec.correctTime}',
                    emptyText: '请输入周期',
                    fieldLabel: '周期(小时)',
                    value:24,
                    allowBlank: false,
                    allowDecimals: false
                },{
                    xtype: 'textareafield',
                    name: 'remark',
                    itemId: 'remark',
                    bind: '{rec.remark}',
                    emptyText: '请输入备注',
                    fieldLabel: '备注',
                    allowDecimals: false
                }]
            }]
        }];
        me.buttons = [
            {
                xtype: "button", text: "保存",handler: 'onClickButtonSave'
            },{
                xtype: "button", text: "关闭", handler: 'onClickClear'
            }
        ];
        me.callParent();
    }
});
