/**
 * Created by wangBin on 2016/8/29.
 */
Ext.define('ExtFrame.view.main.knowledgeArea.knowledgeAreaFileList.KnowledgeAreaFileListGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.knowledgeAreaFileListGrid',
    viewModel: { type: 'knowledgeAreaFileListModel' },
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
                xtype: "rownumberer",
                text: "序号",
                width: 40
            },{
                text: '分类',
                width: 150,
                sortable: true,
                dataIndex: 'pidName'
            },{
                text: '文件名称',
                width: 300,
                sortable: true,
                dataIndex: 'fileName'
            },{
                text: '文件类型',
                width: 150,
                sortable: true,
                dataIndex: 'fileType'
            },{
                text: '加入时间',
                width: 150,
                sortable: true,
                dataIndex: 'createTime'
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
                url: Tools.Method.getAPiRootPath() + "/knowledageFile/pagedQueryByBean.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'pttId'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'swhere': "",
                    'pid':"-1",
                    fileName:""
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
            mode: 'SINGLE',//multi,simple,single；默认为多选multi
            singleSelect:true,
            injectCheckbox: 0,//checkbox位于哪一列，默认值为0
            checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true
        });
        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
            ename: 'knowledgeAreaFileList',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            hasSearch: false,
            dock: 'top',
            items: [{
                xtype: 'textfield',
                itemId: 'fileName',
                name: 'fileName',
                bind: '{rec.fileName}',
                fieldLabel: '文件名称',
                labelWidth: 60,
                emptyText: '请输入文件名称',
                allowDecimals: false
            },{
                text: '搜索',
                handler: "onClickSearch"
            }]
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
