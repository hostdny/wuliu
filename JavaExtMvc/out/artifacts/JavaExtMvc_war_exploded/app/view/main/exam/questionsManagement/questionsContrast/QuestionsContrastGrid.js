/**
 * Created by Jia on 2016/8/19.
 */
Ext.define('ExtFrame.view.main.exam.questionsManagement.questionsContrast.QuestionsContrastGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.questionsContrastGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        var need_select = false;
        /********************** 根据具体业务需要适当修改 ***********************/
        var pageSize = 10;//分页条数
        var OrderField = 'testContent';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        /*
         ** grid控件绑定列
         ** text: 前台显示文字, dataIndex: 数据绑定字段, sortable: 能否排序（缺省值为true）
         ** searchable: 能否查询（缺省值为false）
         ** fieldType: 字段类型（用户查询控件拼接where字句，目前仅支持 string、int、datetime
         其中string类型使用'like'关键字查询，其余的使用'='关键字查询）
         */
        me.columns = [
            {text: 'id', dataIndex: 'id', hidden: true},
            {text: '试题类型',dataIndex: 'testType',renderer:function(v){
                if (v == "0") {
                    return '单选';
                } else if (v == "1") {
                    return '多选';
                }else if (v == "2") {
                    return '判断';
                }
            }},
            {text: '题目', dataIndex: 'testContent', searchable: true, fieldType: 'string', width: 400},
            {text: '科目类型', dataIndex: 'typeOfWork', searchable: true, fieldType: 'string'},
            {text: '答案A', dataIndex: 'ansA', searchable: true, fieldType: 'string'},
            {text: '答案B', dataIndex: 'ansB', searchable: true, fieldType: 'string'},
            {text: '答案C', dataIndex: 'ansC', searchable: true, fieldType: 'string'},
            {text: '答案D', dataIndex: 'ansD', searchable: true, fieldType: 'string'}
        ];
        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/examQuestionsLibrary/pagedQueryByBean.do?mulFlag=123",
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
