/**
 * Created by Jia on 2016/8/18.
 */
Ext.define('ExtFrame.view.main.exam.questionsManagement.questionsContrast.QuestionsContrastController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.questionsContrastController',

    onClickButtonDel: function () {

        var panel = this.getView();
        var questionsContrastGrid = panel.down('#questionsContrastGrid');
        var selectRecords = questionsContrastGrid.getSelectionModel().getSelection();
        if (selectRecords.length > 0) {
            var data = {ids: selectRecords[0].data.id};
            Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/examQuestionsLibrary/delete.do', 'POST', data, true, function (jsonData) {
                        if (jsonData.resultCode) {
                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG00141, [jsonData.sCount, jsonData.fCount]), '4000', '1', null);
                            questionsContrastGrid.store.getProxy();
                            //重新加载grid
                            questionsContrastGrid.store.reload();
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
    }
});