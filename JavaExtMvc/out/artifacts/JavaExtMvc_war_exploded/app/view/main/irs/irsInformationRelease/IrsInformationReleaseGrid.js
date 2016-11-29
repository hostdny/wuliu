/**
 * Created by LvXL on 2016/7/14.d
 */
Ext.define('ExtFrame.view.main.irs.irsInformationRelease.IrsInformationReleaseGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.irsInformationReleaseGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        var need_select = false;
        /********************** 根据具体业务需要适当修改 ***********************/
        var pageSize = 20;//分页条数
        var OrderField = 'createTime';//默认排序字段
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
            {
                text: '信息状态', dataIndex: 'status', renderer: function (v) {
                    if (v == "0") {
                        return '<span style="color: green">启用</span>';
                    } else if (v == "1") {
                        return '<span style="color: red">禁用</span>';
                    }
                }
            },
            {
                text: '审核状态', dataIndex: 'auditStatus', renderer: function (v) {
                    if (v == "0") {
                        return '未审核';
                    } else if (v == "1") {
                        return '审核通过';
                    } else if (v == "2") {
                        return '退回';
                    }
                }
            },
            {text: '信息标题', dataIndex: 'infoTitle', searchable: true, fieldType: 'string'},
            {
                text: '信息类型', dataIndex: 'infoType', renderer: function (v) {
                    if (v == "0") {
                        return '图片';
                    } else if (v == "1") {
                        return '视频';
                    } else if (v == "2") {
                        return '文字';
                    }
                }
            },
            {
                text: '信息级别', dataIndex: 'infoLevel', renderer: function (v) {
                    if (v == "0") {
                        return '普通';
                    } else if (v == "1") {
                        return '紧急';
                    }
                }
            },
            {
                text: '创建时间', dataIndex: 'createTime', width: 100, renderer: function (v) {
                if (v != undefined && v != '' && v.length >= 10) {
                    return v.substr(0, 10);
                }
            }
            },
            {text: '接收设备', dataIndex: 'equipmentNames',width: 300}
        ];
        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            autoLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/irsInformation/pagedQueryByBean.do?attachmentFlag=1",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'id'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'swhere': ""
                },
                listeners: {
                    //捕捉异常处理
                    exception: function (theproxy, response, operation, options) {
                        Tools.Method.ExceptionEncap(response);
                    }
                }
            },
            listeners: {
                beforeload: function (store, operation, eOpts) {
                    var aaa = store;
                }
            }
        });
        //grid 停靠item
        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            itemId: 'searchtoolbar',
            ename: me.ename,//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            searchEx: false,//扩展查询，当为true时，查询控件会自动构造sql语句的整个语句
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
            checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
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
