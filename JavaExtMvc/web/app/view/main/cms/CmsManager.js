Ext.define(
    'ExtFrame.view.main.cms.CmsManager',
    {
        requires: [
            'ExtFrame.view.main.cms.CmsTree',
            'ExtFrame.view.main.cms.CmsGrid',
            'ExtFrame.view.main.cms.CmsModel',
            'ExtFrame.view.main.cms.CmsForm',
            'ExtFrame.view.main.cms.CmsController',
            'ExtFrame.view.main.cms.CmsWindow',
            'ExtFrame.view.main.cms.CmsPanel',
            'ExtFrame.view.main.cms.CmsHtml',
            'ExtFrame.view.extEncap.UEditor'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'cmsManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'cmsController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    title: 'Cms栏目管理',
                    xtype: 'cmsTree',
                    itemId: 'cmsTree',
                    width:'20%',
                    region:'west'
                }
                //,{
                //    xtype: 'cmsWindow',
                //    itemId: 'cmsWindow',
                //    ename: 'cmsWindow',
                //    region: 'east',
                //    split: true
                //}
                ,{
                    title: '信息预览',
                    xtype: 'cmsPanel',
                    itemId: 'cmsPanel',
                    width:'80%',
                    region:'center'
                }
            ];
            me.callParent();
        }


    });