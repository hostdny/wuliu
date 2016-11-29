/**
 * Created by zzw on 2016/11/1.
 */
Ext.define('ExtFrame.view.main.signAttendance.redundantTime.RedundantTimeWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.redundantTimeWindow',
    viewModel: {type: 'redundantTimeModel'},
    layout: 'fit',
    modal : true,
    closeAction:  'close',
    title: '冗余时间配置预览与编辑',
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'redundantTimeWindowForm',
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
                title: '冗余时间配置预览与编辑',
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
                },{
                    xtype: 'numberfield',
                    step:5,
                    value: 0,
                    maxValue: 60,
                    minValue: 0,
                    name: 'reTime',
                    itemId: 'reTime',
                    bind: '{rec.reTime}',
                    emptyText: '请输入冗余时间',
                    fieldLabel: '冗余时间',
                    editable: false
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
