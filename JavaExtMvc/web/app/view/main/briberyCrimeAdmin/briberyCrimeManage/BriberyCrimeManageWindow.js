/**
 * Created by wangBin on 2016/9/21.
 */
Ext.define('ExtFrame.view.main.briberyCrimeAdmin.briberyCrimeManage.BriberyCrimeManageWindow', {
    //extend: 'Ext.panel.Panel',
    extend: 'Ext.window.Window',
    alias: 'widget.briberyCrimeManageWindow',
    controller: 'briberyCrimeManageController',
    viewModel: {type: 'briberyCrimeManageModel'},
    layout: {type: 'border'},
    closeAction: 'close',
    title: '使用须知',
    buttonAlign: 'center',
    fit: true,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'briberyCrimeManageForm',
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
                id:"hfOidid",
                name: 'id',
                bind: '{rec.id}'
            },{
                xtype: 'combo',
                name: 'isShow',
                itemId: 'isShow',
                bind: '{rec.isShow}',
                emptyText: '是否在网站端显示',//是否在网站端显示 0显示 1 不显示
                editable: false,// 是否允许输入
                queryMode: 'local',
                displayField: 'name',
                valueField: 'abbr',
                fieldLabel: '是否在网站端显示',
                store: Ext.create('Ext.data.Store', {
                    fields: ['abbr', 'name'],
                    data: [{'abbr': '0', 'name': '显示'}, {'abbr': '1', 'name': '不显示'}]
                })
            }, {
                xtype: 'textfield',
                itemId: 'title',
                name: 'title',
                fieldLabel: '标题',
                emptyText: '请输入标题',
                width: "100%",
                allowBlank: false,
                bind: '{rec.title}'
            }
            ]
        }, {
                xtype: 'displayfield',
                labelAlign: 'left',
                fieldLabel: '文章内容',
                whidth: '100%'

            }, {
                xtype: 'ueditor',
                itemId: 'content',
                width: '100%'
            }, {
                xtype: 'hiddenfield',
                itemId: 'hiddenContent',
                name: 'content',
                bind: '{rec.content}',
                listeners: {
                    change: function (me, newValue, oldValue, eOpts) {
                        me.up('#briberyCrimeManageForm').down('#content').setValue(newValue);
                    }
                }
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