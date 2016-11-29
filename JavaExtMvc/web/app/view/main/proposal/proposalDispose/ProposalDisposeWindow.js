/**
 * Created by wangBin on 2016/9/29.
 */
Ext.define('ExtFrame.view.main.proposal.proposalDispose.ProposalDisposeWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.proposalDisposeWindow',
    viewModel: {type: 'proposalDisposeModel'},
    layout: {type: 'border'},
    width: 700,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '人员信息',
    buttonAlign: 'center',
    autoScroll:true,
    fit: true,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'proposalDisposeForm',
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
                    itemId: 'hfOID',
                    name: 'id',
                    bind: '{rec.id}'
                },{
                    xtype: 'displayfield',
                    name: 'title',
                    itemId: 'title',
                    bind: '{rec.title}',
                    fieldLabel: '提案题目'
                },{
                    xtype: 'textareafield',
                    name: 'content',
                    itemId: 'content',
                    disabled:true,
                    height:300,
                    bind: '{rec.content}',
                    fieldLabel: '提案内容'
                },{
                    xtype: 'combo',
                    name: 'departmentId',
                    itemId: 'departmentId',
                    bind: '{rec.departmentId}',
                    editable: false,// 是否允许输入
                    emptyText: '请选择科室',
                    allowBlank: false,// 不允许为空
                    blankText: '请选择科室',// 该项如果没有选择，则提示错误信息,
                    queryMode: 'local',
                    displayField: 'cName',
                    valueField: 'id',
                    fieldLabel: '科室',
                    store: Ext.create('ExtFrame.store.User', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/organization/queryByOrgNo.do?orgNo=jcyroot",
                            reader: {
                                type: 'json',
                                rootProperty: 'permissions'//数据根节点名称
                            },
                            //扩展参数
                            extraParams: {
                                limit:100000
                            }
                        }
                    }),
                    listeners: {
                        select: "onClickSelect"
                    }
                },{
                    xtype: 'combo',
                    name: 'personId',
                    itemId: 'personId',
                    bind: '{rec.personId}',
                    editable: false,// 是否允许输入
                    emptyText: '请选择人员',
                    allowBlank: false,// 不允许为空
                    blankText: '请选择人员',// 该项如果没有选择，则提示错误信息,
                    queryMode: 'local',
                    displayField: 'userCName',
                    valueField: 'id',
                    fieldLabel: '人员',
                    store: Ext.create('ExtFrame.store.User', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/personInfo/pagedQueryByBean.do",
                            reader: {
                                type: 'json',
                                rootProperty: 'rows'//数据根节点名称
                            },
                            //扩展参数
                            extraParams: {
                                'unitId': ""
                            }
                        }
                    })
                },{
                    xtype: 'datefield',
                    name: 'replyLimitTime',
                    itemId: 'replyLimitTime',
                    bind: '{rec.replyLimitTime}',
                    editable: false,
                    allowBlank: false,
                    format: 'Y年m月d日',
                    fieldLabel: '限定答复时间'
                },{
                    xtype: 'textareafield',
                    name: 'remark',
                    itemId: 'remark',
                    id: 'remark',
                    allowBlank: false,
                    bind: '{rec.remark}',
                    fieldLabel: '备注'
                }]
            }]
        }];
        me.buttons = [
            {
                xtype: "button",
                text: "保存",
                handler: 'onClickButtonSave'
            },{
                xtype: "button",
                text: "关闭",
                handler: 'onClickClear'
            }
        ];
        me.callParent();
    }
});
