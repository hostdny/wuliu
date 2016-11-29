/**
 * Created by lihaiyue on 2016/9/26.
 */
Ext.define(
    'ExtFrame.view.main.cms.cmsMenu.CmsMenuManager',
    {
        extend: 'Ext.panel.Panel',
        requires: [
            'ExtFrame.view.main.cms.cmsMenu.CmsMenuModel',
            'ExtFrame.view.main.cms.cmsMenu.CmsMenuController',
            //'ExtFrame.view.main.cms.cmsMenu.CmsMenuGrid',
            'ExtFrame.view.main.cms.cmsMenu.CmsProgramMenuWindow',
            'ExtFrame.view.main.cms.cmsMenu.CmsProgramMenuGrid',
            //'ExtFrame.view.main.cms.cmsMenu.CmsArticleMenuWindow',
            //'ExtFrame.view.main.cms.cmsMenu.CmsArticleMenuModel',
            'ExtFrame.view.extEncap.UEditor'
        ],
        layout: {type: 'border'},
        controller: 'cmsMenuController',
        viewModel: {type: 'cmsMenuModel'},
        ename: '',
        id:"cmsMenuManagerId",
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'cmsProgramMenuGrid',
                    itemId: 'cmsProgramMenuGrid',
                    id:'cmsProgramMenuGrid',
                    ename: me.ename,
                    region: 'center',
                    width: 500,
                    split: true
                },
            //    {
            //    xtype: 'cmsMenuGrid',
            //    itemId: 'cmsMenuGrid',
            //    id: 'cmsMenuGrid',
            //    ename: me.ename,
            //    region: 'center'
            //},
                {
                xtype: 'cmsProgramMenuWindow',
                itemId: 'cmsProgramWindowFormWindow',
                ename: me.ename,
                region: 'east',
                    width: 850,
                    height: 550,
                split: true
            }];
            me.callParent();
        }
    }
);
