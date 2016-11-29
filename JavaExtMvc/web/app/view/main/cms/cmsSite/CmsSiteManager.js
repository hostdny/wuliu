/**
 * Created by zzw on 2016/9/26.
 */
Ext.define(
    'ExtFrame.view.main.cms.cmsSite.CmsSiteManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.cms.cmsSite.CmsSiteController',
            'ExtFrame.view.main.cms.cmsSite.CmsSiteGrid',
            'ExtFrame.view.main.cms.cmsSite.CmsSiteWindow',
            'ExtFrame.view.main.cms.cmsSite.CmsSiteModel',
            'ExtFrame.view.extEncap.UEditor'],
         //   'ExtFrame.view.extEncap.UEditor'
        layout: {type: 'border'},
        controller: 'cmsSiteController',
        viewModel: {type: 'cmsSiteModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'cmsSiteGrid',
                    itemId: 'cmsSiteGrid',
                    id:'cmsSiteGrid',
                    region: 'center',
                    ename: me.ename
                }];
            me.callParent();
        }
    }
);