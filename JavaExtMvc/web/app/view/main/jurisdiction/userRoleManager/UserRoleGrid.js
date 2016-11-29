Ext.define('ExtFrame.view.main.jurisdiction.userRoleManager.UserRoleGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.userRoleGrid',
    fit: true,
    stripeRows: true,
    listeners: {
        selectionchange: function (me, selected, eOpts) {
            var selecttionUser = me.getSelection();
            var roleUserGrid = Ext.getCmp("RoleUserGrid");
            if (me.getSelection().length == 1) {
                var roles = me.getSelection()[0].data.roles;
                $.each(roleUserGrid.store.data.items, function (index, record) {
                    $.each(roles, function (index, role) {
                        if (role.oid == record.data.oid) {
                            roleUserGrid.selModel.select(record, true, true);
                        }
                    });
                });
            } else {
                $.each(roleUserGrid.store.data.items, function (index, record) {
                    roleUserGrid.selModel.deselect(record, true);
                });
            }
        }
    },
    initComponent: function () {
        var me = this;
        var need_select = false;
        /********************** 根据具体业务需要适当修改 ***********************/
        var pageSize = 10;//分页条数
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
             { text: 'No.', xtype: 'rownumberer', width: 30 },
             { text: 'OID', dataIndex: 'oid', hidden: true },
             { text: '姓名', dataIndex: 'name', searchable: true, sortable: false, fieldType: 'string' },
             { text: '用户名', dataIndex: 'userName', searchable: true, sortable: false, fieldType: 'string' },
             {
                 text: '状态', dataIndex: 'state', sortable: false, renderer: function (v) {
                     if (v == 1) {
                     }
                     else if (v == 0) {
                         return '正常';
                     }
                 }
             },
             {
                 text: '所属组织机构', dataIndex: 'orgs', flex: 3, sortable: false, renderer: function (v) {
                     var value = "";
                     if (v != null) {
                         $.each(v, function (i, o) {
                             value += o.name + ",";
                         });
                         value = value.substring(0, value.length - 1);
                         return value;
                     }
                 }
             },
             {
                 text: '拥有角色', dataIndex: 'roles', flex: 5, sortable: false, renderer: function (v) {
                     var value = "";
                     if (v != null) {
                         $.each(v, function (i, o) {
                             value += o.name + ",";
                         });
                         value = value.substring(0, value.length - 1);
                         return value;
                     }
                 }
             }
        ];
        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: { property: OrderField, direction: OrderType },
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/baseUserInfo/getUserList.do",
                reader: {
                    type: 'json',
                    rootProperty: 'extData',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'OID'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'swhere': "oid|string|4ED0562765A34692919995D21CB86650",
                    'xtype': 'org'
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
            items: [{
                xtype: 'treepicker',
                itemId: 'orgPicker',
                fieldLabel: '选择组织机构',
                displayField: 'name',
                valueField: 'oid',
                forceSelection: true,// 只能选择下拉框里面的内容
                emptyText: '请选择组织机构',
                allowBlank: false,// 不允许为空
                blankText: '请选择组织机构',// 该项如果没有选择，则提示错误信息
                rootVisible: false,
                store: Ext.create('ExtFrame.store.OrgTree', {
                    root: {
                        oid: '00000000-0000-0000-0000-000000000000',
                        name: '',
                        id: '00000000-0000-0000-0000-000000000000',
                        expanded: true
                    },
                    proxy: {
                        type: 'ajax',
                        url: Tools.Method.getAPiRootPath() + '/baseOrgInfo/getOrgListForTreegrid.do',
                        reader: {
                            type: 'json',
                            rootproperty: 'children'//数据根节点名称
                        },
                        extraParams: {
                            'orgId': '00000000-0000-0000-0000-000000000000'
                        }
                    },
                    listeners : {
                        nodebeforeexpand:function(node,eOpts){
                            //点击父亲节点的菜单会将节点的id通过ajax请求，将到后台
                            this.proxy.extraParams.orgId = node.id;
                        }
                    },
                    clearOnLoad: true,
                    nodeParam: 'PID'
                }),
                listeners: {
                    select: function (me, record, eOpts) {
                        //选择的组织机构id
                        var orgid = record.getData().oid;
                        var type = "org";
                        var rtype = "org";
                        var swhere = "oid|string|" + orgid + "|=";
                        var rwhere = swhere;
                        //alert(orgid);
                        //if (orgid == "4ED0562765A34692919995D21CB86650") { //如果选择的是公司机构) {
                        //    swhere = rwhere = "";
                        //}
                        var userGrid = me.up("#UserRoleManagerGrid");
                        var roleGrid = userGrid.up("#tab-UserRoleManager-grid").down("#RoleUserGrid");
                        //带附加参数重构grid store数据
                        userGrid.store.getProxy().extraParams = {
                            "swhere": swhere,
                            'xtype': type
                        };
                        //重新加载grid
                        userGrid.store.reload();
                        roleGrid.store.getProxy().extraParams = {
                            "swhere": rwhere,
                            'xtype': rtype
                        };
                        roleGrid.store.reload();
                    }
                }
            }]
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
        /********************** 根据具体业务需要适当修改 ***********************/

        me.on('beforecellclick', function (sender, td, cellIndex, record, tr, rowIndex, e) {
            if (cellIndex == 0) {
                need_select = true;
                e.stopEvent();
                if (me.selModel.isSelected(record))
                    me.selModel.doDeselect(record, false);
                else
                    me.selModel.doSelect(record, true);
            }
            return true;
        });
        function select_deselect(model, record, index) {
            index = me.store.indexOf(record);

            me.getView().focusRow(index);
            if (need_select) {
                if (need_select != 'all' || (need_select == 'all' && me.view.all.count - 1 == index)) {
                    need_select = false;
                }
                return true;
            }
            return false;
        };
        me.on('beforeselect', select_deselect);
        me.on('beforedeselect', select_deselect);
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
