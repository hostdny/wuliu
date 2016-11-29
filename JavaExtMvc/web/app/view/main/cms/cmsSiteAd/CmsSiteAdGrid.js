/**
 * Created by zzw on 2016/9/26.
 */
Ext.define('ExtFrame.view.main.cms.cmsSiteAd.CmsSiteAdGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.cmsSiteAdGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;

        /********************** 根据具体业务需要适当修改 ***********************/
        var pageSize = 20;//分页条数
        var OrderField = 'sortNo';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC

        me.columns = [
            {text: 'id', dataIndex: 'id', hidden: true},
            {text: '站点名称', dataIndex: 'siteName'},
            {text: '广告名称', dataIndex: 'adName'},
            {text: '广告类型', dataIndex: 'adType'},
            {text: '广告位置', dataIndex: 'adAddress'},
            {text: '图片地址', dataIndex: 'adUrl',width:150},
            {text: '创建人名称', dataIndex: 'createName'},
            {text: '创建时间', dataIndex: 'createTime'},
            {text: '备注', dataIndex: 'remark'},
        ];
        //构造grid store
        me.store = Ext.create('ExtFrame.store.Role', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/cmsSiteAd/pagedQueryByBean.do",
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
        me.dockedItems = [
            {
                xtype: 'gridsearchtoolbar',
                itemId: 'searchtoolbar',
                ename: me.ename,//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
                searchEx: false,//扩展查询，当为true时，查询控件会自动构造sql语句的整个语句
                hasSearch: false,
                searchCols: me.columns.filter(function (col) {
                    return col.searchable;
                }),
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
                }
                    //    ,{
                    //    text: '搜索',
                    //    handler: "onClickSearch"
                    //}
                ]
            }, {
                xtype: 'pagingtoolbar',
                store: me.store,//分页控件数据（同grid的数据保持一致）
                dock: 'bottom',
                displayInfo: true,
                items: [
                    '-', {cls: 'x-btn-text-icon details'}
                ]
            }],
            me.selModel = Ext.create('Ext.selection.CheckboxModel', {
                mode: 'simple',//multi,simple,single；默认为多选multi
                injectCheckbox: 0//checkbox位于哪一列，默认值为0
                //checkOnly: true//如果值为true，则只用点击checkbox列才能选中此条记录,
            });
        me.callParent();
    }
});