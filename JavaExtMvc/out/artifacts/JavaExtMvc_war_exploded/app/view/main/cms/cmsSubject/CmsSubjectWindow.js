/**
 * Created by Administrator on 2016/9/27.
 */
Ext.define('ExtFrame.view.main.cms.cmsSubject.CmsSubjectWindow', {
    //extend: 'Ext.panel.Panel',
    extend: 'Ext.window.Window',
    alias: 'widget.cmsSubjectWindow',
    controller: 'cmsSubjectController',
    viewModel: {type: 'cmsSubjectModel'},
    layout: {type: 'border'},
    width: 400,
    height: 300,
    //collapsible: true,
    //collapsed: true,
    closeAction: 'close',
    title: 'cms专题',
    buttonAlign: 'center',
    //autoScroll:true,
    fit: true,
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
                    itemId: 'hfOID',
                    name: 'id',
                    bind: '{rec.id}'
                },{
                    xtype: 'combo',
                    itemId: 'siteName',
                    name: 'siteName',
                    id: 'siteName',
                    editable: false,
                    emptyText: '请选择',
                    store: Ext.create('ExtFrame.store.Org', {
                        pageSize: 0,
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/cmsSite/queryAll.do",
                            reader: {
                                type: 'json'
                            }
                        }
                    }),
                    queryMode: 'local',
                    displayField: 'siteName',
                    valueField: 'siteId',
                    allowBlank: false,
                    fieldLabel: '站点名称',
                    maxLength: 100
                },{
                        xtype: 'textfield',
                        name: 'subjectName',
                        itemId: 'subjectName',
                        bind: '{rec.subjectName}',
                        emptyText: '请输入专题名称',
                        fieldLabel: '专题名称',
                        allowDecimals: false
                    }, {
                    xtype: 'textfield',
                    name: 'remark',
                    itemId: 'remark',
                    bind: '{rec.remark}',
                    emptyText: '请输入备注',
                    fieldLabel: '备注名称',
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
        me.callParent();
    }
});

