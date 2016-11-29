Ext.define('ExtFrame.view.main.tipOff.tipOffDispose.TipOffDisposeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tipOffDisposeController',

    onClickButtonLook: function () {
        if (!Tools.Method.IsLogin())
            return;
        var panel = this.getView();
        var tipOffDisposeGrid = panel.down('#tipOffDisposeGrid');
        var tipOffDisposeWindow = panel.down('#tipOffDisposeWindow');
        var tipOffDisposeWindowGrid = panel.down('#tipOffDisposeWindowGrid');
        var selectRecords = tipOffDisposeGrid.getSelectionModel().getSelection();
        if (selectRecords[0]) {
            var form = panel.down('#tipOffDisposeForm');
            var saveButton = tipOffDisposeWindow.down("#saveButton");
            var tipState = form.down("#tipState");
            var tipStateDisplay = form.down("#tipStateDisplay");
            tipState.hide();
            tipStateDisplay.show();
            saveButton.hide();
            tipStateDisplay.setValue(selectRecords[0].data.tipStateShow);
            form.getForm().loadRecord(selectRecords[0]);
            if(selectRecords[0].data.tipStyle == "匿名"){
                form.down("#tiperName").setValue(selectRecords[0].data.tipStyle);
            }
            tipOffDisposeWindowGrid.store.getProxy().extraParams = {
                'tipMessageId':selectRecords[0].data.id
            };
            tipOffDisposeWindowGrid.store.reload();
            tipOffDisposeWindow.expand();
        }else{
            Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
        }
    },
    onClickButtonAdd: function () {
    },
    onClickButtonEdit: function () {
        if (!Tools.Method.IsLogin())
            return;
        var panel = this.getView();
        var tipOffDisposeGrid = panel.down('#tipOffDisposeGrid');
        var tipOffDisposeWindow = panel.down('#tipOffDisposeWindow');
        var tipOffDisposeWindowGrid = panel.down('#tipOffDisposeWindowGrid');
        var selectRecords = tipOffDisposeGrid.getSelectionModel().getSelection();
        if (selectRecords[0]) {
            var form = panel.down('#tipOffDisposeForm');
            var saveButton = tipOffDisposeWindow.down("#saveButton");
            var tipState = form.down("#tipState");
            var tipStateDisplay = form.down("#tipStateDisplay");
            tipState.show();
            tipStateDisplay.hide();
            saveButton.show();
            form.getForm().loadRecord(selectRecords[0]);
            if(selectRecords[0].data.tipStyle == "匿名"){
                form.down("#tiperName").setValue(selectRecords[0].data.tipStyle);
            }
            tipOffDisposeWindowGrid.store.getProxy().extraParams = {
                'tipMessageId':selectRecords[0].data.id
            };
            tipOffDisposeWindowGrid.store.reload();
            tipOffDisposeWindow.expand();
        }else{
            Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
        }
    },
    onClickButtonSave: function () {
        if (!Tools.Method.IsLogin())
            return;
        var panel=this.getView();
        var tipOffDisposeWindow = panel.down('#tipOffDisposeWindow');
        var tipOffDisposeGrid = panel.down('#tipOffDisposeGrid');
        var id = tipOffDisposeWindow.down("#ID").getValue();
        var tipState = tipOffDisposeWindow.down("#tipState").getValue();
        var data = {
            id: id,
            tipState: tipState
        };
        if(id != "" && id != null){
            Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/tipMessage/save.do', 'POST', data, true, function (jsonData) {
                tipOffDisposeGrid.store.getProxy();
                tipOffDisposeGrid.store.reload();
                var form = panel.down('#tipOffDisposeForm');
                form.getForm().reset();
                tipOffDisposeWindow.collapse();
            });
        }else{
            Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
            tipOffDisposeWindow.collapse();
        }


    },
    onClickButtonDel: function () {

    },
    onClickSearch: function () {
    },
    onClickAddSearch: function () {
    },
    onClickClear: function () {
        var panel = this.getView();
        var tipOffDisposeWindow = panel.down('#tipOffDisposeWindow');
        var form = panel.down('#tipOffDisposeForm');
        form.getForm().reset();
        var tipOffDisposeWindowGrid = panel.down('#tipOffDisposeWindowGrid');
        tipOffDisposeWindowGrid.store.getProxy().extraParams = {
            'tipMessageId':'-1'
        };
        tipOffDisposeWindowGrid.store.reload();
        tipOffDisposeWindow.collapse();
    }
});