/**
 * Created by wangBin on 2016/9/21.
 */
Ext.define('ExtFrame.view.main.eBookManage.eBook.EBookUpload', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.eBookUpload',
    layout: {type: 'border'},
    fit: true,
    html: '<iframe id="eBookUploadId" width="100%" height="100%" src="/app/view/main/eBookManage/eBook/upload.html"><iframe/>'
});