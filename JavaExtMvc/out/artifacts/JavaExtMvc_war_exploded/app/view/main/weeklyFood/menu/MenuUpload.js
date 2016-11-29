/**
 * Created by wangBin on 2016/8/2.
 */
Ext.define('ExtFrame.view.main.weeklyFood.menu.MenuUpload', {
    extend: 'Ext.panel.Panel',
    itemId: 'menuUpload',
    id: 'menuUpload',
    alias: 'widget.menuUpload',
    fit: true,
    html: '<iframe id="menuUploadId" width="100%" height="100%" src="/app/view/main/weeklyFood/menu/upload.html"><iframe/>'

});