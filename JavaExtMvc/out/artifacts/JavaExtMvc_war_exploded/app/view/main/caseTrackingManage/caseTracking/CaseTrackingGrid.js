/**
 * Created by wangBin on 2016/11/2.
 */
Ext.define('ExtFrame.view.main.caseTrackingManage.caseTracking.CaseTrackingGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.caseTrackingGrid',
    viewModel: {type: 'caseTrackingModel'},
    fit: true,
    stripeRows: true,
    defaults: {
        bodyPadding: 0,
        align: "center"
    },
    id:"caseTrackingGridId",
    initComponent: function () {
        var me = this;
        var pageSize = 20;//分页条数
        var OrderField = 'createTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [{
            text: '案件名称',
            width: 150,
            sortable: true,
            dataIndex: 'caseName'
        }, {
            text: '案件编号',
            width: 150,
            sortable: true,
            dataIndex: 'caseCode'
        }, {
            text: '案件所属流程套餐',
            width: 150,
            sortable: true,
            dataIndex: 'caseLine'
        }, {
            text: '案件录入时间',
            width: 150,
            sortable: true,
            dataIndex: 'createTime'
        }, {
            text: '当前负责部门',
            width: 150,
            sortable: true,
            dataIndex: 'nowOrg'
        }, {
            text: '承办部门',
            width: 150,
            sortable: true,
            dataIndex: 'undertakingDepartment'
        }, {
            text: '承办人员',
            width: 150,
            sortable: true,
            dataIndex: 'undertakingPerson'
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
                    'delFlag': 0
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
            ename: 'caseTracking',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            hasSearch: false,
            dock: 'top',
            items: [{
                xtype: 'combo',
                name: 'caseType',
                itemId: 'caseType',
                bind: '{rec.caseType}',
                editable: false,// 是否允许输入
                emptyText: '请选择案件类型',
                blankText: '请选择案件类型',// 该项如果没有选择，则提示错误信息,
                displayField: 'dictName',
                valueField: 'dictValue',
                fieldLabel: '案件类型',
                labelWidth: 69,
                store: Ext.create('ExtFrame.store.ModuleTree', {
                    proxy: {
                        type: 'ajax',
                        url: Tools.Method.getAPiRootPath() + "/dict/queryToCombo.do?dictType=AJLB",
                        reader: {
                            type: 'json'
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
                    }
                }),
                listeners: {
                    select: function (combo, record) {
                        var caseType = record.data.dictValue;
                        me.store.getProxy().extraParams = {
                            'caseType': caseType
                        };
                        //重新加载grid
                        me.store.reload();
                    }
                }
            }, {
                xtype: "button",
                text: "重置",
                itemId:'clear',
                handler: 'onClickClear'
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