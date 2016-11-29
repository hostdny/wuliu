Ext.define('ExtFrame.view.main.cms.CmsGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.cmsGrid',
    viewModel: {type: 'cmsModel'},
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        var pageSize = 10;//分页条数
        var OrderField = 'sortNo';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {
                text: '标题',
                width: 200,
                sortable: true,
                dataIndex: 'artilceTittle'
            },
            {
                text: '作者',
                width: 200,
                sortable: true,
                dataIndex: 'artilceAuthor'
            },
            {
                text: '发布媒体',
                width: 200,
                sortable: true,
                dataIndex: 'publishedMedia'
            },
            {
                text: '置顶显示',
                width: 200,
                sortable: true,
                dataIndex: 'topDispaly'
            },
            {
                text: '发布时间',
                width: 300,
                sortable: true,
                dataIndex: 'publishedDate',
                field: {
                    xtype: 'textfield'
                },
                renderer: function (value) {
                    if (value != '' && value != null) {
                        var newTime = new Date(value);
                        var time = Ext.Date.format(newTime, 'Y年m月d日');
                        return time;
                    } else {
                        return value;
                    }
                }
            }

        ];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/cmsArticle/pagedQueryByBean.do?delFlag=0",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'pttId'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'swhere': "",
                    programId: ''
                },
                listeners: {
                    //捕捉异常处理
                    exception: function (theproxy, response, operation, options) {
                        Tools.Method.ExceptionEncap(response);
                    }
                }
            },
            listeners: {
                beforeload: function (store, operation, eOpts) {
                    var aaa = store;
                }
            }
        });


        //grid 停靠item
        me.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                itemId: 'add',
                text: '增加',
                handler: function () {
                    if (!Tools.Method.IsLogin())
                        return;
                    var window = Ext.create('Ext.Window', {
                        width: 850,
                        height:550,
                        plain: true,
                        modal : true,
                        layout: 'fit',
                        closeAction: 'destroy',
                        title: '信息预览与编辑',
                        autoShow: true,
                        closable: true,
                        itemId: 'cmsWindows',
                        items: {
                            xtype: 'cmsWindow',
                            itemId: 'cmsWindow',
                            'cmsArticleGrid':'',
                            requires: ['ExtFrame.view.main.cms.CmsController'],
                            controller: 'cmsController'
                        }
                    }).show();
                    window.down('#cmsWindow').cmsArticleGrid = me;
                    var panel = this.up('panel').up('panel').up('panel');
                    //var window = panel.down('#cmsWindow');
                    var button = window.down('button');
                    button.enable();
                    var cmsTree = panel.down('#cmsTree');
                    var form = window.down('#cmsWindowForm');
                    form.getForm().reset();
                    var selections = cmsTree.getSelection();
                    if (selections[0]) {
                        var pid = selections[0].data.pid;
                        var parentOid = selections[0].data.parentOid;
                        var isMain = selections[0].data.isMain;
                        if (isMain == 0) {
                            return;
                        }
                        window.down('#programId').setValue(pid);
                        window.down('#type').setValue(parentOid);
                    } else {
                        Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
                        window.close();
                    }

                }
            }, '-', {
                itemId: 'upDate',
                text: '修改',
                handler: function () {

                    var selectRecords = me.getSelection();
                    if (!Tools.Method.IsLogin())
                        return;
                    var window = Ext.create('Ext.Window', {
                        width: 850,
                        height:550,
                        plain: true,
                        layout: 'fit',
                        modal : true,
                        closeAction: 'destroy',
                        title: '信息预览与编辑',
                        autoShow: true,
                        closable: true,
                        itemId: 'cmsWindows',
                        items: {
                            xtype: 'cmsWindow',
                            itemId: 'cmsWindow',
                            'cmsArticleGrid':'',
                            requires: ['ExtFrame.view.main.cms.CmsController'],
                            controller: 'cmsController'
                        }
                    }).show();
                    window.down('#cmsWindow').cmsArticleGrid = me;
                    var panel = this.up('panel').up('panel').up('panel');
                    //var window = panel.down('#cmsWindow');
                    var form = window.down('#cmsWindowForm');
                    var button = window.down('button');
                    button.enable();
                    var artilceContext = window.down('#artilceContext');
                    var childrenArtilceContext = window.down('#childrenArtilceContext');
                    if (selectRecords[0]) {
                        form.getForm().loadRecord(selectRecords[0]);
                        // alert(artilceContext.getValue());

                        setTimeout(function () {
                            if (artilceContext.getValue() != null) {
                                var old = window.down('#hiddenArtilceContext').getValue();
                                window.down('#hiddenArtilceContext').setValue("");
                                window.down('#hiddenArtilceContext').setValue(old);
                            }
                            if (childrenArtilceContext.getValue() != null) {
                                var old = window.down('#hiddenChildrenArtilceContext').getValue();
                                window.down('#hiddenChildrenArtilceContext').setValue("");
                                window.down('#hiddenChildrenArtilceContext').setValue(old);
                            }
                        }, 1500);
                    } else {
                        Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
                        window.close();
                    }
                }
            }, '-', {
                itemId: 'delete',
                text: '删除',
                handler: function () {
                    if (!Tools.Method.IsLogin())
                        return;
                    var panel = this.up('panel').up('panel').up('panel');
                    //var window = panel.down('#cmsWindow');
                    //var button = window.down('button');
                    //var button = me.down('#delete');
                    //button.setDisabled(true);
                    //var form = window.down('#cmsWindowForm');
                    var selection = me.getSelectionModel().getSelection();//获取grid选中行
                    if (selection[0]) {
                        var data = {ids: selection[0].data.oid};

                        //用户确认删除操作-----点击“是”
                        Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
                            if (btn == 'yes') {
                                Tools.Method.ExtAjaxRequestEncap('/cmsArticle/delete.do', 'POST', data, true, function (jsonData) {
                                    if (jsonData.resultCode) {
                                        me.store.getProxy().extraParams = {
                                            'programId': selection[0].data.programId
                                        };
                                        me.store.reload();
                                        //form.reset();
                                    }
                                    else {
                                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                                    }
                                });
                            }
                        });
                    } else {
                        Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
                    }
                }
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: me.store,//分页控件数据（同grid的数据保持一致）
            dock: 'bottom',
            displayInfo: true,
            items: [
                '-', {cls: 'x-btn-text-icon details'}
            ]
        }];
        me.callParent();
    }
});