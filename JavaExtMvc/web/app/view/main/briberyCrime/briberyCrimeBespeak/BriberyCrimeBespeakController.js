/**
 * Created by zzw on 2016/9/24.
 */
Ext.define('ExtFrame.view.main.briberyCrime.briberyCrimeBespeak.BriberyCrimeBespeakController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.briberyCrimeBespeakController',

    onClickButtonLook: function () {
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var view = this.getView();
        var pnGrid = view.down('#briberyCrimeBespeakGrid');
        var selectRecords = pnGrid.getSelection();//获取grid选中行records
        //仅能选择一项数据
        if (Tools.Method.IsEditData(selectRecords)) {
            var bespeakState = selectRecords[0].data.bespeakState;
            if(bespeakState !='0'){
                Ext.MessageBox.alert('提示', '只能修改审核中的预约！');
                return;
            }
            //处理方式 1现场办理  0在线办理
            var win = Ext.create('Ext.Window', {
                width: 850,
                height:550,
                plain: true,
                layout: 'fit',
                modal : true,
                closeAction: 'destroy',
                title: '预约回复',
                autoShow: true,
                closable: true,
                itemId: 'briberyCrimeBespeakWindow',
                items: {
                    xtype: 'briberyCrimeBespeakWindow',
                    //'cmsArticleGrid':'',
                    requires: [
                        'ExtFrame.view.main.briberyCrime.briberyCrimeBespeak.BriberyCrimeBespeakController',
                        'ExtFrame.view.main.briberyCrime.briberyCrimeBespeak.BriberyCrimeBespeakGrid',
                        'ExtFrame.view.main.briberyCrime.briberyCrimeBespeak.DownLoadGrid',
                        'ExtFrame.view.main.briberyCrime.briberyCrimeBespeak.BriberyCrimeBespeakModel',
                        'ExtFrame.view.main.briberyCrime.briberyCrimeBespeak.BriberyCrimeBespeakWindow'
                    ],
                    controller: 'briberyCrimeBespeakController'
                }
            }).show();
            var downLoadGrid = win.down('#downLoadGrid');
            var form = win.down('form');
            form.down("#address").hide();
            form.down("#reply").hide();
            form.down("#addImg").hide();
            win.down('form').getForm().reset();//表单清空
            form.getForm().reset();//表单清空
            form.getForm().loadRecord(selectRecords[0]);
            form.down("#bespeakState").setValue("");
            downLoadGrid.store.getProxy().extraParams = {
                businessData:selectRecords[0].data.id
            };
            //重新加载grid
            downLoadGrid.store.reload();
        }
    },


    onClickButtonSave: function () {
        var ActionSave = Tools.Method.getAPiRootPath() + '/briberyCrimeBespeak/saveBriberyCrimeBespeak.do';
        //登录状态判断
        if (!Tools.Method.IsLogin())
            return;
        var view = this.getView();
        var form = view.down('#' + view.ename + 'Form');
        var Grid = Ext.getCmp("briberyCrimeBespeakGridId");
        var bespeakState = form.down('#bespeakState').getValue();
        var address = form.down('#address').getValue();
        var giveWay = form.down('#giveWay').getValue();
        var reply = form.down('#reply').getValue();
        var addImg = form.down('#addImg').getValue();
        if(bespeakState=='1' && address==''){
            Ext.MessageBox.alert('提示', '请检查预约时间、收件地址是否填写！');
            return;
        }
        if(bespeakState=='2'&& reply==''){
            Ext.MessageBox.alert('提示', '请先填写拒绝理由！');
            return;
        }
        if(bespeakState=='1'&& addImg==''&&giveWay=='0'){
            Ext.MessageBox.alert('提示', '请上传附件！');
            return;
        }
        form.form.doAction('submit', {
            submitEmptyText : false,
            url : ActionSave,
            method : 'POST',
            success : function(form1, action) {
                if (action.result.success) {
                    form.getForm().reset();
                    view.getViewModel().getData().rec = null;
                    Tools.Method.ShowTipsMsg(Tools.Msg.MSG0007, '4000', '1', null);
                    Grid.store.reload();
                    form.up("panel").up("panel").close();
                }else {
                    Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                }
            },
            failure : function(form, action) {
                Ext.MessageBox.alert('提示', '请上传正确的文件类型！');
            }
        });
    }

});