/**
 * Created by lihaiyue on 2016/9/27.
 */
Ext.define(
    'ExtFrame.view.main.cms.cmsArticle.cmsArticleManager',
    {
        requires: [
            'ExtFrame.view.main.cms.cmsArticle.cmsArticleGrid',
            'ExtFrame.view.main.cms.cmsArticle.cmsArticleModel',
            //'ExtFrame.view.main.cms.CmsForm',
            'ExtFrame.view.main.cms.cmsArticle.cmsArticleController',
            'ExtFrame.view.main.cms.cmsArticle.cmsArticleWindow',
            'ExtFrame.view.main.cms.cmsArticle.CmsArticlePanel',
            //'ExtFrame.view.main.cms.CmsHtml',
            'ExtFrame.view.extEncap.UEditor'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'cmsArticleManager',
        fit: true,
        layout: 'border',
        bodyBorder: true,
        id:"cmsArticleManagerId",
        defaults: {
            collapsible: true,
            split: true,
            bodyPadding: 1
        },
        controller: 'cmsArticleController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    title: '信息预览',
                    xtype: 'cmsArticlePanel',
                    itemId: 'cmsArticlePanel',
                    width:'80%',
                    region:'center'
                }
            ];
            me.callParent();
        }


    });