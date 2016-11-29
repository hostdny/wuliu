/**
 * Created by zzw on 2016/9/26.
 */
Ext.define('ExtFrame.view.main.cms.cmsProgram.CmsProgramGrid', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Ext.ux.CheckColumn'
    ],
    alias: 'widget.cmsProgramGrid',
    fit: true,
    rootVisible: false,
    reserveScrollbar: true,
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
                text: '链接地址',
                dataIndex: 'url',
                width: 180
            },{
                text: '栏目代码',
                dataIndex: 'akey',
                width: 100
            },{
                text: '是否在网站端显示', dataIndex: 'isShow', width: 180, renderer: function (v) {
                    if (v == "0") {
                        return '显示';
                    } else if (v == "1") {
                        return '不显示';
                    }
                }
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
                    siteId: "-1"
                }
            }
        });
        me.selModel = Ext.create('Ext.selection.CheckboxModel', {
            mode: 'simple',//multi,simple,single；默认为多选multi
            injectCheckbox: 0,//checkbox位于哪一列，默认值为0
            checkOnly: true,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true
        });
        //grid 工具栏
        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
            hasSearch: false,
            ename: me.ename,//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            dock: 'top',
            items: [{
                    xtype: 'combo',
                    itemId: 'siteName',
                    allowNegative: false,
                    name: 'siteName',
                    fieldLabel: '站点名',
                    labelWidth: 50,
                    emptyText: '请输入站点名',
                    allowDecimals: false,
                    editable: false,
                    store: Ext.create('ExtFrame.store.Org', {
                        pageSize: 0,
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/cmsSite/queryAll.do",
                            reader: {
                                type: 'json'
                            }
                        }
                    }),
                    queryMode: 'local',
                    displayField: 'siteName',
                    valueField: 'id',
                    listeners : {
                        select: "onSelectTree"
                    }
            }
                //,{text: '搜索',
            //    handler: "onClickSearch"}
            ]
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
