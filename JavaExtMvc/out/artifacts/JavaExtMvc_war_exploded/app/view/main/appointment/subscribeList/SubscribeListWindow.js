/**
 * Created by zzw on 2016/8/8.
 */
Ext.define('ExtFrame.view.main.appointment.subscribeList.SubscribeListWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.subscribeListWindow',
    controller: 'subscribeListController',
    viewModel: {type: 'subscribeListModel'},
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 700,
    closeAction: 'destroy',
    title: '预约列表',
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
                title: '预约列表',
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
                    xtype: 'displayfield',
                    name: 'consultationContent',
                    id: 'consultationContent',
                    bind: '{rec.consultationContent}',
                    allowBlank: false,
                    fieldLabel: '预约内容'
                }, {
                    xtype: 'combo',
                    name: 'orgName',
                    bind: '{rec.receiveOrgname}',
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