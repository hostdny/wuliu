/**
 * Created by zzw on 2016/9/24.律师接受委托表回复
 */
Ext.define('ExtFrame.view.main.lawyerAcceptManage.lawyerAccept.LawyerAcceptGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.lawyerAcceptGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        var pageSize = 10;//分页条数
        var sort = 'reservationTime';//默认排序字段
    //    var OrderType = 'DESC';//默认排序类型 ASC/DESC

        me.columns = [
            {text: 'id', dataIndex: 'id', hidden: true},
            {text: '律师姓名', dataIndex: 'lawyerName'},
            {text: '律师证号', dataIndex: 'lawyerNo'},
            {text: '律师事务所名称', dataIndex: 'company',width:150},
            {text: '手机号', dataIndex: 'phoneNo'},
            {text: '是否法律援助中心指派', dataIndex: 'legalAidCenter',width:180},
            {text: '是否应回避', dataIndex: 'avoid'},
            {text: '犯罪人姓名', dataIndex: 'suspectName'},
            {text: '性别', dataIndex: 'sex'},
            {text: '案由', dataIndex: 'summary'},
            {text: '诉讼阶段', dataIndex: 'litigiousStage'},
            {text: '强制措施', dataIndex: 'coerciveMeasure'},
            {text: '接受委托时间', dataIndex: 'acceptanceCommissionDate'},
            {text: '委托人', dataIndex: 'client'},
            {text: '委托人与被告人关系', dataIndex: 'relationship',width:150},
            {text: '提交预约申请', dataIndex: 'submitApply',renderer: function (v) {
                if (v == "0") {
                    return '是';
                } else if (v == "1") {
                    return '否';
                }}},
            {text: '申请阅卷', dataIndex: 'applicationMarking'},
            {text: '申请会见承办人', dataIndex: 'meetContractors'},
            {text: '会见原因', dataIndex: 'reasonsForMeeting'},
            {text: '其他', dataIndex: 'other'},
            {text: '备注', dataIndex: 'remark'},
            {text: '服务号', dataIndex: 'serverId'},
            {text: '审核状态', dataIndex: 'lawyerState',renderer: function (v) {
                if (v == "0") {
                    return '审核中';
                } else if (v == "1") {
                    return '通过';
                }else if (v == "2") {
                    return '不通过';
                }
            }},
            {text: '预约时间', dataIndex: 'reservationTime'},
            {text: '预约地点', dataIndex: 'reservationAddress',width:150},
            {text: '预约备注', dataIndex: 'reservationRemark'},
            {text: '拒绝理由', dataIndex: 'reason'}

        ];
        //构造grid store
        me.store = Ext.create('ExtFrame.store.Role', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
          //  sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/lawyerAccept/queryByPage.do",
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
                mode: 'SINGLE',//multi,simple,single；默认为多选multi
                singleSelect:true,
                injectCheckbox: 0,//checkbox位于哪一列，默认值为0
                checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
                enableKeyNav: true
            });
        me.callParent();
    }
});