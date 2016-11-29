/**
 * Created by Administrator on 2016/7/8.
 */
Ext.define('ExtFrame.view.main.tipOff.tipList.TipListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tipListController',

    onClickButtonSave: function () {
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var view = this.getView();
        var tipListGrid = view.down('#tipListGrid');
        var selectRecords = tipListGrid.getSelection();
        var form = view.down('#tipListForm');
        var tipListWindow = view.down('#tipListWindow');
        var accepter = form.down("#accepter").getValue();
        var data = {
            id:selectRecords[0].data.id,
            accepterId: accepter
        };
        if (form.isValid()) {
            Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/tipMessage/save.do', 'POST', data, true, function (jsonData) {
                if (jsonData) {
                    tipListGrid.store.getProxy();
                    tipListGrid.store.reload();
                    form.getForm().reset();
                    tipListWindow.collapse();
                } else {
                    Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                }
            });
        }else{
            Ext.MessageBox.alert('提示', '很抱歉，请选择负责人');
        }
    },
    onClickClear: function () {
        var panel = this.getView();
        var tipListWindow = panel.down('#tipListWindow');
        var form = panel.down('#tipListForm');
        form.getForm().reset();
        var downLoadGrid = panel.down('#downLoadGrid');
        downLoadGrid.store.getProxy().extraParams = {
            'tipMessageId':'-1'
        };
        downLoadGrid.store.reload();
        tipListWindow.collapse();
    },
    //查看与修改按钮
    onClickButtonLook:function () {
        if (!Tools.Method.IsLogin())
            return;
        var panel = this.getView();
        var tipListGrid = panel.down('#tipListGrid');
        var tipListWindow = panel.down('#tipListWindow');
        var saveButton = tipListWindow.down('#saveButton');
        var downLoadGrid = panel.down('#downLoadGrid');
        var selectRecords = tipListGrid.getSelectionModel().getSelection();
        var form = panel.down('#tipListForm');
        if (Tools.Method.IsEditData(selectRecords)) {
            form.down("#tiperName").setValue(selectRecords[0].data.tipStyle);

            var window = panel.down('tipListWindow');
            var data = {
                accepterId: selectRecords[0].data.accepterId
            };
            if(selectRecords[0].data.tipState != "1"){
                Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/tipMessage/queryAccepterOrg.do', 'GET', data, true, function (jsonData) {
                    if (jsonData) {
                        form.down("#orgPicker").hide();
                        form.down("#accepter").hide();
                        form.down("#orgName").show();
                        form.down("#accepterNameShow").show();
                        form.down("#orgName").setValue(jsonData.resultData);
                        form.down("#accepterNameShow").setValue(selectRecords[0].data.accepterName);
                        form.getForm().loadRecord(selectRecords[0]);
                        if(selectRecords[0].data.tipStyle == "匿名"){
                            form.down("#tiperName").setValue(selectRecords[0].data.tipStyle);
                        }
                        downLoadGrid.store.getProxy().extraParams = {
                            'tipMessageId':selectRecords[0].data.id
                        };
                        saveButton.hide();
                        downLoadGrid.store.reload();
                        window.expand();
                    }
                });
            }else{
                form.getForm().loadRecord(selectRecords[0]);
                if(selectRecords[0].data.tipStyle == "匿名"){
                    form.down("#tiperName").setValue(selectRecords[0].data.tipStyle);
                }
                form.down("#orgPicker").show();
                form.down("#accepter").show();
                form.down("#orgName").hide();
                form.down("#accepterNameShow").hide();
                downLoadGrid.store.getProxy().extraParams = {
                    'tipMessageId':selectRecords[0].data.id
                };
                downLoadGrid.store.reload();
                saveButton.show();
                window.expand();
            }
        }
    }


});