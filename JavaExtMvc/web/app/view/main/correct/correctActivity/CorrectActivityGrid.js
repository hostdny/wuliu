/**
 * Created by MSI on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.correct.correctActivity.CorrectActivityGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.correctActivityGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        /********************** 根据具体业务需要适当修改 ***********************/
        var pageSize = 20;//分页条数
        var OrderField = 'activityTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {text: 'id', dataIndex: 'id', hidden: true},
            {text: '活动名称', dataIndex: 'activityName', width: 300},
            {text: '活动时间', dataIndex: 'activityTime', width: 100},
            {text: '参与人员', dataIndex: 'personNames', width: 350}
        ];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.Role', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/correctActivity/pagedQueryByBean.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'id'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    //'swhere': "correctState|int|2"
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
                items: []
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
                mode: 'single',//multi,simple,single；默认为多选multi
                injectCheckbox: 0//checkbox位于哪一列，默认值为0
            });
        me.callParent();
    }
});
