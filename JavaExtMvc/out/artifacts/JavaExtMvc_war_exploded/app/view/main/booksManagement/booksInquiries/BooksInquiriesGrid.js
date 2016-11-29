/**
 * Created by Jia on 2016/9/20
 */
Ext.define('ExtFrame.view.main.booksManagement.booksInquiries.BooksInquiriesGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.booksInquiriesGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        var need_select = false;
        /********************** 根据具体业务需要适当修改 ***********************/
        var pageSize = 20;//分页条数
        var OrderField = 'bookName';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        /*
         ** grid控件绑定列
         ** text: 前台显示文字, dataIndex: 数据绑定字段, sortable: 能否排序（缺省值为true）
         ** searchable: 能否查询（缺省值为false）
         ** fieldType: 字段类型（用户查询控件拼接where字句，目前仅支持 string、int、datetime
         其中string类型使用'like'关键字查询，其余的使用'='关键字查询）
         */
        me.columns = [
            {xtype: 'rownumberer', width: 50, text:'序号',align: 'center'},
            {
                text: '图书名称',
                width: 100,
                sortable: true,
                searchable: true,
                fieldType: 'string',
                dataIndex: 'bookName'
            },{
                text: 'ISBN',
                width: 100,
                sortable: true,
                searchable: true,
                fieldType: 'string',
                dataIndex: 'bookIsbn'
            },{
                text: 'ISSN',
                width: 100,
                sortable: true,
                searchable: true,
                fieldType: 'string',
                dataIndex: 'bookIssn'
            },
            {text: '著者', dataIndex: 'bookAuthor'},
            {text: '分类', dataIndex: 'bookSort'},
            {text: '出版社', dataIndex: 'bookPress'},
            {text: '出版日期', dataIndex: 'publicationDate', width: 100},
            {text: '藏书位置', dataIndex: 'collectionPosition',width: 100},
            {
                text: '状态', dataIndex: 'bookState', renderer: function (v) {
                if (v == 0) {
                    return '已借';
                } else if (v == 1) {
                    return '未借';
                }else if (v == 2) {
                    return '逾期未还';
                }
            }}
        ];
        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            //autoLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/bookManage/pagedQueryByBean.do",
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
            xtype: 'gridSearchToolbarNoAdd',
            itemId: 'searchtoolbar',
            ename: 'booksBorrowBackRenew',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            searchEx: false,//扩展查询，当为true时，查询控件会自动构造sql语句的整个语句
            searchCols: me.columns.filter(function (col) {
                return col.searchable;
            }),
            dock: 'top',
            items: []
        }, {
            xtype: 'pagingtoolbar',
            store: me.store,//分页控件数据（同grid的数据保持一致）
            dock: 'bottom',
            displayInfo: true,
            items: [
                '-', {cls: 'x-btn-text-icon details'}
            ]
        }];
        me.selModel = Ext.create('Ext.selection.CheckboxModel', {
            mode: 'simple',//multi,simple,single；默认为多选multi
            injectCheckbox: 0,//checkbox位于哪一列，默认值为0
            checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true
        });
        me.callParent();
    }
});
