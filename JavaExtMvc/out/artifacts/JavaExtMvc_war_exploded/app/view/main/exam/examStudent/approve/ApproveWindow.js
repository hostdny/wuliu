/**
 * Created by wangBin on 2016/8/18.
 */
Ext.define('ExtFrame.view.main.exam.examStudent.approve.ApproveWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.approveWindow',
    viewModel: {type: 'approveModel'},
    layout: {type: 'border'},
    width: 700,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '考生信息',
    buttonAlign: 'center',
    autoScroll:true,
    fit: true,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'registerForm',
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
                    labelWidth: 110,
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
                    itemId: 'photoUrl',
                    fieldLabel: '照片信息',
                    value:'',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'userEName',
                    itemId: 'userEName',
                    bind: '{rec.userEName}',
                    fieldLabel: '用户英文名',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'userCName',
                    itemId: 'userCName',
                    bind: '{rec.userCName}',
                    fieldLabel: '用户中文名',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'idNo',
                    itemId: 'idNo',
                    bind: '{rec.idNo}',
                    fieldLabel: '身份证号',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'unitName',
                    itemId: 'unitName',
                    bind: '{rec.unitName}',
                    fieldLabel: '所属机构',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'sex',
                    itemId: 'sex',
                    bind: '{rec.sex}',
                    fieldLabel: '性别',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'userBirthday',
                    itemId: 'userBirthday',
                    bind: '{rec.userBirthday}',
                    fieldLabel: '生日',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'telephone',
                    itemId: 'telephone',
                    bind: '{rec.telephone}',
                    fieldLabel: '手机号码',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'contractNo',
                    itemId: 'contractNo',
                    bind: '{rec.contractNo}',
                    fieldLabel: '其他联系方式',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'remark',
                    itemId: 'remark',
                    bind: '{rec.remark}',
                    fieldLabel: '备注',
                    allowDecimals: false
                }]
            }]
        }];
        me.buttons = [
            {
                xtype: "button", text: "关闭", handler: 'onClickClear'
            }
        ];
        me.callParent();
    }
});
