/**
 * Created by wangBin on 2016/8/1.
 */
Ext.define('ExtFrame.view.main.weeklyFood.weeklyMenu.WeeklyMenuGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.weeklyMenuGrid',
    viewModel: { type: 'weeklyMenuModel' },
    fit: true,
    stripeRows: true,
    defaults: {
        bodyPadding: 0
    },
    initComponent: function () {
        var me = this;
        var pageSize = 10;//分页条数
        var OrderField = 'startTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {
                text: '开始时间',
                width: 200,
                sortable: true,
                dataIndex: 'startTime'
            },{
                text: '结束时间',
                width: 200,
                sortable: true,
                dataIndex: 'endTime'

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
                url: Tools.Method.getAPiRootPath() + "/weekFoodRecord/pagedQueryByBean.do",
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
        me.selModel = Ext.create('Ext.selection.CheckboxModel', {
            mode: 'SIMPLE',//multi,simple,single；默认为多选multi
            injectCheckbox: 0,//checkbox位于哪一列，默认值为0
            checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true
        });
        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
            ename: 'weeklyMenu',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            hasSearch: false,
            dock: 'top',
            items: [{
                xtype: 'datefield',
                name: 'weekStartTime',
                itemId: 'weekStartTime',
                bind: '{rec.weekStartTime}',
                emptyText: '请输入周开始时间',
                fieldLabel: '周开始时间',
                format: 'Y-m-d',
                disabledDays:[0,2,3,4,5,6],
                allowBlank: false,
                editable: false
            },{
                itemId: '',
                text: '复制菜品',
                handler: "onClickCopy"
            }]
        },{
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
