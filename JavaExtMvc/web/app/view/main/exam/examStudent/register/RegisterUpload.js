/**
 * Created by wangBin on 2016/8/2.
 */
Ext.define('ExtFrame.view.main.exam.examStudent.register.RegisterUpload', {
    extend: 'Ext.panel.Panel',
    itemId: 'registerUpload',
    id: 'registerUpload',
    alias: 'widget.registerUpload',
    fit: true,
    html: '<iframe id="registerUploadId" width="100%" height="100%" src="/app/view/main/exam/examStudent/register/upload.html"><iframe/>'

});