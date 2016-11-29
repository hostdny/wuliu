/**
 * Created by admin on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.send.sendsFiles.SendsFilesWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sendsFilesWindow',
    controller: 'sendsFilesController',
    viewModel: {type: 'sendsFilesModel'},
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 400,
    closeAction: 'destroy',
    title: '信息预览与编辑',
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
                    xtype: 'combo',
                    name: 'creatOrgname',
                    itemId: 'creatOrgname',
                    bind: '{rec.creatOrgname}',
                    typeAhead:false,
                    editable:false,
                    emptyText: '填报科室',
                    fieldLabel: '科室',
                    displayField: 'cName',
                    valueField: 'id',
                    forceSelection: true,
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
                }, {
                    xtype: 'datefield',
                    name: 'createTime',
                    itemId: 'createTime',
                    bind: '{rec.createTime}',
                    format: 'Y.m.d',
                    value: new Date(),
                    emptyText: '请输入时间',
                    fieldLabel: '填报时间',
                    editable: false,
                    allowBlank: false

                },{
                    xtype: 'numberfield',
                    name: 'sendNum',
                    itemId: 'sendNum',
                    bind: '{rec.sendNum}',
                    emptyText: '请输入数值',
                    fieldLabel: '数量',
                    allowBlank: false,
                    //allowDecimals: false,
                    minValue:0,
                    maxValue: 100000
                }]
            }]
        }];
        me.buttons = [
            {xtype: "button", text: "保存", handler: 'onClickButtonSave'},
            {
                xtype: "button", text: "关闭", handler: function () {
                this.up("panel").collapse();
            }
            }
        ];
        this.callParent();
    }
});