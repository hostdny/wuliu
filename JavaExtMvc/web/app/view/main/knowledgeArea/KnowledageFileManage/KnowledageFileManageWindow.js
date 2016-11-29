/**
 * Created by zzw on 2016/8/30.
 */
Ext.define('ExtFrame.view.main.knowledgeArea.KnowledageFileManage.KnowledageFileManageWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.knowledageFileManageWindow',
    viewModel: {type: 'knowledageFileManageModel'},
    layout: {type: 'border'},
    width: 500,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '文档上传',
    buttonAlign: 'center',
    autoScroll:true,
    fit: true,
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'knowledageFileManageButton',
                itemId: 'knowledageFileManageButton',
                region: 'south',
                height: '6%',
                width: '100%'
            },
            {
                xtype: 'knowledageFileManageUpload',
                itemId: 'knowledageFileManageUpload',
                region: 'center',
                height: '94%',
                width: '100%'
            }
        ];
        me.callParent();
    }
});
