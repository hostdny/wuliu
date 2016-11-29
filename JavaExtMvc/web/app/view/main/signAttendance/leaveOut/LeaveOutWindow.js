/**
 * Created by zzw on 2016/11/1.
 */
Ext.define('ExtFrame.view.main.signAttendance.leaveOut.LeaveOutWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.leaveOutWindow',
    viewModel: {type: 'leaveOutModel'},
    layout: 'fit',
    modal: true,
    closeAction: 'close',
    title: '请假外出预览与编辑',
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'leaveOutWindowForm',
            ename: me.ename,
            region: 'center',
            autoScroll: true,
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'right',
                padding: 2
            },
            items: [{
                xtype: 'fieldset',
                title: '请假外出预览与编辑',
                itemId: 'column1',
                collapsible: true,
                defaults: {
                    labelWidth: 89,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [{
                    xtype: 'hiddenfield',
                    itemId: 'hfOid',
                    name: 'id',
                    bind: '{rec.id}'
                }, {
                    xtype: 'treepicker',
                    itemId: 'orgPicker',
                    fieldLabel: '组织机构',
                    name: 'department',
                    displayField: 'cName',
                    valueField: 'id',
                    bind: '{rec.department}',
                    forceSelection: true,// 只能选择下拉框里面的内容
                    emptyText: '请选择组织机构',
                    allowBlank: false,// 不允许为空
                    blankText: '请选择组织机构',// 该项如果没有选择，则提示错误信息
                    rootVisible: false,
                    store: Ext.create('ExtFrame.store.OrgTree', {
                        root: {
                            oid: '00000000000000000000000000000000',
                            name: '',
                            id: '00000000000000000000000000000000',
                            expanded: true
                        },
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + '/organization/queryOrgToCombo.do',
                            reader: {
                                type: 'json'
                            },
                            extraParams: {
                                'parentId': '00000000000000000000000000000000'
                            }
                        },
                        listeners: {
                            nodebeforeexpand: function (node, eOpts) {
                                //点击父亲节点的菜单会将节点的id通过ajax请求，将到后台
                                this.proxy.extraParams.parentId = node.id;
                            }
                        },
                        clearOnLoad: true,
                        nodeParam: 'PID'
                    }),
                    listeners : {
                        select: function (ppp, record, eOpts) {
                            var store = me.down("combo").store;
                            store.getProxy().extraParams = {
                                'unitId':record.data.id
                            };
                            store.reload();
                        }
                    }
                }, {
                    xtype: 'combo',
                    name: 'name',
                    itemId: 'name',
                    bind: '{rec.name}',
                    emptyText: '人员',
                    width:"100%",
                    editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'userCName',
                    valueField: 'id',
                    fieldLabel: '人员',
                    allowBlank: false,
                    field:{userCName:'',id:''},
                    store: Ext.create('ExtFrame.store.ModuleTree', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/personInfo/pagedQueryByBean.do",
                            reader: {
                                type: 'json',
                                rootProperty: 'rows',//数据根节点名称
                                totalProerty: 'total',//数据总数节点名称
                                idProperty: 'pttId'//id标示节点名称
                            },
                            //扩展参数
                            extraParams: {
                                'swhere': "",
                                'unitId': "-1111111"
                            },
                            listeners: {
                                //捕捉异常处理
                                exception: function (theproxy, response, operation, options) {
                                    Tools.Method.ExceptionEncap(response);
                                }
                            }
                        }
                    })
                },{
                    xtype: 'combo',
                    name: 'state',
                    itemId: 'state',
                    bind: '{rec.state}',
                    emptyText: '类型',//是否在网站端显示 0显示 1 不显示
                    editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'abbr',
                    fieldLabel: '类型',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['abbr', 'name'],
                        data: [{'abbr': '0', 'name': '请假'}, {'abbr': '1', 'name': '外出'}]
                    }),
                    listeners: {
                        select: function (aaa, record, eOpts) {
                            var form = me.up("panel").down('form');
                            if (record.data.name == "请假") {
                                form.down("#leaveType").show();
                            } else if (record.data.name == "外出") {
                                form.down("#leaveType").hide();
                                form.down("#leaveType").setValue("");
                            }
                        }
                    }
                }, {
                    xtype: 'combo',
                    name: 'leaveType',
                    id: 'leaveType',
                    itemId: 'leaveType',
                    bind: '{rec.leaveType}',
                    hidden: true,
                    emptyText: '请假类型',//是否在网站端显示 0显示 1 不显示
                    editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'abbr',
                    fieldLabel: '请假类型',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['abbr', 'name'],
                        data: [{'abbr': '0', 'name': '事假'}, {'abbr': '1', 'name': '病假'}]
                    })
                }, {
                    xtype: 'datetimefield',
                    name: 'startTime',
                    itemId: 'startTime',
                    bind: '{rec.startTime}',
                    format: 'Y-m-d',
                    emptyText: '请输入开始时间',
                    fieldLabel: '开始时间',
                    editable: false
                }, {
                    xtype: 'datetimefield',
                    name: 'endTime',
                    itemId: 'endTime',
                    bind: '{rec.endTime}',
                    format: 'Y-m-d',
                    emptyText: '请输入结束时间',
                    fieldLabel: '结束时间',
                    editable: false,
                    listeners: {
                        select: function (aaa, record, eOpts) {
                            var form = me.up("panel").down('form');
                            var startTime = form.down('#startTime').getRawValue().replace(/-/g, "/");
                            var endTime = form.down('#endTime').getRawValue().replace(/-/g, "/");
                            var count = form.down('#count');
                            var sdate = new Date(startTime);
                            var edate = new Date(endTime);
                            var total = (edate - sdate) / 1000;
                            var day = parseInt(total / (24 * 60 * 60));//计算整数天数
                            var afterDay = total - day * 24 * 60 * 60;//取得算出天数后剩余的秒数
                            var hour = parseInt(afterDay / (60 * 60));//计算整数小时数
                            var min = afterDay / (24 * 60 * 60);
                            var sum = day + min;
                            if (startTime >= endTime) {
                                Ext.MessageBox.alert('提示', '日期范围错误！');
                                return;
                            }
                            if (sum > 0.3333 && sum < 1) {
                                form.down('#count').setValue(0.5);
                            }
                            if (sum > 1) {
                                form.down('#count').setValue('');
                            }
                        }
                    }
                }, {
                    xtype: 'numberfield',
                    name: 'count',
                    itemId: 'count',
                    bind: '{rec.count}',
                    minValue: 0.5,
                    emptyText: '请假或外出天数',
                    fieldLabel: '请假或外出天数',
                    allowDecimals: true,
                    allowNegative: false // 允许负数
                }, {
                    xtype: 'textfield',
                    name: 'outReason',
                    itemId: 'outReason',
                    bind: '{rec.outReason}',
                    emptyText: '请假或外出原因',
                    fieldLabel: '请假或外出原因',
                    allowDecimals: false
                }, {
                    xtype: 'textareafield',
                    name: 'remark',
                    itemId: 'remark',
                    bind: '{rec.remark}',
                    emptyText: '备注',
                    fieldLabel: '备注',
                    allowDecimals: false
                }]
            }]
        }];
        me.buttons = [
            {xtype: "button", text: "保存", handler: 'onClickButtonSave'},
            {
                xtype: "button", text: "关闭", handler: 'cancel'
            }
        ];
        this.callParent();
    }
});
