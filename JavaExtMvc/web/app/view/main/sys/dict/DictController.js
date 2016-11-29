/**
 * Created by LvXL on 2016/2/2.
 */
Ext.define('ExtFrame.view.main.sys.dict.DictController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dictController',

    onClickButtonLook: function () {
        var view = this.getView();
        view.down('#' + view.ename + 'Form').getForm().reset();//表单清空
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords =  pnGrid.selModel.selected.items;//获取grid选中行records
        //仅能选择一项数据
        var dictPicker = view.down('#' + view.ename + 'Form').down('#dictPicker');
        if (Tools.Method.IsEditData(selectRecords)) {
            view.down('#' + view.ename + 'Form').getForm().loadRecord(selectRecords[0]);
            dictPicker.setRawValue(selectRecords[0].data.parentName);
        }
    },
    onClickButtonAdd: function () {
        Tools.GridSearchToolbar.AddEncap(this);
    },
    onClickButtonEdit: function () {
        var view = this.getView();
        view.down('#' + view.ename + 'Form').getForm().reset();//表单清空
        var pnGrid = view.down('#' + view.ename + 'Grid');//获取当前grid控件
        var selectRecords =  pnGrid.selModel.selected.items;//获取grid选中行records
        //仅能选择一项数据
        var dictPicker = view.down('#' + view.ename + 'Form').down('#dictPicker');
        if (Tools.Method.IsEditData(selectRecords)) {
            view.down('#' + view.ename + 'Form').getForm().loadRecord(selectRecords[0]);
            dictPicker.setRawValue(selectRecords[0].data.parentName);
        }
    },
    onClickButtonSave: function () {
        // 保存
        var saveUrl = Tools.Method.getAPiRootPath() + '/dict/save.do';
        var view = this.getView();
        var form = view.down('#' + view.ename + 'Form');
        if(form.isValid()){
            var record = view.getViewModel().getData().rec;
            var grid = view.down('#' + view.ename + 'Grid');
            if(record){
                Tools.Method.ExtAjaxRequestEncap(saveUrl, 'POST', record, true, function (jsonData) {
                    if (jsonData) {
                        view.down('#' + view.ename + 'Form').getForm().reset();
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                        grid.store.reload()
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            }else{
                Ext.MessageBox.alert('提示', '请将数据填写完整！');
            }
        }
    },
    onClickButtonDel: function () {
        var ActionDelete = Tools.Method.getAPiRootPath() + '/dict/delete.do';
        var view = this.getView();//获取当前grid控件
        var pnGrid = view.down('#' + view.ename + 'Grid');
        var selectRows = pnGrid.selModel.selected.items;//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var ids = '';
            $.each(selectRows, function (index, row) {
                ids += row.data.id + ',';
            });
            var data = { ids: ids };
            //用户确认删除操作-----点击“是”
            Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionDelete, 'POST', data, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG00141, [jsonData.sCount, jsonData.fCount]), '4000', '1', null);
                            if (view.down('#' + view.ename + 'Form'))
                                view.down('#' + view.ename + 'Form').getForm().reset();
                            view.getViewModel().getData().rec = null;
                            pnGrid.store.reload();
                        } else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    },
    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchEncap(this);
    },
    checkChild: function (node, state) {
        checkChild(node, state);
    }
});

function checkChild(node, state) {
    if (node.hasChildNodes()) {
        node.eachChild(function (child) {
            child.set('checked', state);
            checkChild(child, state);
        });
    }
}