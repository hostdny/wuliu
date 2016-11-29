Ext.define('ExtFrame.view.main.tipOff.invalidTipOff.InvalidTipOffWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.invalidTipOffWindow',
    viewModel: {type: 'invalidTipOffModel'},
    layout: {type: 'border'},
    width: 700,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '详细信息',
    buttonAlign: 'center',
    autoScroll:'true',
    fit: true,
    id: 'invalidTipOffWindow',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'invalidTipOffForm',
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
                    name: 'id',
                    bind: '{rec.id}',
                    readOnly:true
                },{
                    xtype: 'displayfield',
                    name: 'tiperName',
                    itemId: 'tiperName',
                    bind: '{rec.tiperName}',
                    fieldLabel: '姓名',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'tiperMid',
                    itemId: 'tiperMid',
                    bind: '{rec.tiperMid}',
                    fieldLabel: '身份证',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'tiperNumber',
                    itemId: 'tiperNumber',
                    bind: '{rec.tiperNumber}',
                    fieldLabel: '电话',
                    width:'100%',
                    allowDecimals: false
                }]
            },{
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
                    xtype: 'displayfield',
                    name: 'tipTypeShow',
                    itemId: 'tipTypeShow',
                    bind: '{rec.tipTypeShow}',
                    fieldLabel: '举报类型',
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
                    name: 'addMessage1',
                    itemId: 'addMessage1',
                    bind: '{rec.addMessage1}',
                    fieldLabel: '举报简介',
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
                },{
                    xtype: 'displayfield',
                    name: 'accepterName',
                    itemId: 'accepterName',
                    bind: '{rec.accepterName}',
                    fieldLabel: '负责人',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'accepterNumber',
                    itemId: 'accepterNumber',
                    bind: '{rec.accepterNumber}',
                    fieldLabel: '负责人电话',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'tipStateShow',
                    itemId: 'tipStateShow',
                    bind: '{rec.tipStateShow}',
                    fieldLabel: '信息状态',
                    width:'100%',
                    allowDecimals: false
                }]
            },{
                xtype: 'invalidTipOffWindowGrid',
                itemId: 'invalidTipOffWindowGrid',
                width:"100%"

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
