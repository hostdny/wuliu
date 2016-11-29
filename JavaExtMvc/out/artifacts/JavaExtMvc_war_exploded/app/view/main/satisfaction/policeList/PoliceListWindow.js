/**
 * Created by zzw on 2016/8/3.
 */
Ext.define('ExtFrame.view.main.satisfaction.policeList.PoliceListWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.policeListWindow',
    controller: 'policeListController',
    viewModel: {type: 'policeListModel'},
    layout: {type: 'border'},
    width: 700,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '详细信息',
    buttonAlign: 'center',
    autoScroll:'true',
    fit: true,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: me.ename + 'Form',
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
                title: '基本信息',
                itemId: 'column1',
                collapsible: true,
                defaults: {
                    labelWidth: 89,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [{
                    xtype: 'hiddenfield',
                    itemId: 'id',//注意，此itemId要写固定，functionjs中重置from有用到
                    name: 'id',
                    bind: '{rec.id}'
                },{
                    xtype: 'treepicker',
                    itemId: 'orgPicker',
                 //   hidden:true,
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
                    bind: '{rec.ids}',
                    emptyText: '姓名',
                    width:"100%",
                    editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'userCName',
                    valueField: 'id',
                    fieldLabel: '姓名',
                    allowBlank: false,
                    multiSelect: true,
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
                                'unitId': "-11111"
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
                    xtype: 'textfield',
                    hidden:true,
                    name: 'orgName',
                    itemId: 'orgName',
                    bind: '{rec.orgName}',
                    fieldLabel: '组织机构',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'textfield',
                    hidden:true,
                    name: 'ids',
                    itemId: 'ids',
                    bind: '{rec.ids}',
                    fieldLabel: '姓名',
                    width:'100%',
                    allowDecimals: false
                }]
            }]
        }];
        me.buttons = [
            {xtype: "button", text: "保存", handler: 'onClickButtonSave'},
            { xtype: "button", text: "关闭", handler: function () {
                this.up("panel").down('form').getForm().reset();
                this.up("panel").collapse();
            }
            }
        ];
        this.callParent();
    }
});