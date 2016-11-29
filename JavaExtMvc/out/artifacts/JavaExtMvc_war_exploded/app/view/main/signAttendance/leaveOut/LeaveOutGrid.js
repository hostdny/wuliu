/**
 * Created by zzw on 2016/11/1.请假外出
 */
Ext.define('ExtFrame.view.main.signAttendance.leaveOut.LeaveOutGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.leaveOutGrid',
    viewModel: {type: 'leaveOutModel'},
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        var pageSize = 20;//分页条数
        var OrderField = 'startTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {text: 'id', dataIndex: 'id', hidden: true},
            {text: '部门', dataIndex: 'department', width: 150},
            {text: '姓名', dataIndex: 'name', width: 150},
            {
                text: '类型', dataIndex: 'state', renderer: function (v) {
                if (v == "0") {
                    return '请假';
                } else if (v == "1") {
                    return '外出';
                }
            }
            },
            {
                text: '请假类型', dataIndex: 'leaveType', width: 100, renderer: function (v) {
                if (v == "0") {
                    return '事假';
                } else if (v == "1") {
                    return '病假';
                }
            }
            },
            {text: '开始时间', dataIndex: 'startTime', width: 150},
            {text: '结束时间', dataIndex: 'endTime', width: 150},
            {text: '请假或外出天数', dataIndex: 'count', width: 150},
            {text: '请假或外出原因', dataIndex: 'outReason', width: 150},
            {text: '备注', dataIndex: 'remark', width: 150}
        ];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/signPersonOutState/pagedQueryByBean.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'pttId'//id标示节点名称
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


        //grid 停靠item
        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
            ename: me.ename,//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
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
        me.selModel = Ext.create('Ext.selection.CheckboxModel', {
            mode: 'SINGLE',//multi,simple,single；默认为多选multi
            injectCheckbox: 0,//checkbox位于哪一列，默认值为0
            checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true
        });
        me.callParent();
    }
});
