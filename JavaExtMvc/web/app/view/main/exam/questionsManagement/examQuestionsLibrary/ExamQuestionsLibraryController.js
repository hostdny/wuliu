/**
 * Created by zzw on 2016/8/18.
 */
Ext.define('ExtFrame.view.main.exam.questionsManagement.examQuestionsLibrary.ExamQuestionsLibraryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.examQuestionsLibraryController',

    onClickSearch: function () {
        Tools.GridSearchToolbar.SearchEncap(this);
    },
    onClickAddSearch: function () {
        Tools.GridSearchToolbar.ClickAddSearch(this);
    },
//保存返回
    onClickButtonSaveReturn: function () {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/examQuestionsLibrary/save.do';
        var view = this.getView();
        var win = view.up("panel").down('#' + view.ename + 'Window');
        var form = win.down('#' + view.ename + 'Form');
        var right = form.down("#rightAns").getChecked();
        var testTy = form.down("#testType").getValue();
        var rightAns = "";
        for (var i = 0; i < right.length; i++) {
            var inputValue = right[i].inputValue;
            rightAns += inputValue + ",";
        }
        if(testTy=='0'&&right.length>1){
            Ext.MessageBox.alert('提示', '单选题只有一个答案！');
            return;
        }
        if(testTy=='1'&&right.length<2){
            Ext.MessageBox.alert('提示', '多选题有多个答案！');
            return;
        }
        if (form.isValid()) {
            var record = view.getViewModel().getData().rec;
            var testContent = form.down('#testContent').getValue();
            if (testContent == "" || testContent == null) {
                Ext.MessageBox.alert('提示', '请先填写数据！');
                return;
            }
            record.testContent = testContent;
            record.rightAns = rightAns;
            var pnGrid = view.up("panel").down('#' + view.ename + 'Grid');
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                        pnGrid.store.reload();
                         view.up("panel").down('#' + view.ename + 'Window').collapse();
                        //    view.up("panel").down('#' + view.ename + 'Window').collapse();
                        form.getForm().reset();//表单清空
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            }
        }
        else {
            Ext.MessageBox.alert('提示', '请先填写数据！');
        }
    },
//保存继续
    onClickButtonSave: function () {
        var ActionEdit = Tools.Method.getAPiRootPath() + '/examQuestionsLibrary/save.do';
        var view = this.getView();
        var win = view.up("panel").down('#' + view.ename + 'Window');
        var form = win.down('#' + view.ename + 'Form');
        var right = form.down("#rightAns").getChecked();
        var testTy = form.down("#testType").getValue();
     //   var examQuestionsLibraryWindow = view.down('#examQuestionsLibraryWindow');
        var rightAns = "";
        for (var i = 0; i < right.length; i++) {
            var inputValue = right[i].inputValue;
            rightAns += inputValue + ",";
        }
        if(testTy=='0'&&right.length>1){
            Ext.MessageBox.alert('提示', '单选题只有一个答案！');
            return;
        }
        if(testTy=='1'&&right.length<2){
            Ext.MessageBox.alert('提示', '多选题有多个答案！');
            return;
        }
        if (form.isValid()) {
            var record = view.getViewModel().getData().rec;
            var testContent = form.down('#testContent').getValue();
            if (testContent == "" || testContent == null) {
                Ext.MessageBox.alert('提示', '请先填写数据！');
                return;
            }
            record.testContent = testContent;
            record.rightAns = rightAns;
            var pnGrid = view.up("panel").down('#' + view.ename + 'Grid');

            //var examQuestionsLibraryTree = view.down('#examQuestionsLibraryTree');
            //var selectTree = examQuestionsLibraryTree.getSelection();
            //var typeOfWork = selectTree[0].data.name;

            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                            pnGrid.store.reload();
                        form.getForm().reset();//表单清空
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            }
        }
        else {
            Ext.MessageBox.alert('提示', '请先填写数据！');
        }
    },
    onClickButtonDel: function () {
        Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath() + '/examQuestionsLibrary/delete.do');
    },
    onClickClear: function () {
        Tools.GridSearchToolbar.ClickClear(this);
    },
    onClickButtonEdit: function () {
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var view = this.getView();

        var pnGrid = view.down('#' + view.ename + 'Grid');

        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        var window = view.down('#' + view.ename + 'Window');
        window.down('form').getForm().reset();//表单清空
        // 编辑器
        var UEditContext = Ext.getCmp('testContent');
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            window.down('form').getForm().loadRecord(selectRecords[0]);
            UEditContext.setValue(selectRecords[0].data.testContent);
            var form = window.down('form');
            window.expand();
            var ans = selectRecords[0].data.rightAns;
            var arr = ans.split(",");
            var rightAns = form.down("#rightAns");
            rightAns.setValue({
                rightAns:arr
            });
        }
    },
    onClickButtonAdd: function () {
        var view = this.getView();
        var examQuestionsLibraryTree = view.down('#examQuestionsLibraryTree');
        var examQuestionsLibraryWindow = view.down('#examQuestionsLibraryWindow');
        var selectTree = examQuestionsLibraryTree.getSelection();
        view.down('#' + view.ename + 'Window').down('form').getForm().reset();
        if (Tools.Method.IsDelData(selectTree)) {
            var typeOfWork = selectTree[0].data.name;
            examQuestionsLibraryWindow.down('#typeOfWork').setValue(typeOfWork);
        } else {
            Ext.MessageBox.alert('提示', '请选择一条考试类别！');
            return;
        }
        view.down('#' + view.ename + 'Window').expand();
    },
    onSelectTree: function (me, record, eOpts) {
        var panel = this.getView();
        var examQuestionsLibraryGrid = panel.down('#examQuestionsLibraryGrid');
        var examQuestionsLibraryTree = panel.down('#examQuestionsLibraryTree');
        var examQuestionsLibraryWindow = panel.down('#examQuestionsLibraryWindow');
        var typeOfWork = record.data.name;
        examQuestionsLibraryWindow.down('#typeOfWork').setValue(typeOfWork);
        //带附加参数重构grid store数据
        examQuestionsLibraryGrid.store.getProxy().extraParams = {
            'typeOfWork': typeOfWork
        };
        //重新加载grid
        examQuestionsLibraryGrid.store.reload();
    }
})