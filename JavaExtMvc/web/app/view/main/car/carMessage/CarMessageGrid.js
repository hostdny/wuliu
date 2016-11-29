/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.car.carMessage.CarMessageGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.carMessageGrid',
    viewModel: { type: 'carMessageModel' },
    fit: true,
    stripeRows: true,
    defaults: {
        bodyPadding: 0
    },
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
                text: '车辆型号',
                width: 200,
                sortable: true,
                dataIndex: 'carType'
            },{
                text: '车牌号',
                width: 100,
                sortable: true,
                dataIndex: 'carId'
            },{
                text: '出厂日期',
                width: 150,
                sortable: true,
                dataIndex: 'saleTime',
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
                text: '使用年限',
                width: 200,
                sortable: true,
                dataIndex: 'costTime'
            },{
                text: '公里数',
                width: 100,
                sortable: true,
                dataIndex: 'costKm'
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
                url: Tools.Method.getAPiRootPath() + "/carMessage/pagedQueryByBean.do?delFlag=0",
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
            ename: 'carMessage',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
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
        me.callParent();
    }
});
