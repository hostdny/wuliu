/**
 * Created by zzw on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.assets.sortManagement.SortManagementWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sortManagementWindow',
    viewModel: {type: 'sortManagementModel'},
    controller: 'sortManagementController',
    layout: {type: 'border'},
    width: 700,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '详细信息',
    buttonAlign: 'center',
    autoScroll:'true',
    fit: true,
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
                    itemId: 'id',//注意，此itemId要写固定，functionjs中重置from有用到
                    name: 'id',
                    bind: '{rec.id}'
                },{
                    xtype: 'textfield',
                    name: 'assentName',
                    bind: '{rec.assentName}',
                    emptyText: '请输入名称',
                    maxLength: 50,
                    fieldLabel: '名称'
                },{
                    xtype: 'datefield',
                    name: 'createTime',
                    itemId: 'createTime',
                    bind: '{rec.createTime}',
                    emptyText: '添加时间',
                    fieldLabel: '添加时间',
                    format:'Y-m-d',
                    allowBlank: false
                },{
                    xtype: 'numberfield',
                    name: 'assentOrder',
                    itemId: 'assentOrder',
                    bind: '{rec.assentOrder}',
                    emptyText: '数值越大排序越靠前',
                    fieldLabel: '排序',
                    allowDecimals: false
                },{
                    xtype: 'combo',
                    name: 'atype',
                    bind: '{rec.atype}',
                    emptyText: '资产类别',
                    maxLength: 50,
                    fieldLabel: '资产类别',
                    editable: false,
                    displayField: 'dictName',
                    valueField: 'dictValue',
                    field:{dictName:'',dictValue:''},
                    store: Ext.create('ExtFrame.store.ModuleTree', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/dict/queryToCombo.do?dictType=ZCLB",
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
                }]
            }]
            }];
        me.buttons = [
            {xtype: "button", text: "保存", handler: 'onClickButtonSave'},
            { xtype: "button", text: "关闭", handler: function () {
                this.up("panel").down('form').getForm().reset();
                this.up("panel").collapse();
            }
            }
        ];
        this.callParent();
    }
});
