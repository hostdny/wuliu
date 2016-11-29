/**
 * Created by zzw on 2016/9/26.
 */
Ext.define(
    'ExtFrame.view.main.cms.cmsSiteAd.CmsSiteAdManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.cms.cmsSiteAd.CmsSiteAdController',
            'ExtFrame.view.main.cms.cmsSiteAd.CmsSiteAdGrid',
            'ExtFrame.view.main.cms.cmsSiteAd.CmsSiteAdWindow',
            'ExtFrame.view.main.cms.cmsSiteAd.CmsSiteAdModel'],
        //   'ExtFrame.view.extEncap.UEditor'
        layout: {type: 'border'},
        controller: 'cmsSiteAdController',
        viewModel: {type: 'cmsSiteAdModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'cmsSiteAdGrid',
                    itemId: me.ename + 'Grid',
                    id:'cmsSiteAdGrid',
                    region: 'center',
                    ename: me.ename
                }];
            me.callParent();
        }
    }
);