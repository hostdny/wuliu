/**
 * Created by Jia on 2016/8/30.
 */
Ext.define('ExtFrame.view.main.knowledgeArea.knowdelageType.KnowdelageTypeGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.knowdelageTypeGrid',
    viewModel: { type: 'knowdelageTypeModel' },
    fit: true,
    stripeRows: true,
    defaults: {
        bodyPadding: 0
    },
    initComponent: function () {
        var me = this;
        var pageSize = 20;//分页条数
        var OrderField = 'createTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {
                text: 'id',
                dataIndex: 'id',
                hidden: true
            }, {
               xtype: 'rownumberer',
               text:'序号',
               width: 50
           },{
                text: '分类名称',
                width: 150,
                sortable: true,
                dataIndex: 'typeName'
            },{
                text: '排序',
                width: 150,
                sortable: true,
                dataIndex: 'sortOrder'
            },{
                text: '加入时间',
                width: 150,
                sortable: true,
                dataIndex: 'createTime'
            },{
                text: '状态',
                width: 150,
                sortable: true,
                dataIndex: 'typeState',
                renderer: function (v) {
                    if (v == "0") {
                        return '启用';
                    } else if (v == "1") {
                        return '禁用';
                    } else{
                        return '';
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
                url: Tools.Method.getAPiRootPath() + "/knowdelageType/pagedQueryByBean.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'Id'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'swhere': "",
                    'id':'-1'
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
            ename: 'knowdelageType',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
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
        me.selModel = Ext.create('Ext.selection.CheckboxModel', {
            mode: 'single',//multi,simple,single；默认为多选multi
            injectCheckbox: 0,//checkbox位于哪一列，默认值为0
            checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true
        });
        me.callParent();
    }
});
