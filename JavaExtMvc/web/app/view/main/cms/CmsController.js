Ext.define('ExtFrame.view.main.cms.CmsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cmsController',

    onClickAKeyLayout: function () {
        var cmsForm = this.getView();
        var cmsPanel = cmsForm.up("#cmsPanel");
        var cmsHtml = cmsPanel.down("#cmsHtml");
        cmsHtml.show();
        var cmsHtmlId = Ext.getCmp("cmsHtmlId").body;
        cmsHtmlId.update('<iframe id="timeLineShow" width="100%" height="100%" src="/app/view/main/cms/CmsLayout.html?flag=AKEY"><iframe/>');
    },
    onClickBKeyLayout: function () {
        var cmsForm = this.getView();
        var cmsPanel = cmsForm.up("#cmsPanel");
        var cmsHtml = cmsPanel.down("#cmsHtml");
        cmsHtml.show();
        var cmsHtmlId = Ext.getCmp("cmsHtmlId").body;
        cmsHtmlId.update('<iframe id="timeLineShow" width="100%" height="100%" src="/app/view/main/cms/CmsLayout.html?flag=BKEY"><iframe/>');
    }
});