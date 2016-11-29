/**
 * Created by LvXL on 2016/7/4.
 */
Ext.define('ExtFrame.view.main.sys.personRoleRelation.PersonRoleRelationWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.personRoleRelationWindow',
    controller: 'personRoleRelationController',
    viewModel: {type: 'personRoleRelationModel'},
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 400,
    closeAction: 'destroy',
    title: '角色列表',
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            //itemId: me.ename + 'Form',
            ename: me.ename,
            region: 'center',
            autoScroll: true,
            items: [{
                xtype: 'personRoleRelationRoleGrid',
                itemId: me.ename + 'RoleGrid',
                ename: me.ename
            }]
        }];
        // 底部按钮
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