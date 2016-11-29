/**
 * Created by wangBin on 2016/7/28.
 */
Ext.define('ExtFrame.view.main.correct.correctSupervise.CorrectSuperviseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.correctSuperviseController',

    onClickSelectedImage: function (dv, nodes) {
        window.open(nodes[0].data.fileUrl);
    },
    onClickButtonAdd: function () {
        if (!Tools.Method.IsLogin) {
            return;
        }
        var win = Ext.create('Ext.Window', {
            width: 950,
            height: 550,
            plain: true,
            layout: 'fit',
            modal: true,
            closeAction: 'destroy',
            title: '矫正监督信息',
            autoShow: true,
            closable: true,
            items: {
                xtype: 'correctSuperviseWindow',
                itemId: 'correctSuperviseWindow',
                requires: ['ExtFrame.view.main.correct.correctSupervise.CorrectSuperviseController'],
                controller: 'correctSuperviseController'
            }
        }).show();
    },
    onClickButtonEdit: function () {
    },
    onClickButtonSave: function () {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/correctRecord/saveRecord.do';
        var correctSuperviseWindow = Ext.getCmp("correctSuperviseWindowId");
        var correctSuperviseGrid = Ext.getCmp("correctSuperviseGridId");
        var form = correctSuperviseWindow.down('#correctSuperviseForm');
        if (form.isValid()) {
            var record = correctSuperviseWindow.getViewModel().getData().rec;
            var lids = form.down("#lid").getValue();
            var lid ="";
            for(var i=0;i<lids.length;i++){
                if(i == 0){
                    lid =lids[0];
                }else{
                    lid = lid + ","+ lids[i];
                }
            }
            record.correctTime = form.down("#correctTime").getValue();
            record.lid = lid;
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        if(record.id){
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                        }else{
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0005, '4000', '1', null);
                        }
                        form.reset();
                        correctSuperviseWindow.getViewModel().getData().rec = null;
                        correctSuperviseGrid.store.reload();
                        correctSuperviseWindow.up().close();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            }
        } else {
            Ext.MessageBox.alert('提示', '请先填写数据！');
        }
    },
    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/correctRecord/delete.do';
        var panel = this.getView();
        var correctSuperviseGrid = panel.down("#correctSuperviseGrid");
        var selectRows = correctSuperviseGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var returnFlag = true;
            var ids = '';
            $.each(selectRows, function (index, row) {
                if(row.data.correctState != "0"){
                    Ext.MessageBox.alert('提示', '仅能删除新建状态的信息！');
                    returnFlag = false;
                    return false;
                }else{
                    ids += row.data.id + ',';
                }
            });
            if(!returnFlag){
                return;
            }
            var data = {ids: ids};
            //用户确认删除操作-----点击“是”
            Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionDelete, 'POST', data, true, function (jsonData) {
                        if (jsonData) {
                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG00141, [jsonData.sCount, jsonData.fCount]), '4000', '1', null);
                            correctSuperviseGrid.store.reload();
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    },
    onClickSearch: function () {
    },
    onClickAddSearch: function () {
    },
    onClickClear: function () {
        var correctSuperviseWindow = Ext.getCmp("correctSuperviseWindowId");
        var form = correctSuperviseWindow.down('#correctSuperviseForm');
        form.reset();
        correctSuperviseWindow.up().close();
    },
    onClickCorrect: function () {
        var ActionUpdate = Tools.Method.getAPiRootPath() + '/correctRecord/updateRecord.do';
        var panel = this.getView();
        var correctSuperviseGrid = panel.down("#correctSuperviseGrid");
        var selectRows = correctSuperviseGrid.selModel.selected.items;//获取grid选中行

        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var ids = '';
            var returnFlag = true;
            $.each(selectRows, function (index, row) {
                if(row.data.correctState != "0"){
                    Ext.MessageBox.alert('提示', '仅能监查新建状态的信息！');
                    returnFlag = false;
                    return false;
                }else{
                    ids += row.data.id + ',';
                }
            });
            if(!returnFlag){
                return;
            }
            var data = {ids: ids};
            Tools.Method.ExtAjaxRequestEncap(ActionUpdate, 'POST', data, true, function (jsonData) {
                if (jsonData) {
                    Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                    correctSuperviseGrid.store.reload();
                }
                else {
                    Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                }
            });
        }
    }
});