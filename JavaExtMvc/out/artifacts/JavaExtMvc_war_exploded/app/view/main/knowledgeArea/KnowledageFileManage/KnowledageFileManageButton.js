/**
 * Created by zzw on 2016/9/2.
 */
Ext.define('ExtFrame.view.main.knowledgeArea.KnowledageFileManage.KnowledageFileManageButton', {
    extend: 'Ext.form.Panel',
    alias: 'widget.knowledageFileManageButton',
    controller: 'knowledageFileManageController',
    layout: {type: 'border'},
    buttonAlign: 'center',
    autoScroll:true,
    fit: true,
    initComponent: function () {
        var me = this;
        me.buttons = [
            {
                xtype: "button", text: "关闭", handler: 'onClickClear'
            }
        ];
        me.callParent();
    }
});