/**
 * Created by zzw on 2016/8/8.
 */
Ext.define('ExtFrame.view.main.appointment.subscribeList.SubscribeListGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.subscribeListGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;

        /********************** 根据具体业务需要适当修改 ***********************/
        var pageSize = 10;//分页条数
        var OrderField = 'consultationRptdate';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC

        me.columns = [
            {text: 'id', dataIndex: 'id', hidden: true },
            {text: '预约类型',dataIndex: 'consultationType',width:150,
                renderer:function(value){
                    if(value == "0"){
                        return "律师预约";
                    }else if(value == "1"){
                        return "检察长预约";
                    }else{
                        return "";
                    }
                }},
            {text: '预约简介',dataIndex: 'consultationTitle',width:200},
            {text: '预约人',dataIndex: 'consultationPerson',width:150},
            {text: '联系方式',dataIndex: 'telephone',width:150},
            {text: '预约时间',dataIndex: 'consultationRptdate',width:150},
            {text: '分发科室',dataIndex: 'receiveOrgname',width:150}
        ];
        //构造grid store
        me.store = Ext.create('ExtFrame.store.Role', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/appointmentSoluation/query.do",
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
                    var aaa = store;
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
                mode: 'single',//multi,simple,single；默认为多选multi
                injectCheckbox: 0//checkbox位于哪一列，默认值为0
                //checkOnly: true//如果值为true，则只用点击checkbox列才能选中此条记录,
            });
        me.callParent();
    }
});