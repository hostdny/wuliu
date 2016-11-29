/**
 * Created by zzw on 2016/8/31.
 */
Ext.define('ExtFrame.view.main.workAreaApplyManage.WorkAreaApplyManageList.WorkAreaApplyManageListGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.workAreaApplyManageListGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;

        /********************** 根据具体业务需要适当修改 ***********************/
        var pageSize = 20;//分页条数
        var OrderField = 'createTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC

        me.columns = [
            { text: 'id', dataIndex: 'id', hidden: true },
            { text: '序号', xtype: "rownumberer",width: 50},
            { text: '工作区名称',dataIndex: 'areaName'},
            { text: '申请使用时间',dataIndex: 'startTimeAndEndTime',width: 200},
            { text: '法警人数',dataIndex: 'personNum'},
            { text: '申请时间',dataIndex: 'createTime'},
            { text: '申请人',dataIndex: 'createPerson'},
            { text: '申请人电话',dataIndex: 'createTelephone'},
            { text: '状态',dataIndex: 'createState',renderer: function (v) {
                if (v == "0") {
                    return '未审核';
                } else if (v == "1") {
                    return '审核通过';
                }
            }
            }
        ];
        //构造grid store
        me.store = Ext.create('ExtFrame.store.Role', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/workAreaApplyManage/pagedQueryByBean.do",
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