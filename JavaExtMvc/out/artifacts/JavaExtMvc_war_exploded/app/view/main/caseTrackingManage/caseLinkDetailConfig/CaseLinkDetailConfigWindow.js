/**
 * Created by Jia on 2016/11/02.
 */
Ext.define('ExtFrame.view.main.caseTrackingManage.caseLinkDetailConfig.CaseLinkDetailConfigWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.caseLinkDetailConfigWindow',
    viewModel: {type: 'caseLinkDetailConfigModel'},
    controller: 'caseLinkDetailConfigController',
    width: 550,
    height:350,
    plain: true,
    layout: 'fit',
    modal : true,
    closeAction:  'close',
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId:  me.ename+'Form',
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
                }, {
                    xtype: 'textfield',
                    name: 'caseName',
                    itemId: 'caseName',
                    bind: '{rec.caseName}',
                    emptyText: '套餐名称',
                    fieldLabel: '套餐名称',
                    allowDecimals: false
                },
                    {
                        xtype: 'combo',
                        itemId: 'caseType',
                        name: 'caseType',
                        bind: '{rec.caseType}',
                        editable: false,
                        emptyText: '请选择',
                        blankText: '请选择案件类型',// 该项如果没有选择，则提示错误信息,
                        displayField: 'dictName',
                        valueField: 'dictValue',
                        store: Ext.create('ExtFrame.store.Permission', {
                            pageSize: 0,
                            proxy: {
                                type: 'ajax',
                                url: Tools.Method.getAPiRootPath() + "/dict/queryToCombo.do?dictType=AJLB",
                                reader: {
                                    type: 'json'
                                }
                            }
                        }),
                        queryMode: 'local',
                        allowBlank: false,
                        fieldLabel: '案件所属类型',
                        maxLength: 100,
                        listeners: {
                            select: function (ppp, record, eOpts) {
                                var linkIds = me.down("#linkIds");
                                linkIds.enable();
                                var store = linkIds.store;
                                store.getProxy().extraParams = {
                                    'caseType': record.data.dictValue
                                };
                                store.reload();
                                //清空所选流程
                                linkIds.setValue();
                            }
                        }
                    },
                    {
                        xtype: 'combo',
                        name: 'linkIds',
                        itemId: 'linkIds',
                        bind: '{rec.linkIds}',
                        editable: false,// 是否允许输入
                        emptyText: '请选择流程',
                        allowBlank: false,// 不允许为空
                        blankText: '请选择流程',// 该项如果没有选择，则提示错误信息,
                        queryMode: 'local',
                        displayField: 'caseName',
                        valueField: 'id',
                        multiSelect: true,
                        fieldLabel: '流程配置',
                        store: Ext.create('ExtFrame.store.Permission', {
                            proxy: {
                                type: 'ajax',
                                url: Tools.Method.getAPiRootPath() + "/caseLinkDict/queryByCaseType.do",
                                extraParams: {
                                    caseType: "-1"
                                },
                                reader: {
                                    type: 'json',
                                    rootProperty: 'id'//数据根节点名称
                                }
                            }
                        })
                    }]
            }]
        }];
        me.buttons = [
            {xtype: "button", text: "保存", handler: 'onClickButtonSave'},
            {
                xtype: "button", text: "关闭", handler: 'cancel'
            }
        ];
        this.callParent();
    }
});
