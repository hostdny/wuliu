Ext.define(
    'ExtFrame.view.main.cms.cmsColumnManage.CmsColumnManageManager',
    {
        requires: [
            'ExtFrame.view.main.cms.cmsColumnManage.CmsColumnManageGrid',
            'ExtFrame.view.main.cms.cmsColumnManage.CmsColumnManageWindow',
            'ExtFrame.view.main.cms.cmsColumnManage.CmsColumnManageModel',
            'ExtFrame.view.main.cms.cmsColumnManage.CmsColumnManageController'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'cmsColumnManageManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'cmsColumnManageController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'cmsColumnManageGrid',
                    itemId: 'cmsColumnManageGrid',
                    region:'center'
                },
                {
                    xtype: 'cmsColumnManageWindow',
                    itemId: 'cmsColumnManageWindow',
                    region: 'east',
                    split: true
                }
            ];
            me.callParent();
        }


    });