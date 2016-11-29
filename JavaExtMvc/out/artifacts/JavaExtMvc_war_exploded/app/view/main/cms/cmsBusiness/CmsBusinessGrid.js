/**
 * Created by Jia on 2016/10/25.
 */
Ext.define('ExtFrame.view.main.cms.cmsBusiness.CmsBusinessGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.cmsBusinessGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        var need_select = false;
        /********************** 根据具体业务需要适当修改 ***********************/
        var pageSize = 20;//分页条数
        var OrderField = 'sortNo';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {text: 'id', dataIndex: 'id', hidden: true},
            {text: '应用名称', dataIndex: 'programName', width: 180},
            {text: '应用URL', dataIndex: 'url', width: 180},
            {
                text: '是否需要登录', dataIndex: 'isNeedLogin', width: 180, renderer: function (v) {
                if (v == "0") {
                    return '否';
                } else if (v == "1") {
                    return '是';
                }
            }
            },
            {
                text: '是否在网站端显示', dataIndex: 'isShow', width: 180, renderer: function (v) {
                if (v == "0") {
                    return '显示';
                } else if (v == "1") {
                    return '不显示';
                }
            }
            },
            {text: '排序', dataIndex: 'sortNo'}
        ];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/cmsBusiness/pagedQueryByBean.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'id'//id标示节点名称
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
                labelWidth: 50,
                emptyText: '请输入站点名',
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
                    select: "onSelectTree"
                }
            },
                //{
                //    text: '搜索',
                //    handler: "onClickSearch"
                //}
            ]
        },
            //{
            //xtype: 'gridsearchtoolbar',
            //itemId: 'searchtoolbar',
            //ename: me.ename,//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            //searchEx: false,//扩展查询，当为true时，查询控件会自动构造sql语句的整个语句
            //searchCols: me.columns.filter(function (col) {
            //    return col.searchable;
            //}),
            //dock: 'top',
            //items: []
            //},
            {
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
