/**
 * Created by wangBin on 2016/11/15.
 */
Ext.define('ExtFrame.view.main.caseTrackingManage.caseBacklog.CaseBacklogGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.caseBacklogGrid',
    viewModel: {type: 'caseBacklogModel'},
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
            text: '案件名称',
            width: "15%",
            sortable: true,
            dataIndex: 'caseName'
        }, {
            text: '案件编号',
            width: "10%",
            sortable: true,
            dataIndex: 'caseCode'
        }, {
            text: '承办部门',
            width: "10%",
            sortable: true,
            dataIndex: 'undertakingDepartment'
        }, {
            text: '承办人员',
            width: "10%",
            sortable: true,
            dataIndex: 'undertakingPerson'
        }, {
            text: '案件录入时间',
            width: "10%",
            sortable: true,
            dataIndex: 'createTime'
        }, {
            text: '案件描述',
            width: "40%",
            sortable: true,
            dataIndex: 'caseMessage'
        }];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/caseInfo/pagedQueryByBean.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'pttId'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'delFlag': 2
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
            mode: 'simple',//multi,simple,single；默认为多选multi
            injectCheckbox: 0,//checkbox位于哪一列，默认值为0
            checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true
        });
        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
            ename: 'caseBacklog',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            hasSearch: false,
            dock: 'top',
            items: [{
                text: '重启案件',
                handler: "onClickRestart"
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
        me.callParent();
    }
});