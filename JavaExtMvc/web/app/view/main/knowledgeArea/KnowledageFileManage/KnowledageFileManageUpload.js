/**
 * Created by zzw on 2016/8/30.
 */
Ext.define('ExtFrame.view.main.knowledgeArea.KnowledageFileManage.KnowledageFileManageUpload', {
    extend: 'Ext.panel.Panel',
    itemId: 'knowledageFileManageUpload',
    id: 'knowledageFileManageUpload',
    alias: 'widget.knowledageFileManageUpload',
    fit: true,
    html: '<iframe id="knowledageFileManageUploadId" width="100%" height="100%" src="/app/view/main/knowledgeArea/KnowledageFileManage/upload.html?pid='+''+'"><iframe/>'

});