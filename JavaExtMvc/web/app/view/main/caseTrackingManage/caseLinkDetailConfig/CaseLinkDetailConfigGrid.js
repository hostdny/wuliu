/**
 * Created by Jia on 2016/11/02.
 */
Ext.define('ExtFrame.view.main.caseTrackingManage.caseLinkDetailConfig.CaseLinkDetailConfigGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.caseLinkDetailConfigGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;

        /********************** 根据具体业务需要适当修改 ***********************/
        var pageSize = 20;//分页条数
        var OrderField = 'createTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC

        me.columns = [
            { text: 'id', dataIndex: 'id', hidden: true },
            { text: '套餐名称',dataIndex: 'caseName',width:150},
            {text: '案件所属类型',dataIndex: 'caseTypeShow',width:150},
            {text: '案件所属流程',dataIndex: 'link',width:300},
            {
                text: '是否锁定', dataIndex: 'caseLock', width: 180, renderer: function (v) {
                if (v == "0") {
                    return '不锁定';
                } else if (v == "1") {
                    return '锁定';
                }
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
                url: Tools.Method.getAPiRootPath() + "/caseLinkDetailConfig/pagedQueryByBean.do",
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
        //grid 停靠item
        me.dockedItems = [
            {
                xtype: 'gridsearchtoolbar',
                itemId: 'gridtoolbar',
                ename: me.ename,//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
                searchEx: false,//扩展查询，当为true时，查询控件会自动构造sql语句的整个语句
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
            }],
            me.selModel = Ext.create('Ext.selection.CheckboxModel', {
                mode: 'simple',//multi,simple,single；默认为多选multi
                injectCheckbox: 0//checkbox位于哪一列，默认值为0
                //checkOnly: true//如果值为true，则只用点击checkbox列才能选中此条记录,
            });
        me.callParent();
    }
});