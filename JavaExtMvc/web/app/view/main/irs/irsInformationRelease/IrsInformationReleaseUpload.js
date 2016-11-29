/**
 * Created by admin on 2016/7/18.
 */
Ext.define('ExtFrame.view.main.irs.irsInformationRelease.IrsInformationReleaseUpload', {
    extend: 'Ext.panel.Panel',
    itemId: 'irsInformationReleaseUpload',
    id: 'irsUpload',
    alias: 'widget.irsInformationReleaseUpload',
    fit: true,
    html: '<iframe id="upload" width="100%" height="100%" src="/app/view/main/irs/irsInformationRelease/upload.html"><iframe/>'

});