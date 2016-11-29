Ext.define('ExtFrame.view.main.cms.CmsWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cmsWindow',
    viewModel: {type: 'cmsModel'},
    layout: {type: 'border'},
    width: 700,
    closeAction: 'destroy',
    //title: '信息预览与编辑',
    buttonAlign: 'center',
    id: 'cmsWindow',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'cmsWindowForm',
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
                    itemId: 'ID',
                    name: 'oid',
                    bind: '{rec.oid}',
                    fieldLabel: 'ID',
                    readOnly: true
                }, {
                    xtype: 'hiddenfield',
                    itemId: 'programId',
                    name: 'programId',
                    bind: '{rec.programId}',
                    fieldLabel: 'programId',
                    readOnly: true
                }, {
                    xtype: 'hiddenfield',
                    itemId: 'type',
                    name: 'type',
                    bind: '{rec.type}',
                    fieldLabel: 'type',
                    readOnly: true
                }, {
                    xtype: 'hiddenfield',
                    itemId: 'hiddenArtilceContext',
                    name: 'artilceContext',
                    bind: '{rec.artilceContext}',
                    listeners: {
                        change: function (me, newValue, oldValue, eOpts) {
                            me.up('#cmsWindowForm').down('#artilceContext').setValue(newValue);
                        }
                    }
                }, {
                    xtype: 'hiddenfield',
                    itemId: 'hiddenChildrenArtilceContext',
                    name: 'childrenArtilceContext',
                    bind: '{rec.childrenArtilceContext}',
                    listeners: {
                        change: function (me, newValue, oldValue, eOpts) {
                            me.up('#cmsWindowForm').down('#childrenArtilceContext').setValue(newValue);
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'artilceUuid',
                    itemId: 'artilceUuid',
                    bind: '{rec.artilceUuid}',
                    emptyText: '请输入文章唯一号',
                    fieldLabel: '文章唯一号',
                    allowDecimals: false
                }, {
                    xtype: 'textfield',
                    name: 'artilceTittle',
                    itemId: 'artilceTittle',
                    bind: '{rec.artilceTittle}',
                    emptyText: '请输入文章标题',
                    fieldLabel: '文章标题',
                    allowDecimals: false
                }, {
                    xtype: 'textfield',
                    name: 'artilceAuthor',
                    itemId: 'artilceAuthor',
                    bind: '{rec.artilceAuthor}',
                    emptyText: '请输入文章作者',
                    fieldLabel: '文章作者',
                    allowDecimals: false
                }, {
                    xtype: 'textfield',
                    name: 'publishedMedia',
                    itemId: 'publishedMedia',
                    bind: '{rec.publishedMedia}',
                    emptyText: '请输入发布媒体',
                    fieldLabel: '发布媒体',
                    allowDecimals: false
                }, {
                    xtype: 'textfield',
                    name: 'artilceLink',
                    itemId: 'artilceLink',
                    bind: '{rec.artilceLink}',
                    emptyText: '请输入文章链接',
                    fieldLabel: '文章链接',
                    allowDecimals: false
                }, {
                    xtype: 'datefield',
                    name: 'publishedDate',
                    itemId: 'publishedDate',
                    bind: '{rec.publishedDate}',
                    format: 'Y年m月d日',
                    emptyText: '请输入日期',
                    fieldLabel: '发布日期',
                    editable: false
                }, {
                    xtype: 'numberfield',
                    name: 'sortNo',
                    itemId: 'sortNo',
                    bind: '{rec.sortNo}',
                    emptyText: '数值越大排序越靠前',
                    fieldLabel: '文章数值',
                    allowDecimals: false
                }, {
                    xtype: 'combo',
                    name: 'topDispaly',
                    bind: '{rec.topDispaly}',
                    emptyText: '请选择是否置顶',
                    editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'abbr',
                    fieldLabel: '置顶显示',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['abbr', 'name'],
                        data: [{'abbr': '0', 'name': '是'}, {'abbr': '1', 'name': '否'}]
                    })
                }]
            }, {
                xtype: 'displayfield',
                labelAlign: 'left',
                fieldLabel: '文章内容',
                whidth: '100%'

            }, {
                xtype: 'ueditor',
                itemId: 'artilceContext',
                width: '100%'
            }, {
                xtype: 'displayfield',
                labelAlign: 'left',
                fieldLabel: '子文章内容',
                whidth: '100%'
            }, {
                xtype: 'ueditor',
                itemId: 'childrenArtilceContext',
                width: '100%'
            }]
        }];
        me.buttons = [
            {
                xtype: "button",
                text: "保存",
                disabled: true,
                handler: function () {
                    var panel = this.up('panel').up('panel').up('panel');
                    //var cmsGrid = panel.down('#cmsGrid');
                    var cmsGrid = me.cmsArticleGrid;
                    var form = me.down('form');
                    var record = me.getViewModel().getData().rec;
                    record.artilceContext = me.down('#artilceContext').getValue();
                    record.childrenArtilceContext = me.down('#childrenArtilceContext').getValue();
                    Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/cmsArticle/save.do?delFlag=0', 'POST', record, true, function (jsonData) {
                        cmsGrid.store.getProxy().extraParams = {
                            'programId': record.programId
                        };
                        cmsGrid.store.reload();
                        form.getForm().reset();
                        //me.down('button').setDisabled(true);
                        me.up().close();
                        //me.cmsArticleGrid.store.load();
                    });
                }
            }
        ];
        this.callParent();
    }
});
