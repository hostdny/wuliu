/**
 * Created by lihaiyue on 2016/9/26.
 */
Ext.define(
    'ExtFrame.view.main.cms.cmsLink.CmsLinkManager',
    {
        extend: 'Ext.panel.Panel',
        requires: [
            'ExtFrame.view.main.cms.cmsLink.CmsLinkModel',
            'ExtFrame.view.main.cms.cmsLink.CmsLinkController',
            'ExtFrame.view.main.cms.cmsLink.CmsLinkGrid',
            'ExtFrame.view.main.cms.cmsLink.CmsLinkWindow',
        ],
        layout: {type: 'border'},
        controller: 'cmsLinkController',
        viewModel: {type: 'cmsLinkModel'},
        ename: '',
        id:"cmsLinkManagerId",
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'cmsLinkGrid',
                itemId: me.ename + 'Grid',
                id: 'cmsLinkGrid',
                ename: me.ename,
                region: 'center'
            }, {
                xtype: 'cmsLinkWindow',
                itemId: me.ename + 'Window',
                ename: me.ename,
                region: 'east',
                split: true
            }];
            me.callParent();
        }
    }
);
