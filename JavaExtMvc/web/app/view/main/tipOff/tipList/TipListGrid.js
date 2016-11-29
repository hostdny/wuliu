/**
 * Created by Administrator on 2016/7/8.
 */

Ext.define('ExtFrame.view.main.tipOff.tipList.TipListGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.tipListGrid',
    viewModel: { type: 'tipListModel' },
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        var pageSize = 10;//分页条数
        var OrderField = 'rptDate';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {text: '举报类型',dataIndex: 'tipTypeShow',sortable: true},
            {text: '举报简介',dataIndex: 'addMessage1',width:150,sortable: true},
            {text: '举报标题',dataIndex: 'tipName',width:150,sortable: true},
            {text: '匿名/实名',dataIndex: 'tipStyle',sortable: true},
            {text: '举报时间',dataIndex: 'rptDate',width:150,sortable: true},
            //{text: '举报材料',dataIndex: 'tiperName',sortable: true,
            //    renderer: function(){
            //        return "点击查看按钮";
            //    }
            //},
            {text: '分发负责人',dataIndex: 'accepterNameAndNumber',width:250,sortable: true}
        ];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/tipMessage/pagedQueryByBean.do?tipStateFlag=1",
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
            ename: 'TipList',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            hasSearch: false,
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
            }];
        me.selModel = Ext.create('Ext.selection.CheckboxModel', {
            mode: 'single',//multi,simple,single；默认为多选multi
            injectCheckbox: 0//checkbox位于哪一列，默认值为0
            //checkOnly: true//如果值为true，则只用点击checkbox列才能选中此条记录,
        });
        me.callParent();
    }
});
