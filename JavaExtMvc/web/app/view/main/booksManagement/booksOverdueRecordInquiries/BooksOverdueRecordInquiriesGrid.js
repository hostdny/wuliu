/**
 * Created by Jia on 2016/9/20.
 */
Ext.define('ExtFrame.view.main.booksManagement.booksOverdueRecordInquiries.BooksOverdueRecordInquiriesGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.booksOverdueRecordInquiriesGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;

        /********************** 根据具体业务需要适当修改 ***********************/
        var pageSize = 20;//分页条数
        var OrderField = 'bookRebackDate';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC

        me.columns = [
            {xtype: 'rownumberer', width: 50, text:'序号',align: 'center'},
            {text: '图书名称', dataIndex: 'bookName'},
            { text: 'ISBN',dataIndex: 'bookIsbn',width: 150},
            { text: 'ISSN',dataIndex: 'bookIssn',width: 150},
            {text: '著者', dataIndex: 'bookAuthor'},
            {text: '分类', dataIndex: 'bookSort'},
            {text: '出版社', dataIndex: 'bookPress', width: 150},
            {text: '科室', dataIndex: 'office'},
            {text: '人员', dataIndex: 'bookBorrowerName'},
            {text: '电话', dataIndex: 'phoneNumber'},
            {text: '借阅日期', dataIndex: 'bookBorrowingDate', width: 100},
            {text: '应还日期', dataIndex: 'bookRebackDate', width: 100},
            {text: '续借日期', dataIndex: 'bookRenewDate', width: 100},
            {text: '归还日期', dataIndex: 'bookReturnDate', width: 100}
        ];
        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/overdue/pagedQueryByBean.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'id'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'swhere': "",
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
            //xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
            ename: me.ename,//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            hasSearch: false,
            dock: 'top',
            items: []
        },
            {
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
            injectCheckbox: 0//checkbox位于哪一列，默认值为0
            //checkOnly: true//如果值为true，则只用点击checkbox列才能选中此条记录,
        });
        me.callParent();
    }
});