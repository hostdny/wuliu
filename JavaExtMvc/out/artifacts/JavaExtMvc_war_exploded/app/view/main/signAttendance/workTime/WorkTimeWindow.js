/**
 * Created by zzw on 2016/11/1.
 */
Ext.define('ExtFrame.view.main.signAttendance.workTime.WorkTimeWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.workTimeWindow',
    viewModel: {type: 'workTimeModel'},
    layout: 'fit',
    modal : true,
    closeAction:  'close',
    title: '工作时间预览与编辑',
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'workTimeWindowForm',
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
                title: '工作时间配置信息',
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
                    xtype: 'timefield',
                    name: 'workTimeStart',
                    itemId: 'workTimeStart',
                    bind: '{rec.workTimeStart}',
                    format: 'H:i',
                    emptyText: '请输入上班时间',
                    fieldLabel: '上班时间',
                    editable: false
                },{
                    xtype: 'timefield',
                    name: 'workTimeEnd',
                    itemId: 'workTimeEnd',
                    bind: '{rec.workTimeEnd}',
                    format: 'H:i',
                    emptyText: '请输入下班时间',
                    fieldLabel: '下班时间',
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
