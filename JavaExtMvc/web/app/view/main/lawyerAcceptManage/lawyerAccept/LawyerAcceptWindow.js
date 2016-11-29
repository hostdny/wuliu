/**
 * Created by zzw on 2016/9/24.
 */
Ext.define('ExtFrame.view.main.lawyerAcceptManage.lawyerAccept.LawyerAcceptWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.lawyerAcceptWindow',
    controller: 'lawyerAcceptController',
    viewModel: {type: 'lawyerAcceptModel'},
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 700,
    closeAction: 'destroy',
    title: '律师预约回复',
    buttonAlign: 'center',
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
                title: '回复信息',
                itemId: 'column1',
                collapsible: true,
                defaults: {
                    labelWidth: 89,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [{
                    xtype: 'hiddenfield',
                    itemId: 'hfOID',//注意，此itemId要写固定，functionjs中重置from有用到
                    name: 'id',
                    bind: '{rec.id}'
                },{
                    xtype: 'datetimefield',
                    name: 'reservationTime',
                    itemId: 'reservationTime',
                    bind: '{rec.reservationTime}',
                    hidden:true,
                    editable: false,
                    format: 'Y年m月d日',
                    fieldLabel: '预约时间'
                },{
                    xtype: 'textfield',
                    name: 'reservationAddress',
                    itemId: 'reservationAddress',
                    bind: '{rec.reservationAddress}',
                    hidden:true,
                    fieldLabel: '预约地点'
                },{
                    xtype: 'combo',
                    name: 'lawyerState',
                    bind: '{rec.lawyerState}',
                    itemId: 'lawyerState',
                    id:'lawyerState',
                    editable: false,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['text', 'value', ''],
                        data: [{'value': '1', 'text': '通过'},
                            {'value': '2', 'text': '不通过'}]
                    }),
                    queryMode: 'local',
                    displayField: 'text',
                    valueField: 'value',
                    fieldLabel: '审核状态',
                    listeners: {
                        select: function (me, record, eOpts) {
                            var form = me.up('#lawyerAcceptForm');
                            if(record.data.text == "通过"){
                                form.down("#reservationTime").show();
                                form.down("#reservationAddress").show();
                                form.down("#reservationRemark").show();
                                form.down("#reason").hide();
                                form.down("#reason").setValue("");
                            }else if(record.data.text == "不通过"){
                                form.down("#reservationTime").hide();
                                form.down("#reservationAddress").hide();
                                form.down("#reservationRemark").hide();
                                form.down("#reservationTime").setValue("");
                                form.down("#reservationAddress").setValue("");
                                form.down("#reservationRemark").setValue("");
                                form.down("#reason").show();
                            }
                        }
                    }
                },{
                    xtype: 'textareafield',
                    name: 'reservationRemark',
                    itemId: 'reservationRemark',
                    id: 'reservationRemark',
                    hidden:true,
                    bind: '{rec.reservationRemark}',
                    fieldLabel: '预约备注'
                },{
                    xtype: 'textareafield',
                    name: 'reason',
                    id: 'reason',
                    hidden:true,
                    itemId: 'reason',
                    bind: '{rec.reason}',
                    fieldLabel: '拒绝理由'
                }]
            },{
                xtype: 'downLoadGrid',
                itemId: 'downLoadGrid',
                ename: me.ename,
                region: 'south',
                split: true
            }
            ]
        }];
        me.buttons = [
            {xtype: "button", text: "保存", handler: 'onClickButtonSave'},
            {
                xtype: "button", text: "关闭", handler: function () {
                this.up("panel").collapse();
            }
            }
        ];
        this.callParent();
    }
});