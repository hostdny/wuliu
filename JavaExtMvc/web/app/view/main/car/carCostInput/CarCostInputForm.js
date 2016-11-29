/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.car.carCostInput.CarCostInputForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.carCostInputForm',
    controller: 'carCostInputController',
    viewModel: {type: 'carCostInputModel'},
    layout: {type: 'border'},
    buttonAlign: 'center',
    autoScroll:true,
    fit: true,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'carCostInputForm',
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
                    name: 'carNum',
                    itemId: 'carNum',
                    bind: '{rec.carNum}',
                    emptyText: '请选择车辆编号',
                    editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'carNum',
                    valueField: 'carNum',
                    fieldLabel: '车辆编号',
                    field:{dictName:'',dictValue:''},
                    store: Ext.create('ExtFrame.store.ModuleTree', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/carMessage/pagedQueryByBean.do?delFlag=0",
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
                }, {
                    xtype: 'combo',
                    name: 'costType',
                    itemId: 'costType',
                    bind: '{rec.costType}',
                    width:"100%",
                    emptyText: '请选择费用类型',
                    editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'dictName',
                    valueField: 'dictValue',
                    fieldLabel: '费用类型',
                    field:{dictName:'',dictValue:''},
                    store: Ext.create('ExtFrame.store.ModuleTree', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/dict/queryToCombo.do?dictType=JFLX",
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
                }, {
                    xtype: 'numberfield',
                    name: 'costMoney',
                    itemId: 'costMoney',
                    bind: '{rec.costMoney}',
                    emptyText: '请输入花费金额',
                    fieldLabel: '花费',
                    allowBlank: false,
                    allowDecimals: false
                }, {
                    xtype: 'datefield',
                    name: 'costDate',
                    itemId: 'costDate',
                    bind: '{rec.costDate}',
                    emptyText: '请输入日期',
                    fieldLabel: '日期',
                    format: 'Y年m月d日',
                    allowBlank: false,
                    editable: false
                }]
            },{
                xtype: 'carCostInputImg',
                itemId: 'carCostInputImg',
                region: 'south'
            }]
        }];
        me.buttons = [
            {
                xtype: "button", text: "保存",itemId:'saveButton',handler: 'onClickButtonSave'
            },{
                xtype: "button", text: "关闭", handler: 'onClickClear'
            }
        ];
        me.callParent();
    }
});