/**
 * Created by wangBin on 2016/8/18.
 */
Ext.define('ExtFrame.view.main.exam.examStudent.approve.ApproveGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.approveGrid',
    viewModel: { type: 'approveModel' },
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
                text: '审核状态',
                width: 150,
                sortable: true,
                dataIndex: 'checkFlag',
                renderer: function (value) {
                    if (value == '0') {
                        return "未审批";
                    }else if(value == '1'){
                        return "审批通过";
                    }else if(value == '2'){
                        return "未通过";
                    } else {
                        return value;
                    }
                }
            },{
                text: '用户中文名',
                width: 150,
                sortable: true,
                dataIndex: 'userCName'
            },{
                text: '用户英文名',
                width: 150,
                sortable: true,
                dataIndex: 'userEName'
            },{
                text: '性别',
                width: 150,
                sortable: true,
                dataIndex: 'sex',
                renderer: function (value) {
                    if (value == '0') {
                        return "男";
                    }else if(value == '1'){
                        return "女";
                    } else {
                        return value;
                    }
                }
            },{
                text: '所属部门',
                width: 150,
                sortable: true,
                dataIndex: 'unitName'

            },{
                text: '备注',
                width: 150,
                sortable: true,
                dataIndex: 'remark'
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
                url: Tools.Method.getAPiRootPath() + "/examStudent/pagedQueryByBean.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'pttId'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'swhere': "",
                    'subject':"-1"
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
            ename: 'approve',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
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
        }];
        me.callParent();
    }
});
