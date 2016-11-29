/**
 * Created by Administrator on 2016/7/8.
 */
Ext.define('ExtFrame.view.main.tipOff.tipList.TipListWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.tipListWindow',
    viewModel: {type: 'tipListModel'},
    layout: {type: 'border'},
    width: 700,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '详细信息',
    buttonAlign: 'center',
    fit: true,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'tipListForm',
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
                title: '人员信息',
                itemId: 'column1',
                collapsible: true,
                defaults: {
                    labelWidth: 89,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [{
                    xtype: 'hiddenfield',
                    itemId: 'ID',
                    name: 'oid',
                    bind: '{rec.oid}',
                    readOnly:true
                }, {
                    xtype: 'displayfield',
                    name: 'tiperName',
                    itemId:'tiperName',
                    bind: '{rec.tiperName}',
                    emptyText: '姓名',
                    fieldLabel: '姓名',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'tiperMid',
                    bind: '{rec.tiperMid}',
                    emptyText: '身份证',
                    fieldLabel: '身份证',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'tiperNumber',
                    bind: '{rec.tiperNumber}',
                    emptyText: '电话',
                    fieldLabel: '电话',
                    allowDecimals: false
                    }]
            }, {
                xtype: 'fieldset',
                title: '举报信息',
                itemId: 'column2',
                collapsible: true,
                defaults: {
                    labelWidth: 89,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [{
                    xtype: 'treepicker',
                    itemId: 'orgPicker',
                    hidden:true,
                    fieldLabel: '组织机构',
                    name: 'orgName',
                    displayField: 'cName',
                    valueField: 'id',
                    bind: '{rec.orgName}',
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
                },{
                    xtype: 'combo',
                    name: 'accepter',
                    itemId: 'accepter',
                    hidden:true,
                    bind: '{rec.accepter}',
                    emptyText: '负责人分类',
                    width:"100%",
                    editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'userCName',
                    valueField: 'id',
                    fieldLabel: '负责人',
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
                                'unitId': ""
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
                    xtype: 'displayfield',
                    hidden:true,
                    name: 'orgName',
                    itemId: 'orgName',
                    bind: '{rec.orgName}',
                    fieldLabel: '组织机构',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    hidden:true,
                    name: 'accepterNameShow',
                    itemId: 'accepterNameShow',
                    bind: '{rec.accepterNameShow}',
                    fieldLabel: '负责人',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'tipTypeShow',
                    itemId: 'tipTypeShow',
                    bind: '{rec.tipTypeShow}',
                    fieldLabel: '举报类型',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'addMessage1',
                    itemId: 'addMessage1',
                    bind: '{rec.addMessage1}',
                    fieldLabel: '举报简介',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'tipName',
                    itemId: 'tipName',
                    bind: '{rec.tipName}',
                    fieldLabel: '举报标题',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'rptDate',
                    itemId: 'rptDate',
                    bind: '{rec.rptDate}',
                    fieldLabel: '举报时间',
                    width:'100%',
                    allowDecimals: false
                }
            ]
            },{
                xtype: 'downLoadGrid',
                itemId: 'downLoadGrid',
                ename: me.ename,
                region: 'south',
                split: true
            },]
            }];
        me.buttons = [
            {xtype: "button", text: "保存",itemId:"saveButton", handler: 'onClickButtonSave'},
            {xtype: "button", text: "关闭", handler: 'onClickClear'}
        ];
        me.callParent();
    }
});
