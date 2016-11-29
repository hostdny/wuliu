/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.car.carAddress.CarAddressController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.carAddressController',

    onClickButtonLook: function () {
        var panel = this.getView();
        var carAddressWindow = panel.down("#carAddressWindow");
        var carAddressGrid = panel.down("#carAddressGrid");
        var selectRecords = carAddressGrid.getSelectionModel().getSelection();
        if(selectRecords[0]){
            var carNum = selectRecords[0].data.carNum;
            carAddressWindow.expand();
            var carAddressHtml = Ext.getCmp("carAddressHtml").body;
            carAddressHtml.update('<iframe width="100%" height="100%" src="/app/view/main/car/carAddress/carAddress.html?carNum='+carNum+'"><iframe/>');
        }else{
            Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
        }
    },
    onClickButtonAdd: function () {
    },
    onClickButtonEdit: function () {
    },
    onClickButtonSave: function () {
    },
    onClickButtonDel: function () {
    },
    onClickSearch: function () {
    },
    onClickAddSearch: function () {
    },
    onClickClear: function () {
        var panel = Ext.getCmp("carAddressManagerId");
        var carAddressWindow = panel.down("#carAddressWindow");
        carAddressWindow.collapse();
    }
});