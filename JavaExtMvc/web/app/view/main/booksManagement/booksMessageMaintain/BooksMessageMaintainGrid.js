/**
 * Created by zzw on 2016/9/20.图书信息维护
 */
Ext.define('ExtFrame.view.main.booksManagement.booksMessageMaintain.BooksMessageMaintainGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.booksMessageMaintainGrid',
    fit: true,
    stripeRows: true,
    defaults: {
        bodyPadding: 0
    },
    initComponent: function () {
        var me = this;

        /********************** 根据具体业务需要适当修改 ***********************/
        var pageSize = 20;//分页条数
        var OrderField = 'dateOfRegistration';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC

        me.columns = [
            { text: 'id', dataIndex: 'id', hidden: true },
            { text: '序号', xtype: "rownumberer",width: 50},
            { text: '图书名称',dataIndex: 'bookName',width: 100},
            { text: 'ISBN',dataIndex: 'bookIsbn',width: 150,searchable: true},
            { text: 'ISSN',dataIndex: 'bookIssn',width: 150,searchable: true},
            { text: '著者',dataIndex: 'bookAuthor'},
            { text: '分类',dataIndex: 'bookSort',hidden: true,width: 200},
            { text: '出版社',dataIndex: 'bookPress',width: 100},
            { text: '藏书位置',dataIndex: 'collectionPosition'},
            { text: '登记日期',dataIndex: 'dateOfRegistration'}
        ];
        //构造grid store
        me.store = Ext.create('ExtFrame.store.Role', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/bookManage/pagedQueryByBean.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'pttId'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'swhere': "",
                    'id': '-1'
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
                xtype: 'gridSearchToolbarNoAdd',
                itemId: 'searchtoolbar',
                ename: 'booksMessageMaintain',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
                searchEx: false,//扩展查询，当为true时，查询控件会自动构造sql语句的整个语句
                searchCols: me.columns.filter(function (col) {
                    return col.searchable;
                }),
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
            }],
            me.selModel = Ext.create('Ext.selection.CheckboxModel', {
                mode: 'multi',//multi,simple,single；默认为多选multi
                injectCheckbox: 0//checkbox位于哪一列，默认值为0
                //checkOnly: true//如果值为true，则只用点击checkbox列才能选中此条记录,
            });
        me.callParent();
    }
});