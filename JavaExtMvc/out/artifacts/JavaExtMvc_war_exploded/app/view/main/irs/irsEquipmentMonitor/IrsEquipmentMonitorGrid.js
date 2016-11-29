/**
 * Created by zzw on 2016/7/18.
 */
Ext.define('ExtFrame.view.main.irs.irsEquipmentMonitor.IrsEquipmentMonitorGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.irsEquipmentMonitorGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        setInterval(function() {
            if(me.store == null){
                return;
            }
            me.store.reload();
        }, 60000);
        var pageSize = 20;//分页条数
        var OrderField = 'createTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            { text: 'ID', dataIndex: 'id', hidden: true },
            {text: '设备名称',fieldType: 'string',searchable: true,  dataIndex: 'name'},
            {text: '设备类型',fieldType: 'string', searchable: true, dataIndex: 'type'},
            {text: 'IP地址',fieldType: 'string',searchable: true,  dataIndex: 'ip'},
            {text: 'MAC地址',fieldType: 'string',searchable: true,  dataIndex: 'mac'},
            {text: '运行状态', dataIndex: 'runStatus',fieldType: 'string',renderer: function (v) {
                if (v == "0") {
                    return '<span style="color:green;">正常</span>';
                } else if (v == "1") {
                    return '<span style="color:red;">故障</span>';
                }
            }
            },
            {text: '创建时间',sortable:true, searchable: true, dataIndex: 'createTime'},
            {text: '备注', fieldType: 'string',searchable: true, dataIndex: 'remark'}
        ];
        //构造grid store
        me.store = Ext.create('ExtFrame.store.Role', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/irsEquipment/pagedQueryByBean.do?status=0",
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
                    var aaa=store;
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
        },{
            xtype: 'pagingtoolbar',
            store: me.store,//分页控件数据（同grid的数据保持一致）
            dock: 'bottom',
            displayInfo: true,
            items: [
                '-', {cls: 'x-btn-text-icon details'}
            ]
        }],
            me.selModel = Ext.create('Ext.selection.CheckboxModel', {
                mode: 'simple',//multi,simple,single；默认为多选multi
                injectCheckbox: 0//checkbox位于哪一列，默认值为0
                //checkOnly: true//如果值为true，则只用点击checkbox列才能选中此条记录,
            });
        me.callParent();
    }
});