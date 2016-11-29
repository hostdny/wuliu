/**
 * Created by wangBin on 2016/9/21.
 */
Ext.define('ExtFrame.view.main.eBookManage.eBook.EBookGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.eBookGrid',
    viewModel: {type: 'eBookModel'},
    fit: true,
    stripeRows: true,
    defaults: {
        bodyPadding: 0
    },
    initComponent: function () {
        var me = this;
        var pageSize = 20;//分页条数
        var OrderField = 'uploadTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [{
            text: '图书名称',
            width: 200,
            sortable: true,
            dataIndex: 'bookName'
        },{
            text: '作者',
            width: 150,
            sortable: true,
            dataIndex: 'bookAuthor'
        },{
            text: '上传时间',
            width: 150,
            sortable: true,
            dataIndex: 'uploadTime'
        },{
            text: '创建人',
            width: 150,
            sortable: true,
            dataIndex: 'createPerson'
        }];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/ebook/pagedQueryByBean.do",
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
            xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
            ename: 'eBook',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            hasSearch: false,
            dock: 'top',
            items: []
        },{
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
