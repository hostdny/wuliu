/**
 * Created by zzw on 2016/11/1.
 */
Ext.define('ExtFrame.view.main.signAttendance.leaveConfiguration.LeaveConfigurationWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.leaveConfigurationWindow',
    viewModel: {type: 'leaveConfigurationModel'},
    layout: 'fit',
    modal : true,
    closeAction:  'close',
    title: '请假配置预览与编辑',
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'leaveConfigurationWindowForm',
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
                title: '请假配置预览与编辑',
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
                    xtype: 'combo',
                    name: 'leaveState',
                    itemId: 'leaveState',
                    bind: '{rec.leaveState}',
                    emptyText: '请假类型',//是否在网站端显示 0显示 1 不显示
                    editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'abbr',
                    fieldLabel: '请假类型',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['abbr', 'name'],
                        data: [{'abbr': '0', 'name': '事假'}, {'abbr': '1', 'name': '病假'}]
                    })
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
