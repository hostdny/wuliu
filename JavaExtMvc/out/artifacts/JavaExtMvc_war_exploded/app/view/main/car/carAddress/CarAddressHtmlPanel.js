/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.car.carAddress.CarAddressHtmlPanel',{
        extend: 'Ext.panel.Panel',
        itemId: 'carAddressHtmlPanel',
        id:'carAddressHtml',
        alias: 'widget.carAddressHtmlPanel',
        fit: true,
        html:'<iframe width="100%" height="100%" src="/app/view/main/car/carAddress/carAddress.html?carNum='+'1'+'"><iframe/>'

});