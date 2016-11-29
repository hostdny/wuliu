/**
 * Created by zzw on 2016/7/22.资产申报
 */
Ext.define('ExtFrame.view.main.assets.assetsDeclaration.AssetsDeclarationGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.assetsDeclarationGrid',
    viewModel: { type: 'assetsDeclarationModel' },
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
            {text: 'id', dataIndex: 'id', hidden: true },
            {text: '资产类别', sortable: true, dataIndex: 'assentTypeId'},
            {text: '已有数量', dataIndex: 'nowNum'},
            {text: '损坏数量', dataIndex: 'breakNum'},
            {text: '申请数量', sortable: true, dataIndex: 'needNum'},
            {text: '审核状态', sortable: true, width:200,dataIndex: 'checkState',renderer: function (v) {
                if (v == "0") {
                    return '待审核';
                } else if (v == "1") {
                    return '已通过，等待购买';
                } else if (v == "2") {
                    return '速来领取';
                }else if (v == "3") {
                    return '完成';
                }else if (v == "4") {
                    return '未通过';
                }
            }},
            {text: '备注', sortable: true, width:200,dataIndex: 'remark'}
        ];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/assentRecord/pagedQueryByBean.do",
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