/**
 * Created by zzw on 2016/8/18.
 */
Ext.define('ExtFrame.view.main.exam.examBatch.ExamBatchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.examBatchController',

    onClickAll: function () {
        this.getView().up("window").close();
    },

    openPeizhi: function () {
        var panel = this.getView();
        var examBatchGrid = panel.down('#examBatchGrid');
        var selectRecords = examBatchGrid.getSelectionModel().getSelection();//获取grid选中行
        if (Tools.Method.IsEditData(selectRecords)) {
            var id = selectRecords[0].data.id;
            Tools.Method.ExtAjaxRequestEncap('/examPaper/loadByBatchId.do?batchId=' + id, 'GET', null, true, function (jsonData) {
                // 点击试卷配置
                var examPanelWindow = Ext.create('Ext.Window', {
                    width: 850,
                    height:550,
                    plain: true,
                    layout: 'fit',
                    autoShow: true,
                    closable: false,
                    itemId: 'examPanelWindow',
                    items: {
                        xtype: 'examPanel',
                        itemId: 'examPanel',
                        requires: ['ExtFrame.view.main.exam.examBatch.ExamBatchController'],
                        controller: 'examBatchController'
                    }
                }).show();
                var form = examPanelWindow.down('#examPanelForm');
                form.getForm().setValues(jsonData);
                //var textfield=Ext.getCmp('fitnumber');
                ////设置字体颜色
                //textfield.setFieldStyle({color:'red',background:'blue',align:'center'});
                //debugger;
            });
        }
    },
    onClickButtonDel: function () {
        Tools.GridSearchToolbar.DeleteByOIDEncap(this, Tools.Method.getAPiRootPath() + '/examBatch/delete.do');
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
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {

            var window = view.down('#' + view.ename + 'Window');
            var form = window.down('form');
            form.getForm().reset();//表单清空
            window.expand();
            form.getForm().loadRecord(selectRecords[0]);
        }
    },
    onClickButtonAdd: function () {
        var view = this.getView();
        view.down('#' + view.ename + 'Window').down('form').getForm().reset();
        view.down('#' + view.ename + 'Window').expand();
    },
    onClickButtonSave: function () {

        var ActionEdit = Tools.Method.getAPiRootPath() + '/examBatch/save.do';
        var view = this.getView();
        var win = view.up("panel").down('#' + view.ename + 'Window');
        var form = win.down('#' + view.ename + 'Form');
        if (form.isValid()) {
            var record = view.getViewModel().getData().rec;
            var pnGrid = view.up("panel").down('#' + view.ename + 'Grid');
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        view.down('#' + view.ename + 'Form').getForm().reset();
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                        pnGrid.store.reload();
                        view.up("panel").down('#' + view.ename + 'Window').collapse();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                    }
                });
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    },
    onClickSave: function () {

        var ActionEdit = Tools.Method.getAPiRootPath() + '/examPaper/save.do';
        var view = this.getView();
        var form = view.down('#examPanelForm');
        //基础类
        var baseJudgeNo = form.down("#baseJudgeNo").getValue();//判断题个数
        if (baseJudgeNo != "" && baseJudgeNo != null) {
            baseJudgeNo = parseInt(baseJudgeNo);
        } else {
            baseJudgeNo = 0;
        }
        var baseJudgeEasyNo = form.down("#baseJudgeEasyNo").getValue();//判断题容易个数
        if (baseJudgeEasyNo != "" && baseJudgeEasyNo != null) {
            baseJudgeEasyNo = parseInt(baseJudgeEasyNo);
        } else {
            baseJudgeEasyNo = 0;
        }
        var baseJudgeMidNo = form.down("#baseJudgeMidNo").getValue();//判断题中等个数
        if (baseJudgeMidNo != "" && baseJudgeMidNo != null) {
            baseJudgeMidNo = parseInt(baseJudgeMidNo);
        } else {
            baseJudgeMidNo = 0;
        }
        var baseJudgeHardNo = form.down("#baseJudgeHardNo").getValue(); //判断题困难个数
        if (baseJudgeHardNo != "" && baseJudgeHardNo != null) {
            baseJudgeHardNo = parseInt(baseJudgeHardNo);
        } else {
            baseJudgeHardNo = 0;
        }
        var baseSingleNo = form.down("#baseSingleNo").getValue();//单选题个数
        if (baseSingleNo != "" && baseSingleNo != null) {
            baseSingleNo = parseInt(baseSingleNo);
        } else {
            baseSingleNo = 0;
        }
        var baseSingleEasyNo = form.down("#baseSingleEasyNo").getValue(); //单选题容易个数
        if (baseSingleEasyNo != "" && baseSingleEasyNo != null) {
            baseSingleEasyNo = parseInt(baseSingleEasyNo);
        } else {
            baseSingleEasyNo = 0;
        }
        var baseSingleMidNo = form.down("#baseSingleMidNo").getValue(); //单选题中等个数
        if (baseSingleMidNo != "" && baseSingleMidNo != null) {
            baseSingleMidNo = parseInt(baseSingleMidNo);
        } else {
            baseSingleMidNo = 0;
        }
        var baseSingleHardNo = form.down("#baseSingleHardNo").getValue();//单选题困难个数
        if (baseSingleHardNo != "" && baseSingleHardNo != null) {
            baseSingleHardNo = parseInt(baseSingleHardNo);
        } else {
            baseSingleHardNo = 0;
        }
        var baseMulNo = form.down("#baseMulNo").getValue();//多选题个数
        if (baseMulNo != "" && baseMulNo != null) {
            baseMulNo = parseInt(baseMulNo);
        } else {
            baseMulNo = 0;
        }
        var baseMulEasyNo = form.down("#baseMulEasyNo").getValue();//多选题容易个数
        if (baseMulEasyNo != "" && baseMulEasyNo != null) {
            baseMulEasyNo = parseInt(baseMulEasyNo);
        } else {
            baseMulEasyNo = 0;
        }
        var baseMulMidNo = form.down("#baseMulMidNo").getValue();//多选题中等个数
        if (baseMulMidNo != "" && baseMulMidNo != null) {
            baseMulMidNo = parseInt(baseMulMidNo);
        } else {
            baseMulMidNo = 0;
        }
        var baseMulHardNo = form.down("#baseMulHardNo").getValue(); //多选题困难个数
        if (baseMulHardNo != "" && baseMulHardNo != null) {
            baseMulHardNo = parseInt(baseMulHardNo);
        } else {
            baseMulHardNo = 0;
        }
        //专业类
        var judgeNo = form.down("#judgeNo").getValue(); //判断题个数
        if (judgeNo != "" && judgeNo != null) {
            judgeNo = parseInt(judgeNo);
        } else {
            judgeNo = 0;
        }
        var judgeEasyNo = form.down("#judgeEasyNo").getValue();//判断题容易个数
        if (judgeEasyNo != "" && judgeEasyNo != null) {
            judgeEasyNo = parseInt(judgeEasyNo);
        } else {
            judgeEasyNo = 0;
        }
        var judgeMidNo = form.down("#judgeMidNo").getValue();//判断题中等个数
        if (judgeMidNo != "" && judgeMidNo != null) {
            judgeMidNo = parseInt(judgeMidNo);
        } else {
            judgeMidNo = 0;
        }
        var judgeHardNo = form.down("#judgeHardNo").getValue();//判断题困难个数
        if (judgeHardNo != "" && judgeHardNo != null) {
            judgeHardNo = parseInt(judgeHardNo);
        } else {
            judgeHardNo = 0;
        }
        var singleNo = form.down("#singleNo").getValue();//单选题个数
        if (singleNo != "" && singleNo != null) {
            singleNo = parseInt(singleNo);
        } else {
            singleNo = 0;
        }
        var singleEasyNo = form.down("#singleEasyNo").getValue();//单选题容易个数
        if (singleEasyNo != "" && singleEasyNo != null) {
            singleEasyNo = parseInt(singleEasyNo);
        } else {
            singleEasyNo = 0;
        }
        var singleMidNo = form.down("#singleMidNo").getValue(); //单选题中等个数
        if (singleMidNo != "" && singleMidNo != null) {
            singleMidNo = parseInt(singleMidNo);
        } else {
            singleMidNo = 0;
        }
        var singleHardNo = form.down("#singleHardNo").getValue();//单选题困难个数
        if (singleHardNo != "" && singleHardNo != null) {
            singleHardNo = parseInt(singleHardNo);
        } else {
            singleHardNo = 0;
        }
        var mulNo = form.down("#mulNo").getValue();//多选题个数
        if (mulNo != "" && mulNo != null) {
            mulNo = parseInt(mulNo);
        } else {
            mulNo = 0;
        }
        var mulEasyNo = form.down("#mulEasyNo").getValue();//多选题容易个数
        if (mulEasyNo != "" && mulEasyNo != null) {
            mulEasyNo = parseInt(mulEasyNo);
        } else {
            mulEasyNo = 0;
        }
        var mulMidNo = form.down("#mulMidNo").getValue();//多选题中等个数
        if (mulMidNo != "" && mulMidNo != null) {
            mulMidNo = parseInt(mulMidNo);
        } else {
            mulMidNo = 0;
        }
        var mulHardNo = form.down("#mulHardNo").getValue(); //多选题困难个数
        if (mulHardNo != "" && mulHardNo != null) {
            mulHardNo = parseInt(mulHardNo);
        } else {
            mulHardNo = 0;
        }
        //统计题目数验证

        if (baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo != baseJudgeNo) {
            Ext.MessageBox.alert('温馨提示', '基础类判断题的个数错误！');
            return;
        }
        if (baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo != baseSingleNo) {
            Ext.MessageBox.alert('温馨提示', '基础类单选题的个数错误！');
            return;
        }
        if (baseMulEasyNo + baseMulMidNo + baseMulHardNo != baseMulNo) {
            Ext.MessageBox.alert('温馨提示', '基础类多选题的个数错误！');
            return;
        }
        if (judgeEasyNo + judgeMidNo + judgeHardNo != judgeNo) {
            Ext.MessageBox.alert('温馨提示', '专业类判断题的个数错误！');
            return;
        }
        if (singleEasyNo + singleMidNo + singleHardNo != singleNo) {
            Ext.MessageBox.alert('温馨提示', '专业类单选题的个数错误！');
            return;
        }
        if (mulEasyNo + mulMidNo + mulHardNo != mulNo) {
            Ext.MessageBox.alert('温馨提示', '专业类多选题的个数错误！');
            return;
        }


        if (form.isValid()) {
            var record = view.getViewModel().getData().rec;
            record.examBatch=Ext.getCmp("examBatchGridId").getSelectionModel().getSelection()[0].data.id;
            if (record) {
                Tools.Method.ExtAjaxRequestEncap(ActionEdit, 'POST', record, true, function (jsonData) {
                    if (jsonData.resultCode == "1") {
                        view.down('#examPanelForm').getForm().reset();
                        view.getViewModel().getData().rec = null;
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                        view.up("panel").close();
                        Ext.getCmp("examBatchGridId").store.reload();
                    } else {
                        Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '40E00', '2', null);//修改失败
                    }
                });
            } else {
                Ext.MessageBox.alert('提示', '请先填写数据！');
            }
        }
    },
    onBlurBaseJudgeNo: function (me, record, dasda) {
        //基础类判断题
        var examPanelWindow = me.up("#examPanelWindow");
        var form = examPanelWindow.down('#examPanelForm');
        var baseJudgeNo = examPanelWindow.down("#baseJudgeNo").getValue();
        if (baseJudgeNo != "") {
            baseJudgeNo = parseInt(baseJudgeNo);
        } else {
            baseJudgeNo = 0;
        }
        var baseJudgeScore = examPanelWindow.down("#baseJudgeScore").getValue();
        if (baseJudgeScore != "") {
            baseJudgeScore = parseInt(baseJudgeScore);
        } else {
            baseJudgeScore = 0;
        }
        var baseJudgeEasyNo = examPanelWindow.down("#baseJudgeEasyNo").getValue();
        if (baseJudgeEasyNo != "") {
            baseJudgeEasyNo = parseInt(baseJudgeEasyNo);
        } else {
            baseJudgeEasyNo = 0;
        }
        var baseJudgeMidNo = examPanelWindow.down("#baseJudgeMidNo").getValue();
        if (baseJudgeMidNo != "") {
            baseJudgeMidNo = parseInt(baseJudgeMidNo);
        } else {
            baseJudgeMidNo = 0;
        }
        var baseJudgeHardNo = examPanelWindow.down("#baseJudgeHardNo").getValue();
        if (baseJudgeHardNo != "") {
            baseJudgeHardNo = parseInt(baseJudgeHardNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //examPanelWindow.down("#baseJudgeNo").value = baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo;
        //if (baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo != baseJudgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类判断题的个数错误！');
        //}
        //基础类单选题
        //单选题个数
        var baseSingleNo = examPanelWindow.down("#baseSingleNo").getValue();
        if (baseSingleNo != "") {
            baseSingleNo = parseInt(baseSingleNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //单选题单个分值
        var baseSingleScore = examPanelWindow.down("#baseSingleScore").getValue();
        if (baseSingleScore != "") {
            baseSingleScore = parseInt(baseSingleScore);
        } else {
            baseSingleScore = 0;
        }
        //单选题容易数
        var baseSingleEasyNo = examPanelWindow.down("#baseSingleEasyNo").getValue();
        if (baseSingleEasyNo != "") {
            baseSingleEasyNo = parseInt(baseSingleEasyNo);
        } else {
            baseSingleEasyNo = 0;
        }
        //单选题难度一般数
        var baseSingleMidNo = examPanelWindow.down("#baseSingleMidNo").getValue();
        if (baseSingleMidNo != "") {
            baseSingleMidNo = parseInt(baseSingleMidNo);
        } else {
            baseSingleMidNo = 0;
        }
        //单选题难度困难数
        var baseSingleHardNo = examPanelWindow.down("#baseSingleHardNo").getValue();
        if (baseSingleHardNo != "") {
            baseSingleHardNo = parseInt(baseSingleHardNo);
        } else {
            baseSingleHardNo = 0;
        }
        //examPanelWindow.down("#baseSingleNo").value = baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo;
        //if (baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo != baseSingleNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类单选题的个数错误！');
        //}
        //基础类多选题
        //多选题个数
        var baseMulNo = examPanelWindow.down("#baseMulNo").getValue();
        //   alert(baseMulNo);
        if (baseMulNo != "") {
            baseMulNo = parseInt(baseMulNo);
        } else {
            baseMulNo = 0;
        }
        //多选题单个分值
        var baseMulScore = examPanelWindow.down("#baseMulScore").getValue();
        if (baseMulScore != "") {
            baseMulScore = parseInt(baseMulScore);
        } else {
            baseMulScore = 0;
        }
        //多选题容易
        var baseMulEasyNo = examPanelWindow.down("#baseMulEasyNo").getValue();
        if (baseMulEasyNo != "") {
            baseMulEasyNo = parseInt(baseMulEasyNo);
        } else {
            baseMulEasyNo = 0;
        }
        //多选题一般
        var baseMulMidNo = examPanelWindow.down("#baseMulMidNo").getValue();
        if (baseMulMidNo != "") {
            baseMulMidNo = parseInt(baseMulMidNo);
        } else {
            baseMulMidNo = 0;
        }
        //多选题困难
        var baseMulHardNo = examPanelWindow.down("#baseMulHardNo").getValue();
        if (baseMulHardNo != "") {
            baseMulHardNo = parseInt(baseMulHardNo);
        } else {
            baseMulHardNo = 0;
        }
        //examPanelWindow.down("#baseMulNo").value = baseMulEasyNo + baseMulMidNo + baseMulHardNo;
        //if (baseMulEasyNo + baseMulMidNo + baseMulHardNo != baseMulNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类多选题的个数错误！');
        //}
        //专业类判断题
        //判断题个数
        var judgeNo = examPanelWindow.down("#judgeNo").getValue();
        if (judgeNo != "") {
            judgeNo = parseInt(judgeNo);
        } else {
            judgeNo = 0;
        }
        //判断题单个分值
        var judgeScore = examPanelWindow.down("#judgeScore").getValue();
        if (judgeScore != "") {
            judgeScore = parseInt(judgeScore);
        } else {
            judgeScore = 0;
        }
        //判断题容易
        var judgeEasyNo = examPanelWindow.down("#judgeEasyNo").getValue();
        if (judgeEasyNo != "") {
            judgeEasyNo = parseInt(judgeEasyNo);
        } else {
            judgeEasyNo = 0;
        }
        //判断题一般
        var judgeMidNo = examPanelWindow.down("#judgeMidNo").getValue();
        if (judgeMidNo != "") {
            judgeMidNo = parseInt(judgeMidNo);
        } else {
            judgeMidNo = 0;
        }
        //判断题困难
        var judgeHardNo = examPanelWindow.down("#judgeHardNo").getValue();
        if (judgeHardNo != "") {
            judgeHardNo = parseInt(judgeHardNo);
        } else {
            judgeHardNo = 0;
        }
        //examPanelWindow.down("#judgeNo").value = judgeEasyNo + judgeMidNo + judgeHardNo;
        //if (judgeEasyNo + judgeMidNo + judgeHardNo != judgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类判断题的个数错误！');
        //}
        //专业类单选题
        //单选个数
        var singleNo = examPanelWindow.down("#singleNo").getValue();
        if (singleNo != "") {
            singleNo = parseInt(singleNo);
        } else {
            singleNo = 0;
        }
        //单选单个分值
        var singleScore = examPanelWindow.down("#singleScore").getValue();
        if (singleScore != "") {
            singleScore = parseInt(singleScore);
        } else {
            singleScore = 0;
        }
        //单选容易
        var singleEasyNo = examPanelWindow.down("#singleEasyNo").getValue();
        if (singleEasyNo != "") {
            singleEasyNo = parseInt(singleEasyNo);
        } else {
            singleEasyNo = 0;
        }
        //单选一般
        var singleMidNo = examPanelWindow.down("#singleMidNo").getValue();
        if (singleMidNo != "") {
            singleMidNo = parseInt(singleMidNo);
        } else {
            singleMidNo = 0;
        }
        //单选困难
        var singleHardNo = examPanelWindow.down("#singleHardNo").getValue();
        if (singleHardNo != "") {
            singleHardNo = parseInt(singleHardNo);
        } else {
            singleHardNo = 0;
        }
        //examPanelWindow.down("#singleNo").value = singleEasyNo + singleMidNo + singleHardNo;
        //if (singleEasyNo + singleMidNo + singleHardNo != singleNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类单选题的个数错误！');
        //}
        //专业类多选题
        var mulNo = examPanelWindow.down("#mulNo").getValue();
        if (mulNo != "") {
            mulNo = parseInt(mulNo);
        } else {
            mulNo = 0;
        }
        //专业类多选题单个分值
        var mulScore = examPanelWindow.down("#mulScore").getValue();
        if (mulScore != "") {
            mulScore = parseInt(mulScore);
        } else {
            mulScore = 0;
        }
        //专业类多选题容易
        var mulEasyNo = examPanelWindow.down("#mulEasyNo").getValue();
        if (mulEasyNo != "") {
            mulEasyNo = parseInt(mulEasyNo);
        } else {
            mulEasyNo = 0;
        }
        //专业类多选题一般
        var mulMidNo = examPanelWindow.down("#mulMidNo").getValue();
        if (mulMidNo != "") {
            mulMidNo = parseInt(mulMidNo);
        } else {
            mulMidNo = 0;
        }
        //专业类多选题困难
        var mulHardNo = examPanelWindow.down("#mulHardNo").getValue();
        if (mulHardNo != "") {
            mulHardNo = parseInt(mulHardNo);
        } else {
            mulHardNo = 0;
        }
        //examPanelWindow.down("#mulNo").value = mulEasyNo + mulMidNo + mulHardNo;
        //if (mulEasyNo + mulMidNo + mulHardNo != mulNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类多选题的个数错误！');
        //}
        //总分
        var totalScore = examPanelWindow.down("#totalScore").getValue();
        if (totalScore != "") {
            totalScore = parseInt(totalScore);
        } else {
            totalScore = 0;
        }
        totalScore = baseJudgeNo * baseJudgeScore + baseSingleNo * baseSingleScore + baseMulNo * baseMulScore + judgeNo * judgeScore + singleNo * singleScore + mulNo * mulScore;
        var totalScore = examPanelWindow.down("#totalScore").setValue(totalScore);
    },
    onBlurBaseJudgeScore: function (me, record, dasda) {
        //基础类判断题
        var examPanelWindow = me.up("#examPanelWindow");
        var form = examPanelWindow.down('#examPanelForm');
        var baseJudgeNo = examPanelWindow.down("#baseJudgeNo").getValue();
        if (baseJudgeNo != "") {
            baseJudgeNo = parseInt(baseJudgeNo);
        } else {
            baseJudgeNo = 0;
        }
        var baseJudgeScore = examPanelWindow.down("#baseJudgeScore").getValue();
        if (baseJudgeScore != "") {
            baseJudgeScore = parseInt(baseJudgeScore);
        } else {
            baseJudgeScore = 0;
        }
        var baseJudgeEasyNo = examPanelWindow.down("#baseJudgeEasyNo").getValue();
        if (baseJudgeEasyNo != "") {
            baseJudgeEasyNo = parseInt(baseJudgeEasyNo);
        } else {
            baseJudgeEasyNo = 0;
        }
        var baseJudgeMidNo = examPanelWindow.down("#baseJudgeMidNo").getValue();
        if (baseJudgeMidNo != "") {
            baseJudgeMidNo = parseInt(baseJudgeMidNo);
        } else {
            baseJudgeMidNo = 0;
        }
        var baseJudgeHardNo = examPanelWindow.down("#baseJudgeHardNo").getValue();
        if (baseJudgeHardNo != "") {
            baseJudgeHardNo = parseInt(baseJudgeHardNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //examPanelWindow.down("#baseJudgeNo").value = baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo;
        //if (baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo != baseJudgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类判断题的个数错误！');
        //}
        //基础类单选题
        //单选题个数
        var baseSingleNo = examPanelWindow.down("#baseSingleNo").getValue();
        if (baseSingleNo != "") {
            baseSingleNo = parseInt(baseSingleNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //单选题单个分值
        var baseSingleScore = examPanelWindow.down("#baseSingleScore").getValue();
        if (baseSingleScore != "") {
            baseSingleScore = parseInt(baseSingleScore);
        } else {
            baseSingleScore = 0;
        }
        //单选题容易数
        var baseSingleEasyNo = examPanelWindow.down("#baseSingleEasyNo").getValue();
        if (baseSingleEasyNo != "") {
            baseSingleEasyNo = parseInt(baseSingleEasyNo);
        } else {
            baseSingleEasyNo = 0;
        }
        //单选题难度一般数
        var baseSingleMidNo = examPanelWindow.down("#baseSingleMidNo").getValue();
        if (baseSingleMidNo != "") {
            baseSingleMidNo = parseInt(baseSingleMidNo);
        } else {
            baseSingleMidNo = 0;
        }
        //单选题难度困难数
        var baseSingleHardNo = examPanelWindow.down("#baseSingleHardNo").getValue();
        if (baseSingleHardNo != "") {
            baseSingleHardNo = parseInt(baseSingleHardNo);
        } else {
            baseSingleHardNo = 0;
        }
        //examPanelWindow.down("#baseSingleNo").value = baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo;
        //if (baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo != baseSingleNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类单选题的个数错误！');
        //}
        //基础类多选题
        //多选题个数
        var baseMulNo = examPanelWindow.down("#baseMulNo").getValue();
        //   alert(baseMulNo);
        if (baseMulNo != "") {
            baseMulNo = parseInt(baseMulNo);
        } else {
            baseMulNo = 0;
        }
        //多选题单个分值
        var baseMulScore = examPanelWindow.down("#baseMulScore").getValue();
        if (baseMulScore != "") {
            baseMulScore = parseInt(baseMulScore);
        } else {
            baseMulScore = 0;
        }
        //多选题容易
        var baseMulEasyNo = examPanelWindow.down("#baseMulEasyNo").getValue();
        if (baseMulEasyNo != "") {
            baseMulEasyNo = parseInt(baseMulEasyNo);
        } else {
            baseMulEasyNo = 0;
        }
        //多选题一般
        var baseMulMidNo = examPanelWindow.down("#baseMulMidNo").getValue();
        if (baseMulMidNo != "") {
            baseMulMidNo = parseInt(baseMulMidNo);
        } else {
            baseMulMidNo = 0;
        }
        //多选题困难
        var baseMulHardNo = examPanelWindow.down("#baseMulHardNo").getValue();
        if (baseMulHardNo != "") {
            baseMulHardNo = parseInt(baseMulHardNo);
        } else {
            baseMulHardNo = 0;
        }
        //examPanelWindow.down("#baseMulNo").value = baseMulEasyNo + baseMulMidNo + baseMulHardNo;
        //if (baseMulEasyNo + baseMulMidNo + baseMulHardNo != baseMulNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类多选题的个数错误！');
        //}
        //专业类判断题
        //判断题个数
        var judgeNo = examPanelWindow.down("#judgeNo").getValue();
        if (judgeNo != "") {
            judgeNo = parseInt(judgeNo);
        } else {
            judgeNo = 0;
        }
        //判断题单个分值
        var judgeScore = examPanelWindow.down("#judgeScore").getValue();
        if (judgeScore != "") {
            judgeScore = parseInt(judgeScore);
        } else {
            judgeScore = 0;
        }
        //判断题容易
        var judgeEasyNo = examPanelWindow.down("#judgeEasyNo").getValue();
        if (judgeEasyNo != "") {
            judgeEasyNo = parseInt(judgeEasyNo);
        } else {
            judgeEasyNo = 0;
        }
        //判断题一般
        var judgeMidNo = examPanelWindow.down("#judgeMidNo").getValue();
        if (judgeMidNo != "") {
            judgeMidNo = parseInt(judgeMidNo);
        } else {
            judgeMidNo = 0;
        }
        //判断题困难
        var judgeHardNo = examPanelWindow.down("#judgeHardNo").getValue();
        if (judgeHardNo != "") {
            judgeHardNo = parseInt(judgeHardNo);
        } else {
            judgeHardNo = 0;
        }
        //examPanelWindow.down("#judgeNo").value = judgeEasyNo + judgeMidNo + judgeHardNo;
        //if (judgeEasyNo + judgeMidNo + judgeHardNo != judgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类判断题的个数错误！');
        //}
        //专业类单选题
        //单选个数
        var singleNo = examPanelWindow.down("#singleNo").getValue();
        if (singleNo != "") {
            singleNo = parseInt(singleNo);
        } else {
            singleNo = 0;
        }
        //单选单个分值
        var singleScore = examPanelWindow.down("#singleScore").getValue();
        if (singleScore != "") {
            singleScore = parseInt(singleScore);
        } else {
            singleScore = 0;
        }
        //单选容易
        var singleEasyNo = examPanelWindow.down("#singleEasyNo").getValue();
        if (singleEasyNo != "") {
            singleEasyNo = parseInt(singleEasyNo);
        } else {
            singleEasyNo = 0;
        }
        //单选一般
        var singleMidNo = examPanelWindow.down("#singleMidNo").getValue();
        if (singleMidNo != "") {
            singleMidNo = parseInt(singleMidNo);
        } else {
            singleMidNo = 0;
        }
        //单选困难
        var singleHardNo = examPanelWindow.down("#singleHardNo").getValue();
        if (singleHardNo != "") {
            singleHardNo = parseInt(singleHardNo);
        } else {
            singleHardNo = 0;
        }
        //examPanelWindow.down("#singleNo").value = singleEasyNo + singleMidNo + singleHardNo;
        //if (singleEasyNo + singleMidNo + singleHardNo != singleNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类单选题的个数错误！');
        //}
        //专业类多选题
        var mulNo = examPanelWindow.down("#mulNo").getValue();
        if (mulNo != "") {
            mulNo = parseInt(mulNo);
        } else {
            mulNo = 0;
        }
        //专业类多选题单个分值
        var mulScore = examPanelWindow.down("#mulScore").getValue();
        if (mulScore != "") {
            mulScore = parseInt(mulScore);
        } else {
            mulScore = 0;
        }
        //专业类多选题容易
        var mulEasyNo = examPanelWindow.down("#mulEasyNo").getValue();
        if (mulEasyNo != "") {
            mulEasyNo = parseInt(mulEasyNo);
        } else {
            mulEasyNo = 0;
        }
        //专业类多选题一般
        var mulMidNo = examPanelWindow.down("#mulMidNo").getValue();
        if (mulMidNo != "") {
            mulMidNo = parseInt(mulMidNo);
        } else {
            mulMidNo = 0;
        }
        //专业类多选题困难
        var mulHardNo = examPanelWindow.down("#mulHardNo").getValue();
        if (mulHardNo != "") {
            mulHardNo = parseInt(mulHardNo);
        } else {
            mulHardNo = 0;
        }
        //examPanelWindow.down("#mulNo").value = mulEasyNo + mulMidNo + mulHardNo;
        //if (mulEasyNo + mulMidNo + mulHardNo != mulNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类多选题的个数错误！');
        //}
        //总分
        var totalScore = examPanelWindow.down("#totalScore").getValue();
        if (totalScore != "") {
            totalScore = parseInt(totalScore);
        } else {
            totalScore = 0;
        }
        totalScore = baseJudgeNo * baseJudgeScore + baseSingleNo * baseSingleScore + baseMulNo * baseMulScore + judgeNo * judgeScore + singleNo * singleScore + mulNo * mulScore;
        var totalScore = examPanelWindow.down("#totalScore").setValue(totalScore);
    },
    onBlurSingleNo: function (me, record, dasda) {
        //基础类判断题
        var examPanelWindow = me.up("#examPanelWindow");
        var form = examPanelWindow.down('#examPanelForm');
        var baseJudgeNo = examPanelWindow.down("#baseJudgeNo").getValue();
        if (baseJudgeNo != "") {
            baseJudgeNo = parseInt(baseJudgeNo);
        } else {
            baseJudgeNo = 0;
        }
        var baseJudgeScore = examPanelWindow.down("#baseJudgeScore").getValue();
        if (baseJudgeScore != "") {
            baseJudgeScore = parseInt(baseJudgeScore);
        } else {
            baseJudgeScore = 0;
        }
        var baseJudgeEasyNo = examPanelWindow.down("#baseJudgeEasyNo").getValue();
        if (baseJudgeEasyNo != "") {
            baseJudgeEasyNo = parseInt(baseJudgeEasyNo);
        } else {
            baseJudgeEasyNo = 0;
        }
        var baseJudgeMidNo = examPanelWindow.down("#baseJudgeMidNo").getValue();
        if (baseJudgeMidNo != "") {
            baseJudgeMidNo = parseInt(baseJudgeMidNo);
        } else {
            baseJudgeMidNo = 0;
        }
        var baseJudgeHardNo = examPanelWindow.down("#baseJudgeHardNo").getValue();
        if (baseJudgeHardNo != "") {
            baseJudgeHardNo = parseInt(baseJudgeHardNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //examPanelWindow.down("#baseJudgeNo").value = baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo;
        //if (baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo != baseJudgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类判断题的个数错误！');
        //}
        //基础类单选题
        //单选题个数
        var baseSingleNo = examPanelWindow.down("#baseSingleNo").getValue();
        if (baseSingleNo != "") {
            baseSingleNo = parseInt(baseSingleNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //单选题单个分值
        var baseSingleScore = examPanelWindow.down("#baseSingleScore").getValue();
        if (baseSingleScore != "") {
            baseSingleScore = parseInt(baseSingleScore);
        } else {
            baseSingleScore = 0;
        }
        //单选题容易数
        var baseSingleEasyNo = examPanelWindow.down("#baseSingleEasyNo").getValue();
        if (baseSingleEasyNo != "") {
            baseSingleEasyNo = parseInt(baseSingleEasyNo);
        } else {
            baseSingleEasyNo = 0;
        }
        //单选题难度一般数
        var baseSingleMidNo = examPanelWindow.down("#baseSingleMidNo").getValue();
        if (baseSingleMidNo != "") {
            baseSingleMidNo = parseInt(baseSingleMidNo);
        } else {
            baseSingleMidNo = 0;
        }
        //单选题难度困难数
        var baseSingleHardNo = examPanelWindow.down("#baseSingleHardNo").getValue();
        if (baseSingleHardNo != "") {
            baseSingleHardNo = parseInt(baseSingleHardNo);
        } else {
            baseSingleHardNo = 0;
        }
        //examPanelWindow.down("#baseSingleNo").value = baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo;
        //if (baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo != baseSingleNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类单选题的个数错误！');
        //}
        //基础类多选题
        //多选题个数
        var baseMulNo = examPanelWindow.down("#baseMulNo").getValue();
        //   alert(baseMulNo);
        if (baseMulNo != "") {
            baseMulNo = parseInt(baseMulNo);
        } else {
            baseMulNo = 0;
        }
        //多选题单个分值
        var baseMulScore = examPanelWindow.down("#baseMulScore").getValue();
        if (baseMulScore != "") {
            baseMulScore = parseInt(baseMulScore);
        } else {
            baseMulScore = 0;
        }
        //多选题容易
        var baseMulEasyNo = examPanelWindow.down("#baseMulEasyNo").getValue();
        if (baseMulEasyNo != "") {
            baseMulEasyNo = parseInt(baseMulEasyNo);
        } else {
            baseMulEasyNo = 0;
        }
        //多选题一般
        var baseMulMidNo = examPanelWindow.down("#baseMulMidNo").getValue();
        if (baseMulMidNo != "") {
            baseMulMidNo = parseInt(baseMulMidNo);
        } else {
            baseMulMidNo = 0;
        }
        //多选题困难
        var baseMulHardNo = examPanelWindow.down("#baseMulHardNo").getValue();
        if (baseMulHardNo != "") {
            baseMulHardNo = parseInt(baseMulHardNo);
        } else {
            baseMulHardNo = 0;
        }
        //examPanelWindow.down("#baseMulNo").value = baseMulEasyNo + baseMulMidNo + baseMulHardNo;
        //if (baseMulEasyNo + baseMulMidNo + baseMulHardNo != baseMulNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类多选题的个数错误！');
        //}
        //专业类判断题
        //判断题个数
        var judgeNo = examPanelWindow.down("#judgeNo").getValue();
        if (judgeNo != "") {
            judgeNo = parseInt(judgeNo);
        } else {
            judgeNo = 0;
        }
        //判断题单个分值
        var judgeScore = examPanelWindow.down("#judgeScore").getValue();
        if (judgeScore != "") {
            judgeScore = parseInt(judgeScore);
        } else {
            judgeScore = 0;
        }
        //判断题容易
        var judgeEasyNo = examPanelWindow.down("#judgeEasyNo").getValue();
        if (judgeEasyNo != "") {
            judgeEasyNo = parseInt(judgeEasyNo);
        } else {
            judgeEasyNo = 0;
        }
        //判断题一般
        var judgeMidNo = examPanelWindow.down("#judgeMidNo").getValue();
        if (judgeMidNo != "") {
            judgeMidNo = parseInt(judgeMidNo);
        } else {
            judgeMidNo = 0;
        }
        //判断题困难
        var judgeHardNo = examPanelWindow.down("#judgeHardNo").getValue();
        if (judgeHardNo != "") {
            judgeHardNo = parseInt(judgeHardNo);
        } else {
            judgeHardNo = 0;
        }
        //examPanelWindow.down("#judgeNo").value = judgeEasyNo + judgeMidNo + judgeHardNo;
        //if (judgeEasyNo + judgeMidNo + judgeHardNo != judgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类判断题的个数错误！');
        //}
        //专业类单选题
        //单选个数
        var singleNo = examPanelWindow.down("#singleNo").getValue();
        if (singleNo != "") {
            singleNo = parseInt(singleNo);
        } else {
            singleNo = 0;
        }
        //单选单个分值
        var singleScore = examPanelWindow.down("#singleScore").getValue();
        if (singleScore != "") {
            singleScore = parseInt(singleScore);
        } else {
            singleScore = 0;
        }
        //单选容易
        var singleEasyNo = examPanelWindow.down("#singleEasyNo").getValue();
        if (singleEasyNo != "") {
            singleEasyNo = parseInt(singleEasyNo);
        } else {
            singleEasyNo = 0;
        }
        //单选一般
        var singleMidNo = examPanelWindow.down("#singleMidNo").getValue();
        if (singleMidNo != "") {
            singleMidNo = parseInt(singleMidNo);
        } else {
            singleMidNo = 0;
        }
        //单选困难
        var singleHardNo = examPanelWindow.down("#singleHardNo").getValue();
        if (singleHardNo != "") {
            singleHardNo = parseInt(singleHardNo);
        } else {
            singleHardNo = 0;
        }
        //examPanelWindow.down("#singleNo").value = singleEasyNo + singleMidNo + singleHardNo;
        //if (singleEasyNo + singleMidNo + singleHardNo != singleNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类单选题的个数错误！');
        //}
        //专业类多选题
        var mulNo = examPanelWindow.down("#mulNo").getValue();
        if (mulNo != "") {
            mulNo = parseInt(mulNo);
        } else {
            mulNo = 0;
        }
        //专业类多选题单个分值
        var mulScore = examPanelWindow.down("#mulScore").getValue();
        if (mulScore != "") {
            mulScore = parseInt(mulScore);
        } else {
            mulScore = 0;
        }
        //专业类多选题容易
        var mulEasyNo = examPanelWindow.down("#mulEasyNo").getValue();
        if (mulEasyNo != "") {
            mulEasyNo = parseInt(mulEasyNo);
        } else {
            mulEasyNo = 0;
        }
        //专业类多选题一般
        var mulMidNo = examPanelWindow.down("#mulMidNo").getValue();
        if (mulMidNo != "") {
            mulMidNo = parseInt(mulMidNo);
        } else {
            mulMidNo = 0;
        }
        //专业类多选题困难
        var mulHardNo = examPanelWindow.down("#mulHardNo").getValue();
        if (mulHardNo != "") {
            mulHardNo = parseInt(mulHardNo);
        } else {
            mulHardNo = 0;
        }
        //examPanelWindow.down("#mulNo").value = mulEasyNo + mulMidNo + mulHardNo;
        //if (mulEasyNo + mulMidNo + mulHardNo != mulNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类多选题的个数错误！');
        //}
        //总分
        var totalScore = examPanelWindow.down("#totalScore").getValue();
        if (totalScore != "") {
            totalScore = parseInt(totalScore);
        } else {
            totalScore = 0;
        }
        totalScore = baseJudgeNo * baseJudgeScore + baseSingleNo * baseSingleScore + baseMulNo * baseMulScore + judgeNo * judgeScore + singleNo * singleScore + mulNo * mulScore;
        var totalScore = examPanelWindow.down("#totalScore").setValue(totalScore);
    },
    onBlurSingleScore: function (me, record, dasda) {
        //基础类判断题
        var examPanelWindow = me.up("#examPanelWindow");
        var form = examPanelWindow.down('#examPanelForm');
        var baseJudgeNo = examPanelWindow.down("#baseJudgeNo").getValue();
        if (baseJudgeNo != "") {
            baseJudgeNo = parseInt(baseJudgeNo);
        } else {
            baseJudgeNo = 0;
        }
        var baseJudgeScore = examPanelWindow.down("#baseJudgeScore").getValue();
        if (baseJudgeScore != "") {
            baseJudgeScore = parseInt(baseJudgeScore);
        } else {
            baseJudgeScore = 0;
        }
        var baseJudgeEasyNo = examPanelWindow.down("#baseJudgeEasyNo").getValue();
        if (baseJudgeEasyNo != "") {
            baseJudgeEasyNo = parseInt(baseJudgeEasyNo);
        } else {
            baseJudgeEasyNo = 0;
        }
        var baseJudgeMidNo = examPanelWindow.down("#baseJudgeMidNo").getValue();
        if (baseJudgeMidNo != "") {
            baseJudgeMidNo = parseInt(baseJudgeMidNo);
        } else {
            baseJudgeMidNo = 0;
        }
        var baseJudgeHardNo = examPanelWindow.down("#baseJudgeHardNo").getValue();
        if (baseJudgeHardNo != "") {
            baseJudgeHardNo = parseInt(baseJudgeHardNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //examPanelWindow.down("#baseJudgeNo").value = baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo;
        //if (baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo != baseJudgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类判断题的个数错误！');
        //}
        //基础类单选题
        //单选题个数
        var baseSingleNo = examPanelWindow.down("#baseSingleNo").getValue();
        if (baseSingleNo != "") {
            baseSingleNo = parseInt(baseSingleNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //单选题单个分值
        var baseSingleScore = examPanelWindow.down("#baseSingleScore").getValue();
        if (baseSingleScore != "") {
            baseSingleScore = parseInt(baseSingleScore);
        } else {
            baseSingleScore = 0;
        }
        //单选题容易数
        var baseSingleEasyNo = examPanelWindow.down("#baseSingleEasyNo").getValue();
        if (baseSingleEasyNo != "") {
            baseSingleEasyNo = parseInt(baseSingleEasyNo);
        } else {
            baseSingleEasyNo = 0;
        }
        //单选题难度一般数
        var baseSingleMidNo = examPanelWindow.down("#baseSingleMidNo").getValue();
        if (baseSingleMidNo != "") {
            baseSingleMidNo = parseInt(baseSingleMidNo);
        } else {
            baseSingleMidNo = 0;
        }
        //单选题难度困难数
        var baseSingleHardNo = examPanelWindow.down("#baseSingleHardNo").getValue();
        if (baseSingleHardNo != "") {
            baseSingleHardNo = parseInt(baseSingleHardNo);
        } else {
            baseSingleHardNo = 0;
        }
        //examPanelWindow.down("#baseSingleNo").value = baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo;
        //if (baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo != baseSingleNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类单选题的个数错误！');
        //}
        //基础类多选题
        //多选题个数
        var baseMulNo = examPanelWindow.down("#baseMulNo").getValue();
        //   alert(baseMulNo);
        if (baseMulNo != "") {
            baseMulNo = parseInt(baseMulNo);
        } else {
            baseMulNo = 0;
        }
        //多选题单个分值
        var baseMulScore = examPanelWindow.down("#baseMulScore").getValue();
        if (baseMulScore != "") {
            baseMulScore = parseInt(baseMulScore);
        } else {
            baseMulScore = 0;
        }
        //多选题容易
        var baseMulEasyNo = examPanelWindow.down("#baseMulEasyNo").getValue();
        if (baseMulEasyNo != "") {
            baseMulEasyNo = parseInt(baseMulEasyNo);
        } else {
            baseMulEasyNo = 0;
        }
        //多选题一般
        var baseMulMidNo = examPanelWindow.down("#baseMulMidNo").getValue();
        if (baseMulMidNo != "") {
            baseMulMidNo = parseInt(baseMulMidNo);
        } else {
            baseMulMidNo = 0;
        }
        //多选题困难
        var baseMulHardNo = examPanelWindow.down("#baseMulHardNo").getValue();
        if (baseMulHardNo != "") {
            baseMulHardNo = parseInt(baseMulHardNo);
        } else {
            baseMulHardNo = 0;
        }
        //examPanelWindow.down("#baseMulNo").value = baseMulEasyNo + baseMulMidNo + baseMulHardNo;
        //if (baseMulEasyNo + baseMulMidNo + baseMulHardNo != baseMulNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类多选题的个数错误！');
        //}
        //专业类判断题
        //判断题个数
        var judgeNo = examPanelWindow.down("#judgeNo").getValue();
        if (judgeNo != "") {
            judgeNo = parseInt(judgeNo);
        } else {
            judgeNo = 0;
        }
        //判断题单个分值
        var judgeScore = examPanelWindow.down("#judgeScore").getValue();
        if (judgeScore != "") {
            judgeScore = parseInt(judgeScore);
        } else {
            judgeScore = 0;
        }
        //判断题容易
        var judgeEasyNo = examPanelWindow.down("#judgeEasyNo").getValue();
        if (judgeEasyNo != "") {
            judgeEasyNo = parseInt(judgeEasyNo);
        } else {
            judgeEasyNo = 0;
        }
        //判断题一般
        var judgeMidNo = examPanelWindow.down("#judgeMidNo").getValue();
        if (judgeMidNo != "") {
            judgeMidNo = parseInt(judgeMidNo);
        } else {
            judgeMidNo = 0;
        }
        //判断题困难
        var judgeHardNo = examPanelWindow.down("#judgeHardNo").getValue();
        if (judgeHardNo != "") {
            judgeHardNo = parseInt(judgeHardNo);
        } else {
            judgeHardNo = 0;
        }
        //examPanelWindow.down("#judgeNo").value = judgeEasyNo + judgeMidNo + judgeHardNo;
        //if (judgeEasyNo + judgeMidNo + judgeHardNo != judgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类判断题的个数错误！');
        //}
        //专业类单选题
        //单选个数
        var singleNo = examPanelWindow.down("#singleNo").getValue();
        if (singleNo != "") {
            singleNo = parseInt(singleNo);
        } else {
            singleNo = 0;
        }
        //单选单个分值
        var singleScore = examPanelWindow.down("#singleScore").getValue();
        if (singleScore != "") {
            singleScore = parseInt(singleScore);
        } else {
            singleScore = 0;
        }
        //单选容易
        var singleEasyNo = examPanelWindow.down("#singleEasyNo").getValue();
        if (singleEasyNo != "") {
            singleEasyNo = parseInt(singleEasyNo);
        } else {
            singleEasyNo = 0;
        }
        //单选一般
        var singleMidNo = examPanelWindow.down("#singleMidNo").getValue();
        if (singleMidNo != "") {
            singleMidNo = parseInt(singleMidNo);
        } else {
            singleMidNo = 0;
        }
        //单选困难
        var singleHardNo = examPanelWindow.down("#singleHardNo").getValue();
        if (singleHardNo != "") {
            singleHardNo = parseInt(singleHardNo);
        } else {
            singleHardNo = 0;
        }
        //examPanelWindow.down("#singleNo").value = singleEasyNo + singleMidNo + singleHardNo;
        //if (singleEasyNo + singleMidNo + singleHardNo != singleNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类单选题的个数错误！');
        //}
        //专业类多选题
        var mulNo = examPanelWindow.down("#mulNo").getValue();
        if (mulNo != "") {
            mulNo = parseInt(mulNo);
        } else {
            mulNo = 0;
        }
        //专业类多选题单个分值
        var mulScore = examPanelWindow.down("#mulScore").getValue();
        if (mulScore != "") {
            mulScore = parseInt(mulScore);
        } else {
            mulScore = 0;
        }
        //专业类多选题容易
        var mulEasyNo = examPanelWindow.down("#mulEasyNo").getValue();
        if (mulEasyNo != "") {
            mulEasyNo = parseInt(mulEasyNo);
        } else {
            mulEasyNo = 0;
        }
        //专业类多选题一般
        var mulMidNo = examPanelWindow.down("#mulMidNo").getValue();
        if (mulMidNo != "") {
            mulMidNo = parseInt(mulMidNo);
        } else {
            mulMidNo = 0;
        }
        //专业类多选题困难
        var mulHardNo = examPanelWindow.down("#mulHardNo").getValue();
        if (mulHardNo != "") {
            mulHardNo = parseInt(mulHardNo);
        } else {
            mulHardNo = 0;
        }
        //examPanelWindow.down("#mulNo").value = mulEasyNo + mulMidNo + mulHardNo;
        //if (mulEasyNo + mulMidNo + mulHardNo != mulNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类多选题的个数错误！');
        //}
        //总分
        var totalScore = examPanelWindow.down("#totalScore").getValue();
        if (totalScore != "") {
            totalScore = parseInt(totalScore);
        } else {
            totalScore = 0;
        }
        totalScore = baseJudgeNo * baseJudgeScore + baseSingleNo * baseSingleScore + baseMulNo * baseMulScore + judgeNo * judgeScore + singleNo * singleScore + mulNo * mulScore;
        var totalScore = examPanelWindow.down("#totalScore").setValue(totalScore);
    },
    onBlurBaseMulNo: function (me, record, dasda) {
        //基础类判断题
        var examPanelWindow = me.up("#examPanelWindow");
        var form = examPanelWindow.down('#examPanelForm');
        var baseJudgeNo = examPanelWindow.down("#baseJudgeNo").getValue();
        if (baseJudgeNo != "") {
            baseJudgeNo = parseInt(baseJudgeNo);
        } else {
            baseJudgeNo = 0;
        }
        var baseJudgeScore = examPanelWindow.down("#baseJudgeScore").getValue();
        if (baseJudgeScore != "") {
            baseJudgeScore = parseInt(baseJudgeScore);
        } else {
            baseJudgeScore = 0;
        }
        var baseJudgeEasyNo = examPanelWindow.down("#baseJudgeEasyNo").getValue();
        if (baseJudgeEasyNo != "") {
            baseJudgeEasyNo = parseInt(baseJudgeEasyNo);
        } else {
            baseJudgeEasyNo = 0;
        }
        var baseJudgeMidNo = examPanelWindow.down("#baseJudgeMidNo").getValue();
        if (baseJudgeMidNo != "") {
            baseJudgeMidNo = parseInt(baseJudgeMidNo);
        } else {
            baseJudgeMidNo = 0;
        }
        var baseJudgeHardNo = examPanelWindow.down("#baseJudgeHardNo").getValue();
        if (baseJudgeHardNo != "") {
            baseJudgeHardNo = parseInt(baseJudgeHardNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //examPanelWindow.down("#baseJudgeNo").value = baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo;
        //if (baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo != baseJudgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类判断题的个数错误！');
        //}
        //基础类单选题
        //单选题个数
        var baseSingleNo = examPanelWindow.down("#baseSingleNo").getValue();
        if (baseSingleNo != "") {
            baseSingleNo = parseInt(baseSingleNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //单选题单个分值
        var baseSingleScore = examPanelWindow.down("#baseSingleScore").getValue();
        if (baseSingleScore != "") {
            baseSingleScore = parseInt(baseSingleScore);
        } else {
            baseSingleScore = 0;
        }
        //单选题容易数
        var baseSingleEasyNo = examPanelWindow.down("#baseSingleEasyNo").getValue();
        if (baseSingleEasyNo != "") {
            baseSingleEasyNo = parseInt(baseSingleEasyNo);
        } else {
            baseSingleEasyNo = 0;
        }
        //单选题难度一般数
        var baseSingleMidNo = examPanelWindow.down("#baseSingleMidNo").getValue();
        if (baseSingleMidNo != "") {
            baseSingleMidNo = parseInt(baseSingleMidNo);
        } else {
            baseSingleMidNo = 0;
        }
        //单选题难度困难数
        var baseSingleHardNo = examPanelWindow.down("#baseSingleHardNo").getValue();
        if (baseSingleHardNo != "") {
            baseSingleHardNo = parseInt(baseSingleHardNo);
        } else {
            baseSingleHardNo = 0;
        }
        //examPanelWindow.down("#baseSingleNo").value = baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo;
        //if (baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo != baseSingleNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类单选题的个数错误！');
        //}
        //基础类多选题
        //多选题个数
        var baseMulNo = examPanelWindow.down("#baseMulNo").getValue();
        //   alert(baseMulNo);
        if (baseMulNo != "") {
            baseMulNo = parseInt(baseMulNo);
        } else {
            baseMulNo = 0;
        }
        //多选题单个分值
        var baseMulScore = examPanelWindow.down("#baseMulScore").getValue();
        if (baseMulScore != "") {
            baseMulScore = parseInt(baseMulScore);
        } else {
            baseMulScore = 0;
        }
        //多选题容易
        var baseMulEasyNo = examPanelWindow.down("#baseMulEasyNo").getValue();
        if (baseMulEasyNo != "") {
            baseMulEasyNo = parseInt(baseMulEasyNo);
        } else {
            baseMulEasyNo = 0;
        }
        //多选题一般
        var baseMulMidNo = examPanelWindow.down("#baseMulMidNo").getValue();
        if (baseMulMidNo != "") {
            baseMulMidNo = parseInt(baseMulMidNo);
        } else {
            baseMulMidNo = 0;
        }
        //多选题困难
        var baseMulHardNo = examPanelWindow.down("#baseMulHardNo").getValue();
        if (baseMulHardNo != "") {
            baseMulHardNo = parseInt(baseMulHardNo);
        } else {
            baseMulHardNo = 0;
        }
        //examPanelWindow.down("#baseMulNo").value = baseMulEasyNo + baseMulMidNo + baseMulHardNo;
        //if (baseMulEasyNo + baseMulMidNo + baseMulHardNo != baseMulNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类多选题的个数错误！');
        //}
        //专业类判断题
        //判断题个数
        var judgeNo = examPanelWindow.down("#judgeNo").getValue();
        if (judgeNo != "") {
            judgeNo = parseInt(judgeNo);
        } else {
            judgeNo = 0;
        }
        //判断题单个分值
        var judgeScore = examPanelWindow.down("#judgeScore").getValue();
        if (judgeScore != "") {
            judgeScore = parseInt(judgeScore);
        } else {
            judgeScore = 0;
        }
        //判断题容易
        var judgeEasyNo = examPanelWindow.down("#judgeEasyNo").getValue();
        if (judgeEasyNo != "") {
            judgeEasyNo = parseInt(judgeEasyNo);
        } else {
            judgeEasyNo = 0;
        }
        //判断题一般
        var judgeMidNo = examPanelWindow.down("#judgeMidNo").getValue();
        if (judgeMidNo != "") {
            judgeMidNo = parseInt(judgeMidNo);
        } else {
            judgeMidNo = 0;
        }
        //判断题困难
        var judgeHardNo = examPanelWindow.down("#judgeHardNo").getValue();
        if (judgeHardNo != "") {
            judgeHardNo = parseInt(judgeHardNo);
        } else {
            judgeHardNo = 0;
        }
        //examPanelWindow.down("#judgeNo").value = judgeEasyNo + judgeMidNo + judgeHardNo;
        //if (judgeEasyNo + judgeMidNo + judgeHardNo != judgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类判断题的个数错误！');
        //}
        //专业类单选题
        //单选个数
        var singleNo = examPanelWindow.down("#singleNo").getValue();
        if (singleNo != "") {
            singleNo = parseInt(singleNo);
        } else {
            singleNo = 0;
        }
        //单选单个分值
        var singleScore = examPanelWindow.down("#singleScore").getValue();
        if (singleScore != "") {
            singleScore = parseInt(singleScore);
        } else {
            singleScore = 0;
        }
        //单选容易
        var singleEasyNo = examPanelWindow.down("#singleEasyNo").getValue();
        if (singleEasyNo != "") {
            singleEasyNo = parseInt(singleEasyNo);
        } else {
            singleEasyNo = 0;
        }
        //单选一般
        var singleMidNo = examPanelWindow.down("#singleMidNo").getValue();
        if (singleMidNo != "") {
            singleMidNo = parseInt(singleMidNo);
        } else {
            singleMidNo = 0;
        }
        //单选困难
        var singleHardNo = examPanelWindow.down("#singleHardNo").getValue();
        if (singleHardNo != "") {
            singleHardNo = parseInt(singleHardNo);
        } else {
            singleHardNo = 0;
        }
        //examPanelWindow.down("#singleNo").value = singleEasyNo + singleMidNo + singleHardNo;
        //if (singleEasyNo + singleMidNo + singleHardNo != singleNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类单选题的个数错误！');
        //}
        //专业类多选题
        var mulNo = examPanelWindow.down("#mulNo").getValue();
        if (mulNo != "") {
            mulNo = parseInt(mulNo);
        } else {
            mulNo = 0;
        }
        //专业类多选题单个分值
        var mulScore = examPanelWindow.down("#mulScore").getValue();
        if (mulScore != "") {
            mulScore = parseInt(mulScore);
        } else {
            mulScore = 0;
        }
        //专业类多选题容易
        var mulEasyNo = examPanelWindow.down("#mulEasyNo").getValue();
        if (mulEasyNo != "") {
            mulEasyNo = parseInt(mulEasyNo);
        } else {
            mulEasyNo = 0;
        }
        //专业类多选题一般
        var mulMidNo = examPanelWindow.down("#mulMidNo").getValue();
        if (mulMidNo != "") {
            mulMidNo = parseInt(mulMidNo);
        } else {
            mulMidNo = 0;
        }
        //专业类多选题困难
        var mulHardNo = examPanelWindow.down("#mulHardNo").getValue();
        if (mulHardNo != "") {
            mulHardNo = parseInt(mulHardNo);
        } else {
            mulHardNo = 0;
        }
        //examPanelWindow.down("#mulNo").value = mulEasyNo + mulMidNo + mulHardNo;
        //if (mulEasyNo + mulMidNo + mulHardNo != mulNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类多选题的个数错误！');
        //}
        //总分
        var totalScore = examPanelWindow.down("#totalScore").getValue();
        if (totalScore != "") {
            totalScore = parseInt(totalScore);
        } else {
            totalScore = 0;
        }
        totalScore = baseJudgeNo * baseJudgeScore + baseSingleNo * baseSingleScore + baseMulNo * baseMulScore + judgeNo * judgeScore + singleNo * singleScore + mulNo * mulScore;
        var totalScore = examPanelWindow.down("#totalScore").setValue(totalScore);
    },
    onBlurBaseMulScore: function (me, record, dasda) {
        //基础类判断题
        var examPanelWindow = me.up("#examPanelWindow");
        var form = examPanelWindow.down('#examPanelForm');
        var baseJudgeNo = examPanelWindow.down("#baseJudgeNo").getValue();
        if (baseJudgeNo != "") {
            baseJudgeNo = parseInt(baseJudgeNo);
        } else {
            baseJudgeNo = 0;
        }
        var baseJudgeScore = examPanelWindow.down("#baseJudgeScore").getValue();
        if (baseJudgeScore != "") {
            baseJudgeScore = parseInt(baseJudgeScore);
        } else {
            baseJudgeScore = 0;
        }
        var baseJudgeEasyNo = examPanelWindow.down("#baseJudgeEasyNo").getValue();
        if (baseJudgeEasyNo != "") {
            baseJudgeEasyNo = parseInt(baseJudgeEasyNo);
        } else {
            baseJudgeEasyNo = 0;
        }
        var baseJudgeMidNo = examPanelWindow.down("#baseJudgeMidNo").getValue();
        if (baseJudgeMidNo != "") {
            baseJudgeMidNo = parseInt(baseJudgeMidNo);
        } else {
            baseJudgeMidNo = 0;
        }
        var baseJudgeHardNo = examPanelWindow.down("#baseJudgeHardNo").getValue();
        if (baseJudgeHardNo != "") {
            baseJudgeHardNo = parseInt(baseJudgeHardNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //examPanelWindow.down("#baseJudgeNo").value = baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo;
        //if (baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo != baseJudgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类判断题的个数错误！');
        //}
        //基础类单选题
        //单选题个数
        var baseSingleNo = examPanelWindow.down("#baseSingleNo").getValue();
        if (baseSingleNo != "") {
            baseSingleNo = parseInt(baseSingleNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //单选题单个分值
        var baseSingleScore = examPanelWindow.down("#baseSingleScore").getValue();
        if (baseSingleScore != "") {
            baseSingleScore = parseInt(baseSingleScore);
        } else {
            baseSingleScore = 0;
        }
        //单选题容易数
        var baseSingleEasyNo = examPanelWindow.down("#baseSingleEasyNo").getValue();
        if (baseSingleEasyNo != "") {
            baseSingleEasyNo = parseInt(baseSingleEasyNo);
        } else {
            baseSingleEasyNo = 0;
        }
        //单选题难度一般数
        var baseSingleMidNo = examPanelWindow.down("#baseSingleMidNo").getValue();
        if (baseSingleMidNo != "") {
            baseSingleMidNo = parseInt(baseSingleMidNo);
        } else {
            baseSingleMidNo = 0;
        }
        //单选题难度困难数
        var baseSingleHardNo = examPanelWindow.down("#baseSingleHardNo").getValue();
        if (baseSingleHardNo != "") {
            baseSingleHardNo = parseInt(baseSingleHardNo);
        } else {
            baseSingleHardNo = 0;
        }
        //examPanelWindow.down("#baseSingleNo").value = baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo;
        //if (baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo != baseSingleNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类单选题的个数错误！');
        //}
        //基础类多选题
        //多选题个数
        var baseMulNo = examPanelWindow.down("#baseMulNo").getValue();
        //   alert(baseMulNo);
        if (baseMulNo != "") {
            baseMulNo = parseInt(baseMulNo);
        } else {
            baseMulNo = 0;
        }
        //多选题单个分值
        var baseMulScore = examPanelWindow.down("#baseMulScore").getValue();
        if (baseMulScore != "") {
            baseMulScore = parseInt(baseMulScore);
        } else {
            baseMulScore = 0;
        }
        //多选题容易
        var baseMulEasyNo = examPanelWindow.down("#baseMulEasyNo").getValue();
        if (baseMulEasyNo != "") {
            baseMulEasyNo = parseInt(baseMulEasyNo);
        } else {
            baseMulEasyNo = 0;
        }
        //多选题一般
        var baseMulMidNo = examPanelWindow.down("#baseMulMidNo").getValue();
        if (baseMulMidNo != "") {
            baseMulMidNo = parseInt(baseMulMidNo);
        } else {
            baseMulMidNo = 0;
        }
        //多选题困难
        var baseMulHardNo = examPanelWindow.down("#baseMulHardNo").getValue();
        if (baseMulHardNo != "") {
            baseMulHardNo = parseInt(baseMulHardNo);
        } else {
            baseMulHardNo = 0;
        }
        //examPanelWindow.down("#baseMulNo").value = baseMulEasyNo + baseMulMidNo + baseMulHardNo;
        //if (baseMulEasyNo + baseMulMidNo + baseMulHardNo != baseMulNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类多选题的个数错误！');
        //}
        //专业类判断题
        //判断题个数
        var judgeNo = examPanelWindow.down("#judgeNo").getValue();
        if (judgeNo != "") {
            judgeNo = parseInt(judgeNo);
        } else {
            judgeNo = 0;
        }
        //判断题单个分值
        var judgeScore = examPanelWindow.down("#judgeScore").getValue();
        if (judgeScore != "") {
            judgeScore = parseInt(judgeScore);
        } else {
            judgeScore = 0;
        }
        //判断题容易
        var judgeEasyNo = examPanelWindow.down("#judgeEasyNo").getValue();
        if (judgeEasyNo != "") {
            judgeEasyNo = parseInt(judgeEasyNo);
        } else {
            judgeEasyNo = 0;
        }
        //判断题一般
        var judgeMidNo = examPanelWindow.down("#judgeMidNo").getValue();
        if (judgeMidNo != "") {
            judgeMidNo = parseInt(judgeMidNo);
        } else {
            judgeMidNo = 0;
        }
        //判断题困难
        var judgeHardNo = examPanelWindow.down("#judgeHardNo").getValue();
        if (judgeHardNo != "") {
            judgeHardNo = parseInt(judgeHardNo);
        } else {
            judgeHardNo = 0;
        }
        //examPanelWindow.down("#judgeNo").value = judgeEasyNo + judgeMidNo + judgeHardNo;
        //if (judgeEasyNo + judgeMidNo + judgeHardNo != judgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类判断题的个数错误！');
        //}
        //专业类单选题
        //单选个数
        var singleNo = examPanelWindow.down("#singleNo").getValue();
        if (singleNo != "") {
            singleNo = parseInt(singleNo);
        } else {
            singleNo = 0;
        }
        //单选单个分值
        var singleScore = examPanelWindow.down("#singleScore").getValue();
        if (singleScore != "") {
            singleScore = parseInt(singleScore);
        } else {
            singleScore = 0;
        }
        //单选容易
        var singleEasyNo = examPanelWindow.down("#singleEasyNo").getValue();
        if (singleEasyNo != "") {
            singleEasyNo = parseInt(singleEasyNo);
        } else {
            singleEasyNo = 0;
        }
        //单选一般
        var singleMidNo = examPanelWindow.down("#singleMidNo").getValue();
        if (singleMidNo != "") {
            singleMidNo = parseInt(singleMidNo);
        } else {
            singleMidNo = 0;
        }
        //单选困难
        var singleHardNo = examPanelWindow.down("#singleHardNo").getValue();
        if (singleHardNo != "") {
            singleHardNo = parseInt(singleHardNo);
        } else {
            singleHardNo = 0;
        }
        //examPanelWindow.down("#singleNo").value = singleEasyNo + singleMidNo + singleHardNo;
        //if (singleEasyNo + singleMidNo + singleHardNo != singleNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类单选题的个数错误！');
        //}
        //专业类多选题
        var mulNo = examPanelWindow.down("#mulNo").getValue();
        if (mulNo != "") {
            mulNo = parseInt(mulNo);
        } else {
            mulNo = 0;
        }
        //专业类多选题单个分值
        var mulScore = examPanelWindow.down("#mulScore").getValue();
        if (mulScore != "") {
            mulScore = parseInt(mulScore);
        } else {
            mulScore = 0;
        }
        //专业类多选题容易
        var mulEasyNo = examPanelWindow.down("#mulEasyNo").getValue();
        if (mulEasyNo != "") {
            mulEasyNo = parseInt(mulEasyNo);
        } else {
            mulEasyNo = 0;
        }
        //专业类多选题一般
        var mulMidNo = examPanelWindow.down("#mulMidNo").getValue();
        if (mulMidNo != "") {
            mulMidNo = parseInt(mulMidNo);
        } else {
            mulMidNo = 0;
        }
        //专业类多选题困难
        var mulHardNo = examPanelWindow.down("#mulHardNo").getValue();
        if (mulHardNo != "") {
            mulHardNo = parseInt(mulHardNo);
        } else {
            mulHardNo = 0;
        }
        //examPanelWindow.down("#mulNo").value = mulEasyNo + mulMidNo + mulHardNo;
        //if (mulEasyNo + mulMidNo + mulHardNo != mulNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类多选题的个数错误！');
        //}
        //总分
        var totalScore = examPanelWindow.down("#totalScore").getValue();
        if (totalScore != "") {
            totalScore = parseInt(totalScore);
        } else {
            totalScore = 0;
        }
        totalScore = baseJudgeNo * baseJudgeScore + baseSingleNo * baseSingleScore + baseMulNo * baseMulScore + judgeNo * judgeScore + singleNo * singleScore + mulNo * mulScore;
        var totalScore = examPanelWindow.down("#totalScore").setValue(totalScore);
    },
    onBlurjudgeNo: function (me, record, dasda) {
        //基础类判断题
        var examPanelWindow = me.up("#examPanelWindow");
        var form = examPanelWindow.down('#examPanelForm');
        var baseJudgeNo = examPanelWindow.down("#baseJudgeNo").getValue();
        if (baseJudgeNo != "") {
            baseJudgeNo = parseInt(baseJudgeNo);
        } else {
            baseJudgeNo = 0;
        }
        var baseJudgeScore = examPanelWindow.down("#baseJudgeScore").getValue();
        if (baseJudgeScore != "") {
            baseJudgeScore = parseInt(baseJudgeScore);
        } else {
            baseJudgeScore = 0;
        }
        var baseJudgeEasyNo = examPanelWindow.down("#baseJudgeEasyNo").getValue();
        if (baseJudgeEasyNo != "") {
            baseJudgeEasyNo = parseInt(baseJudgeEasyNo);
        } else {
            baseJudgeEasyNo = 0;
        }
        var baseJudgeMidNo = examPanelWindow.down("#baseJudgeMidNo").getValue();
        if (baseJudgeMidNo != "") {
            baseJudgeMidNo = parseInt(baseJudgeMidNo);
        } else {
            baseJudgeMidNo = 0;
        }
        var baseJudgeHardNo = examPanelWindow.down("#baseJudgeHardNo").getValue();
        if (baseJudgeHardNo != "") {
            baseJudgeHardNo = parseInt(baseJudgeHardNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //examPanelWindow.down("#baseJudgeNo").value = baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo;
        //if (baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo != baseJudgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类判断题的个数错误！');
        //}
        //基础类单选题
        //单选题个数
        var baseSingleNo = examPanelWindow.down("#baseSingleNo").getValue();
        if (baseSingleNo != "") {
            baseSingleNo = parseInt(baseSingleNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //单选题单个分值
        var baseSingleScore = examPanelWindow.down("#baseSingleScore").getValue();
        if (baseSingleScore != "") {
            baseSingleScore = parseInt(baseSingleScore);
        } else {
            baseSingleScore = 0;
        }
        //单选题容易数
        var baseSingleEasyNo = examPanelWindow.down("#baseSingleEasyNo").getValue();
        if (baseSingleEasyNo != "") {
            baseSingleEasyNo = parseInt(baseSingleEasyNo);
        } else {
            baseSingleEasyNo = 0;
        }
        //单选题难度一般数
        var baseSingleMidNo = examPanelWindow.down("#baseSingleMidNo").getValue();
        if (baseSingleMidNo != "") {
            baseSingleMidNo = parseInt(baseSingleMidNo);
        } else {
            baseSingleMidNo = 0;
        }
        //单选题难度困难数
        var baseSingleHardNo = examPanelWindow.down("#baseSingleHardNo").getValue();
        if (baseSingleHardNo != "") {
            baseSingleHardNo = parseInt(baseSingleHardNo);
        } else {
            baseSingleHardNo = 0;
        }
        //examPanelWindow.down("#baseSingleNo").value = baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo;
        //if (baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo != baseSingleNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类单选题的个数错误！');
        //}
        //基础类多选题
        //多选题个数
        var baseMulNo = examPanelWindow.down("#baseMulNo").getValue();
        //   alert(baseMulNo);
        if (baseMulNo != "") {
            baseMulNo = parseInt(baseMulNo);
        } else {
            baseMulNo = 0;
        }
        //多选题单个分值
        var baseMulScore = examPanelWindow.down("#baseMulScore").getValue();
        if (baseMulScore != "") {
            baseMulScore = parseInt(baseMulScore);
        } else {
            baseMulScore = 0;
        }
        //多选题容易
        var baseMulEasyNo = examPanelWindow.down("#baseMulEasyNo").getValue();
        if (baseMulEasyNo != "") {
            baseMulEasyNo = parseInt(baseMulEasyNo);
        } else {
            baseMulEasyNo = 0;
        }
        //多选题一般
        var baseMulMidNo = examPanelWindow.down("#baseMulMidNo").getValue();
        if (baseMulMidNo != "") {
            baseMulMidNo = parseInt(baseMulMidNo);
        } else {
            baseMulMidNo = 0;
        }
        //多选题困难
        var baseMulHardNo = examPanelWindow.down("#baseMulHardNo").getValue();
        if (baseMulHardNo != "") {
            baseMulHardNo = parseInt(baseMulHardNo);
        } else {
            baseMulHardNo = 0;
        }
        //examPanelWindow.down("#baseMulNo").value = baseMulEasyNo + baseMulMidNo + baseMulHardNo;
        //if (baseMulEasyNo + baseMulMidNo + baseMulHardNo != baseMulNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类多选题的个数错误！');
        //}
        //专业类判断题
        //判断题个数
        var judgeNo = examPanelWindow.down("#judgeNo").getValue();
        if (judgeNo != "") {
            judgeNo = parseInt(judgeNo);
        } else {
            judgeNo = 0;
        }
        //判断题单个分值
        var judgeScore = examPanelWindow.down("#judgeScore").getValue();
        if (judgeScore != "") {
            judgeScore = parseInt(judgeScore);
        } else {
            judgeScore = 0;
        }
        //判断题容易
        var judgeEasyNo = examPanelWindow.down("#judgeEasyNo").getValue();
        if (judgeEasyNo != "") {
            judgeEasyNo = parseInt(judgeEasyNo);
        } else {
            judgeEasyNo = 0;
        }
        //判断题一般
        var judgeMidNo = examPanelWindow.down("#judgeMidNo").getValue();
        if (judgeMidNo != "") {
            judgeMidNo = parseInt(judgeMidNo);
        } else {
            judgeMidNo = 0;
        }
        //判断题困难
        var judgeHardNo = examPanelWindow.down("#judgeHardNo").getValue();
        if (judgeHardNo != "") {
            judgeHardNo = parseInt(judgeHardNo);
        } else {
            judgeHardNo = 0;
        }
        //examPanelWindow.down("#judgeNo").value = judgeEasyNo + judgeMidNo + judgeHardNo;
        //if (judgeEasyNo + judgeMidNo + judgeHardNo != judgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类判断题的个数错误！');
        //}
        //专业类单选题
        //单选个数
        var singleNo = examPanelWindow.down("#singleNo").getValue();
        if (singleNo != "") {
            singleNo = parseInt(singleNo);
        } else {
            singleNo = 0;
        }
        //单选单个分值
        var singleScore = examPanelWindow.down("#singleScore").getValue();
        if (singleScore != "") {
            singleScore = parseInt(singleScore);
        } else {
            singleScore = 0;
        }
        //单选容易
        var singleEasyNo = examPanelWindow.down("#singleEasyNo").getValue();
        if (singleEasyNo != "") {
            singleEasyNo = parseInt(singleEasyNo);
        } else {
            singleEasyNo = 0;
        }
        //单选一般
        var singleMidNo = examPanelWindow.down("#singleMidNo").getValue();
        if (singleMidNo != "") {
            singleMidNo = parseInt(singleMidNo);
        } else {
            singleMidNo = 0;
        }
        //单选困难
        var singleHardNo = examPanelWindow.down("#singleHardNo").getValue();
        if (singleHardNo != "") {
            singleHardNo = parseInt(singleHardNo);
        } else {
            singleHardNo = 0;
        }
        //examPanelWindow.down("#singleNo").value = singleEasyNo + singleMidNo + singleHardNo;
        //if (singleEasyNo + singleMidNo + singleHardNo != singleNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类单选题的个数错误！');
        //}
        //专业类多选题
        var mulNo = examPanelWindow.down("#mulNo").getValue();
        if (mulNo != "") {
            mulNo = parseInt(mulNo);
        } else {
            mulNo = 0;
        }
        //专业类多选题单个分值
        var mulScore = examPanelWindow.down("#mulScore").getValue();
        if (mulScore != "") {
            mulScore = parseInt(mulScore);
        } else {
            mulScore = 0;
        }
        //专业类多选题容易
        var mulEasyNo = examPanelWindow.down("#mulEasyNo").getValue();
        if (mulEasyNo != "") {
            mulEasyNo = parseInt(mulEasyNo);
        } else {
            mulEasyNo = 0;
        }
        //专业类多选题一般
        var mulMidNo = examPanelWindow.down("#mulMidNo").getValue();
        if (mulMidNo != "") {
            mulMidNo = parseInt(mulMidNo);
        } else {
            mulMidNo = 0;
        }
        //专业类多选题困难
        var mulHardNo = examPanelWindow.down("#mulHardNo").getValue();
        if (mulHardNo != "") {
            mulHardNo = parseInt(mulHardNo);
        } else {
            mulHardNo = 0;
        }
        //examPanelWindow.down("#mulNo").value = mulEasyNo + mulMidNo + mulHardNo;
        //if (mulEasyNo + mulMidNo + mulHardNo != mulNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类多选题的个数错误！');
        //}
        //总分
        var totalScore = examPanelWindow.down("#totalScore").getValue();
        if (totalScore != "") {
            totalScore = parseInt(totalScore);
        } else {
            totalScore = 0;
        }
        totalScore = baseJudgeNo * baseJudgeScore + baseSingleNo * baseSingleScore + baseMulNo * baseMulScore + judgeNo * judgeScore
        + singleNo * singleScore + mulNo * mulScore;
        var totalScore = examPanelWindow.down("#totalScore").setValue(totalScore);
    },
    onBlurjudgeScore: function (me, record, dasda) {
        //基础类判断题
        var examPanelWindow = me.up("#examPanelWindow");
        var form = examPanelWindow.down('#examPanelForm');
        var baseJudgeNo = examPanelWindow.down("#baseJudgeNo").getValue();
        if (baseJudgeNo != "") {
            baseJudgeNo = parseInt(baseJudgeNo);
        } else {
            baseJudgeNo = 0;
        }
        var baseJudgeScore = examPanelWindow.down("#baseJudgeScore").getValue();
        if (baseJudgeScore != "") {
            baseJudgeScore = parseInt(baseJudgeScore);
        } else {
            baseJudgeScore = 0;
        }
        var baseJudgeEasyNo = examPanelWindow.down("#baseJudgeEasyNo").getValue();
        if (baseJudgeEasyNo != "") {
            baseJudgeEasyNo = parseInt(baseJudgeEasyNo);
        } else {
            baseJudgeEasyNo = 0;
        }
        var baseJudgeMidNo = examPanelWindow.down("#baseJudgeMidNo").getValue();
        if (baseJudgeMidNo != "") {
            baseJudgeMidNo = parseInt(baseJudgeMidNo);
        } else {
            baseJudgeMidNo = 0;
        }
        var baseJudgeHardNo = examPanelWindow.down("#baseJudgeHardNo").getValue();
        if (baseJudgeHardNo != "") {
            baseJudgeHardNo = parseInt(baseJudgeHardNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //examPanelWindow.down("#baseJudgeNo").value = baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo;
        //if (baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo != baseJudgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类判断题的个数错误！');
        //}
        //基础类单选题
        //单选题个数
        var baseSingleNo = examPanelWindow.down("#baseSingleNo").getValue();
        if (baseSingleNo != "") {
            baseSingleNo = parseInt(baseSingleNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //单选题单个分值
        var baseSingleScore = examPanelWindow.down("#baseSingleScore").getValue();
        if (baseSingleScore != "") {
            baseSingleScore = parseInt(baseSingleScore);
        } else {
            baseSingleScore = 0;
        }
        //单选题容易数
        var baseSingleEasyNo = examPanelWindow.down("#baseSingleEasyNo").getValue();
        if (baseSingleEasyNo != "") {
            baseSingleEasyNo = parseInt(baseSingleEasyNo);
        } else {
            baseSingleEasyNo = 0;
        }
        //单选题难度一般数
        var baseSingleMidNo = examPanelWindow.down("#baseSingleMidNo").getValue();
        if (baseSingleMidNo != "") {
            baseSingleMidNo = parseInt(baseSingleMidNo);
        } else {
            baseSingleMidNo = 0;
        }
        //单选题难度困难数
        var baseSingleHardNo = examPanelWindow.down("#baseSingleHardNo").getValue();
        if (baseSingleHardNo != "") {
            baseSingleHardNo = parseInt(baseSingleHardNo);
        } else {
            baseSingleHardNo = 0;
        }
        //examPanelWindow.down("#baseSingleNo").value = baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo;
        //if (baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo != baseSingleNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类单选题的个数错误！');
        //}
        //基础类多选题
        //多选题个数
        var baseMulNo = examPanelWindow.down("#baseMulNo").getValue();
        //   alert(baseMulNo);
        if (baseMulNo != "") {
            baseMulNo = parseInt(baseMulNo);
        } else {
            baseMulNo = 0;
        }
        //多选题单个分值
        var baseMulScore = examPanelWindow.down("#baseMulScore").getValue();
        if (baseMulScore != "") {
            baseMulScore = parseInt(baseMulScore);
        } else {
            baseMulScore = 0;
        }
        //多选题容易
        var baseMulEasyNo = examPanelWindow.down("#baseMulEasyNo").getValue();
        if (baseMulEasyNo != "") {
            baseMulEasyNo = parseInt(baseMulEasyNo);
        } else {
            baseMulEasyNo = 0;
        }
        //多选题一般
        var baseMulMidNo = examPanelWindow.down("#baseMulMidNo").getValue();
        if (baseMulMidNo != "") {
            baseMulMidNo = parseInt(baseMulMidNo);
        } else {
            baseMulMidNo = 0;
        }
        //多选题困难
        var baseMulHardNo = examPanelWindow.down("#baseMulHardNo").getValue();
        if (baseMulHardNo != "") {
            baseMulHardNo = parseInt(baseMulHardNo);
        } else {
            baseMulHardNo = 0;
        }
        //examPanelWindow.down("#baseMulNo").value = baseMulEasyNo + baseMulMidNo + baseMulHardNo;
        //if (baseMulEasyNo + baseMulMidNo + baseMulHardNo != baseMulNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类多选题的个数错误！');
        //}
        //专业类判断题
        //判断题个数
        var judgeNo = examPanelWindow.down("#judgeNo").getValue();
        if (judgeNo != "") {
            judgeNo = parseInt(judgeNo);
        } else {
            judgeNo = 0;
        }
        //判断题单个分值
        var judgeScore = examPanelWindow.down("#judgeScore").getValue();
        if (judgeScore != "") {
            judgeScore = parseInt(judgeScore);
        } else {
            judgeScore = 0;
        }
        //判断题容易
        var judgeEasyNo = examPanelWindow.down("#judgeEasyNo").getValue();
        if (judgeEasyNo != "") {
            judgeEasyNo = parseInt(judgeEasyNo);
        } else {
            judgeEasyNo = 0;
        }
        //判断题一般
        var judgeMidNo = examPanelWindow.down("#judgeMidNo").getValue();
        if (judgeMidNo != "") {
            judgeMidNo = parseInt(judgeMidNo);
        } else {
            judgeMidNo = 0;
        }
        //判断题困难
        var judgeHardNo = examPanelWindow.down("#judgeHardNo").getValue();
        if (judgeHardNo != "") {
            judgeHardNo = parseInt(judgeHardNo);
        } else {
            judgeHardNo = 0;
        }
        //examPanelWindow.down("#judgeNo").value = judgeEasyNo + judgeMidNo + judgeHardNo;
        //if (judgeEasyNo + judgeMidNo + judgeHardNo != judgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类判断题的个数错误！');
        //}
        //专业类单选题
        //单选个数
        var singleNo = examPanelWindow.down("#singleNo").getValue();
        if (singleNo != "") {
            singleNo = parseInt(singleNo);
        } else {
            singleNo = 0;
        }
        //单选单个分值
        var singleScore = examPanelWindow.down("#singleScore").getValue();
        if (singleScore != "") {
            singleScore = parseInt(singleScore);
        } else {
            singleScore = 0;
        }
        //单选容易
        var singleEasyNo = examPanelWindow.down("#singleEasyNo").getValue();
        if (singleEasyNo != "") {
            singleEasyNo = parseInt(singleEasyNo);
        } else {
            singleEasyNo = 0;
        }
        //单选一般
        var singleMidNo = examPanelWindow.down("#singleMidNo").getValue();
        if (singleMidNo != "") {
            singleMidNo = parseInt(singleMidNo);
        } else {
            singleMidNo = 0;
        }
        //单选困难
        var singleHardNo = examPanelWindow.down("#singleHardNo").getValue();
        if (singleHardNo != "") {
            singleHardNo = parseInt(singleHardNo);
        } else {
            singleHardNo = 0;
        }
        //examPanelWindow.down("#singleNo").value = singleEasyNo + singleMidNo + singleHardNo;
        //if (singleEasyNo + singleMidNo + singleHardNo != singleNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类单选题的个数错误！');
        //}
        //专业类多选题
        var mulNo = examPanelWindow.down("#mulNo").getValue();
        if (mulNo != "") {
            mulNo = parseInt(mulNo);
        } else {
            mulNo = 0;
        }
        //专业类多选题单个分值
        var mulScore = examPanelWindow.down("#mulScore").getValue();
        if (mulScore != "") {
            mulScore = parseInt(mulScore);
        } else {
            mulScore = 0;
        }
        //专业类多选题容易
        var mulEasyNo = examPanelWindow.down("#mulEasyNo").getValue();
        if (mulEasyNo != "") {
            mulEasyNo = parseInt(mulEasyNo);
        } else {
            mulEasyNo = 0;
        }
        //专业类多选题一般
        var mulMidNo = examPanelWindow.down("#mulMidNo").getValue();
        if (mulMidNo != "") {
            mulMidNo = parseInt(mulMidNo);
        } else {
            mulMidNo = 0;
        }
        //专业类多选题困难
        var mulHardNo = examPanelWindow.down("#mulHardNo").getValue();
        if (mulHardNo != "") {
            mulHardNo = parseInt(mulHardNo);
        } else {
            mulHardNo = 0;
        }
        //examPanelWindow.down("#mulNo").value = mulEasyNo + mulMidNo + mulHardNo;
        //if (mulEasyNo + mulMidNo + mulHardNo != mulNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类多选题的个数错误！');
        //}
        //总分
        var totalScore = examPanelWindow.down("#totalScore").getValue();
        if (totalScore != "") {
            totalScore = parseInt(totalScore);
        } else {
            totalScore = 0;
        }
        totalScore = baseJudgeNo * baseJudgeScore + baseSingleNo * baseSingleScore + baseMulNo * baseMulScore + judgeNo * judgeScore
        + singleNo * singleScore + mulNo * mulScore;
        var totalScore = examPanelWindow.down("#totalScore").setValue(totalScore);
    },
    onBlursingleNo: function (me, record, dasda) {
        //基础类判断题
        var examPanelWindow = me.up("#examPanelWindow");
        var form = examPanelWindow.down('#examPanelForm');
        var baseJudgeNo = examPanelWindow.down("#baseJudgeNo").getValue();
        if (baseJudgeNo != "") {
            baseJudgeNo = parseInt(baseJudgeNo);
        } else {
            baseJudgeNo = 0;
        }
        var baseJudgeScore = examPanelWindow.down("#baseJudgeScore").getValue();
        if (baseJudgeScore != "") {
            baseJudgeScore = parseInt(baseJudgeScore);
        } else {
            baseJudgeScore = 0;
        }
        var baseJudgeEasyNo = examPanelWindow.down("#baseJudgeEasyNo").getValue();
        if (baseJudgeEasyNo != "") {
            baseJudgeEasyNo = parseInt(baseJudgeEasyNo);
        } else {
            baseJudgeEasyNo = 0;
        }
        var baseJudgeMidNo = examPanelWindow.down("#baseJudgeMidNo").getValue();
        if (baseJudgeMidNo != "") {
            baseJudgeMidNo = parseInt(baseJudgeMidNo);
        } else {
            baseJudgeMidNo = 0;
        }
        var baseJudgeHardNo = examPanelWindow.down("#baseJudgeHardNo").getValue();
        if (baseJudgeHardNo != "") {
            baseJudgeHardNo = parseInt(baseJudgeHardNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //examPanelWindow.down("#baseJudgeNo").value = baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo;
        //if (baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo != baseJudgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类判断题的个数错误！');
        //}
        //基础类单选题
        //单选题个数
        var baseSingleNo = examPanelWindow.down("#baseSingleNo").getValue();
        if (baseSingleNo != "") {
            baseSingleNo = parseInt(baseSingleNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //单选题单个分值
        var baseSingleScore = examPanelWindow.down("#baseSingleScore").getValue();
        if (baseSingleScore != "") {
            baseSingleScore = parseInt(baseSingleScore);
        } else {
            baseSingleScore = 0;
        }
        //单选题容易数
        var baseSingleEasyNo = examPanelWindow.down("#baseSingleEasyNo").getValue();
        if (baseSingleEasyNo != "") {
            baseSingleEasyNo = parseInt(baseSingleEasyNo);
        } else {
            baseSingleEasyNo = 0;
        }
        //单选题难度一般数
        var baseSingleMidNo = examPanelWindow.down("#baseSingleMidNo").getValue();
        if (baseSingleMidNo != "") {
            baseSingleMidNo = parseInt(baseSingleMidNo);
        } else {
            baseSingleMidNo = 0;
        }
        //单选题难度困难数
        var baseSingleHardNo = examPanelWindow.down("#baseSingleHardNo").getValue();
        if (baseSingleHardNo != "") {
            baseSingleHardNo = parseInt(baseSingleHardNo);
        } else {
            baseSingleHardNo = 0;
        }
        //examPanelWindow.down("#baseSingleNo").value = baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo;
        //if (baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo != baseSingleNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类单选题的个数错误！');
        //}
        //基础类多选题
        //多选题个数
        var baseMulNo = examPanelWindow.down("#baseMulNo").getValue();
        //   alert(baseMulNo);
        if (baseMulNo != "") {
            baseMulNo = parseInt(baseMulNo);
        } else {
            baseMulNo = 0;
        }
        //多选题单个分值
        var baseMulScore = examPanelWindow.down("#baseMulScore").getValue();
        if (baseMulScore != "") {
            baseMulScore = parseInt(baseMulScore);
        } else {
            baseMulScore = 0;
        }
        //多选题容易
        var baseMulEasyNo = examPanelWindow.down("#baseMulEasyNo").getValue();
        if (baseMulEasyNo != "") {
            baseMulEasyNo = parseInt(baseMulEasyNo);
        } else {
            baseMulEasyNo = 0;
        }
        //多选题一般
        var baseMulMidNo = examPanelWindow.down("#baseMulMidNo").getValue();
        if (baseMulMidNo != "") {
            baseMulMidNo = parseInt(baseMulMidNo);
        } else {
            baseMulMidNo = 0;
        }
        //多选题困难
        var baseMulHardNo = examPanelWindow.down("#baseMulHardNo").getValue();
        if (baseMulHardNo != "") {
            baseMulHardNo = parseInt(baseMulHardNo);
        } else {
            baseMulHardNo = 0;
        }
        //examPanelWindow.down("#baseMulNo").value = baseMulEasyNo + baseMulMidNo + baseMulHardNo;
        //if (baseMulEasyNo + baseMulMidNo + baseMulHardNo != baseMulNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类多选题的个数错误！');
        //}
        //专业类判断题
        //判断题个数
        var judgeNo = examPanelWindow.down("#judgeNo").getValue();
        if (judgeNo != "") {
            judgeNo = parseInt(judgeNo);
        } else {
            judgeNo = 0;
        }
        //判断题单个分值
        var judgeScore = examPanelWindow.down("#judgeScore").getValue();
        if (judgeScore != "") {
            judgeScore = parseInt(judgeScore);
        } else {
            judgeScore = 0;
        }
        //判断题容易
        var judgeEasyNo = examPanelWindow.down("#judgeEasyNo").getValue();
        if (judgeEasyNo != "") {
            judgeEasyNo = parseInt(judgeEasyNo);
        } else {
            judgeEasyNo = 0;
        }
        //判断题一般
        var judgeMidNo = examPanelWindow.down("#judgeMidNo").getValue();
        if (judgeMidNo != "") {
            judgeMidNo = parseInt(judgeMidNo);
        } else {
            judgeMidNo = 0;
        }
        //判断题困难
        var judgeHardNo = examPanelWindow.down("#judgeHardNo").getValue();
        if (judgeHardNo != "") {
            judgeHardNo = parseInt(judgeHardNo);
        } else {
            judgeHardNo = 0;
        }
        //examPanelWindow.down("#judgeNo").value = judgeEasyNo + judgeMidNo + judgeHardNo;
        //if (judgeEasyNo + judgeMidNo + judgeHardNo != judgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类判断题的个数错误！');
        //}
        //专业类单选题
        //单选个数
        var singleNo = examPanelWindow.down("#singleNo").getValue();
        if (singleNo != "") {
            singleNo = parseInt(singleNo);
        } else {
            singleNo = 0;
        }
        //单选单个分值
        var singleScore = examPanelWindow.down("#singleScore").getValue();
        if (singleScore != "") {
            singleScore = parseInt(singleScore);
        } else {
            singleScore = 0;
        }
        //单选容易
        var singleEasyNo = examPanelWindow.down("#singleEasyNo").getValue();
        if (singleEasyNo != "") {
            singleEasyNo = parseInt(singleEasyNo);
        } else {
            singleEasyNo = 0;
        }
        //单选一般
        var singleMidNo = examPanelWindow.down("#singleMidNo").getValue();
        if (singleMidNo != "") {
            singleMidNo = parseInt(singleMidNo);
        } else {
            singleMidNo = 0;
        }
        //单选困难
        var singleHardNo = examPanelWindow.down("#singleHardNo").getValue();
        if (singleHardNo != "") {
            singleHardNo = parseInt(singleHardNo);
        } else {
            singleHardNo = 0;
        }
        //examPanelWindow.down("#singleNo").value = singleEasyNo + singleMidNo + singleHardNo;
        //if (singleEasyNo + singleMidNo + singleHardNo != singleNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类单选题的个数错误！');
        //}
        //专业类多选题
        var mulNo = examPanelWindow.down("#mulNo").getValue();
        if (mulNo != "") {
            mulNo = parseInt(mulNo);
        } else {
            mulNo = 0;
        }
        //专业类多选题单个分值
        var mulScore = examPanelWindow.down("#mulScore").getValue();
        if (mulScore != "") {
            mulScore = parseInt(mulScore);
        } else {
            mulScore = 0;
        }
        //专业类多选题容易
        var mulEasyNo = examPanelWindow.down("#mulEasyNo").getValue();
        if (mulEasyNo != "") {
            mulEasyNo = parseInt(mulEasyNo);
        } else {
            mulEasyNo = 0;
        }
        //专业类多选题一般
        var mulMidNo = examPanelWindow.down("#mulMidNo").getValue();
        if (mulMidNo != "") {
            mulMidNo = parseInt(mulMidNo);
        } else {
            mulMidNo = 0;
        }
        //专业类多选题困难
        var mulHardNo = examPanelWindow.down("#mulHardNo").getValue();
        if (mulHardNo != "") {
            mulHardNo = parseInt(mulHardNo);
        } else {
            mulHardNo = 0;
        }
        //examPanelWindow.down("#mulNo").value = mulEasyNo + mulMidNo + mulHardNo;
        //if (mulEasyNo + mulMidNo + mulHardNo != mulNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类多选题的个数错误！');
        //}
        //总分
        var totalScore = examPanelWindow.down("#totalScore").getValue();
        if (totalScore != "") {
            totalScore = parseInt(totalScore);
        } else {
            totalScore = 0;
        }
        totalScore = baseJudgeNo * baseJudgeScore + baseSingleNo * baseSingleScore + baseMulNo * baseMulScore + judgeNo * judgeScore
        + singleNo * singleScore + mulNo * mulScore;
        var totalScore = examPanelWindow.down("#totalScore").setValue(totalScore);
    },
    onBlursingleScore: function (me, record, dasda) {
        //基础类判断题
        var examPanelWindow = me.up("#examPanelWindow");
        var form = examPanelWindow.down('#examPanelForm');
        var baseJudgeNo = examPanelWindow.down("#baseJudgeNo").getValue();
        if (baseJudgeNo != "") {
            baseJudgeNo = parseInt(baseJudgeNo);
        } else {
            baseJudgeNo = 0;
        }
        var baseJudgeScore = examPanelWindow.down("#baseJudgeScore").getValue();
        if (baseJudgeScore != "") {
            baseJudgeScore = parseInt(baseJudgeScore);
        } else {
            baseJudgeScore = 0;
        }
        var baseJudgeEasyNo = examPanelWindow.down("#baseJudgeEasyNo").getValue();
        if (baseJudgeEasyNo != "") {
            baseJudgeEasyNo = parseInt(baseJudgeEasyNo);
        } else {
            baseJudgeEasyNo = 0;
        }
        var baseJudgeMidNo = examPanelWindow.down("#baseJudgeMidNo").getValue();
        if (baseJudgeMidNo != "") {
            baseJudgeMidNo = parseInt(baseJudgeMidNo);
        } else {
            baseJudgeMidNo = 0;
        }
        var baseJudgeHardNo = examPanelWindow.down("#baseJudgeHardNo").getValue();
        if (baseJudgeHardNo != "") {
            baseJudgeHardNo = parseInt(baseJudgeHardNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //examPanelWindow.down("#baseJudgeNo").value = baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo;
        //if (baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo != baseJudgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类判断题的个数错误！');
        //}
        //基础类单选题
        //单选题个数
        var baseSingleNo = examPanelWindow.down("#baseSingleNo").getValue();
        if (baseSingleNo != "") {
            baseSingleNo = parseInt(baseSingleNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //单选题单个分值
        var baseSingleScore = examPanelWindow.down("#baseSingleScore").getValue();
        if (baseSingleScore != "") {
            baseSingleScore = parseInt(baseSingleScore);
        } else {
            baseSingleScore = 0;
        }
        //单选题容易数
        var baseSingleEasyNo = examPanelWindow.down("#baseSingleEasyNo").getValue();
        if (baseSingleEasyNo != "") {
            baseSingleEasyNo = parseInt(baseSingleEasyNo);
        } else {
            baseSingleEasyNo = 0;
        }
        //单选题难度一般数
        var baseSingleMidNo = examPanelWindow.down("#baseSingleMidNo").getValue();
        if (baseSingleMidNo != "") {
            baseSingleMidNo = parseInt(baseSingleMidNo);
        } else {
            baseSingleMidNo = 0;
        }
        //单选题难度困难数
        var baseSingleHardNo = examPanelWindow.down("#baseSingleHardNo").getValue();
        if (baseSingleHardNo != "") {
            baseSingleHardNo = parseInt(baseSingleHardNo);
        } else {
            baseSingleHardNo = 0;
        }
        //examPanelWindow.down("#baseSingleNo").value = baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo;
        //if (baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo != baseSingleNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类单选题的个数错误！');
        //}
        //基础类多选题
        //多选题个数
        var baseMulNo = examPanelWindow.down("#baseMulNo").getValue();
        //   alert(baseMulNo);
        if (baseMulNo != "") {
            baseMulNo = parseInt(baseMulNo);
        } else {
            baseMulNo = 0;
        }
        //多选题单个分值
        var baseMulScore = examPanelWindow.down("#baseMulScore").getValue();
        if (baseMulScore != "") {
            baseMulScore = parseInt(baseMulScore);
        } else {
            baseMulScore = 0;
        }
        //多选题容易
        var baseMulEasyNo = examPanelWindow.down("#baseMulEasyNo").getValue();
        if (baseMulEasyNo != "") {
            baseMulEasyNo = parseInt(baseMulEasyNo);
        } else {
            baseMulEasyNo = 0;
        }
        //多选题一般
        var baseMulMidNo = examPanelWindow.down("#baseMulMidNo").getValue();
        if (baseMulMidNo != "") {
            baseMulMidNo = parseInt(baseMulMidNo);
        } else {
            baseMulMidNo = 0;
        }
        //多选题困难
        var baseMulHardNo = examPanelWindow.down("#baseMulHardNo").getValue();
        if (baseMulHardNo != "") {
            baseMulHardNo = parseInt(baseMulHardNo);
        } else {
            baseMulHardNo = 0;
        }
        //examPanelWindow.down("#baseMulNo").value = baseMulEasyNo + baseMulMidNo + baseMulHardNo;
        //if (baseMulEasyNo + baseMulMidNo + baseMulHardNo != baseMulNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类多选题的个数错误！');
        //}
        //专业类判断题
        //判断题个数
        var judgeNo = examPanelWindow.down("#judgeNo").getValue();
        if (judgeNo != "") {
            judgeNo = parseInt(judgeNo);
        } else {
            judgeNo = 0;
        }
        //判断题单个分值
        var judgeScore = examPanelWindow.down("#judgeScore").getValue();
        if (judgeScore != "") {
            judgeScore = parseInt(judgeScore);
        } else {
            judgeScore = 0;
        }
        //判断题容易
        var judgeEasyNo = examPanelWindow.down("#judgeEasyNo").getValue();
        if (judgeEasyNo != "") {
            judgeEasyNo = parseInt(judgeEasyNo);
        } else {
            judgeEasyNo = 0;
        }
        //判断题一般
        var judgeMidNo = examPanelWindow.down("#judgeMidNo").getValue();
        if (judgeMidNo != "") {
            judgeMidNo = parseInt(judgeMidNo);
        } else {
            judgeMidNo = 0;
        }
        //判断题困难
        var judgeHardNo = examPanelWindow.down("#judgeHardNo").getValue();
        if (judgeHardNo != "") {
            judgeHardNo = parseInt(judgeHardNo);
        } else {
            judgeHardNo = 0;
        }
        //examPanelWindow.down("#judgeNo").value = judgeEasyNo + judgeMidNo + judgeHardNo;
        //if (judgeEasyNo + judgeMidNo + judgeHardNo != judgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类判断题的个数错误！');
        //}
        //专业类单选题
        //单选个数
        var singleNo = examPanelWindow.down("#singleNo").getValue();
        if (singleNo != "") {
            singleNo = parseInt(singleNo);
        } else {
            singleNo = 0;
        }
        //单选单个分值
        var singleScore = examPanelWindow.down("#singleScore").getValue();
        if (singleScore != "") {
            singleScore = parseInt(singleScore);
        } else {
            singleScore = 0;
        }
        //单选容易
        var singleEasyNo = examPanelWindow.down("#singleEasyNo").getValue();
        if (singleEasyNo != "") {
            singleEasyNo = parseInt(singleEasyNo);
        } else {
            singleEasyNo = 0;
        }
        //单选一般
        var singleMidNo = examPanelWindow.down("#singleMidNo").getValue();
        if (singleMidNo != "") {
            singleMidNo = parseInt(singleMidNo);
        } else {
            singleMidNo = 0;
        }
        //单选困难
        var singleHardNo = examPanelWindow.down("#singleHardNo").getValue();
        if (singleHardNo != "") {
            singleHardNo = parseInt(singleHardNo);
        } else {
            singleHardNo = 0;
        }
        //examPanelWindow.down("#singleNo").value = singleEasyNo + singleMidNo + singleHardNo;
        //if (singleEasyNo + singleMidNo + singleHardNo != singleNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类单选题的个数错误！');
        //}
        //专业类多选题
        var mulNo = examPanelWindow.down("#mulNo").getValue();
        if (mulNo != "") {
            mulNo = parseInt(mulNo);
        } else {
            mulNo = 0;
        }
        //专业类多选题单个分值
        var mulScore = examPanelWindow.down("#mulScore").getValue();
        if (mulScore != "") {
            mulScore = parseInt(mulScore);
        } else {
            mulScore = 0;
        }
        //专业类多选题容易
        var mulEasyNo = examPanelWindow.down("#mulEasyNo").getValue();
        if (mulEasyNo != "") {
            mulEasyNo = parseInt(mulEasyNo);
        } else {
            mulEasyNo = 0;
        }
        //专业类多选题一般
        var mulMidNo = examPanelWindow.down("#mulMidNo").getValue();
        if (mulMidNo != "") {
            mulMidNo = parseInt(mulMidNo);
        } else {
            mulMidNo = 0;
        }
        //专业类多选题困难
        var mulHardNo = examPanelWindow.down("#mulHardNo").getValue();
        if (mulHardNo != "") {
            mulHardNo = parseInt(mulHardNo);
        } else {
            mulHardNo = 0;
        }
        //examPanelWindow.down("#mulNo").value = mulEasyNo + mulMidNo + mulHardNo;
        //if (mulEasyNo + mulMidNo + mulHardNo != mulNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类多选题的个数错误！');
        //}
        //总分
        var totalScore = examPanelWindow.down("#totalScore").getValue();
        if (totalScore != "") {
            totalScore = parseInt(totalScore);
        } else {
            totalScore = 0;
        }
        totalScore = baseJudgeNo * baseJudgeScore + baseSingleNo * baseSingleScore + baseMulNo * baseMulScore + judgeNo * judgeScore
        + singleNo * singleScore + mulNo * mulScore;
        var totalScore = examPanelWindow.down("#totalScore").setValue(totalScore);
    },
    onBlurMulNo: function (me, record, dasda) {
        //基础类判断题
        var examPanelWindow = me.up("#examPanelWindow");
        var form = examPanelWindow.down('#examPanelForm');
        var baseJudgeNo = examPanelWindow.down("#baseJudgeNo").getValue();
        if (baseJudgeNo != "") {
            baseJudgeNo = parseInt(baseJudgeNo);
        } else {
            baseJudgeNo = 0;
        }
        var baseJudgeScore = examPanelWindow.down("#baseJudgeScore").getValue();
        if (baseJudgeScore != "") {
            baseJudgeScore = parseInt(baseJudgeScore);
        } else {
            baseJudgeScore = 0;
        }
        var baseJudgeEasyNo = examPanelWindow.down("#baseJudgeEasyNo").getValue();
        if (baseJudgeEasyNo != "") {
            baseJudgeEasyNo = parseInt(baseJudgeEasyNo);
        } else {
            baseJudgeEasyNo = 0;
        }
        var baseJudgeMidNo = examPanelWindow.down("#baseJudgeMidNo").getValue();
        if (baseJudgeMidNo != "") {
            baseJudgeMidNo = parseInt(baseJudgeMidNo);
        } else {
            baseJudgeMidNo = 0;
        }
        var baseJudgeHardNo = examPanelWindow.down("#baseJudgeHardNo").getValue();
        if (baseJudgeHardNo != "") {
            baseJudgeHardNo = parseInt(baseJudgeHardNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //examPanelWindow.down("#baseJudgeNo").value = baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo;
        //if (baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo != baseJudgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类判断题的个数错误！');
        //}
        //基础类单选题
        //单选题个数
        var baseSingleNo = examPanelWindow.down("#baseSingleNo").getValue();
        if (baseSingleNo != "") {
            baseSingleNo = parseInt(baseSingleNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //单选题单个分值
        var baseSingleScore = examPanelWindow.down("#baseSingleScore").getValue();
        if (baseSingleScore != "") {
            baseSingleScore = parseInt(baseSingleScore);
        } else {
            baseSingleScore = 0;
        }
        //单选题容易数
        var baseSingleEasyNo = examPanelWindow.down("#baseSingleEasyNo").getValue();
        if (baseSingleEasyNo != "") {
            baseSingleEasyNo = parseInt(baseSingleEasyNo);
        } else {
            baseSingleEasyNo = 0;
        }
        //单选题难度一般数
        var baseSingleMidNo = examPanelWindow.down("#baseSingleMidNo").getValue();
        if (baseSingleMidNo != "") {
            baseSingleMidNo = parseInt(baseSingleMidNo);
        } else {
            baseSingleMidNo = 0;
        }
        //单选题难度困难数
        var baseSingleHardNo = examPanelWindow.down("#baseSingleHardNo").getValue();
        if (baseSingleHardNo != "") {
            baseSingleHardNo = parseInt(baseSingleHardNo);
        } else {
            baseSingleHardNo = 0;
        }
        //examPanelWindow.down("#baseSingleNo").value = baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo;
        //if (baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo != baseSingleNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类单选题的个数错误！');
        //}
        //基础类多选题
        //多选题个数
        var baseMulNo = examPanelWindow.down("#baseMulNo").getValue();
        //   alert(baseMulNo);
        if (baseMulNo != "") {
            baseMulNo = parseInt(baseMulNo);
        } else {
            baseMulNo = 0;
        }
        //多选题单个分值
        var baseMulScore = examPanelWindow.down("#baseMulScore").getValue();
        if (baseMulScore != "") {
            baseMulScore = parseInt(baseMulScore);
        } else {
            baseMulScore = 0;
        }
        //多选题容易
        var baseMulEasyNo = examPanelWindow.down("#baseMulEasyNo").getValue();
        if (baseMulEasyNo != "") {
            baseMulEasyNo = parseInt(baseMulEasyNo);
        } else {
            baseMulEasyNo = 0;
        }
        //多选题一般
        var baseMulMidNo = examPanelWindow.down("#baseMulMidNo").getValue();
        if (baseMulMidNo != "") {
            baseMulMidNo = parseInt(baseMulMidNo);
        } else {
            baseMulMidNo = 0;
        }
        //多选题困难
        var baseMulHardNo = examPanelWindow.down("#baseMulHardNo").getValue();
        if (baseMulHardNo != "") {
            baseMulHardNo = parseInt(baseMulHardNo);
        } else {
            baseMulHardNo = 0;
        }
        //examPanelWindow.down("#baseMulNo").value = baseMulEasyNo + baseMulMidNo + baseMulHardNo;
        //if (baseMulEasyNo + baseMulMidNo + baseMulHardNo != baseMulNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类多选题的个数错误！');
        //}
        //专业类判断题
        //判断题个数
        var judgeNo = examPanelWindow.down("#judgeNo").getValue();
        if (judgeNo != "") {
            judgeNo = parseInt(judgeNo);
        } else {
            judgeNo = 0;
        }
        //判断题单个分值
        var judgeScore = examPanelWindow.down("#judgeScore").getValue();
        if (judgeScore != "") {
            judgeScore = parseInt(judgeScore);
        } else {
            judgeScore = 0;
        }
        //判断题容易
        var judgeEasyNo = examPanelWindow.down("#judgeEasyNo").getValue();
        if (judgeEasyNo != "") {
            judgeEasyNo = parseInt(judgeEasyNo);
        } else {
            judgeEasyNo = 0;
        }
        //判断题一般
        var judgeMidNo = examPanelWindow.down("#judgeMidNo").getValue();
        if (judgeMidNo != "") {
            judgeMidNo = parseInt(judgeMidNo);
        } else {
            judgeMidNo = 0;
        }
        //判断题困难
        var judgeHardNo = examPanelWindow.down("#judgeHardNo").getValue();
        if (judgeHardNo != "") {
            judgeHardNo = parseInt(judgeHardNo);
        } else {
            judgeHardNo = 0;
        }
        //examPanelWindow.down("#judgeNo").value = judgeEasyNo + judgeMidNo + judgeHardNo;
        //if (judgeEasyNo + judgeMidNo + judgeHardNo != judgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类判断题的个数错误！');
        //}
        //专业类单选题
        //单选个数
        var singleNo = examPanelWindow.down("#singleNo").getValue();
        if (singleNo != "") {
            singleNo = parseInt(singleNo);
        } else {
            singleNo = 0;
        }
        //单选单个分值
        var singleScore = examPanelWindow.down("#singleScore").getValue();
        if (singleScore != "") {
            singleScore = parseInt(singleScore);
        } else {
            singleScore = 0;
        }
        //单选容易
        var singleEasyNo = examPanelWindow.down("#singleEasyNo").getValue();
        if (singleEasyNo != "") {
            singleEasyNo = parseInt(singleEasyNo);
        } else {
            singleEasyNo = 0;
        }
        //单选一般
        var singleMidNo = examPanelWindow.down("#singleMidNo").getValue();
        if (singleMidNo != "") {
            singleMidNo = parseInt(singleMidNo);
        } else {
            singleMidNo = 0;
        }
        //单选困难
        var singleHardNo = examPanelWindow.down("#singleHardNo").getValue();
        if (singleHardNo != "") {
            singleHardNo = parseInt(singleHardNo);
        } else {
            singleHardNo = 0;
        }
        //examPanelWindow.down("#singleNo").value = singleEasyNo + singleMidNo + singleHardNo;
        //if (singleEasyNo + singleMidNo + singleHardNo != singleNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类单选题的个数错误！');
        //}
        //专业类多选题
        var mulNo = examPanelWindow.down("#mulNo").getValue();
        if (mulNo != "") {
            mulNo = parseInt(mulNo);
        } else {
            mulNo = 0;
        }
        //专业类多选题单个分值
        var mulScore = examPanelWindow.down("#mulScore").getValue();
        if (mulScore != "") {
            mulScore = parseInt(mulScore);
        } else {
            mulScore = 0;
        }
        //专业类多选题容易
        var mulEasyNo = examPanelWindow.down("#mulEasyNo").getValue();
        if (mulEasyNo != "") {
            mulEasyNo = parseInt(mulEasyNo);
        } else {
            mulEasyNo = 0;
        }
        //专业类多选题一般
        var mulMidNo = examPanelWindow.down("#mulMidNo").getValue();
        if (mulMidNo != "") {
            mulMidNo = parseInt(mulMidNo);
        } else {
            mulMidNo = 0;
        }
        //专业类多选题困难
        var mulHardNo = examPanelWindow.down("#mulHardNo").getValue();
        if (mulHardNo != "") {
            mulHardNo = parseInt(mulHardNo);
        } else {
            mulHardNo = 0;
        }
        //examPanelWindow.down("#mulNo").value = mulEasyNo + mulMidNo + mulHardNo;
        //if (mulEasyNo + mulMidNo + mulHardNo != mulNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类多选题的个数错误！');
        //}
        //总分
        var totalScore = examPanelWindow.down("#totalScore").getValue();
        if (totalScore != "") {
            totalScore = parseInt(totalScore);
        } else {
            totalScore = 0;
        }
        totalScore = baseJudgeNo * baseJudgeScore + baseSingleNo * baseSingleScore + baseMulNo * baseMulScore + judgeNo * judgeScore
        + singleNo * singleScore + mulNo * mulScore;
        var totalScore = examPanelWindow.down("#totalScore").setValue(totalScore);
    },
    onBlurMulScore: function (me, record, dasda) {
        //基础类判断题
        var examPanelWindow = me.up("#examPanelWindow");
        var form = examPanelWindow.down('#examPanelForm');
        var baseJudgeNo = examPanelWindow.down("#baseJudgeNo").getValue();
        if (baseJudgeNo != "") {
            baseJudgeNo = parseInt(baseJudgeNo);
        } else {
            baseJudgeNo = 0;
        }
        var baseJudgeScore = examPanelWindow.down("#baseJudgeScore").getValue();
        if (baseJudgeScore != "") {
            baseJudgeScore = parseInt(baseJudgeScore);
        } else {
            baseJudgeScore = 0;
        }
        var baseJudgeEasyNo = examPanelWindow.down("#baseJudgeEasyNo").getValue();
        if (baseJudgeEasyNo != "") {
            baseJudgeEasyNo = parseInt(baseJudgeEasyNo);
        } else {
            baseJudgeEasyNo = 0;
        }
        var baseJudgeMidNo = examPanelWindow.down("#baseJudgeMidNo").getValue();
        if (baseJudgeMidNo != "") {
            baseJudgeMidNo = parseInt(baseJudgeMidNo);
        } else {
            baseJudgeMidNo = 0;
        }
        var baseJudgeHardNo = examPanelWindow.down("#baseJudgeHardNo").getValue();
        if (baseJudgeHardNo != "") {
            baseJudgeHardNo = parseInt(baseJudgeHardNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //examPanelWindow.down("#baseJudgeNo").value = baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo;
        //if (baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo != baseJudgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类判断题的个数错误！');
        //}
        //基础类单选题
        //单选题个数
        var baseSingleNo = examPanelWindow.down("#baseSingleNo").getValue();
        if (baseSingleNo != "") {
            baseSingleNo = parseInt(baseSingleNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //单选题单个分值
        var baseSingleScore = examPanelWindow.down("#baseSingleScore").getValue();
        if (baseSingleScore != "") {
            baseSingleScore = parseInt(baseSingleScore);
        } else {
            baseSingleScore = 0;
        }
        //单选题容易数
        var baseSingleEasyNo = examPanelWindow.down("#baseSingleEasyNo").getValue();
        if (baseSingleEasyNo != "") {
            baseSingleEasyNo = parseInt(baseSingleEasyNo);
        } else {
            baseSingleEasyNo = 0;
        }
        //单选题难度一般数
        var baseSingleMidNo = examPanelWindow.down("#baseSingleMidNo").getValue();
        if (baseSingleMidNo != "") {
            baseSingleMidNo = parseInt(baseSingleMidNo);
        } else {
            baseSingleMidNo = 0;
        }
        //单选题难度困难数
        var baseSingleHardNo = examPanelWindow.down("#baseSingleHardNo").getValue();
        if (baseSingleHardNo != "") {
            baseSingleHardNo = parseInt(baseSingleHardNo);
        } else {
            baseSingleHardNo = 0;
        }
        //examPanelWindow.down("#baseSingleNo").value = baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo;
        //if (baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo != baseSingleNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类单选题的个数错误！');
        //}
        //基础类多选题
        //多选题个数
        var baseMulNo = examPanelWindow.down("#baseMulNo").getValue();
        //   alert(baseMulNo);
        if (baseMulNo != "") {
            baseMulNo = parseInt(baseMulNo);
        } else {
            baseMulNo = 0;
        }
        //多选题单个分值
        var baseMulScore = examPanelWindow.down("#baseMulScore").getValue();
        if (baseMulScore != "") {
            baseMulScore = parseInt(baseMulScore);
        } else {
            baseMulScore = 0;
        }
        //多选题容易
        var baseMulEasyNo = examPanelWindow.down("#baseMulEasyNo").getValue();
        if (baseMulEasyNo != "") {
            baseMulEasyNo = parseInt(baseMulEasyNo);
        } else {
            baseMulEasyNo = 0;
        }
        //多选题一般
        var baseMulMidNo = examPanelWindow.down("#baseMulMidNo").getValue();
        if (baseMulMidNo != "") {
            baseMulMidNo = parseInt(baseMulMidNo);
        } else {
            baseMulMidNo = 0;
        }
        //多选题困难
        var baseMulHardNo = examPanelWindow.down("#baseMulHardNo").getValue();
        if (baseMulHardNo != "") {
            baseMulHardNo = parseInt(baseMulHardNo);
        } else {
            baseMulHardNo = 0;
        }
        //examPanelWindow.down("#baseMulNo").value = baseMulEasyNo + baseMulMidNo + baseMulHardNo;
        //if (baseMulEasyNo + baseMulMidNo + baseMulHardNo != baseMulNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类多选题的个数错误！');
        //}
        //专业类判断题
        //判断题个数
        var judgeNo = examPanelWindow.down("#judgeNo").getValue();
        if (judgeNo != "") {
            judgeNo = parseInt(judgeNo);
        } else {
            judgeNo = 0;
        }
        //判断题单个分值
        var judgeScore = examPanelWindow.down("#judgeScore").getValue();
        if (judgeScore != "") {
            judgeScore = parseInt(judgeScore);
        } else {
            judgeScore = 0;
        }
        //判断题容易
        var judgeEasyNo = examPanelWindow.down("#judgeEasyNo").getValue();
        if (judgeEasyNo != "") {
            judgeEasyNo = parseInt(judgeEasyNo);
        } else {
            judgeEasyNo = 0;
        }
        //判断题一般
        var judgeMidNo = examPanelWindow.down("#judgeMidNo").getValue();
        if (judgeMidNo != "") {
            judgeMidNo = parseInt(judgeMidNo);
        } else {
            judgeMidNo = 0;
        }
        //判断题困难
        var judgeHardNo = examPanelWindow.down("#judgeHardNo").getValue();
        if (judgeHardNo != "") {
            judgeHardNo = parseInt(judgeHardNo);
        } else {
            judgeHardNo = 0;
        }
        //examPanelWindow.down("#judgeNo").value = judgeEasyNo + judgeMidNo + judgeHardNo;
        //if (judgeEasyNo + judgeMidNo + judgeHardNo != judgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类判断题的个数错误！');
        //}
        //专业类单选题
        //单选个数
        var singleNo = examPanelWindow.down("#singleNo").getValue();
        if (singleNo != "") {
            singleNo = parseInt(singleNo);
        } else {
            singleNo = 0;
        }
        //单选单个分值
        var singleScore = examPanelWindow.down("#singleScore").getValue();
        if (singleScore != "") {
            singleScore = parseInt(singleScore);
        } else {
            singleScore = 0;
        }
        //单选容易
        var singleEasyNo = examPanelWindow.down("#singleEasyNo").getValue();
        if (singleEasyNo != "") {
            singleEasyNo = parseInt(singleEasyNo);
        } else {
            singleEasyNo = 0;
        }
        //单选一般
        var singleMidNo = examPanelWindow.down("#singleMidNo").getValue();
        if (singleMidNo != "") {
            singleMidNo = parseInt(singleMidNo);
        } else {
            singleMidNo = 0;
        }
        //单选困难
        var singleHardNo = examPanelWindow.down("#singleHardNo").getValue();
        if (singleHardNo != "") {
            singleHardNo = parseInt(singleHardNo);
        } else {
            singleHardNo = 0;
        }
        //examPanelWindow.down("#singleNo").value = singleEasyNo + singleMidNo + singleHardNo;
        //if (singleEasyNo + singleMidNo + singleHardNo != singleNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类单选题的个数错误！');
        //}
        //专业类多选题
        var mulNo = examPanelWindow.down("#mulNo").getValue();
        if (mulNo != "") {
            mulNo = parseInt(mulNo);
        } else {
            mulNo = 0;
        }
        //专业类多选题单个分值
        var mulScore = examPanelWindow.down("#mulScore").getValue();
        if (mulScore != "") {
            mulScore = parseInt(mulScore);
        } else {
            mulScore = 0;
        }
        //专业类多选题容易
        var mulEasyNo = examPanelWindow.down("#mulEasyNo").getValue();
        if (mulEasyNo != "") {
            mulEasyNo = parseInt(mulEasyNo);
        } else {
            mulEasyNo = 0;
        }
        //专业类多选题一般
        var mulMidNo = examPanelWindow.down("#mulMidNo").getValue();
        if (mulMidNo != "") {
            mulMidNo = parseInt(mulMidNo);
        } else {
            mulMidNo = 0;
        }
        //专业类多选题困难
        var mulHardNo = examPanelWindow.down("#mulHardNo").getValue();
        if (mulHardNo != "") {
            mulHardNo = parseInt(mulHardNo);
        } else {
            mulHardNo = 0;
        }
        //examPanelWindow.down("#mulNo").value = mulEasyNo + mulMidNo + mulHardNo;
        //if (mulEasyNo + mulMidNo + mulHardNo != mulNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类多选题的个数错误！');
        //}
        //总分
        var totalScore = examPanelWindow.down("#totalScore").getValue();
        if (totalScore != "") {
            totalScore = parseInt(totalScore);
        } else {
            totalScore = 0;
        }
        totalScore = baseJudgeNo * baseJudgeScore + baseSingleNo * baseSingleScore + baseMulNo * baseMulScore + judgeNo * judgeScore
        + singleNo * singleScore + mulNo * mulScore;
        var totalScore = examPanelWindow.down("#totalScore").setValue(totalScore);
    },
    onBlurTotalScore: function (me, record, dasda) {
        //基础类判断题
        var examPanelWindow = me.up("#examPanelWindow");
        var form = examPanelWindow.down('#examPanelForm');
        var baseJudgeNo = examPanelWindow.down("#baseJudgeNo").getValue();
        if (baseJudgeNo != "") {
            baseJudgeNo = parseInt(baseJudgeNo);
        } else {
            baseJudgeNo = 0;
        }
        var baseJudgeScore = examPanelWindow.down("#baseJudgeScore").getValue();
        if (baseJudgeScore != "") {
            baseJudgeScore = parseInt(baseJudgeScore);
        } else {
            baseJudgeScore = 0;
        }
        var baseJudgeEasyNo = examPanelWindow.down("#baseJudgeEasyNo").getValue();
        if (baseJudgeEasyNo != "") {
            baseJudgeEasyNo = parseInt(baseJudgeEasyNo);
        } else {
            baseJudgeEasyNo = 0;
        }
        var baseJudgeMidNo = examPanelWindow.down("#baseJudgeMidNo").getValue();
        if (baseJudgeMidNo != "") {
            baseJudgeMidNo = parseInt(baseJudgeMidNo);
        } else {
            baseJudgeMidNo = 0;
        }
        var baseJudgeHardNo = examPanelWindow.down("#baseJudgeHardNo").getValue();
        if (baseJudgeHardNo != "") {
            baseJudgeHardNo = parseInt(baseJudgeHardNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //examPanelWindow.down("#baseJudgeNo").value = baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo;
        //if (baseJudgeEasyNo + baseJudgeMidNo + baseJudgeHardNo != baseJudgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类判断题的个数错误！');
        //}
        //基础类单选题
        //单选题个数
        var baseSingleNo = examPanelWindow.down("#baseSingleNo").getValue();
        if (baseSingleNo != "") {
            baseSingleNo = parseInt(baseSingleNo);
        } else {
            baseJudgeHardNo = 0;
        }
        //单选题单个分值
        var baseSingleScore = examPanelWindow.down("#baseSingleScore").getValue();
        if (baseSingleScore != "") {
            baseSingleScore = parseInt(baseSingleScore);
        } else {
            baseSingleScore = 0;
        }
        //单选题容易数
        var baseSingleEasyNo = examPanelWindow.down("#baseSingleEasyNo").getValue();
        if (baseSingleEasyNo != "") {
            baseSingleEasyNo = parseInt(baseSingleEasyNo);
        } else {
            baseSingleEasyNo = 0;
        }
        //单选题难度一般数
        var baseSingleMidNo = examPanelWindow.down("#baseSingleMidNo").getValue();
        if (baseSingleMidNo != "") {
            baseSingleMidNo = parseInt(baseSingleMidNo);
        } else {
            baseSingleMidNo = 0;
        }
        //单选题难度困难数
        var baseSingleHardNo = examPanelWindow.down("#baseSingleHardNo").getValue();
        if (baseSingleHardNo != "") {
            baseSingleHardNo = parseInt(baseSingleHardNo);
        } else {
            baseSingleHardNo = 0;
        }
        //examPanelWindow.down("#baseSingleNo").value = baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo;
        //if (baseSingleEasyNo + baseSingleMidNo + baseSingleHardNo != baseSingleNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类单选题的个数错误！');
        //}
        //基础类多选题
        //多选题个数
        var baseMulNo = examPanelWindow.down("#baseMulNo").getValue();
     //   alert(baseMulNo);
        if (baseMulNo != "") {
            baseMulNo = parseInt(baseMulNo);
        } else {
            baseMulNo = 0;
        }
        //多选题单个分值
        var baseMulScore = examPanelWindow.down("#baseMulScore").getValue();
        if (baseMulScore != "") {
            baseMulScore = parseInt(baseMulScore);
        } else {
            baseMulScore = 0;
        }
        //多选题容易
        var baseMulEasyNo = examPanelWindow.down("#baseMulEasyNo").getValue();
        if (baseMulEasyNo != "") {
            baseMulEasyNo = parseInt(baseMulEasyNo);
        } else {
            baseMulEasyNo = 0;
        }
        //多选题一般
        var baseMulMidNo = examPanelWindow.down("#baseMulMidNo").getValue();
        if (baseMulMidNo != "") {
            baseMulMidNo = parseInt(baseMulMidNo);
        } else {
            baseMulMidNo = 0;
        }
        //多选题困难
        var baseMulHardNo = examPanelWindow.down("#baseMulHardNo").getValue();
        if (baseMulHardNo != "") {
            baseMulHardNo = parseInt(baseMulHardNo);
        } else {
            baseMulHardNo = 0;
        }
        //examPanelWindow.down("#baseMulNo").value = baseMulEasyNo + baseMulMidNo + baseMulHardNo;
        //if (baseMulEasyNo + baseMulMidNo + baseMulHardNo != baseMulNo) {
        //    Ext.MessageBox.alert('温馨提示', '基础类多选题的个数错误！');
        //}
        //专业类判断题
        //判断题个数
        var judgeNo = examPanelWindow.down("#judgeNo").getValue();
        if (judgeNo != "") {
            judgeNo = parseInt(judgeNo);
        } else {
            judgeNo = 0;
        }
        //判断题单个分值
        var judgeScore = examPanelWindow.down("#judgeScore").getValue();
        if (judgeScore != "") {
            judgeScore = parseInt(judgeScore);
        } else {
            judgeScore = 0;
        }
        //判断题容易
        var judgeEasyNo = examPanelWindow.down("#judgeEasyNo").getValue();
        if (judgeEasyNo != "") {
            judgeEasyNo = parseInt(judgeEasyNo);
        } else {
            judgeEasyNo = 0;
        }
        //判断题一般
        var judgeMidNo = examPanelWindow.down("#judgeMidNo").getValue();
        if (judgeMidNo != "") {
            judgeMidNo = parseInt(judgeMidNo);
        } else {
            judgeMidNo = 0;
        }
        //判断题困难
        var judgeHardNo = examPanelWindow.down("#judgeHardNo").getValue();
        if (judgeHardNo != "") {
            judgeHardNo = parseInt(judgeHardNo);
        } else {
            judgeHardNo = 0;
        }
        //examPanelWindow.down("#judgeNo").value = judgeEasyNo + judgeMidNo + judgeHardNo;
        //if (judgeEasyNo + judgeMidNo + judgeHardNo != judgeNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类判断题的个数错误！');
        //}
        //专业类单选题
        //单选个数
        var singleNo = examPanelWindow.down("#singleNo").getValue();
        if (singleNo != "") {
            singleNo = parseInt(singleNo);
        } else {
            singleNo = 0;
        }
        //单选单个分值
        var singleScore = examPanelWindow.down("#singleScore").getValue();
        if (singleScore != "") {
            singleScore = parseInt(singleScore);
        } else {
            singleScore = 0;
        }
        //单选容易
        var singleEasyNo = examPanelWindow.down("#singleEasyNo").getValue();
        if (singleEasyNo != "") {
            singleEasyNo = parseInt(singleEasyNo);
        } else {
            singleEasyNo = 0;
        }
        //单选一般
        var singleMidNo = examPanelWindow.down("#singleMidNo").getValue();
        if (singleMidNo != "") {
            singleMidNo = parseInt(singleMidNo);
        } else {
            singleMidNo = 0;
        }
        //单选困难
        var singleHardNo = examPanelWindow.down("#singleHardNo").getValue();
        if (singleHardNo != "") {
            singleHardNo = parseInt(singleHardNo);
        } else {
            singleHardNo = 0;
        }
        //examPanelWindow.down("#singleNo").value = singleEasyNo + singleMidNo + singleHardNo;
        //if (singleEasyNo + singleMidNo + singleHardNo != singleNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类单选题的个数错误！');
        //}
        //专业类多选题
        var mulNo = examPanelWindow.down("#mulNo").getValue();
        if (mulNo != "") {
            mulNo = parseInt(mulNo);
        } else {
            mulNo = 0;
        }
        //专业类多选题单个分值
        var mulScore = examPanelWindow.down("#mulScore").getValue();
        if (mulScore != "") {
            mulScore = parseInt(mulScore);
        } else {
            mulScore = 0;
        }
        //专业类多选题容易
        var mulEasyNo = examPanelWindow.down("#mulEasyNo").getValue();
        if (mulEasyNo != "") {
            mulEasyNo = parseInt(mulEasyNo);
        } else {
            mulEasyNo = 0;
        }
        //专业类多选题一般
        var mulMidNo = examPanelWindow.down("#mulMidNo").getValue();
        if (mulMidNo != "") {
            mulMidNo = parseInt(mulMidNo);
        } else {
            mulMidNo = 0;
        }
        //专业类多选题困难
        var mulHardNo = examPanelWindow.down("#mulHardNo").getValue();
        if (mulHardNo != "") {
            mulHardNo = parseInt(mulHardNo);
        } else {
            mulHardNo = 0;
        }
        //examPanelWindow.down("#mulNo").value = mulEasyNo + mulMidNo + mulHardNo;
        //if (mulEasyNo + mulMidNo + mulHardNo != mulNo) {
        //    Ext.MessageBox.alert('温馨提示', '专业类多选题的个数错误！');
        //}
        //总分
        var totalScore = examPanelWindow.down("#totalScore").getValue();
        if (totalScore != "") {
            totalScore = parseInt(totalScore);
        } else {
            totalScore = 0;
        }
        totalScore = baseJudgeNo * baseJudgeScore + baseSingleNo * baseSingleScore + baseMulNo * baseMulScore + judgeNo * judgeScore + singleNo * singleScore + mulNo * mulScore;
        var totalScore = examPanelWindow.down("#totalScore").setValue(totalScore);
    }
});