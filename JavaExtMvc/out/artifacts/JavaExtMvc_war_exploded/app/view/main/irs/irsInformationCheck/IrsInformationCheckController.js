/**
 * Created by LvXL on 2016/7/14.
 */
Ext.define('ExtFrame.view.main.irs.irsInformationCheck.IrsInformationCheckController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.irsInformationCheckController',

    onClickButtonLook: function () {
        Tools.GridSearchToolbar.LookEncap(this);
    },
    onClickButtonAdd: function () {
        Tools.GridSearchToolbar.AddEncap(this);
    },
    onClickButtonEdit: function () {
        Tools.GridSearchToolbar.EditEncap(this);
    },
    onClickButtonSave: function () {
        Tools.GridSearchToolbar.SaveEncap(this, Tools.Method.getAPiRootPath()+'/irsInformation/save.do');
    },
    onClickButtonDel: function () {
        Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath()+'/irsInformation/delete.do');
    },
    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchEncap(this);
    },
    onClickButtonCheck: function () {
        var ActionCheck = Tools.Method.getAPiRootPath() + '/irsInformation/check.do';
        var view = this.getView();//获取当前grid控件
        var pnGrid = view.down('#' + view.ename + 'Grid');
        var selectRows = pnGrid.getSelectionModel().getSelection();//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var delOIDs = '';
            $.each(selectRows, function (index, row) {
                delOIDs += row.data.id + ',';
            });
            var data = {ids: delOIDs,auditStatus:1};
            //用户确认审核操作-----点击“是”
            Ext.MessageBox.confirm('提醒', '确定要通过审核？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionCheck, 'POST', data, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG0007, [jsonData.sCount, jsonData.fCount]), '4000', '1', null);
                            pnGrid.store.reload();
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
    },
    onClickButtonBack: function () {
        var ActionBack = Tools.Method.getAPiRootPath() + '/irsInformation/check.do';
        var view = this.getView();//获取当前grid控件
        var pnGrid = view.down('#' + view.ename + 'Grid');
        var selectRows = pnGrid.getSelectionModel().getSelection();//获取grid选中行
        //至少选择一项数据
        if (Tools.Method.IsDelData(selectRows)) {
            var delOIDs = '';
            $.each(selectRows, function (index, row) {
                delOIDs += row.data.id + ',';
            });
            var data = {ids: delOIDs,auditStatus:2};
            //用户确认审核操作-----点击“是”
            Ext.MessageBox.confirm('提醒', '确定要退回？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(ActionBack, 'POST', data, true, function (jsonData) {
                        if (jsonData.resultCode == "1") {
                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG00141, [jsonData.sCount, jsonData.fCount]), '4000', '1', null);
                            pnGrid.store.reload();
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        }
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