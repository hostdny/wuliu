/**
 * Created by wangBin on 2016/8/29.
 */
Ext.define('ExtFrame.view.main.knowledgeArea.knowledgeAreaFileList.KnowledgeAreaFileListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.knowledgeAreaFileListController',

    onClickButtonLook: function () {
        var panel = this.getView();
        var knowledgeAreaFileListGrid = panel.down('#knowledgeAreaFileListGrid');
        var selectRecords = knowledgeAreaFileListGrid.getSelection();
        if (Tools.Method.IsEditData(selectRecords)) {
            var url = selectRecords[0].data.fileUrl;
            window.open('/app/view/main/knowledgeArea/knowledgeAreaFileList/viewPdf.html?url=' + url + '');
        }
    },
    onClickSearch: function () {
        var panel = this.getView();
        var knowledgeAreaFileListGrid = panel.down('#knowledgeAreaFileListGrid');
        var knowledgeAreaFileListTree = panel.down('#knowledgeAreaFileListTree');
        var fileName = knowledgeAreaFileListGrid.down("#fileName").getValue();
        var selection = knowledgeAreaFileListTree.getSelection();
        var pid = "";
        if (selection.length > 0) {
            pid = selection[0].data.id;
            var state = selection[0].data.state;
            if (state == "0") {
                Ext.MessageBox.alert('提示', '你没有权限访问该类别的内容或该类别被禁用！');
                knowledgeAreaFileListGrid.store.getProxy().extraParams = {
                    'pid': "-1",
                    fileName: ""
                };
                knowledgeAreaFileListGrid.store.reload();
                return;
            } else {
                //带附加参数重构grid store数据
                knowledgeAreaFileListGrid.store.getProxy().extraParams = {
                    'pid': pid,
                    fileName: fileName
                };
                //重新加载grid
                knowledgeAreaFileListGrid.store.reload();
            }
        } else {
            Ext.MessageBox.alert('提示', '请选择一条类别！');
            return;
        }
    },
    onSelectTree: function (me, record, eOpts) {
        var panel = this.getView();
        var knowledgeAreaFileListGrid = panel.down('#knowledgeAreaFileListGrid');
        var pid = record.data.id;
        var state = record.data.state;
        if (state == "0") {
            Ext.MessageBox.alert('提示', '你没有权限访问该类别的内容或该类别被禁用！');
            //带附加参数重构grid store数据
            knowledgeAreaFileListGrid.store.getProxy().extraParams = {
                'pid': "-1",
                fileName: ""
            };
            knowledgeAreaFileListGrid.store.reload();
            return;
        } else {
            //带附加参数重构grid store数据
            knowledgeAreaFileListGrid.store.getProxy().extraParams = {
                'pid': pid,
                fileName: ""
            };
            //重新加载grid
            knowledgeAreaFileListGrid.store.reload();
        }
    }
});