/**
 * Created by LvXL on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.send.sendsFilesCount.SendsFilesCountController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sendsFilesCountController',

    //onClickButtonLook: function () {
    //    if (!Tools.Method.IsLogin())
    //        return;
    //    var panel = this.getView();
    //    var IrsEquipmentGrid = panel.down('#SendsFilesGrid');
    //    var IrsEquipmentWindow = panel.down('#SendsFilesWindow');
    //    var selectRecords = IrsEquipmentGrid.getSelectionModel().getSelection();
    //    if (selectRecords[0]) {
    //        var form = panel.down('#SendsFilesForm');
    //        form.getForm().loadRecord(selectRecords[0]);
    //        IrsEquipmentWindow.expand();
    //    }else{
    //        Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
    //    }
    //},
    //onClickButtonAdd: function () {
    //    var view = this.getView();
    //    view.down('#' + view.ename + 'Window').down('form').getForm().reset();
    //    view.down('#' + view.ename + 'Window').expand();
    //},
    //onClickButtonEdit: function () {
    //    var view = this.getView();
    //    var pnGrid= view.down('#' + view.ename + 'Grid');//获取当前grid控件
    //    var selectRecords = pnGrid.getSelection();//获取grid选中行records
    //    var  window =  view.down('#' + view.ename + 'Window');
    //    window.down('form').getForm().reset();//表单清空
    //    var name = window.down('#name');
    //    //仅能选择一项数据
    //    if (Tools.Method.IsEditData(selectRecords)) {
    //        window.expand();
    //        window.down('form').getForm().loadRecord(selectRecords[0]);
    //        name.setRawValue(selectRecords[0].data.orgName);
    //    }
    //},
    //onClickButtonSave: function () {
    //
    //    var ActionEdit = Tools.Method.getAPiRootPath() + '/sendsFiles/save.do';
    //    var view = this.getView();
    //    var win = view.up("panel").down('#' + view.ename + 'Window');
    //    var form = win.down('#' + view.ename + 'Form');
    //    if (form.isValid()) {
    //        var record = view.getViewModel().getData().rec;
    //        var pnGrid = view.up("panel").down('#' + view.ename + 'Grid');
    //        if (record) {
    //            Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
    //                if (jsonData.resultCode == "1") {
    //                    view.down('#' + view.ename + 'Form').getForm().reset();
    //                    view.getViewModel().getData().rec = null;
    //                    Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
    //                    pnGrid.store.reload();
    //                    view.up("panel").down('#' + view.ename + 'Window').collapse();
    //                } else {
    //                    Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
    //                }
    //            });
    //        } else {
    //            Ext.MessageBox.alert('提示', '请先填写数据！');
    //        }
    //    }
    //},
    //onClickButtonDel: function () {
    //    Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath() + '/sendsFiles/delete.do');
    //},
    //onClickSearch: function () {
    //    Tools.GridSearchToolbar.SearchEncap(this);
    //},
    //onClickAddSearch:function(){
    //    Tools.GridSearchToolbar.ClickAddSearch(this);
    //},
    //onClickClear:function(){
    //    Tools.GridSearchToolbar.ClickClear(this);
    //}
});