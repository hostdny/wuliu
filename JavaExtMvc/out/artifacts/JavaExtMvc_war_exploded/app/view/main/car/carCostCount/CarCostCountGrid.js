/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.car.carCostCount.CarCostCountGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.carCostCountGrid',
    viewModel: { type: 'carCostCountModel' },
    fit: true,
    stripeRows: true,
    defaults: {
        bodyPadding: 0
    },
    features: [{
        ftype: 'summary'
    }],
    initComponent: function () {
        var me = this;
        var pageSize = 10;//分页条数
        var OrderField = 'createTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {
                text: '车辆编号',
                width: 100,
                sortable: true,
                dataIndex: 'carNum'
            },{
                text: '费用类型',
                width: 100,
                sortable: true,
                dataIndex: 'costType',
                renderer:function(value){
                    if(value == '1'){
                        return "加油"
                    }else if(value == '2'){
                        return "维修"
                    }else if(value == '3'){
                        return "罚款"
                    }else if(value == '4'){
                        return "停车费"
                    }else if(value == '5'){
                        return "交强险"
                    }else{
                        return value;
                    }
                }
            },{
                text: '开始时间',
                width: 150,
                sortable: true,
                dataIndex: 'stateTime',
                renderer:function(value){
                    if(value != '' && value != null){
                        var newTime = new Date(value);
                        var time = Ext.Date.format(newTime,'Y年m月d日');
                        return time;
                    }else{
                        return value;
                    }
                }
            },{
                text: '结束时间',
                width: 150,
                sortable: true,
                dataIndex: 'endTime',
                renderer:function(value){
                    if(value != '' && value != null){
                        var newTime = new Date(value);
                        var time = Ext.Date.format(newTime,'Y年m月d日');
                        return time;
                    }else{
                        return value;
                    }
                },
                summaryRenderer: function () {
                    return "合计";
                }
            },{
                text: '合计',
                width: 300,
                sortable: true,
                dataIndex: 'total',
                summaryType: 'sum'

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
                url: Tools.Method.getAPiRootPath() + "/carCost/query.do",
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

        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
            ename: 'carCostCount',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            hasSearch: false,
            dock: 'top',
            items: []
        }];
        me.callParent();
    }
});
