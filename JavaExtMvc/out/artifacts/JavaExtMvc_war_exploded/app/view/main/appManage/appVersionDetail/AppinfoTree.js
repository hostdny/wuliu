Ext.define('ExtFrame.view.main.appManage.appVersionDetail.AppinfoTree', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Ext.ux.CheckColumn'
    ],
    alias: 'widget.appinfotree',
    reserveScrollbar: true,
    rootVisible: false,
    useArrows: true,
    fit: true,
    collapsible:false,
    stripeRows: true,
    hideHeaders:true,
    title:'应用',
    listeners: {
        select: function (me, record, eOpts) {
            var appVersionGrid = this.up('panel').down('#appVersionGrid');
            appVersionGrid.store.getProxy().extraParams = {
                'appId':record.id
            };
            //重新加载grid
            appVersionGrid.store.reload();
        }
    },
    initComponent: function () {
        var me = this;
        me.store = Ext.create('ExtFrame.store.ModuleTree', {
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+'/appInfo/queryTree.do'
            }
        });
        me.columns = [{
            xtype: 'treecolumn',
            dataIndex: 'appCName',
            width:'98%'
        }];

        me.callParent();

    }
});