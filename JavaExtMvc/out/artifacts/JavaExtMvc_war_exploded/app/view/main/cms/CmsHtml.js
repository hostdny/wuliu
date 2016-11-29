/**
 * Created by wangBin on 2016/7/14.
 */
Ext.define('ExtFrame.view.main.cms.CmsHtml',{
        extend: 'Ext.panel.Panel',
        itemId: 'cmsHtml',
        id:'cmsHtmlId',
        alias: 'widget.cmsHtml',
        fit: true,
        html:'<iframe id="cmsHtmlShow" width="100%" height="100%" src="/app/view/main/cms/CmsLayout.html?flag='+''+'"><iframe/>'

});