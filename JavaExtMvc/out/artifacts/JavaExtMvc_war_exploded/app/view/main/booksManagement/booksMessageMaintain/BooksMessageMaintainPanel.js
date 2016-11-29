/**
 * Created by zzw on 2016/9/22.
 */
Ext.define('ExtFrame.view.main.booksManagement.booksMessageMaintain.BooksMessageMaintainPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.booksMessageMaintainPanel',
    viewModel: {type: 'booksMessageMaintainModel'},
    layout: {type: 'border'},
    width: 500,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '文件导入',
    buttonAlign: 'center',
    autoScroll:true,
    fit: true,
    initComponent: function () {
        var me = this;
        me.items = [
            //{
            //    xtype: 'knowledageFileManageButton',
            //    itemId: 'knowledageFileManageButton',
            //    region: 'south',
            //    height: '6%',
            //    width: '100%'
            //},
            {
                xtype: 'booksMessageMaintainUpload',
                itemId: 'booksMessageMaintainUpload',
                region: 'center',
                height: '100%',
                width: '100%'
            }
        ];
        me.callParent();
    }
});
