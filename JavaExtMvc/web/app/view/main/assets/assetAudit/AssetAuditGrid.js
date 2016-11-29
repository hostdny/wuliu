/**
 * Created by zzw on 2016/7/25.资产审核
 */
Ext.define('ExtFrame.view.main.assets.assetAudit.AssetAuditGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.assetAuditGrid',
    viewModel: { type: 'assetAuditModel' },
    fit: true,
    stripeRows: true,
    defaults: {
        bodyPadding: 0
    },
    id:"type",
    initComponent: function () {
        var me = this;
        var pageSize = 10;//分页条数
        var OrderField = 'createTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {text: 'id', dataIndex: 'id', hidden: true },
            {text: '资产类别',width:150,dataIndex: 'assentTypeId'},
            {text: '申请科室', dataIndex: 'orgName'},
            {text: '损坏数量', dataIndex: 'breakNum'},
            {text: '申请数量', dataIndex: 'needNum'},
            {text: '审核状态', width:150,dataIndex: 'checkState',renderer: function (v) {
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
            {text: '操作',dataIndex: 'checkState',width:200,renderer: function (value,eOpts) {
                if (value == '0') {
                    return '<a href="javascript:void(0)" onclick="change(\''+eOpts.record.data.id+'\',\''+1+'\')">通过</a>|<a href="javascript:void(0)" onclick="change(\''+eOpts.record.data.id+'\',\''+4+'\')">未通过</a>';
                } else if (value == '1') {
                    return '<a href="javascript:void(0)" onclick="change(\''+eOpts.record.data.id+'\',\''+2+'\')">领取</a>';
                } else if (value == '2') {
                    return '<a href="javascript:void(0)" onclick="change(\''+eOpts.record.data.id+'\',\''+3+'\')">领取完成</a>';
                } else if (value == '3') {
                    return '完成';
                }
            }
            },
            {text: '备注', width:200,dataIndex: 'remark'}
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
function change(id,vaule){
    var gridType = Ext.getCmp("type");
    var data = {
        id:id,
        checkState:vaule
    }
    var ActionEdit = Tools.Method.getAPiRootPath() + '/assentRecord/editAssentCheckState.do';
    Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', data, true, function (jsonData) {
        if(jsonData.resultCode == "1"){
            gridType.store.reload();
        }
    });
}
