/**
 * Created by Jia on 2016/8/1.
 */

Ext.define('ExtFrame.view.main.attorneyBoxManage.attorneyBox.AttorneyBoxGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.attorneyBoxGrid',
    viewModel: {type: 'attorneyBoxModel'},
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        var pageSize = 10;//分页条数
        var OrderField = 'createTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {text: '序号',dataIndex: 'id',hidden: true},
            {text: '标题',dataIndex: 'mailTitle',width:150,sortable: true},
            {text: '内容 ',dataIndex: 'mailContent',width:150,sortable: true},
            {text: '姓名',dataIndex: 'sendName',width:150,sortable: true},
            {text: '联系电话',dataIndex: 'sendPhone',width:150,sortable: true},
            {text: '时间',dataIndex: 'createTime',sortable: true},
            {
                text: '回复状态', dataIndex: 'replyFlag', renderer: function (v) {
                if (v == "0") {
                    return '未回复';
                } else if (v == "1") {
                    return '已回复';
                }
            }},
        ];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/attorneyBox/pagedQueryByBean.do",
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
            ename: me.ename,//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
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
            mode: 'SINGLE',//multi,simple,single；默认为多选multi
            injectCheckbox: 0,//checkbox位于哪一列，默认值为0
            checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true
        });
        me.callParent();
    }
});
