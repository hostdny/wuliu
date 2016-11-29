/**
 * Created by wangBin on 2016/9/28.
 */
Ext.define('ExtFrame.view.main.proposal.proposalPersonnelAuditing.ProposalPersonnelAuditingWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.proposalPersonnelAuditingWindow',
    viewModel: {type: 'proposalPersonnelAuditingModel'},
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
            itemId: 'proposalPersonnelAuditingForm',
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
                    name: 'userCName',
                    itemId: 'userCName',
                    bind: '{rec.userCName}',
                    fieldLabel: '姓名'
                },{
                    xtype: 'displayfield',
                    name: 'userSex',
                    itemId: 'userSex',
                    bind: '{rec.userSex}',
                    fieldLabel: '性别'
                },{
                    xtype: 'displayfield',
                    name: 'userBirthday',
                    itemId: 'userBirthday',
                    bind: '{rec.userBirthday}',
                    fieldLabel: '出生年月'
                },{
                    xtype: 'displayfield',
                    name: 'telephone',
                    itemId: 'telephone',
                    bind: '{rec.telephone}',
                    fieldLabel: '手机号'
                },{
                    xtype: 'displayfield',
                    name: 'userUnitName',
                    itemId: 'userUnitName',
                    bind: '{rec.userUnitName}',
                    fieldLabel: '工作单位'
                },{
                    xtype: 'displayfield',
                    name: 'official',
                    itemId: 'official',
                    bind: '{rec.official}',
                    fieldLabel: '身份'
                },{
                    xtype: 'displayfield',
                    name: 'userPosition',
                    itemId: 'userPosition',
                    bind: '{rec.userPosition}',
                    fieldLabel: '职务/职称'
                },{
                    xtype: 'combo',
                    name: 'status',
                    itemId: 'status',
                    bind: '{rec.status}',
                    width:"100%",
                    emptyText: '请选择状态',
                    editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'statusText',
                    valueField: 'statusValue',
                    fieldLabel: '回复状态',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['statusValue', 'statusText'],
                        data: [
                            {'statusValue': '0', 'statusText': '审核中'},
                            {'statusValue': '1', 'statusText': '通过'},
                            {'statusValue': '2', 'statusText': '拒绝'}
                        ]
                    })
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
