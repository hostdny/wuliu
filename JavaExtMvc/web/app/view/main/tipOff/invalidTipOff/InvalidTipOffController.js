Ext.define('ExtFrame.view.main.tipOff.invalidTipOff.InvalidTipOffController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.invalidTipOffController',

    onClickButtonLook: function () {
        if (!Tools.Method.IsLogin())
            return;
        var panel = this.getView();
        var invalidTipOffGrid = panel.down('#invalidTipOffGrid');
        var invalidTipOffWindow = panel.down('#invalidTipOffWindow');
        var invalidTipOffWindowGrid = panel.down('#invalidTipOffWindowGrid');
        var selectRecords = invalidTipOffGrid.getSelectionModel().getSelection();

        if (Tools.Method.IsEditData(selectRecords)){
            var form = panel.down('#invalidTipOffForm');
            form.getForm().loadRecord(selectRecords[0]);
            if(selectRecords[0].data.tipStyle == "匿名"){
                form.down("#tiperName").setValue(selectRecords[0].data.tipStyle);
            }
            invalidTipOffWindowGrid.store.getProxy().extraParams = {
                'tipMessageId':selectRecords[0].data.id
            };
            invalidTipOffWindowGrid.store.reload();
            invalidTipOffWindow.expand();
        }
    },
    onClickButtonAdd: function () {
    },
    onClickButtonEdit: function () {
    },
    onClickButtonSave: function () {
        if (!Tools.Method.IsLogin())
            return;
        var panel=this.getView();
        var invalidTipOffWindow = panel.down('#invalidTipOffWindow');
        var invalidTipOffGrid = panel.down('#invalidTipOffGrid');
        var id = invalidTipOffWindow.down("#ID").getValue();
        var tipState = invalidTipOffWindow.down("#tipState").getValue();
        var data = {
            id: id,
            tipState: tipState
        };
        if(id != "" && id != null){
            Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/tipMessage/save.do', 'POST', data, true, function (jsonData) {
                invalidTipOffGrid.store.getProxy();
                invalidTipOffGrid.store.reload();
                var form = panel.down('#invalidTipOffForm');
                form.getForm().reset();
                invalidTipOffWindow.collapse();
            });
        }else{
            Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
            invalidTipOffWindow.collapse();
        }


    },
    onClickButtonDel: function () {

        var panel = this.getView();
        var invalidTipOffGrid = panel.down('#invalidTipOffGrid');
        var selectRecords = invalidTipOffGrid.getSelectionModel().getSelection();
        if (selectRecords.length > 0) {
            var data = {ids: selectRecords[0].data.id};
            Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/tipMessage/delete.do', 'POST', data, true, function (jsonData) {
                        if (jsonData.resultCode) {
                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG00141, [jsonData.sCount, jsonData.fCount]), '4000', '1', null);
                            invalidTipOffGrid.store.getProxy();
                            //重新加载grid
                            invalidTipOffGrid.store.reload();
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }else{
            Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
        }
    },
    onClickSearch: function () {
    },
    onClickAddSearch: function () {
    },
    onClickClear: function () {
        var panel = this.getView();
        var invalidTipOffWindow = panel.down('#invalidTipOffWindow');
        var form = panel.down('#invalidTipOffForm');
        form.getForm().reset();
        var invalidTipOffWindowGrid = panel.down('#invalidTipOffWindowGrid');
        invalidTipOffWindowGrid.store.getProxy().extraParams = {
            'tipMessageId':'-1'
        };
        invalidTipOffWindowGrid.store.reload();
        invalidTipOffWindow.collapse();
    }
});