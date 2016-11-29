Ext.define('ExtFrame.view.main.cms.CmsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.cmsForm',
    itemId: 'cmsForm',
    buttonAlign: 'center',
    region: 'center',
    viewModel: { type: 'cmsModel' },
    autoScroll:'true',
    controller: 'cmsController',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 60,
        padding: 5
    },
    initComponent: function () {
        var me = this;
        me.items = [{
            layout: 'column',
            itemId: 'column1',
            items: [{
                xtype: 'hiddenfield',
                itemId: 'hfOID',
                name: 'oid',
                bind: '{rec.oid}'
            },{
                xtype: 'hiddenfield',
                itemId: 'programCode',
                name: 'programCode',
                bind: '{rec.programCode}'
            },{
                xtype: 'combo',
                name: 'state',
                itemId: 'state',
                bind: '{rec.state}',
                emptyText: '请选择栏目分类',
                width:"100%",
                editable: false,// 是否允许输入
                queryMode: 'local',
                displayField: 'programName',
                valueField: 'programCode',
                fieldLabel: '栏目分类',
                allowBlank: false,
                field:{programName:'',programCode:''},
                store: Ext.create('ExtFrame.store.ModuleTree', {
                    proxy: {
                        type: 'ajax',
                        url: Tools.Method.getAPiRootPath() + "/cmsProgram/pagedQueryByBean.do?delFlag=0&isMain=0&limit=100",
                        reader: {
                            type: 'json',
                            rootProperty: 'rows',//数据根节点名称
                            totalProerty: 'total',//数据总数节点名称
                            idProperty: 'pttId'//id标示节点名称
                        },
                        //扩展参数
                        extraParams: {
                            'swhere': ""
                        },
                        listeners: {
                            //捕捉异常处理
                            exception: function (theproxy, response, operation, options) {
                                Tools.Method.ExceptionEncap(response);
                            }
                        }
                    }
                }),
                listeners: {
                    select: function (me, record, eOpts) {

                        Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/cmsProgram/queryChildren.do', 'GET', { 'code': record.data.programCode}, false, function (jsonData) {
                            me.up('#column1').down('#programCode').setValue(jsonData.code);
                        });

                    }
                }
            },{
                xtype: 'textfield',
                itemId: 'programName',
                name: 'programName',
                fieldLabel: '栏目名称',
                emptyText: '请输入栏目名称',
                width:"100%",
                allowBlank: false,
                bind: '{rec.programName}'
            },{
                xtype: 'textfield',
                itemId: 'url',
                name: 'url',
                fieldLabel: '栏目url',
                emptyText: '请输入url',
                width:"100%",
                bind: '{rec.url}'
            },{
                xtype: 'combo',
                name: 'akey',
                itemId: 'akey',
                bind: '{rec.akey}',
                width:"100%",
                emptyText: '请选择内网区域',
                editable: false,// 是否允许输入
                queryMode: 'local',
                displayField: 'keyText',
                valueField: 'keyValue',
                fieldLabel: '内网区域',
                store: Ext.create('Ext.data.Store', {
                    fields: ['keyValue', 'keyText'],
                    data: [
                        {'keyValue': 'A1', 'keyText': 'A1'},
                        {'keyValue': 'A2', 'keyText': 'A2'},
                        {'keyValue': 'A3', 'keyText': 'A3'},
                        {'keyValue': 'A4', 'keyText': 'A4'},
                        {'keyValue': 'A5', 'keyText': 'A5'},
                        {'keyValue': 'A6', 'keyText': 'A6'},
                        {'keyValue': 'A7', 'keyText': 'A7'},
                        {'keyValue': 'A8', 'keyText': 'A8'},
                        {'keyValue': 'A9', 'keyText': 'A9'},
                        {'keyValue': 'A10', 'keyText': 'A10'},
                        {'keyValue': 'A11', 'keyText': 'A11'},
                        {'keyValue': 'A12', 'keyText': 'A12'},
                        {'keyValue': 'A13', 'keyText': 'A13'},
                        {'keyValue': 'A14', 'keyText': 'A14'},
                        {'keyValue': 'A15', 'keyText': 'A15'},
                        {'keyValue': 'A16', 'keyText': 'A16'},
                        {'keyValue': 'A17', 'keyText': 'A17'},
                        {'keyValue': 'A18', 'keyText': 'A18'},
                        {'keyValue': 'A19', 'keyText': 'A19'},
                        {'keyValue': 'A20', 'keyText': 'A20'},
                        {'keyValue': 'A21', 'keyText': 'A21'},
                        {'keyValue': 'A22', 'keyText': 'A22'},
                        {'keyValue': 'A23', 'keyText': 'A23'},
                        {'keyValue': 'A24', 'keyText': 'A24'},
                        {'keyValue': 'A25', 'keyText': 'A25'},
                        {'keyValue': 'A26', 'keyText': 'A26'},
                        {'keyValue': 'A27', 'keyText': 'A27'},
                        {'keyValue': 'A28', 'keyText': 'A28'},
                        {'keyValue': 'A29', 'keyText': 'A29'}
                    ]
                })
            },{
                xtype: 'combo',
                name: 'bkey',
                itemId: 'bkey',
                bind: '{rec.bkey}',
                width:"100%",
                emptyText: '请选择外网区域',
                editable: false,// 是否允许输入
                queryMode: 'local',
                displayField: 'keyText',
                valueField: 'keyValue',
                fieldLabel: '外网区域',
                store: Ext.create('Ext.data.Store', {
                    fields: ['keyValue', 'keyText'],
                    data: [
                        {'keyValue': 'A1', 'keyText': 'A1'},
                        {'keyValue': 'A2', 'keyText': 'A2'},
                        {'keyValue': 'A3', 'keyText': 'A3'},
                        {'keyValue': 'A4', 'keyText': 'A4'},
                        {'keyValue': 'A5', 'keyText': 'A5'},
                        {'keyValue': 'A6', 'keyText': 'A6'},
                        {'keyValue': 'A7', 'keyText': 'A7'},
                        {'keyValue': 'A8', 'keyText': 'A8'},
                        {'keyValue': 'A9', 'keyText': 'A9'},
                        {'keyValue': 'A10', 'keyText': 'A10'},
                        {'keyValue': 'A11', 'keyText': 'A11'},
                        {'keyValue': 'A12', 'keyText': 'A12'},
                        {'keyValue': 'A13', 'keyText': 'A13'},
                        {'keyValue': 'A14', 'keyText': 'A14'},
                        {'keyValue': 'A15', 'keyText': 'A15'},
                        {'keyValue': 'A16', 'keyText': 'A16'},
                        {'keyValue': 'A17', 'keyText': 'A17'},
                        {'keyValue': 'A18', 'keyText': 'A18'},
                        {'keyValue': 'A19', 'keyText': 'A19'},
                        {'keyValue': 'A20', 'keyText': 'A20'},
                        {'keyValue': 'A21', 'keyText': 'A21'},
                        {'keyValue': 'A22', 'keyText': 'A22'},
                        {'keyValue': 'A23', 'keyText': 'A23'},
                        {'keyValue': 'A24', 'keyText': 'A24'},
                        {'keyValue': 'A25', 'keyText': 'A25'},
                        {'keyValue': 'A26', 'keyText': 'A26'},
                        {'keyValue': 'A27', 'keyText': 'A27'},
                        {'keyValue': 'A28', 'keyText': 'A28'},
                        {'keyValue': 'A29', 'keyText': 'A29'}
                    ]
                })
            }
            ]
        }
        ];
        me.buttons = [
            //{
            //    xtype: "button", text: "内网布局", handler: "onClickAKeyLayout"
            //},{
            //    xtype: "button", text: "外网布局", handler: "onClickBKeyLayout"
            //},
            {
                xtype: "button", text: "保存", handler: function(){

                    //var panel = this.up('panel').up('panel').up('panel');
                    //var cmsForm = panel.down('#cmsForm');
                    var cmsForm = this.up().up()
                    var cmsTree = cmsForm.cmsTree;
                //var cmsTree = panel.down('#cmsTree');
                    var record = cmsForm.getViewModel().getData().rec;
                    if (cmsForm.isValid()) {
                        //Ext.getBody().mask("请稍等，正在保存中...","x-mask-loading");
                        Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/cmsProgram/save.do', 'POST', record, true, function (jsonData) {
                            if (jsonData) {
                                if(record.oid){
                                    Tools.Method.ShowTipsMsg(Tools.Msg.MSG0006, '4000', '1', null);
                                }else{
                                    Tools.Method.ShowTipsMsg(Tools.Msg.MSG0005, '4000', '1', null);
                                }
                                //var form = panel.down('#cmsForm');
                                //form.getForm().reset();
                                Ext.getBody().unmask();
                                cmsTree.store.getProxy();
                                //重新加载grid
                                cmsTree.store.reload();
                                cmsForm.up().close();
                            } else {
                                Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);//修改失败
                            }
                        });
                    }else{
                        Ext.MessageBox.alert('提示', '请先填写数据！');
                    }
                }
            }
        ];
        me.callParent();
    }


});