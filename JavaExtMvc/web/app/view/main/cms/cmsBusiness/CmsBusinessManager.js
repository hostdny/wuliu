/**
 * Created by Jia on 2016/10/25.
 */
Ext.define(
    'ExtFrame.view.main.cms.cmsBusiness.CmsBusinessManager',
    {
        extend: 'Ext.panel.Panel',
        requires: [
            'ExtFrame.view.main.cms.cmsBusiness.CmsBusinessModel',
            'ExtFrame.view.main.cms.cmsBusiness.CmsBusinessController',
            'ExtFrame.view.main.cms.cmsBusiness.CmsBusinessGrid',
            'ExtFrame.view.main.cms.cmsBusiness.CmsBusinessWindow'
        ],
        layout: {type: 'border'},
        controller: 'cmsBusinessController',
        viewModel: {type: 'cmsBusinessModel'},
        ename: '',
        id:"cmsBusinessManagerId",
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'cmsBusinessGrid',
                itemId: me.ename + 'Grid',
                id: 'cmsBusinessGrid',
                ename: me.ename,
                region: 'center'
            }, {
                xtype: 'cmsBusinessWindow',
                itemId: me.ename + 'Window',
                ename: me.ename,
                region: 'east',
                split: true
            }];
            me.callParent();
        }
    }
);
