/**
 * Created by zzw on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.assets.sortManagement.SortManagementGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.sortManagementGrid',
    viewModel: { type: 'sortManagementModel' },
    fit: true,
    stripeRows: true,
    defaults: {
        bodyPadding: 0
    },
    initComponent: function () {
        var me = this;
        var pageSize = 10;//分页条数
        var OrderField = 'assentOrder';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {text: 'id', dataIndex: 'id', hidden: true },
            {text: '名称', sortable: true, dataIndex: 'assentName'},
            {text: '添加时间', sortable: true,width:150, dataIndex: 'createTime'},
            {text: '排序', dataIndex: 'assentOrder'},
            {text: '资产类别', sortable: true, dataIndex: 'atype',renderer: function(value){
                if(value==1){
                    return "办公用品";
                }else if(value==2){
                    return "日常耗材";
                }else if(value==3) {
                    return "电子设备";
                }else if(value==4) {
                    return "其他";
                }
            }}
        ];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/assentType/pagedQueryByBean.do",
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
                    exception: function (theproxy, response) {
                        Tools.Method.ExceptionEncap(response);
                    }
                }
            }
        });

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
            mode: 'single',//multi,simple,single；默认为多选multi
            injectCheckbox: 0//checkbox位于哪一列，默认值为0
            //checkOnly: true//如果值为true，则只用点击checkbox列才能选中此条记录,
        });
        me.callParent();
    }
});
