Ext.define('ExtFrame.view.main.cms.CmsTree', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Ext.ux.CheckColumn'
    ],
    alias: 'widget.cmsTree',
    reserveScrollbar: true,
    rootVisible: false,
    useArrows: true,
    fit: true,
    collapsible:false,
    stripeRows: true,
    hideHeaders:true,
    listeners: {
        select: function (me, record, eOpts) {
            var panel = this.up('panel').up('panel').up('panel');
            var cmsGrid = panel.down('#cmsGrid');
            var cmsPanel = panel.down('#cmsPanel');
            //var window = panel.down('#cmsWindow');
            //var button=window.down('button');
            //button.setDisabled(true);
            var cmsPid = record.data.pid;
            if(record.data.isMain==0){
                cmsGrid.store.removeAll();
            }else{
                var cmsForm = cmsPanel.down("#cmsForm");
                var cmsGrid = cmsPanel.down("#cmsGrid");
                var cmsHtml = cmsPanel.down("#cmsHtml");
                cmsHtml.hide();
                cmsForm.hide();
                cmsGrid.show();
                //带附加参数重构grid store数据
                cmsGrid.store.getProxy().extraParams = {
                    'programId':cmsPid
                };
                //重新加载grid
                cmsGrid.store.reload();
            }
        }
    },
    initComponent: function () {
        var me = this;
        me.store = Ext.create('ExtFrame.store.ModuleTree', {
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+'/cmsProgram/queryAll.do'
            }
        });
        me.columns = [{
            xtype: 'treecolumn',
            dataIndex: 'name',
            width:'98%'
        }];
        me.buttons = [
            {
                xtype: "button", text: "增加栏目", handler: function(){
                var cmsForm = Ext.create('Ext.Window', {
                    width: 850,
                    height:550,
                    plain: true,
                    modal : true,
                    layout: 'fit',
                    closeAction: 'destroy',
                    title: '增加栏目',
                    autoShow: true,
                    closable: true,
                    itemId: 'cmsForms',
                    items: {
                        xtype: 'cmsForm',
                        itemId: 'cmsForm',
                        'cmsTree':'',
                        requires: ['ExtFrame.view.main.cms.CmsController'],
                        controller: 'cmsController'
                    }
                }).show();
                cmsForm.down('#cmsForm').cmsTree = me;
                    //var panel = this.up('panel').up('panel').up('panel');
                    //var window = panel.down('#cmsWindow');
                    //var button=window.down('button');
                    //button.setDisabled(true);
                    //var cmsPanel = panel.down('#cmsPanel');
                    //var cmsForm = cmsPanel.down("#cmsForm");
                    //var cmsGrid = cmsPanel.down("#cmsGrid");
                    //cmsForm.show();
                    //cmsGrid.hide();
                    cmsForm.getForm().reset();
                }
            },{
                xtype: "button", text: "修改栏目", handler: function(){
                    var cmsForm = Ext.create('Ext.Window', {
                        width: 850,
                        height:550,
                        plain: true,
                        modal : true,
                        layout: 'fit',
                        closeAction: 'destroy',
                        title: '修改栏目',
                        autoShow: true,
                        closable: true,
                        itemId: 'cmsForms',
                        items: {
                            xtype: 'cmsForm',
                            itemId: 'cmsForm',
                            'cmsTree':'',
                            requires: ['ExtFrame.view.main.cms.CmsController'],
                            controller: 'cmsController'
                        }
                    }).show();
                    cmsForm.down('#cmsForm').cmsTree = me;
                    //var panel = this.up('panel').up('panel').up('panel');
                    //var window = panel.down('#cmsWindow');
                    //var button=window.down('button');
                    //button.setDisabled(true);
                    var selections = me.getSelection();
                    if(selections.length>0){
                        //if(selections[0].data.isMain == 1){
                            //var cmsPanel = panel.down('#cmsPanel');
                            //var cmsForm = cmsPanel.down("#cmsForm");
                            //var cmsGrid = cmsPanel.down("#cmsGrid");
                            //cmsForm.show();
                            //cmsGrid.hide();
                            var form = cmsForm.down("#column1");
                            form.down('#hfOID').setValue(selections[0].data.pid);
                            form.down('#programCode').setValue(selections[0].data.code);
                            form.down('#programName').setValue(selections[0].data.name);
                            form.down('#state').setValue(selections[0].data.type);
                            form.down('#url').setValue(selections[0].data.url);
                            form.down('#akey').setValue(selections[0].data.akey);
                            form.down('#bkey').setValue(selections[0].data.bkey);
                        //}
                    }else{
                        Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
                    }
                }
            },{
                xtype: "button", text: "删除栏目", handler: function() {
                    //var panel = this.up('panel').up('panel').up('panel');
                    //var window = panel.down('#cmsWindow');
                    //var button=window.down('button');
                    //button.setDisabled(true);
                    var selections = me.getSelection();
                    if (selections.length > 0) {
                        if (selections[0].data.isMain == 1) {
                            var cmsTree =this.up().up();
                            var data = {ids: selections[0].data.pid};
                            Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
                                if (btn == 'yes') {
                                    Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/cmsProgram/delete.do', 'POST', data, true, function (jsonData) {
                                        if (jsonData) {
                                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG00141, [jsonData.sCount, jsonData.fCount]), '4000', '1', null);
                                            cmsTree.store.getProxy();
                                            //重新加载grid
                                            cmsTree.store.reload();
                                            //var form = panel.down('#cmsForm');
                                            //form.getForm().reset();
                                        }
                                        else {
                                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                                        }
                                    });
                                }
                            });
                        }
                    }else{
                        Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
                    }
                }
            }
        ];
        me.callParent();

    }
});