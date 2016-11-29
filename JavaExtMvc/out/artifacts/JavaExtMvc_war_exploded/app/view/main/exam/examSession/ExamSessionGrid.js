/**
 * Created by Jia on 2016/8/18.
 */
Ext.define('ExtFrame.view.main.exam.examSession.ExamSessionGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.examSessionGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        var need_select = false;
        /********************** 根据具体业务需要适当修改 ***********************/
        var pageSize = 10;//分页条数
        var OrderField = 'sortNo';//默认排序字段
        var OrderType = 'ASC';//默认排序类型 ASC/DESC
        /*
         ** grid控件绑定列
         ** text: 前台显示文字, dataIndex: 数据绑定字段, sortable: 能否排序（缺省值为true）
         ** searchable: 能否查询（缺省值为false）
         ** fieldType: 字段类型（用户查询控件拼接where字句，目前仅支持 string、int、datetime
         其中string类型使用'like'关键字查询，其余的使用'='关键字查询）
         */
        me.columns = [
            {text: 'id', dataIndex: 'id', hidden: true},

            {text: '批次名称', dataIndex: 'batchName', searchable: true, fieldType: 'string'},
            {text: '所属类别', dataIndex: 'typeOfWork', searchable: true, fieldType: 'string'},
            {
                text: '考试模式', dataIndex: 'examModle', renderer: function (v) {
                if (v == 0) {
                    return '竞赛';
                } else if (v == 1) {
                    return '过关';
                } else if (v == 2) {
                    return '练习';
                }
            }
            },
            {
                text: '考试类型', dataIndex: 'examType', renderer: function (v) {
                if (v == 0) {
                    return '理论';
                } else if (v == 1) {
                    return '实践';
                }
            }
            },
            {text: '开始时间', dataIndex: 'beginTime', width: 150},
            {text: '结束时间', dataIndex: 'endTime', width: 150},
            {text: '考试时间（分钟）', dataIndex: 'examTime', width: 150},
            {
                text: '考试状态', dataIndex: 'beginFlag', renderer: function (v) {
                if (v == "0") {
                    return '<span style="color:dimgray;">未开始</span>';
                } else if (v == "1") {
                    return '<span style="color:green;">进行中</span>';
                } else {
                    return '<span style="color:red;">完成</span>';
                }
            }
            },
            {
                text: '试卷', dataIndex: 'paperGenerate', renderer: function (v) {
                if (v == "0") {
                    return '未生成';
                } else if (v == "1") {
                    return '已生成';
                }
            }
            },
            {text: '排序', dataIndex: 'sortNo'},
            {
                text: '操作',
                listeners: {
                    click: 'openPeizhi'
                },
                renderer: function () {
                    return '<span style="color:blue;cursor: pointer">配置</span>';
                }
            }
        ];
        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/examSession/pagedQueryByBean.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'id'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'swhere': "",
                    'batchId': "",
                    'pcParam': "1"
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
                itemId: 'gridtoolbar',
                ename: 'examSession',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
                hasSearch: false,
                dock: 'top',
                items: [{
                    //   itemId: 'searchId',
                    text: '更改状态',
                    handler: 'onClickButtonChangeState'
                }, {
                    //   itemId: 'searchId',
                    text: '生成试卷',
                    handler: 'onClickButtonGeneratePaper'
                }]
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
                injectCheckbox: 0,//checkbox位于哪一列，默认值为0
                checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
                enableKeyNav: true
            });
        me.callParent();
    }
});
