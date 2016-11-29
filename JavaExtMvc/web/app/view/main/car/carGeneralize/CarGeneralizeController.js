/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.car.carGeneralize.CarGeneralizeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.carGeneralizeController',

    onClickButtonLook: function () {
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
        var panel = this.getView();
        var carGeneralizeForm = panel.down("#carGeneralizeForm");
        carGeneralizeForm.isValid()
        var carGeneralizeChartPie = panel.down("#carGeneralizeChartPie");
        var carGeneralizeChartLine = panel.down("#carGeneralizeChartLine");
        var year = carGeneralizeForm.down("#costDate").getValue();
        var carNum = carGeneralizeForm.down("#carNum").getValue();
        var chart = carGeneralizeChartPie.down("chart");
        if(carGeneralizeForm.isValid()){
            carGeneralizeChartPie.store.getProxy().extraParams = {
                'year': year,
                'carNum': carNum
            };
            carGeneralizeChartPie.store.reload();
            carGeneralizeChartLine.store.getProxy().extraParams = {
                'year': year,
                'carNum': carNum
            };
            carGeneralizeChartLine.store.reload();
        }else{
            Ext.MessageBox.alert('提示', '请按正确格式填写年份！');
        }
    },
    onClickAddSearch: function () {
    },
    onClickClear: function () {
        var panel = this.getView();
        var carGeneralizeForm = panel.down("#carGeneralizeForm");
        carGeneralizeForm.getForm().reset();
    }
});