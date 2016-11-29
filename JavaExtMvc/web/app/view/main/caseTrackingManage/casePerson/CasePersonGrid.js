/**
 * Created by wangBin on 2016/11/4.
 */
Ext.define('ExtFrame.view.main.caseTrackingManage.casePerson.CasePersonGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.casePersonGrid',
    viewModel: {type: 'casePersonModel'},
    fit: true,
    stripeRows: true,
    defaults: {
        bodyPadding: 0,
        align: "center"
    },
    id:"casePersonGridId",
    initComponent: function () {
        var me = this;
        var pageSize = 20;//分页条数
        var OrderField = 'createTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [{
            text: '案件名称',
            width: 150,
            sortable: true,
            dataIndex: 'caseName'
        }, {
            text: '人员名称',
            width: 150,
            sortable: true,
            dataIndex: 'personName'
        }, {
            text: '人员身份证号',
            width: 200,
            sortable: true,
            dataIndex: 'personId'
        }, {
            text: '人员手机号',
            width: 200,
            sortable: true,
            dataIndex: 'personTelephone'
        }, {
            text: '人员和本案关系',
            width: 150,
            sortable: true,
            dataIndex: 'personCaseRela',
            renderer: function (value) {
                if (value == '0') {
                    return "嫌疑人";
                }else if(value == '1'){
                    return "嫌疑人家属";
                }else if(value == '2'){
                    return "办案人员";
                }else if(value == '3'){
                    return "律师";
                }else if(value == '4'){
                    return "法官";
                }
            }
        }, {
            text: '人员所在部门',
            width: 150,
            sortable: true,
            dataIndex: 'personTeam'
        }];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/casePersonRela/pagedQueryByBean.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'pttId'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'delFlag': 0
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
            mode: 'simple',//multi,simple,single；默认为多选multi
            injectCheckbox: 0,//checkbox位于哪一列，默认值为0
            checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true
        });
        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
            ename: 'casePerson',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
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