Ext.define('ExtFrame.view.main.weeklyFood.weeklyMenu.WeeklyMenuWindowGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.weeklyMenuWindowGrid',
    viewModel: { type: 'weeklyMenuModel' },
    fit: true,
    stripeRows: true,
    listeners: {
        'select': "onClickWindowSelect"
    },
    initComponent: function () {
        var me = this;
        var OrderField = 'weekId';//默认排序字段
        var OrderType = 'ASC';//默认排序类型 ASC/DESC
        me.columns = [
            {
                text: '星期',
                width: 100,
                sortable: true,
                dataIndex: 'weekId',
                renderer:function(value){
                    if(value == 0){
                        return "星期日";
                    }else if(value == 1){
                        return "星期一";
                    }else if(value == 2){
                        return "星期二";
                    }else if(value == 3){
                        return "星期三";
                    }else if(value == 4){
                        return "星期四";
                    }else if(value == 5){
                        return "星期五";
                    }else{
                        return "星期六";
                    }
                }
            },{
                text: '时间点',
                width: 100,
                sortable: true,
                dataIndex: 'timePoint'
            },{
                text: '菜品',
                width: 200,
                sortable: true,
                dataIndex: 'foodName'
            }
        ];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.WeekFood', {
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/weekFoodRecord/query.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'pttId'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'swhere': "",
                    'id':"-1"
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
            xtype: 'toolbar',
            items: [{
                itemId: 'add',
                text: '增加',
                handler: "onClickWindowAdd"
            }, '-', {
                itemId: 'upDate',
                text: '修改',
                handler: "onClickWindowEdit"
            }, '-', {
                itemId: 'delete',
                text: '删除',
                handler: "onClickWindowDel"
            }]
        }];
        me.callParent();
    }
});