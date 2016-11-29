/**
 * Created by wangBin on 2016/9/21.
 */
Ext.define('ExtFrame.view.main.briberyCrimeAdmin.briberyCrimeManage.BriberyCrimeManageGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.briberyCrimeManageGrid',
    viewModel: {type: 'briberyCrimeManageModel'},
    fit: true,
    stripeRows: true,
    defaults: {
        bodyPadding: 0
    },
    initComponent: function () {
        var me = this;
        var pageSize = 20;//分页条数
        var OrderField = 'id';//默认排序字段
        var OrderType = 'ASC';//默认排序类型 ASC/DESC
        me.columns = [
            {
                text: '名称',
                width: 600,
                sortable: true,
                dataIndex: 'title'
            }, {
                text: '是否在网站端显示', dataIndex: 'isShow', width: 180, renderer: function (v) {
                    if (v == "0") {
                        return '显示';
                    } else if (v == "1") {
                        return '不显示';
                    }
                }
            }];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/briberyCrimeManage/pagedQueryByBean.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'Id'//id标示节点名称
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
            ename: 'briberyCrimeManage',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
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
            injectCheckbox: 0,//checkbox位于哪一列，默认值为0
            checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true
        });
        me.callParent();
    }
});
