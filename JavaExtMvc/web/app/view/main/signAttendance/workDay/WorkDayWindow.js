/**
 * Created by zzw on 2016/10/31.
 */
Ext.define('ExtFrame.view.main.signAttendance.workDay.WorkDayWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.workDayWindow',
    viewModel: {type: 'workDayModel'},
    layout: 'fit',
    modal : true,
    closeAction:  'close',
    title: '工作日信息预览与编辑',
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
                itemId: 'column1',
                collapsible: true,
                //defaults: {
                //    labelWidth: 89,
                //    anchor: '100%',
                //    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                //},
                items: [{
                    xtype: 'hiddenfield',
                    itemId: 'hfOid',
                    name: 'id',
                    bind: '{rec.id}'
                },{
                    //xtype: 'workDayPanel',
                    //itemId: 'workDayPanel',
                    //width:'80%',
                    //ename:me.ename,
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
