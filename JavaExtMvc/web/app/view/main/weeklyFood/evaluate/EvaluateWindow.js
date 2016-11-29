/**
 * Created by wangBin on 2016/8/1.
 */
Ext.define('ExtFrame.view.main.weeklyFood.evaluate.EvaluateWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.evaluateWindow',
    viewModel: {type: 'evaluateModel'},
    layout: {type: 'border'},
    width: 700,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '菜单评价信息',
    buttonAlign: 'center',
    autoScroll:true,
    fit: true,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'evaluateForm',
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
                    name: 'foodId',
                    itemId: 'foodId',
                    bind: '{rec.foodId}',
                    emptyText: '请选择菜名',
                    editable: false,// 是否允许输入
                    allowBlank: false,
                    queryMode: 'local',
                    displayField: 'foodName',
                    valueField: 'id',
                    fieldLabel: '菜名',
                    store: Ext.create('ExtFrame.store.ModuleTree', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/foodsDict/query.do",
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
                    xtype: 'combo',
                    name: 'opinionScore',
                    itemId: 'opinionScore',
                    bind: '{rec.opinionScore}',
                    width:"100%",
                    emptyText: '请选择星级',
                    editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'starText',
                    valueField: 'starValue',
                    fieldLabel: '星级',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['starValue', 'starText'],
                        data: [
                            {'starValue': '0', 'starText': '0'},
                            {'starValue': '1', 'starText': '0.5'},
                            {'starValue': '2', 'starText': '1'},
                            {'starValue': '3', 'starText': '1.5'},
                            {'starValue': '4', 'starText': '2'},
                            {'starValue': '5', 'starText': '2.5'},
                            {'starValue': '6', 'starText': '3'},
                            {'starValue': '7', 'starText': '3.5'},
                            {'starValue': '8', 'starText': '4'},
                            {'starValue': '9', 'starText': '4.5'},
                            {'starValue': '10', 'starText': '5'}
                        ]
                    })
                },{
                    xtype: 'textareafield',
                    name: 'content',
                    itemId: 'content',
                    bind: '{rec.content}',
                    emptyText: '请输入评论',
                    fieldLabel: '评论',
                    allowDecimals: false
                }]
            }]
        }];
        me.buttons = [
            {
                xtype: "button", text: "保存",itemId:"saveButtonId",handler: 'onClickButtonSave'
            },{
                xtype: "button", text: "关闭", handler: 'onClickClear'
            }
        ];
        me.callParent();
    }
});
