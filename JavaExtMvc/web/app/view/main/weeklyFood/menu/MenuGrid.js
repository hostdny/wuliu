/**
 * Created by wangBin on 2016/8/1.
 */
Ext.define('ExtFrame.view.main.weeklyFood.menu.MenuGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.menuGrid',
    viewModel: { type: 'menuModel' },
    fit: true,
    stripeRows: true,
    defaults: {
        bodyPadding: 0
    },
    initComponent: function () {
        var me = this;
        var pageSize = 10;//分页条数
        var OrderField = 'foodPrice';//默认排序字段
        var OrderType = 'ASC';//默认排序类型 ASC/DESC
        me.columns = [
            {
                text: '编号',
                width: 200,
                sortable: true,
                dataIndex: 'foodNum',
                renderer:function(value){
                    if(!value){
                        return '<div style="margin-top: 50px;">'+""+'</div>';
                    }else{
                        return '<div style="margin-top: 50px;">'+value+'</div>';
                    }
                }
            },{
                text: '菜名',
                width: 150,
                sortable: true,
                dataIndex: 'foodName',
                renderer:function(value){
                    if(!value){
                        return '<div style="margin-top: 50px;">'+""+'</div>';
                    }else{
                        return '<div style="margin-top: 50px;">'+value+'</div>';
                    }
                }
            },{
                text: '价格',
                width: 100,
                sortable: true,
                dataIndex: 'foodPrice',
                renderer:function(value){
                    if(!value){
                        return '<div style="margin-top: 50px;">'+""+'</div>';
                    }else{
                        return '<div style="margin-top: 50px;">'+value+'</div>';
                    }
                }
            },{
                text: '缩略图',
                width: 200,
                sortable: true,
                dataIndex: 'foodUrl',
                renderer:function(value){
                    return '<div class="thumb"><img src="'+value+'" height="100" width="120"></div>';
                    //return '<div class="thumb"><img src="../../../../../starLevel/仰望星空.jpg" height="100" width="120"></div>';
                }
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
                url: Tools.Method.getAPiRootPath() + "/foodsDict/pagedQueryByBean.do",
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
            ename: 'menu',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            hasSearch: false,
            dock: 'top',
            items: [{
                xtype: 'textfield',
                itemId: 'dishesName',
                allowNegative: false,
                name: 'dishesName',
                fieldLabel: '菜名',
                labelWidth: 50,
                emptyText: '请输入菜名',
                allowDecimals: false
            },{
                text: '搜索',
                handler: "onClickSearch"
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
