/**
 * Created by zzw on 2016/8/3.评价列表
 */
Ext.define('ExtFrame.view.main.satisfaction.evaluationList.EvaluationListGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.evaluationListGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;

        /********************** 根据具体业务需要适当修改 ***********************/
        var pageSize = 20;//分页条数
        //var OrderField = 'createTime';//默认排序字段
        //var OrderType = 'DESC';//默认排序类型 ASC/DESC

        me.columns = [
            { text: 'id', dataIndex: 'id', hidden: true },
            { text: 'policeId', dataIndex: 'policeId', hidden: true },
            { text: '编号',dataIndex: 'policeNum'},
            {text: '姓名', dataIndex: 'policeName',searchable: true, fieldType: 'string'},
            {text: '科室',dataIndex: 'orgName'},
            {text: '时间',dataIndex: 'createTime'},
            {text: '评价',dataIndex: 'evaluationScore'},
            {
                text: '操作', dataIndex: 'evaluationContent',width:45, listeners: {
                click: 'open'
            }, renderer: function () {
                return '<span style="color:blue;cursor:pointer;">查看';
            }
            },
            {
                text: '',width:40, listeners: {
                click: 'onClickButtonDel'
            }, renderer: function () {
                return '<span style="color:red;cursor:pointer;">删除';
            }
            }
        ];
        //构造grid store
        me.store = Ext.create('ExtFrame.store.Role', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/evaluation/queryByPage.do",
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
        //////grid 停靠item
        me.dockedItems = [
            {
                xtype: 'gridsearchtoolbar',
                itemId: 'searchtoolbar',
                ename: me.ename,//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
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
                mode: 'single',//multi,simple,single；默认为多选multi
                injectCheckbox: 0//checkbox位于哪一列，默认值为0
                //checkOnly: true//如果值为true，则只用点击checkbox列才能选中此条记录,
            });
        me.callParent();
    }
});