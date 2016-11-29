/**
 * Created by zzw on 2016/7/22.
 */
Ext.define(
    'ExtFrame.view.main.assets.assetsDeclaration.AssetsDeclarationManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.assets.assetsDeclaration.AssetsDeclarationController',
            'ExtFrame.view.main.assets.assetsDeclaration.AssetsDeclarationGrid',
            'ExtFrame.view.main.assets.assetsDeclaration.AssetsDeclarationWindow',
            'ExtFrame.view.main.assets.assetsDeclaration.AssetsDeclarationModel'],//请求MainController类
        layout: {type: 'border'},
        controller: 'assetsDeclarationController',
        viewModel: {type: 'assetsDeclarationModel'},
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'assetsDeclarationGrid',
                    itemId: me.ename + 'Grid',
                    region: 'center',
                    ename: me.ename
                },{
                    xtype: 'assetsDeclarationWindow',
                    itemId: me.ename + 'Window',
                    ename: me.ename,
                    region: 'east',
                    split: true
                }];
            me.callParent();
        }
    }
);