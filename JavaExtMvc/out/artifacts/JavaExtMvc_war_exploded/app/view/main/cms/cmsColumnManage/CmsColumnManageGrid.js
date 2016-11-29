Ext.define('ExtFrame.view.main.cms.cmsColumnManage.CmsColumnManageGrid', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Ext.ux.CheckColumn'
    ],
    alias: 'widget.cmsColumnManageGrid',
    fit: true,
    reserveScrollbar: true,
    rootVisible: false,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        me.columns = [
            {
                text: 'ID',
                dataIndex: 'id',
                hidden: true
            },{
                text: '名称',
                dataIndex: 'name',
                xtype: 'treecolumn',
                width: 180
            },{
                text: '栏目url',
                dataIndex: 'url',
                width: 180
            },{
                text: '所属区域',
                dataIndex: 'akey',
                width: 300
            },{
                text: '编码',
                dataIndex: 'code'
            }
        ];
        // gird行操作按钮
        //Tools.Grid.CreateOperationBtn(me, 'cmsColumnManage');
        //构造grid store
        me.store = Ext.create('ExtFrame.store.OrgTree', {
            root: {
                typeName: '',
                parentId: "",
                expanded: true
            },
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + '/cmsProgram/queryAllNews.do',
                reader: {
                    type: 'json'
                },
                extraParams: {
                    'swhere': "",
                    parentId: ""
                }
            }
        });
        me.selModel = Ext.create('Ext.selection.CheckboxModel', {
            mode: 'SIMPLE',//multi,simple,single；默认为多选multi
            injectCheckbox: 0,//checkbox位于哪一列，默认值为0
            checkOnly: true,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true
        });
        //grid 工具栏
        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
            hasSearch: false,
            ename: 'cmsColumnManage',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            dock: 'top',
            items: []
        }];
        me.callParent();
    }
});
