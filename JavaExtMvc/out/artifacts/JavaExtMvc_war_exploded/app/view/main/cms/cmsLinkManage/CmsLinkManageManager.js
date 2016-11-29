Ext.define(
    'ExtFrame.view.main.cms.cmsLinkManage.CmsLinkManageManager',
    {
        requires: [
            'ExtFrame.view.main.cms.cmsLinkManage.CmsLinkManageModel',
            'ExtFrame.view.main.cms.cmsLinkManage.CmsLinkManageController',
            'ExtFrame.view.extEncap.UEditor'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'cmsLinkManageManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'cmsLinkManageController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                //{
                //    title: 'Cms栏目管理',
                //    xtype: 'cmsTree',
                //    itemId: 'cmsTree',
                //    width:'20%',
                //    region:'west'
                //}
            ];
            me.callParent();
        }


    });