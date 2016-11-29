Ext.define('ExtFrame.view.main.tipOff.tipOffDispose.TipOffDisposeWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.tipOffDisposeWindow',
    viewModel: {type: 'tipOffDisposeModel'},
    layout: {type: 'border'},
    width: 700,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '详细信息',
    buttonAlign: 'center',
    autoScroll:'true',
    fit: true,
    id: 'tipOffDisposeWindow',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'tipOffDisposeForm',
            region: 'center',
            autoScroll: true,
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'right',
                padding: 2
            },
            items: [{
                xtype: 'fieldset',
                title: '人员信息',
                itemId: 'column1',
                collapsible: true,
                defaults: {
                    labelWidth: 89,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [{
                    xtype: 'hiddenfield',
                    itemId: 'ID',
                    name: 'id',
                    bind: '{rec.id}',
                    readOnly:true
                },{
                    xtype: 'displayfield',
                    name: 'tiperName',
                    itemId: 'tiperName',
                    bind: '{rec.tiperName}',
                    fieldLabel: '姓名',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'tiperMid',
                    itemId: 'tiperMid',
                    bind: '{rec.tiperMid}',
                    fieldLabel: '身份证',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'tiperNumber',
                    itemId: 'tiperNumber',
                    bind: '{rec.tiperNumber}',
                    fieldLabel: '电话',
                    width:'100%',
                    allowDecimals: false
                }]
            },{
                xtype: 'fieldset',
                title: '举报信息',
                itemId: 'column2',
                collapsible: true,
                defaults: {
                    labelWidth: 89,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [{
                    xtype: 'displayfield',
                    name: 'tipTypeShow',
                    itemId: 'tipTypeShow',
                    bind: '{rec.tipTypeShow}',
                    fieldLabel: '举报类型',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'tipName',
                    itemId: 'tipName',
                    bind: '{rec.tipName}',
                    fieldLabel: '举报标题',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'addMessage1',
                    itemId: 'addMessage1',
                    bind: '{rec.addMessage1}',
                    fieldLabel: '举报简介',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'rptDate',
                    itemId: 'rptDate',
                    bind: '{rec.rptDate}',
                    fieldLabel: '举报时间',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'accepterName',
                    itemId: 'accepterName',
                    bind: '{rec.accepterName}',
                    fieldLabel: '负责人',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'accepterNumber',
                    itemId: 'accepterNumber',
                    bind: '{rec.accepterNumber}',
                    fieldLabel: '负责人电话',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    name: 'tipStateDisplay',
                    hidden:true,
                    itemId: 'tipStateDisplay',
                    bind: '{rec.tipStateDisplay}',
                    fieldLabel: '信息状态',
                    width:'100%',
                    allowDecimals: false
                },{
                    xtype: 'combo',
                    name: 'tipState',
                    itemId: 'tipState',
                    hidden:true,
                    bind: '{rec.tipState}',
                    width:"100%",
                    emptyText: '请选择状态',
                    editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'dictName',
                    valueField: 'dictValue',
                    fieldLabel: '信息状态',
                    field:{dictName:'',dictValue:''},
                    store: Ext.create('ExtFrame.store.ModuleTree', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/dict/queryToCombo.do?dictType=JBZT",
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
                    })
                }]
            },{
                xtype: 'tipOffDisposeWindowGrid',
                itemId: 'tipOffDisposeWindowGrid',
                width:"100%"

            }]
        }];
        me.buttons = [
            {
                xtype: "button", text: "保存",itemId:'saveButton', hidden:true,handler: 'onClickButtonSave'
            },{
                xtype: "button", text: "关闭", handler: 'onClickClear'
            }
        ];
        me.callParent();
    }
});
