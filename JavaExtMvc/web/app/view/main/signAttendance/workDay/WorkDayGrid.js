/**
 * Created by zzw on 2016/10/31.
 */
Ext.define('ExtFrame.view.main.signAttendance.workDay.WorkDayGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.workDayGrid',
    viewModel: {type: 'workDayModel'},
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        var pageSize = 20;//分页条数
        var OrderField = 'workDate';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {text: 'id',dataIndex: 'id',hidden: true},
            {text: '日期',dataIndex: 'workDate'},
            {text: '日期描述',dataIndex: 'workDateState',width:150}
        ];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/signAttendanceList/pagedQueryByBean.do",
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
            items: [{
                xtype: 'hiddenfield',
                itemId: 'hfOid',
                name: 'id',
                bind: '{rec.id}'
            },{
                xtype: 'numberfield',
                step:5,
                value: 0,
                maxValue: 60,
                minValue: 0,
                name: 'reTime',
                itemId: 'reTime',
                bind: '{rec.reTime}',
                emptyText: '请输入冗余时间',
                fieldLabel: '冗余时间',
                editable: false
            },
                {
                    xtype: 'timefield',
                    name: 'workTimeStart',
                    itemId: 'workTimeStart',
                    bind: '{rec.workTimeStart}',
                    format: 'H:i',
                    emptyText: '请输入上班时间',
                    fieldLabel: '上班时间',
                    editable: false
                }, {
                    xtype: 'timefield',
                    name: 'workTimeEnd',
                    itemId: 'workTimeEnd',
                    bind: '{rec.workTimeEnd}',
                    format: 'H:i',
                    emptyText: '请输入下班时间',
                    fieldLabel: '下班时间',
                    editable: false
                }
            ]

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
