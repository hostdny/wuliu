/**
 * Created by lihaiyue on 2016/9/27.
 */
Ext.define('ExtFrame.view.main.cms.cmsArticle.cmsArticleWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cmsArticleWindow',
    viewModel: {type: 'cmsArticleModel'},
    layout: {type: 'border'},
    closeAction: 'destroy',
    buttonAlign: 'center',
    id: 'cmsArticleWindow',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'cmsArticleWindowForm',
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
                            me.up('#cmsArticleWindowForm').down('#artilceContext').setValue(newValue);
                        }
                    }
                },
                    //    {
                    //    xtype: 'hiddenfield',
                    //    itemId: 'hiddenChildrenArtilceContext',
                    //    name: 'childrenArtilceContext',
                    //    bind: '{rec.childrenArtilceContext}',
                    //    listeners: {
                    //        change: function (me, newValue, oldValue, eOpts) {
                    //            me.up('#cmsArticleWindowForm').down('#childrenArtilceContext').setValue(newValue);
                    //        }
                    //    }
                    //},
                    {
                        xtype: 'hiddenfield',
                        name: 'artilceUuid',
                        itemId: 'artilceUuid',
                        bind: '{rec.artilceUuid}',
                        emptyText: '请输入文章唯一号',
                        fieldLabel: '文章唯一号',
                        allowDecimals: false
                    }, {
                        xtype: 'hiddenfield',
                        name: 'siteId',
                        itemId: 'siteId',
                        bind: '{rec.siteId}',
                        fieldLabel: '站点Id',
                        allowDecimals: false,
                        readOnly: true
                    }, {
                        xtype: 'combo',
                        itemId: 'siteName',
                        allowNegative: false,
                        name: 'siteName',
                        bind: '{rec.siteName}',
                        fieldLabel: '站点名',
                        emptyText: '请输入站点名',
                        allowDecimals: false,
                        editable: false,
                        allowBlank: false,
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
                        valueField: 'id',
                        listeners: {
                            select: function (ppp, record, eOpts) {
                                //将站点的Id放到前面的隐藏框内
                                me.down('#siteId').setValue(record.data.id);
                                //选择站点后将栏目名称下的store刷新
                                var store = me.down("#programName").store;
                                store.getProxy().extraParams = {
                                    'siteId': record.data.id
                                };
                                store.reload();

                                var subjectStore = me.down("#subjectName").store;
                                subjectStore.getProxy().extraParams = {
                                    'siteId': record.data.id
                                };
                                subjectStore.reload();
                                me.down('#cmsArticleWindowForm').down('#programId').setValue();
                                me.down('#cmsArticleWindowForm').down('#programName').setValue();
                                me.down('#cmsArticleWindowForm').down('#subjectId').setValue();
                                me.down('#cmsArticleWindowForm').down('#subjectName').setValue();
                            }
                        }
                    }, {
                        xtype: 'hiddenfield',
                        name: 'programId',
                        itemId: 'programId',
                        bind: '{rec.programId}',
                        fieldLabel: '栏目Id',
                        allowDecimals: false
                    }, {
                        xtype: 'treepicker',
                        itemId: 'programName',
                        name: 'programName',
                        bind: '{rec.programName}',
                        forceSelection: true,// 只能选择下拉框里面的内容
                        emptyText: '请选择栏目名称',
                        fieldLabel: '栏目名称',
                        rootVisible: false,
                        displayField: 'name',
                        valueField: 'pid',
                        allowBlank: false,
                        autoLoad: true,
                        queryMode: 'local',
                        store: Ext.create('ExtFrame.store.OrgTree', {
                            root: {
                                typeName: '',
                                parentId: "",
                                expanded: true
                            },
                            proxy: {
                                type: 'ajax',
                                url: Tools.Method.getAPiRootPath() + '/cmsProgram/queryAllNews.do',
                                reader: {
                                    type: 'json'
                                },
                                extraParams: {
                                    siteId: "-1"
                                }
                            }
                        }),
                        listeners: {
                            nodebeforeexpand: function (node, eOpts) {
                                //点击父亲节点的菜单会将节点的id通过ajax请求，
                                if (node.id != "root") {
                                    this.proxy.extraParams.parentId = node.raw.id;
                                } else {
                                    this.proxy.extraParams.parentId = "";
                                }
                            },
                            select: function (ppp, record, eOpts) {
                                //将站点的Id放到前面的隐藏框内
                                me.down('#programId').setValue(record.data.pid);
                                //刷新专题框
                                //var store = me.down("#subjectName").store;
                                //store.getProxy().extraParams = {
                                //    'subjectId': record.data.pid
                                //};
                                //ppp.up().up().down('#subjectId').setValue();
                                //ppp.up().up().down('#subjectName').setValue();
                                //store.reload();
                            }
                        }
                    }, {
                        xtype: 'hiddenfield',
                        name: 'subjectId',
                        itemId: 'subjectId',
                        bind: '{rec.subjectId}',
                        fieldLabel: '专题Id',
                        allowDecimals: false
                    }, {
                        xtype: 'combo',
                        itemId: 'subjectName',
                        allowNegative: false,
                        name: 'subjectName',
                        bind: '{rec.subjectName}',
                        fieldLabel: '所属专题',
                        emptyText: '请输入专题',
                        autoLoad: true,
                        queryMode: 'local',
                        allowDecimals: false,
                        editable: false,
                        store: Ext.create('ExtFrame.store.Org', {
                            proxy: {
                                type: 'ajax',
                                url: Tools.Method.getAPiRootPath() + "/cmsSubject/queryAll.do",
                                reader: {
                                    type: 'json'
                                },
                                extraParams: {
                                    siteId: "-1"
                                }
                            }
                        }),
                        displayField: 'subjectName',
                        valueField: 'id',
                        listeners: {
                            select: function (ppp, record, eOpts) {
                                //将专题的Id放到前面的隐藏框内
                                me.down('#subjectName').setValue(record.data.id);
                            }
                        }
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
                        emptyText: '请输入文章链接(如www.baidu.com)',
                        fieldLabel: '文章链接',
                        allowDecimals: false
                    }, {
                        xtype: 'numberfield',
                        name: 'sortNo',
                        itemId: 'sortNo',
                        bind: '{rec.sortNo}',
                        emptyText: '排序数值越大排序越靠前',
                        fieldLabel: '文章排序',
                        allowDecimals: false
                    }, {
                        xtype: 'numberfield',
                        name: 'clickRate',
                        bind: '{rec.clickRate}',
                        itemId: 'clickRate',
                        emptyText: '请选择点击量',
                        editable: true,// 是否允许输入
                        queryMode: 'local',
                        displayField: 'name',
                        value: 1,
                        fieldLabel: '点击量'
                    }, {
                        xtype: 'textfield',
                        name: 'remark',
                        itemId: 'remark',
                        bind: '{rec.remark}',
                        emptyText: '备注',
                        fieldLabel: '备注',
                        allowDecimals: false
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
            }]
        }];
        me.buttons = [{
            xtype: "button",
            text: "保存",
            disabled: true,
            handler: function () {
                var form = me.down('form');
                var record = me.getViewModel().getData().rec;
                record.subjectName = me.down('#subjectName').getRawValue();
                if(record.subjectName == ""){
                    record.subjectId = "";
                }else{
                    record.subjectId = me.down('#subjectName').getValue();
                }
                if (me.down('#artilceContext').getValue() != "") {
                    record.artilceContext = me.down('#artilceContext').getValue();
                    record.clickRate = me.down('#clickRate').getValue();
                }
                Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/cmsArticle/save.do?delFlag=0', 'POST', record, true,
                    function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            var cmsArticleGrid = Ext.getCmp("cmsArticleGrid");
                            cmsArticleGrid.store.reload();
                            me.up().close();
                        }
                    });
            }
        }, {
            xtype: "button",
            text: "关闭",
            handler: function () {
                me.up().close();
            }
        }
        ];
        this.callParent();
    }
});