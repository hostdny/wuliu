/**
 * Created by yaonan on 2016/9/1.
 */
Ext.define('ExtFrame.view.main.appManage.appVersionDetail.AppVersionManager', {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.appManage.appVersionDetail.AppVersionController',
            'ExtFrame.view.main.appManage.appVersionDetail.AppVersionModel',
            'ExtFrame.view.main.appManage.appVersionDetail.AppinfoTree',
            'ExtFrame.view.main.appManage.appVersionDetail.AppVersionWindow',
            'ExtFrame.view.main.appManage.appVersionDetail.AppVersionGrid'],//请求MainController类
        layout: {type: 'border'},
        controller: 'appVersionController',
        viewModel: {type: 'appVersionModel'},
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'appinfotree',
                    itemId: me.ename + 'Tree',
                    region: 'west',
                    width: 260,
                    split: true
                }, {
                    xtype: 'appVersionGrid',
                    itemId: me.ename + 'Grid',
                    ename: me.ename,
                    region: 'center'
                }, {
                    xtype: 'appVersionWindow',
                    itemId: me.ename + 'Window',
                    ename: me.ename,
                    region: 'east',
                    split: true
                }];
            me.callParent();
        }
    }
);