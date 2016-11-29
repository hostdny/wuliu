/**
 * Created by zzw on 2016/9/24.
 */
Ext.define('ExtFrame.view.main.briberyCrime.briberyCrimeBespeak.BriberyCrimeBespeakWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.briberyCrimeBespeakWindow',
    controller: 'briberyCrimeBespeakController',
    viewModel: {type: 'briberyCrimeBespeakModel'},
    layout: {type: 'border'},
    closeAction: 'destroy',
    buttonAlign: 'center',
    id: 'briberyCrimeBespeakWindowId',
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
                title: '回复信息',
                itemId: 'column1',
                collapsible: true,
                defaults: {
                    labelWidth: 89,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [{
                    xtype: 'hiddenfield',
                    itemId: 'hfOID',//注意，此itemId要写固定，functionjs中重置from有用到var id =  record.hfOID;
                    name: 'id',
                    bind: '{rec.id}'
                }, {
                    xtype: 'hiddenfield',
                    itemId: 'giveWay',
                    name: 'giveWay',
                    bind: '{rec.giveWay}'
                },
                    {
                        xtype: 'combo',
                        name: 'bespeakState',
                        bind: '{rec.bespeakState}',
                        itemId: 'bespeakState',
                        id: 'bespeakState',
                        editable: false,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['text', 'value', ''],
                            data: [{'value': '1', 'text': '同意'},
                                {'value': '2', 'text': '拒绝'}]
                        }),
                        queryMode: 'local',
                        displayField: 'text',
                        valueField: 'value',
                        fieldLabel: '审核状态',
                        listeners: {
                            select: function (aaa, record, eOpts) {
                                var form = me.up("panel").down('form');
                                if (record.data.text == "同意") {
                                    form.down("#address").show();
                                    form.down("#reply").hide();
                                    form.down("#reply").setValue("");
                                    var flag = form.down("#giveWay").value;
                                    if (flag == '0') {
                                        form.down("#addImg").show();
                                    } else {
                                        form.down("#addImg").hide();
                                    }

                                } else if (record.data.text == "拒绝") {
                                    form.down("#address").hide();
                                    form.down("#addImg").hide();
                                    form.down("#address").setValue("");
                                    form.down("#addImg").setValue("");
                                    form.down("#addImg").setRawValue("");
                                    form.down("#reply").show();
                                }
                            }
                        }
                    }, {
                        xtype: 'textareafield',
                        name: 'reply',
                        id: 'reply',
                        hidden: true,
                        itemId: 'reply',
                        bind: '{rec.reply}',
                        fieldLabel: '拒绝理由'
                    }, {
                        xtype: 'filefield',
                        hidden: true,
                        name: 'addImg',
                        itemId: 'addImg',
                        fieldLabel: '上传文件',
                        buttonText: '上传文件',
                        width: 375,
                        validator: function (value) {
                            if (value != "") {
                                var arr = value.split('.');
                                if (arr[arr.length - 1] != 'pdf') {
                                    return '请选择正确的文件类型！';
                                } else {
                                    return true;
                                }
                            } else {
                                return true;
                            }
                        }
                    }, {
                        xtype: 'textareafield',
                        name: 'address',
                        itemId: 'address',
                        bind: '{rec.address}',
                        hidden: true,
                        fieldLabel: '回复信息',
                        emptyText: '办理地址'
                    }]
            }, {
                xtype: 'downLoadGrid',
                itemId: 'downLoadGrid',
                ename: me.ename,
                region: 'south',
                split: true
            }
            ]
        }];
        me.buttons = [
            {xtype: "button", text: "保存", handler: 'onClickButtonSave'},
            {
                xtype: "button", text: "关闭", handler: function () {
                me.up("panel").down('form').getForm().reset();
                me.up().close();
            }
            }
        ];
        this.callParent();
    }
});
