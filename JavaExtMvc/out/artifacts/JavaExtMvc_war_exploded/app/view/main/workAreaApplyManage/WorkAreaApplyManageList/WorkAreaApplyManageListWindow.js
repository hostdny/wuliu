/**
 * Created by zzw on 2016/8/31.
 */
Ext.define('ExtFrame.view.main.workAreaApplyManage.WorkAreaApplyManageList.WorkAreaApplyManageListWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.workAreaApplyManageListWindow',
    controller: 'workAreaApplyManageListController',
    viewModel: {type: 'workAreaApplyManageListModel'},
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 700,
    closeAction: 'destroy',
    title: '基本信息',
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
                    name: 'areaName',
                    itemId: 'areaName',
                    bind: '{rec.areaId}',
                    fieldLabel: '工作区名称',
                    width:"100%",
                    editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'houseName',
                    valueField: 'id',
                    allowBlank: false,
                    field:{houseName:'',id:''},
                    store: Ext.create('ExtFrame.store.ModuleTree', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/WorkAreaManage/queryAll.do",
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
                    listeners : {
                        select: function (ppp, record, eOpts) {
                            var store = me.down("combo").store;
                            store.getProxy().extraParams = {
                                'areaId':record.data.id
                            };
                        }
                    }
                },{
                    xtype: 'datefield',
                    name: 'startTime',
                    bind: '{rec.startTime}',
                    editable: false,
                    format:'Y-m-d',
                    fieldLabel: '开始时间'
                },{
                    xtype: 'datefield',
                    name: 'endTime',
                    bind: '{rec.endTime}',
                    editable: false,
                    format:'Y-m-d',
                    fieldLabel: '结束时间'
                },{
                    xtype: 'numberfield',
                    name: 'personNum',
                    itemId: 'personNum',
                    bind: '{rec.personNum}',
                    allowBlank: false,
                    fieldLabel: '法警人数'
                },{
                    xtype: 'textfield',
                    name: 'createPerson',
                    itemId: 'createPerson',
                    bind: '{rec.createPerson}',
                    allowBlank: false,
                    fieldLabel: '申请人'
                },{
                    xtype: 'textfield',
                    name: 'createTelephone',
                    itemId: 'createTelephone',
                    bind: '{rec.createTelephone}',
                    allowBlank: false,
                    fieldLabel: '电话'
                },{
                    xtype: 'textareafield',
                    name: 'applyReason',
                    itemId: 'applyReason',
                    bind: '{rec.applyReason}',
                    allowBlank: false,
                    fieldLabel: '申请原因'
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