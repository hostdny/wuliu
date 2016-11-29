/**
 * Created by zzw on 2016/7/25.资产审核
 */
Ext.define('ExtFrame.view.main.assets.assetAudit.AssetAuditWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.assetAuditWindow',
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 700,
    title: '资产审核',
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.store = Ext.create('ExtFrame.store.User', {
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/assentType/pagedQueryByBean.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'id'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'swhere': "",
                    atype:"-1"
                },
                listeners: {
                    //捕捉异常处理
                    exception: function (theproxy, response, operation, options) {
                        Tools.Method.ExceptionEncap(response);
                    }
                }
            },
            listeners: {
                beforeload: function (store, operation, eOpts) {
                    var aaa = store;
                }
            }
        });
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
                title: '资产审核',
                itemId: 'column1',
                collapsible: true,
                defaults: {
                    labelWidth: 70,
                    anchor: '94%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [{
                    xtype: 'hiddenfield',
                    itemId: 'ID',//注意，此itemId要写固定，functionjs中重置from有用到
                    name: 'id',
                    bind: '{rec.id}'
                },{
                    xtype: 'combo',
                    itemId: 'atype',
                    fieldLabel: '资产类别',
                    name: 'atype',
                    bind: '{rec.atype}',
                    forceSelection: true,// 只能选择下拉框里面的内容
                    editable: false,
                    emptyText: '资产类别',
                    allowBlank: false,// 不允许为空
                    blankText: '资产类别',// 该项如果没有选择，则提示错误信息
                    rootVisible: false,
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
                    }),
                    listeners: {
                        //捕捉异常处理
                        select: function (combo, record, index) {
                            var atype = record.data.dictValue;
                            me.store.getProxy().extraParams = {
                                'atype': atype
                            };
                            //重新加载grid
                            me.store.reload();
                        }
                    }
                },{
                    xtype: 'combo',
                    itemId: 'assentName',
                    fieldLabel: '类别',
                    name: 'assentName',
                    bind: '{rec.assentName}',
                    forceSelection: true,// 只能选择下拉框里面的内容
                    editable: false,
                    emptyText: '类别',
                    //  allowBlank: false,// 不允许为空
                    blankText: '类别',// 该项如果没有选择，则提示错误信息
                    rootVisible: false,
                    displayField: 'assentName',
                    valueField: 'id',
                    store: me.store
                },{
                    xtype: 'combo',
                    name: 'orgName',
                    bind: '{rec.orgName}',
                    editable: false,
                    emptyText: '申请科室',
                    fieldLabel: '申请科室',
                    store: Ext.create('ExtFrame.store.ModuleTree', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/organization/queryOrgToCombo.do?parentId=4028981655e830080155e83792bc0000",
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
                    //xtype: 'numberfield',
                    //name: 'breakNum',
                    //bind: '{rec.breakNum}',
                    //emptyText: '损坏数量',
                    //fieldLabel: '损坏数量'
                },{
                    xtype: 'numberfield',
                    name: 'needNum',
                    bind: '{rec.needNum}',
                    emptyText: '申请数量',
                    editable: false,
                    fieldLabel: '申请数量'
                },{
                    //xtype: 'combo',
                    //name: 'checkState',
                    //bind: '{rec.checkState}',
                    //emptyText: '审核状态',
                    //fieldLabel: '审核状态'
                },{
                    xtype: 'textareafield',
                    name: 'remark',
                    bind: '{rec.remark}',
                    emptyText: '备注',
                    fieldLabel: '备注'
                }]
            },]
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
