/**
 * Created by Administrator on 2016/11/28.
 */

Ext.define('ExtFrame.view.main.bankManage.bankAccountGrid', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Ext.ux.CheckColumn'
    ],
    alias: 'widget.bankAccountgrid',
    fit: true,
    reserveScrollbar: true,
    rootVisible: false,
    stripeRows: true,
    //selType: 'checkboxmodel',
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
            { text: 'ID', dataIndex: 'id', hidden: true },
            { text: '名称', dataIndex: 'text', xtype: 'treecolumn', width: 180 },
            { text: '编号', dataIndex: 'code' },
            { text: '英文名称', dataIndex: 'ename', width: 180 },
            { text: '类名/事件', dataIndex: 'pathHandler', width: 300 },
            {
                text: '类型', dataIndex: 'flag', renderer: function (v) {
                if (v == 0) {
                    return '菜单';
                }
                else if (v == 1) {
                    return '工具栏按钮';
                }
                else if (v == 2) {
                    return '数据请求';
                }
                else if (v == 3) {
                    return '行操作按钮';
                }
                else if (v == 4) {
                    return '页面按钮';
                }
            }
            },
            {
                text: '状态', dataIndex: 'state', renderer: function (v) {
                if (v == 1) {
                    return '停用';
                }
                else if (v == 0) {
                    return '启用';
                }
            }
            },
            { text: '排序', dataIndex: 'sortCode'}
        ];
        // gird行操作按钮
        Tools.Grid.CreateOperationBtn(me, 'ModuleManager');
        //构造grid store
        me.store = Ext.create('ExtFrame.store.ModuleTree', {
            root: {
                oid: '00000000000000000000000000000000',
                name: '',
                id: '00000000000000000000000000000000',
                expanded: true
            },
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + '/module/getModuleListForTreeGrid.do',

                reader: {
                    type: 'json',
                    rootproperty: 'children'//数据根节点名称
                },
                extraParams: {
                    'moduleId': '00000000000000000000000000000000'
                }
            },
            listeners : {
                nodebeforeexpand:function(node,eOpts){
                    //点击父亲节点的菜单会将节点的id通过ajax请求，将到后台
                    if(node.id =='00000000000000000000000000000000'){
                        this.proxy.extraParams.moduleId = node.oid;
                    }else{
                        this.proxy.extraParams.moduleId = node.raw.oid;

                    }
                }
            },
            clearOnLoad: true,
            nodeParam: 'PID'
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
                //need_select = 'all';
                //if (header.isCheckerHd) {
                //    e.stopEvent();
                //    var me = this,
                //        isChecked = header.el.hasCls(Ext.baseCSSPrefix + 'grid-hd-checker-on');
                //
                //    me.preventFocus = true;
                //    if (isChecked) {
                //        me.deselectAll();
                //    } else {
                //        me.selectAll();
                //    }
                //    delete me.preventFocus;
                //}
            }
        });
        //grid 工具栏
        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
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
