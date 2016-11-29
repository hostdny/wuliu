/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.car.carCostInput.CarCostInputUpload', {
    extend: 'Ext.panel.Panel',
    itemId: 'carCostInputUpload',
    id: 'carCostUpload',
    alias: 'widget.carCostInputUpload',
    fit: true,
    html: '<iframe id="uploadId" width="100%" height="100%" src="/app/view/main/car/carCostInput/upload.html"><iframe/>'

});