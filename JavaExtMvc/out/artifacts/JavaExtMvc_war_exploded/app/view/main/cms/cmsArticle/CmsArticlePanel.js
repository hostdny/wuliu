/**
 * Created by lihaiyue on 2016/9/27.
 */
Ext.define(
    'ExtFrame.view.main.cms.cmsArticle.CmsArticlePanel',
    {
        extend: 'Ext.panel.Panel',
        itemId: 'cmsArticlePanel',
        alias: 'widget.cmsArticlePanel',
        layout: {type: 'border'},
        buttonAlign: 'center',
        autoScroll:true,
        fit: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'cmsArticleGrid',
                    itemId: 'cmsArticleGrid',
                    id:'cmsArticleGrid',
                    height:"100%",
                    ename: 'cmsArticle',
                    region: 'center'
                }
            ];
            me.callParent();
        }


    });