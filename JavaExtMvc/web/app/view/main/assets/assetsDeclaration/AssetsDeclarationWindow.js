/**
 * Created by zzw on 2016/7/25.
 */
Ext.define('ExtFrame.view.main.assets.assetsDeclaration.AssetsDeclarationWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.assetsDeclarationWindow',
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 700,
    title: '资产申报',
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
                title: '资产申报',
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
                  //  editable: false,
                    emptyText: '类别',
                  //  allowBlank: false,// 不允许为空
                    blankText: '类别',// 该项如果没有选择，则提示错误信息
                    rootVisible: false,
                    displayField: 'assentName',
                    valueField: 'id',
                    store: me.store
                },{
                    name: 'nowNum',
                    xtype: 'numberfield',
                    itemId: 'nowNum',
                    bind: '{rec.nowNum}',
                  //  readOnly:true,
                    emptyText: '已有数量',
                    fieldLabel: '已有数量'
                },{
                    xtype: 'numberfield',
                    name: 'breakNum',
                    bind: '{rec.breakNum}',
                    emptyText: '损坏数量',
                    fieldLabel: '损坏数量'
                },{
                    xtype: 'numberfield',
                    name: 'needNum',
                    bind: '{rec.needNum}',
                    emptyText: '申请数量',
                    fieldLabel: '申请数量'
                },{
                    xtype: 'textareafield',
                    name: 'remark',
                    bind: '{rec.remark}',
                    emptyText: '备注',
                    fieldLabel: '备注'
                },{
                    xtype: 'textfield',
                    name: 'goodsType',
                    bind: '{rec.goodsType}',
                    emptyText: '型号',
                    fieldLabel: '型号'
                },{
                    xtype: 'textfield',
                    name: 'goodsName',
                    bind: '{rec.goodsName}',
                    emptyText: '品牌',
                    fieldLabel: '品牌'
                },{
                    xtype: 'datefield',
                    name: 'prodeuceTime',
                    bind: '{rec.prodeuceTime}',
                    format:'Y-m-d',
                    emptyText: '生产日期',
                    fieldLabel: '生产日期'
                },{
                    xtype: 'datefield',
                    name: 'saleTime',
                    format:'Y-m-d',
                    bind: '{rec.saleTime}',
                    emptyText: '购买日期',
                    fieldLabel: '购买日期'
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
