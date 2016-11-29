Ext.define('ExtFrame.view.main.appManage.appVersionDetail.AppVersionGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.appVersionGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        var need_select = false;
        /********************** 根据具体业务需要适当修改 ***********************/
        var pageSize = 20;//分页条数
        var OrderField = 'appVersion';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        /*
         ** grid控件绑定列
         ** text: 前台显示文字, dataIndex: 数据绑定字段, sortable: 能否排序（缺省值为true）
         ** searchable: 能否查询（缺省值为false）
         ** fieldType: 字段类型（用户查询控件拼接where字句，目前仅支持 string、int、datetime
         其中string类型使用'like'关键字查询，其余的使用'='关键字查询）
         */
        me.columns = [
            {text: 'id', dataIndex: 'id', hidden: true},
            {text: '所属应用名称', dataIndex: 'appInfoName'},
            {text: '所属编码', dataIndex: 'appCode', searchable: true},
            {text: 'app包名称', dataIndex: 'appPackage', width: 220},
            {
                text: '是否最新', dataIndex: 'isNew', renderer: function (v) {
                if (v == 1) {
                    return '最新';
                }
                else if (v == 0) {
                    return '历史';
                }
            }
            },
          //  {text: 'app下载地址', dataIndex: 'appUrl'},
           // {text: 'app图标地址', dataIndex: 'appIconUrl'},
            {text: 'app版本号', dataIndex: 'appVersion'},
            {
                text: '状态', dataIndex: 'status', renderer: function (v) {
                if (v == 1) {
                    return '停用';
                }
                else if (v == 0) {
                    return '正常';
                }
            }
            },
           // {text: '排序', dataIndex: 'sortNo'},
            {text: '版本描述', dataIndex: 'remark'}
        ];
        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: {property: OrderField, direction: OrderType},
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/appVersionDetail/pagedQueryByBean.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'id'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'swhere': "delFlag|int|0"
                },
                listeners: {
                    //捕捉异常处理
                    exception: function (theproxy, response, operation, options) {
                        Tools.Method.ExceptionEncap(response);
                    }
                }
            }
        });
        //grid 停靠item
        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            itemId: 'searchtoolbar',
            ename: me.ename,//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
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
                '-', {
                    cls: 'x-btn-text-icon details'
                }
            ]
        }];
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
        });//添加复选框列  如果不想有复选框是需要把selModel换成Ext.create('Ext.selection.RowModel',{mode:"SIMPLE"})就ok了
        me.callParent();
    }
});
