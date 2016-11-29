/**
 * Created by zzw on 2016/7/25.
 */
Ext.define(
    'ExtFrame.view.main.assets.assetAudit.AssetAuditManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.assets.assetAudit.AssetAuditController',
            'ExtFrame.view.main.assets.assetAudit.AssetAuditGrid',
            'ExtFrame.view.main.assets.assetAudit.AssetAuditWindow',
            'ExtFrame.view.main.assets.assetAudit.AssetAuditModel'],//请求MainController类
        layout: {type: 'border'},
        controller: 'assetAuditController',
        viewModel: {type: 'assetAuditModel'},
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'assetAuditGrid',
                    itemId: me.ename + 'Grid',
                    region: 'center',
                    ename: me.ename
                },{
                    xtype: 'assetAuditWindow',
                    itemId: me.ename + 'Window',
                    ename: me.ename,
                    region: 'east',
                    split: true
                }];
            me.callParent();
        }
    }
);