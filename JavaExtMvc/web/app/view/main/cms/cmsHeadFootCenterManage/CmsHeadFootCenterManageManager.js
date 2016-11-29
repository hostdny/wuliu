﻿Ext.define(
    'ExtFrame.view.main.cms.cmsHeadFootCenterManage.CmsHeadFootCenterManageManager',
    {
        requires: [
            'ExtFrame.view.main.cms.cmsHeadFootCenterManage.CmsHeadFootCenterManageModel',
            'ExtFrame.view.main.cms.cmsHeadFootCenterManage.CmsHeadFootCenterManageController'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'cmsHeadFootCenterManageManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'cmsHeadFootCenterManageController',
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