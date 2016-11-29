/**
 * Created by wangBin on 2016/9/29.
 */
Ext.define('ExtFrame.view.main.proposal.proposalAnswer.ProposalAnswerGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.proposalAnswerGrid',
    viewModel: {type: 'proposalAnswerModel'},
    fit: true,
    stripeRows: true,
    defaults: {
        bodyPadding: 0,
        align: "center"
    },
    initComponent: function () {
        var me = this;
        var pageSize = 20;//分页条数
        var OrderField = 'createTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [{
            xtype: 'rownumberer',
            text: '序号',
            width: 50
        }, {
            text: '提案题目',
            width: 150,
            sortable: true,
            dataIndex: 'title'
        }, {
            text: '提案人',
            width: 150,
            sortable: true,
            dataIndex: 'proposalName'
        }, {
            text: '提案人身份',
            width: 150,
            sortable: true,
            dataIndex: 'proposalIdentity',
            renderer: function (v) {
                if (v == 0) {
                    return '人大代表';
                } else if (v == 1) {
                    return '政协委员';
                }
            }
        }, {
            text: '提案日期',
            width: 150,
            sortable: true,
            dataIndex: 'createTime'
        }, {
            text: '负责科室',
            width: 150,
            sortable: true,
            dataIndex: 'departmentName'
        }, {
            text: '负责人员',
            width: 150,
            sortable: true,
            dataIndex: 'personName'
        }, {
            text: '限定答复时间',
            width: 100,
            sortable: true,
            dataIndex: 'replyLimitTime'
        }, {
            text: '答复时间',
            width: 100,
            sortable: true,
            dataIndex: 'replyTime'
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
                url: Tools.Method.getAPiRootPath() + "/proposal/pagedQueryByBean.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'pttId'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'swhere': "",
                    mark:"1"
                },
                listeners: {
                    //捕捉异常处理
                    exception: function (theproxy, response) {
                        Tools.Method.ExceptionEncap(response);
                    }
                }
            }
        });
        me.selModel = Ext.create('Ext.selection.CheckboxModel', {
            mode: 'single',//multi,simple,single；默认为多选multi
            injectCheckbox: 0,//checkbox位于哪一列，默认值为0
            checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true
        });
        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
            ename: 'proposalAnswer',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            hasSearch: false,
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
        me.callParent();
    }
});
