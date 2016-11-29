/**
 * Created by yaonan on 2016/8/1.
 */
Ext.define('ExtFrame.view.main.appManage.appVersionDetail.AppVersionWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.appVersionWindow',
    controller: 'appVersionController',
    viewModel: {type: 'appVersionModel'},
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 400,
    closeAction: 'destroy',
    title: 'APP上传',
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
                title: 'apk信息',
                itemId: 'column1',
                collapsible: true,
                defaults: {
                    labelWidth: 89,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [{
                    xtype: 'hiddenfield',
                    itemId: 'version_hidden_oid',//注意，此itemId要写固定，functionjs中重置from有用到
                    name: 'id',
                    bind: '{rec.id}'
                },{
                    xtype: 'hiddenfield',
                    itemId: 'apk_upload_hidden_oid',//注意，此itemId要写固定，functionjs中重置from有用到
                    name: 'apkId',
                    bind: '{rec.apkId}'
                },{
                    xtype: 'hiddenfield',
                    itemId: 'appUrl',//注意，此itemId要写固定，functionjs中重置from有用到
                    name: 'appUrl',
                    bind: '{rec.appUrl}'
                },{
                    xtype: 'combo',
                    name: 'appId',
                    itemId: 'appId',
                    bind: '{rec.appId}',
                    emptyText: '请选择应用',
                    editable: false,// 是否允许输入
                    allowBlank: false,
                    queryMode: 'local',
                    displayField: 'appCName',
                    valueField: 'id',
                    fieldLabel: '所属应用',
                    store: Ext.create('ExtFrame.store.ModuleTree', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/appInfo/queryTree.do",
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
                      select: function (combo, record, index) {
                        this.up('#' + me.ename + 'Form').down('#appCode').setValue(record.raw.appCode) ;
                      }
                 }
                },
                    {
                    xtype: 'textfield',
                    name: 'appCode',
                    itemId: 'appCode',
                    bind: '{rec.appCode}',
                        editable: false,
                    fieldLabel: '所属编码',
                    emptyText: '请输入内容',
                    maxLength: 50
                },{
                        xtype: 'combo',
                        name: 'isNew',
                        bind: '{rec.isNew}',
                        //value: '0', //默认值
                        editable: false,// 是否允许输入
                        store: Ext.create('Ext.data.Store', {
                            fields: ['text', 'value'],
                            data: [{'value': '0', 'text': '历史'}, {'value': '1', 'text': '最新'}]
                        }),
                        queryMode: 'local',
                        displayField: 'text',
                        valueField: 'value',
                        fieldLabel: '最新版本',
                        emptyText : '请选择'
                    },{
                    xtype: 'textfield',
                    name: 'appPackage',
                    itemId: 'appPackage',
                    bind: '{rec.appPackage}',
                    fieldLabel: 'APP包名称',
                    maxLength: 200
                },{
                        xtype: 'textfield',
                        name: 'appName',
                        itemId: 'appName',
                        editable: false,
                        bind: '{rec.appName}',
                        fieldLabel: 'APP名称',
                        maxLength: 50
                    },
                    {
                    // 上传APP
                    xtype: 'button',
                    text: '上传APP',
                    handler: 'onClickUploadFile'
                },
                    {
                    xtype: 'textfield',
                    name: 'appVersion',
                    bind: '{rec.appVersion}',
                    fieldLabel: 'APP版本号',
                    emptyText: '请输入内容'
                },{
                        xtype: 'combo',
                        name: 'status',
                        bind: '{rec.status}',
                        //value: '0', //默认值
                        editable: false,// 是否允许输入
                        store: Ext.create('Ext.data.Store', {
                            fields: ['text', 'value'],
                            data: [{'value': '0', 'text': '启用'}, {'value': '1', 'text': '停用'}]
                        }),
                        queryMode: 'local',
                        displayField: 'text',
                        valueField: 'value',
                        fieldLabel: '状态',
                        emptyText : '请选择'
                    }, {
                    xtype: 'numberfield',
                    name: 'sortNo',
                    bind: '{rec.sortNo}',
                    fieldLabel: '排序',
                    emptyText: '请输入数值'
                }, {
                    xtype: 'textareafield',
                    name: 'remark',
                    bind: '{rec.remark}',
                    fieldLabel: '版本描述',
                    emptyText: '请输入内容'
                }
                ]
            }]
        }];
        me.buttons = [
            {
                xtype: "button", text: "保存",handler: 'onClickButtonSave'
            },{
                xtype: "button", text: "关闭", handler: 'onClickClear'
            }
        ];
        me.callParent();
    }
});
