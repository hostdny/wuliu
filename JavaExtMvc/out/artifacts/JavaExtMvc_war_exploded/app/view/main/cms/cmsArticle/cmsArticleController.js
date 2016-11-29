/**
 * Created by lihaiyue on 2016/9/27.
 */
Ext.define('ExtFrame.view.main.cms.cmsArticle.cmsArticleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cmsArticleController',

    //onClickButtonAdd:function(grid, winClassName, winTitle, callback) {
    //    // 创建内容页并传递 操作类型
    //    var win = Ext.create(winClassName, {
    //        grid : grid
    //    });
    //    win.setTitle(winTitle);
    //    if (callback != null) {// 处理特殊的业务需求
    //        callback(win);
    //    }
    //    win.show();
    //    return win;
    //},
    onClickButtonAdd: function (button) {
        if (!Tools.Method.IsLogin) {
            return;
        }
        var win = Ext.create('Ext.Window', {
            width: 850,
            height: 550,
            plain: true,
            layout: 'fit',
            modal: true,
            closeAction: 'destroy',
            title: '信息预览与编辑',
            autoShow: true,
            closable: true,
            itemId: 'cmsArticleWindows',
            items: {
                xtype: 'cmsArticleWindow',
                itemId: 'cmsArticleWindow',
                'cmsArticleGrid': '',
                requires: ['ExtFrame.view.main.cms.cmsArticle.cmsArticleController'],
                controller: 'cmsArticleController'
            }
        }).show();
        var btn = win.down('button');
        btn.enable();
        win.down('#cmsArticleWindowForm').reset();

        //var cmsArticleGrid = button.up('#cmsArticlePanel').down('cmsArticleGrid');
        //win.down('#cmsArticleWindow').cmsArticleGrid = cmsArticleGrid;

        var view = this.getView();
        var win = Ext.getCmp('cmsArticleWindow');
        var form = win.down('#cmsArticleWindowForm');
        var pnGrid = Ext.getCmp("cmsArticleGrid");
        form.down('#siteName').setRawValue(pnGrid.down("#siteName").getRawValue());
        form.down('#siteId').setValue(pnGrid.down("#siteName").getValue());
        form.down('#programId').setValue(pnGrid.down("#programId").getValue());
        form.down('#programName').store.getProxy().extraParams = {
            'siteId': pnGrid.down("#siteName").getValue()
        };
        form.down('#programName').store.reload(
            {
                callback: function () {
                    form.down('#programName').setRawValue(pnGrid.down("#programName").getRawValue());
                }
            });
        win.down('#subjectName').store.getProxy().extraParams = {
            'siteId': pnGrid.down("#siteName").getValue()
        };
        win.down('#subjectName').store.reload();
    },

    //修改方法
    onClickButtonEdit: function (button) {
        if (!Tools.Method.IsLogin) {
            return;
        }
        var view = this.getView();
        var grid = view.down("#cmsArticleGrid");//获取当前grid控件
        var selection = grid.getSelectionModel().getSelection();
        if (selection.length > 1) {
            Ext.MessageBox.alert('提示', '很抱歉，请选择一条数据！');
            return;
        }
        if (selection.length == 0) {
            Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
            return;
        }
        var win = Ext.create('Ext.Window', {
            width: 850,
            height: 550,
            plain: true,
            layout: 'fit',
            modal: true,
            closeAction: 'destroy',
            title: '信息预览与编辑',
            autoShow: true,
            closable: true,
            itemId: 'cmsArticleWindows',
            items: {
                xtype: 'cmsArticleWindow',
                'cmsArticleGrid': '',
                itemId: 'cmsArticleWindow',
                requires: ['ExtFrame.view.main.cms.cmsArticle.cmsArticleController'],
                controller: 'cmsArticleController'
            }
        }).show();
        //var win = button.up('#cmsArticlePanel').up().down('#cmsArticleWindow');
        win.down('button').enable();
        win.down('#cmsArticleWindow').cmsArticleGrid = grid;
        var artilceContext = win.down('#artilceContext');
        //var childrenArtilceContext = win.down('#childrenArtilceContext');
        win.down('#cmsArticleWindowForm').getForm().loadRecord(selection[0]);

        win.down('#programId').setValue(selection[0].raw.programId);
        win.down('#programName').store.getProxy().extraParams = {
            'siteId': selection[0].raw.siteId
        };

        win.down('#subjectId').setValue(selection[0].raw.subjectId);
        win.down('#subjectName').store.getProxy().extraParams = {
            'siteId': selection[0].raw.siteId
        };

        win.down('#programName').store.load();
        setTimeout(function () {
            win.down('#programId').setValue(selection[0].raw.programId);
            win.down('#programName').setRawValue(selection[0].raw.programName);
            //debugger;
            //win.down('#subjectId').setValue(selection[0].raw.subjectId);
            //win.down('#subjectName').setRawValue(selection[0].raw.subjectName);
            if (artilceContext.getValue() != null) {
                var old = win.down('#hiddenArtilceContext').getValue();
                win.down('#hiddenArtilceContext').setValue("");
                win.down('#hiddenArtilceContext').setValue(old);
            }
            //if (childrenArtilceContext.getValue() != null) {
            //    var old = win.down('#hiddenChildrenArtilceContext').getValue();
            //    win.down('#hiddenChildrenArtilceContext').setValue("");
            //    win.down('#hiddenChildrenArtilceContext').setValue(old);
            //}
        }, 1000);
    },
    //删除
    onClickButtonDel: function (button) {
        //判断用户登陆是否超时
        if (!Tools.Method.IsLogin) {
            return;
        }

        var grid = button.up('#cmsArticlePanel').down('#cmsArticleGrid');
        var selection = grid.getSelectionModel().getSelection();//获取grid中的选中行
        if (selection[0]) {
            var id = "";
            for (var i = 0; i < selection.length; i++) {
                id += selection[i].id + ",";
            }
            var data = {ids: id};
            //用户确认删除操作-----点击“是”
            Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
                if (btn == 'yes') {
                    Tools.Method.ExtAjaxRequestEncap('/cmsArticle/delete.do', 'POST', data, true, function (jsonData) {
                        if (jsonData.resultCode) {
                            grid.store.getProxy().extraParams = {
                                'programId': selection[0].data.programId
                            };
                            grid.store.reload();
                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG00141, [jsonData.sCount, jsonData.fCount]), '4000', '1', null);
                        }
                        else {
                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                        }
                    });
                }
            });
        } else {
            Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
        }
    },
    //搜索
    onClickSearch: function () {
        var panel = Ext.getCmp('cmsArticleManagerId');
        var siteId = panel.down("#siteName").value;//获得站点Id
        var siteName = panel.down("#siteName").rawValue;
        var programName = panel.down("#programName").rawValue;//获得栏目名称
        var programId = panel.down("#programId").value;
        var artilceTittle = panel.down("#artilceTittle").rawValue;//获得文章标题
        var cmsArticleGrid = panel.down("#cmsArticleGrid");
        var programName = panel.down("#programName");
        if(siteName == ""){
            siteId = "";
        }
        cmsArticleGrid.store.getProxy().extraParams = {
            siteId: siteId,
            programId: programId,
            artilceTittle: artilceTittle
        };
        cmsArticleGrid.store.reload();
    },
    onClickBack: function () {
        var panel = Ext.getCmp('cmsArticleManagerId');
        var cmsLinkGrid = panel.down("#cmsArticleGrid");
        cmsLinkGrid.down("#siteName").setValue("");
        cmsLinkGrid.down("#artilceTittle").setValue("");
        cmsLinkGrid.down("#programName").setValue("");
        cmsLinkGrid.down("#programId").setValue("");
        cmsLinkGrid.store.getProxy().extraParams = {
            artilceTittle:""
        };
        cmsLinkGrid.store.reload();
        var programName = panel.down("#programName");
        programName.disable();
    }
});