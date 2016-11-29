/**
 * Created by zzw on 2016/8/2.干警列表
 */
Ext.define('ExtFrame.view.main.satisfaction.policeList.PoliceListGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.policeListGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;

        /********************** 根据具体业务需要适当修改 ***********************/
        var pageSize = 20;//分页条数
        var OrderField = 'policeNum';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC

        me.columns = [
            { text: 'id', dataIndex: 'id', hidden: true },
            { text: '编号',dataIndex: 'policeNum',
            renderer:function(value){
                    if(!value){
                        return '<div style="margin-top: 50%;">'+""+'</div>';
                    }else{
                        return '<div style="margin-top: 50%;">'+value+'</div>';
                    }
                }},
            {text: '姓名', dataIndex: 'policeName',
            renderer:function(value){
                    if(!value){
                        return '<div style="margin-top: 50%;">'+""+'</div>';
                    }else{
                        return '<div style="margin-top: 50%;">'+value+'</div>';
                    }
                }},
            {text: '科室',dataIndex: 'orgName',
            renderer:function(value){
                if(!value){
                    return '<div style="margin-top: 50%;">'+""+'</div>';
                }else{
                    return '<div style="margin-top: 50%;">'+value+'</div>';
                }
            }},
            {
                text: '照片',
                width: 200,
                sortable: true,
                dataIndex: 'url',
                renderer:function(value){
                    return '<div class="thumb"><img src="'+value+'" height="100" width="120"></div>';
                 //   return '<div class="thumb"><img src="" height="100" width="120"></div>';
                }
            }
        ];
        //构造grid store
        me.store = Ext.create('ExtFrame.store.Role', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/police/pagedQueryByBean.do?delFlag=0",
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
        //////grid 停靠item
        me.dockedItems = [
            {
            xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
            ename: me.ename,//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            hasSearch: false,
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