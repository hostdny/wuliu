/**
 * Created by wangBin on 2016/9/28.
 */
Ext.define('ExtFrame.view.main.proposal.proposalPersonnelAuditing.ProposalPersonnelAuditingGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.proposalPersonnelAuditingGrid',
    viewModel: {type: 'proposalPersonnelAuditingModel'},
    fit: true,
    stripeRows: true,
    defaults: {
        bodyPadding: 0,
        align: "center"
    },
    initComponent: function () {
        var me = this;
        var pageSize = 20;//分页条数
        var OrderField = 'createTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [{
            xtype: 'rownumberer',
            text: '序号',
            width: 50
        }, {
            text: '姓名',
            width: 150,
            sortable: true,
            dataIndex: 'userCName'
        },{
                text: '账号',
                width: 150,
                sortable: true,
                dataIndex: 'userEName'
            },{
            text: '性别',
            width: 50,
            sortable: true,
            dataIndex: 'userSex',
            renderer: function (value) {
                if (value == "0") {
                    return '男';
                } else {
                    return '女';
                }
            }
        }, {
            text: '出生年月',
            width: 150,
            sortable: true,
            dataIndex: 'userBirthday'
        }, {
            text: '手机号',
            width: 150,
            sortable: true,
            dataIndex: 'telephone'
        }, {
            text: '工作单位',
            width: 150,
            sortable: true,
            dataIndex: 'userUnitName'
        }, {
            text: '身份',
            width: 150,
            sortable: true,
            dataIndex: 'official',
            renderer: function (value) {
                if (value == "0") {
                    return '人大代表';
                } else {
                    return '政协委员';
                }
            }
        }, {
            text: '职务/职称',
            width: 150,
            sortable: true,
            dataIndex: 'userPosition'

        }, {
            text: '审核状态',
            width: 150,
            sortable: true,
            dataIndex: 'status',
            renderer: function (value) {
                if (value == "0") {
                    return '审核中';
                } else if(value == "1"){
                    return '通过';
                } else if(value=="2"){
                    return '拒绝';
                }else{
                    return value;
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
                url: Tools.Method.getAPiRootPath() + "/commonUser/pagedQueryByBean.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'pttId'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    userType: "1"
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
            mode: 'single',//multi,simple,single；默认为多选multi
            injectCheckbox: 0,//checkbox位于哪一列，默认值为0
            checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true
        });
        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
            ename: 'proposalPersonnelAuditing',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
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
        me.callParent();
    }
});
