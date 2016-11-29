Ext.define('ExtFrame.view.main.sys.organizationManager.OrganizationGrid', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Ext.ux.CheckColumn'
    ],
    alias: 'widget.organizationGrid',
    fit: true,
    reserveScrollbar: true,
    rootVisible: false,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        /********************** 根据具体业务需要适当修改 ***********************/
        /*
         ** grid控件绑定列
         ** text: 前台显示文字, dataIndex: 数据绑定字段, sortable: 能否排序（缺省值为true）
         ** searchable: 能否查询（缺省值为false）
         ** fieldType: 字段类型（用户查询控件拼接where字句，目前仅支持 string、int、datetime
         其中string类型使用'like'关键字查询，其余的使用'='关键字查询）
         */
        me.columns = [
            {text: 'ID', dataIndex: 'id', hidden: true},
            {text: '中文名称', dataIndex: 'cName', xtype: 'treecolumn', width: 180},
            {text: '英文名称', dataIndex: 'eName', width: 180},
            {text: '机构编号', dataIndex: 'code', width: 180},
            {text: '状态', dataIndex: 'state', renderer: function (v) {
                    if (v == 1) {
                        return '停用';
                    } else if (v == 0) {
                        return '启用';
                    }
                }
            },
            {text: '排序', dataIndex: 'sortNo'}
        ];
        Tools.Grid.CreateOperationBtn(me, 'OrganizationManager');
        //构造grid store
        me.store = Ext.create('ExtFrame.store.ModuleTree', {
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/organization/queryOrgToCombo.do",
                folderSort: true,
                //扩展参数
                extraParams: {
                    'parentId': '00000000000000000000000000000000'
                }
            },
            listeners: {
                nodebeforeexpand: function (node, eOpts) {
                    //点击父亲节点的菜单会将节点的id通过ajax请求，将到后台
                    this.proxy.extraParams.parentId = node.id;
                }
            }
        });
        me.selModel = Ext.create('Ext.selection.CheckboxModel', {
            mode: 'SIMPLE',//multi,simple,single；默认为多选multi
            injectCheckbox: 0,//checkbox位于哪一列，默认值为0
            checkOnly: true,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true,
            onKeySpace: function (e) {
                need_select = true;

                var record = e.record || this.lastFocused;
                if (record) {
                    this.afterKeyNavigate(e, record);
                }
            },
            onHeaderClick: function (headerCt, header, e) {
                need_select = 'all';
                if (header.isCheckerHd) {
                    e.stopEvent();
                    var me = this,
                        isChecked = header.el.hasCls(Ext.baseCSSPrefix + 'grid-hd-checker-on');

                    me.preventFocus = true;
                    if (isChecked) {
                        me.deselectAll();
                    } else {
                        me.selectAll();
                    }
                    delete me.preventFocus;
                }
            }
        });
        //grid 停靠item
        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            itemId: 'searchtoolbar',
            hasSearch: false,
            ename: me.ename,//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            dock: 'top',
            items: []
        }];
        me.callParent();
    },
    listeners: {
        checkchange: 'checkChild'
    }
});
