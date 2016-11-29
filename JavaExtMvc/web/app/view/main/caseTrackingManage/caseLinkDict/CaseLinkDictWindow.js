/**
 * Created by Jia on 2016/11/02.
 */
Ext.define('ExtFrame.view.main.caseTrackingManage.caseLinkDict.CaseLinkDictWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.caseLinkDictWindow',
    viewModel: {type: 'caseLinkDictModel'},
    controller: 'caseLinkDictController',
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
                        xtype: 'hiddenfield',
                        itemId: 'operTeam',//注意，此itemId要写固定，functionjs中重置from有用到
                        name: 'operTeam',
                        bind: '{rec.operTeam}'
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
                        maxLength: 100
                    },
                    {
                        xtype: 'combo',
                        name: 'operTeamId',
                        itemId: 'operTeamId',
                        bind: '{rec.operTeamId}',
                        editable: false,// 是否允许输入
                        emptyText: '请选择受理科室',
                        allowBlank: false,// 不允许为空
                        blankText: '请选择受理科室',// 该项如果没有选择，则提示错误信息,
                        queryMode: 'local',
                        displayField: 'cName',
                        valueField: 'id',
                        fieldLabel: '流程受理科室',
                        store: Ext.create('ExtFrame.store.Permission', {
                            proxy: {
                                type: 'ajax',
                                url: Tools.Method.getAPiRootPath() + "/organization/queryOrgToCombo.do?parentId=4028981655e830080155e83792bc0000",
                                reader: {
                                    type: 'json',
                                    rootProperty: 'permissions'//数据根节点名称
                                }
                            }
                        }),
                        listeners: {
                            select: function (me, record, eOpts) {
                                me.up('#column1').down('#operTeam').setValue(record.data.cName);
                            }
                        }
                    },
                    {
                        xtype: 'textfield',
                        name: 'caseName',
                        itemId: 'caseName',
                        bind: '{rec.caseName}',
                        emptyText: '流程名字',
                        fieldLabel: '流程名字',
                        allowDecimals: false
                    }, {
                        xtype: 'textfield',
                        name: 'caseCode',
                        itemId: 'caseCode',
                        bind: '{rec.caseCode}',
                        emptyText: '流程编码',
                        fieldLabel: '流程编码',
                        allowDecimals: false
                    }, {
                        xtype: 'numberfield',
                        name: 'daying',
                        itemId: 'daying',
                        bind: '{rec.daying}',
                        emptyText: '流程周期（单位天）',
                        fieldLabel: '流程周期',
                        allowDecimals: false
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
