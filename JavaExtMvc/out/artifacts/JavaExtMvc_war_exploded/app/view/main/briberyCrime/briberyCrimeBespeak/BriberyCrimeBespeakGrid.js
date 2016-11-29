/**
 * Created by zzw on 2016/9/24.
 */
Ext.define('ExtFrame.view.main.briberyCrime.briberyCrimeBespeak.BriberyCrimeBespeakGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.briberyCrimeBespeakGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        var pageSize = 10;//分页条数
        var OrderField = 'creatDate';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC

        me.columns = [
            {text: 'id', dataIndex: 'id', hidden: true},
            {text: '个人姓名', dataIndex: 'title'},
            {text: '查询人手机', dataIndex: 'phonenum'},
            {text: '查询人身份证', dataIndex: 'cid', width: 150},
            {text: '查询事由', dataIndex: 'reason', width: 150},
            {text: '招标公告', dataIndex: 'tenderAnnouncement', width: 150},
            {
                text: '是否需要加急', dataIndex: 'isUrgent', renderer: function (v) {
                if (v == "0") {
                    return '是';
                } else if (v == "1") {
                    return '否';
                }
            }},
            {
                text: '处理方式', dataIndex: 'giveWay', renderer: function (v) {
                if (v == "1") {
                    return '现场办理';
                }
                else if (v == "0") {
                    return '在线办理';
                }
            }},
            {
                text: '审核状态', dataIndex: 'bespeakState', renderer: function (v) {
                if (v == "0") {
                    return '审核中';
                } else if (v == "1") {
                    return '通过';
                } else if (v == "2") {
                    return '拒绝';
                }
            }},
            {text: '取件地址', dataIndex: 'address', width: 100},
            {text: '拒绝理由', dataIndex: 'reply', width: 100}
        ];
        //构造grid store
        me.store = Ext.create('ExtFrame.store.Role', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/briberyCrimeBespeak/pagedQueryByBean.do",
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
        me.dockedItems = [{
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
                mode: 'SINGLE',//multi,simple,single；默认为多选multi
                singleSelect: true,
                injectCheckbox: 0,//checkbox位于哪一列，默认值为0
                checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
                enableKeyNav: true
            });
        me.callParent();
    }
});
