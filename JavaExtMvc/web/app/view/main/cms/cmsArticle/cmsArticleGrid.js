Ext.define('ExtFrame.view.main.cms.cmsArticle.cmsArticleGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.cmsArticleGrid',
    viewModel: {type: 'cmsArticleModel'},
    fit: true,
    rootVisible: false,
    reserveScrollbar: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        var pageSize = 20;//分页条数
        var OrderField = 'createTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {text: 'id', dataIndex: 'oid', hidden: true},
            {text: '所属站点', width: 100, sortable: true, dataIndex: 'siteName'},
            {text: '所属栏目', width: 100, sortable: true, dataIndex: 'programName'},
            {text: '所属专题', width: 100, sortable: true, dataIndex: 'subjectName'},
            {text: '文章标题', width: 100, sortable: true, dataIndex: 'artilceTittle'},
            {text: '文章作者', width: 100, sortable: true, dataIndex: 'artilceAuthor'},
            {text: '发布媒体', width: 100, sortable: true, dataIndex: 'publishedMedia'},
            {text: '文章链接', width: 100, sortable: true, dataIndex: 'artilceLink'},
            {text: '发布时间', width: 150, sortable: true, dataIndex: 'publishedDate',
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
            xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
            ename: 'menu',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            hasSearch: false,
            dock: 'top',
            items: [{
                xtype: 'combo',
                itemId: 'siteName',
                allowNegative: false,
                name: 'siteName',
                fieldLabel: '站点名',
                emptyText: '请输入站点名',
                labelWidth: 50,
                allowDecimals: false,
                editable: false,
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
                        var programName = me.down("#programName");
                        programName.enable();
                        var store = programName.store;
                        store.getProxy().extraParams = {
                            'siteId': record.data.id
                        };
                        store.reload();
                    }
                }
            } , {
                xtype: 'treepicker',
                itemId: 'programName',
                name: 'programName',
                bind: '{rec.programName}',
                forceSelection: true,// 只能选择下拉框里面的内容
                emptyText: '请选择栏目名称',
                fieldLabel: '栏目名称',
                labelWidth: 70,
                rootVisible: false,
                disabled:true,
                displayField: 'name',
                valueField: 'pid',
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
                    },
                    listeners: {
                        nodebeforeexpand: function (node, eOpts) {
                            //点击父亲节点的菜单会将节点的id通过ajax请求，
                            if (node.id != "root") {
                                this.proxy.extraParams.parentId = node.raw.id;
                            } else {
                                this.proxy.extraParams.parentId = "";
                            }
                        }
                    }
                }),
                listeners : {
                select: function (ppp, record, eOpts) {
                    var aaa = me.down('#programId');
                    //将站点的Id放到前面的隐藏框内
                    me.down('#programId').setValue(record.data.pid);
                }
                }
            },{
                xtype: 'hiddenfield',
                name: 'programId',
                itemId: 'programId',
                bind: '{rec.programId}',
                allowDecimals: false
            }, {
                xtype: 'textfield',
                name: 'artilceTittle',
                itemId: 'artilceTittle',
                bind: '{rec.artilceTittle}',
                //allowBlank: false,
                labelWidth: 70,
                emptyText: '文章标题',
                fieldLabel: '文章标题'
            },{
                text: '搜索',
                handler: "onClickSearch"
            },{
                text: '重置',
                handler: "onClickBack"
            }]
        }, {
                xtype: 'pagingtoolbar',
                store: me.store,//分页控件数据（同grid的数据保持一致）
                dock: 'bottom',
                displayInfo: true,
                items: [
                    '-', {
                        cls: 'x-btn-text-icon details'
                    }
                ]
            }];
        me.selModel = Ext.create('Ext.selection.CheckboxModel', {
            mode: 'SIMPLE',//multi,simple,single；默认为多选multi
            injectCheckbox: 0,//checkbox位于哪一列，默认值为0
            checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true,
            onKeySpace: function (e) {
                need_select = true;

                var record = e.record || this.lastFocused;
                if (record) {
                    this.afterKeyNavigate(e, record);
                }
            },
            //在复选框表头处理选中全部记录和反选全部记录
            onHeaderClick: function (headerCt, header, e) {
                need_select = 'all';
                if (header.isCheckerHd) {
                    e.stopEvent();
                    var me = this,
                        isChecked = header.el.hasCls(Ext.baseCSSPrefix + 'grid-hd-checker-on');

                    me.preventFocus = true;
                    if (isChecked) {
                        me.deselectAll();
                    } else {
                        me.selectAll();
                    }
                    delete me.preventFocus;
                }
            }
        });//添加复选框列  如果不想有复选框是需要把selModel换成Ext.create('Ext.selection.RowModel',{mode:"SIMPLE"})就ok了
        me.callParent();
    }
});
