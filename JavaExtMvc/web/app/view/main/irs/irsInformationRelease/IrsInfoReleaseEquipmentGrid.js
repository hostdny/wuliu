/**
 * Created by MSI on 2016/7/15.
 */
Ext.define('ExtFrame.view.main.irs.irsInformationRelease.IrsInfoReleaseEquipmentGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.irsInfoReleaseEquipmentGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        var need_select = false;
        /********************** 根据具体业务需要适当修改 ***********************/
        var pageSize = 10;//分页条数
        var OrderField = 'createName';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            { xtype : 'rownumberer', text: "序号", width: 45, align: 'center',},
            {text: 'id', dataIndex: 'id', hidden: true},
            {text: '设备名称', dataIndex: 'name', searchable: true},
            {
                text: '状态', dataIndex: 'status', renderer: function (v) {
                    if (v == "0") {
                        return '<span style="color: green">启用</span>';
                    } else if (v == "1") {
                        return '<span style="color: red">禁用</span>';
                    }
                }
            },
            {text: '创建时间', dataIndex: 'createTime'}
        ];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/irsEquipment/query.do",
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
        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: ['->',
                {
                    xtype: "button",
                    text: "确定",
                    handler:'onClickEquipmentSelect'
                }, {
                    xtype: "button",
                    text: "选择所有",
                    handler:'onClickEquipmentAll'
                },{
                    xtype: "button",
                    text: "关闭",
                    handler:'onClickEquipmentClose'
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
