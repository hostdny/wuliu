/**
 * Created by wangBin on 2016/9/20.
 */
Ext.define('ExtFrame.view.main.booksManagement.booksBorrowBackRenew.BooksBorrowBackRenewGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.booksBorrowBackRenewGrid',
    viewModel: {type: 'booksBorrowBackRenewModel'},
    fit: true,
    stripeRows: true,
    defaults: {
        bodyPadding: 0
    },
    initComponent: function () {
        var me = this;
        var pageSize = 20;//分页条数
        var OrderField = 'dateOfRegistration';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [{
            xtype: 'rownumberer',
            text: '序号',
            width: 50
        },{
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
        },{
            text: '著者',
            width: 100,
            sortable: true,
            dataIndex: 'bookAuthor'
        },{
            text: '分类',
            width: 100,
            sortable: true,
            dataIndex: 'bookSort'
        },{
            text: '出版社',
            width: 100,
            sortable: true,
            dataIndex: 'bookPress'
        },{
            text: '应还日期',
            width: 100,
            sortable: true,
            dataIndex: 'bookRebackDate'
        },{
            text: '续借日期',
            width: 100,
            sortable: true,
            dataIndex: 'bookRenewDate'
        },{
            text: '借阅人姓名',
            width: 90,
            sortable: true,
            searchable: true,
            fieldType: 'string',
            dataIndex: 'bookBorrowerName'
        },{
            text: '借阅人科室',
            width: 90,
            sortable: true,
            dataIndex: 'office'
        },{
            text: '借阅人电话',
            width: 100,
            sortable: true,
            dataIndex: 'bookHistory',//'phoneNumber'
            renderer: function (value) {
                if(value==null){
                    return "";
                }else{
                    debugger;
                    var temp = value.bookName;
                    return temp;
                }
            }
        },{
            text: '图书状态',
            width: 100,
            sortable: true,
            dataIndex: 'bookState',
            renderer: function (value) {
                if (value == '0') {
                    return "已借";
                } else if(value == '1'){
                    return "未借";
                } else if(value == '2') {
                    return "逾期未还";
                }else{
                    return "";
                }
            }
        }];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/bookManage/pagedQueryByBean.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'Id'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'swhere': ""
                },
                listeners: {
                    //捕捉异常处理
                    exception: function (theproxy, response) {
                        Tools.Method.ExceptionEncap(response);
                    }
                }
            }
        });
        me.dockedItems = [{
            xtype: 'gridSearchToolbarNoAdd',
            itemId: 'searchtoolbar',
            ename: 'booksBorrowBackRenew',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            searchEx: false,//扩展查询，当为true时，查询控件会自动构造sql语句的整个语句
            searchCols: me.columns.filter(function (col) {
                return col.searchable;
            }),
            dock: 'top',
            items: [{
                text: '借书',
                handler: "onClickBorrow"
            },{
                text: '还书',
                handler: "onClickBack"
            },{
                text: '续借',
                handler: "onClickRenew"
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
        me.selModel = Ext.create('Ext.selection.CheckboxModel', {
            mode: 'simple',//multi,simple,single；默认为多选multi
            injectCheckbox: 0,//checkbox位于哪一列，默认值为0
            checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true
        });
        me.callParent();
    }
});
