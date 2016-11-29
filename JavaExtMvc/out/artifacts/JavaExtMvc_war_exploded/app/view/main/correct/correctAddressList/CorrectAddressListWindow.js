/**
 * Created by wangBin on 2016/7/28.
 */
Ext.define('ExtFrame.view.main.correct.correctAddressList.CorrectAddressListWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.correctAddressListWindow',
    viewModel: {type: 'correctAddressListModel'},
    layout: {type: 'border'},
    width: 700,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '矫正通讯录信息',
    buttonAlign: 'center',
    autoScroll:true,
    fit: true,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'correctAddressListForm',
            ename: me.ename,
            region: 'center',
            autoScroll: true,
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'right',
                padding: 2
            },
            items: [{
                xtype: 'fieldset',
                title: '基本信息',
                itemId: 'column1',
                collapsible: true,
                defaults: {
                    labelWidth: 89,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [{
                    xtype: 'hiddenfield',
                    itemId: 'hfOID',
                    name: 'id',
                    bind: '{rec.id}'
                },{
                    xtype: 'hiddenfield',
                    itemId: 'correctName',
                    name: 'id',
                    bind: '{rec.correctName}'
                },{
                    xtype: 'hiddenfield',
                    itemId: 'mid',
                    name: 'mid',
                    bind: '{rec.mid}'
                },{
                    xtype: 'combo',
                    name: 'nameAndMid',
                    itemId: 'nameAndMid',
                    bind: '{rec.nameAndMid}',
                    emptyText: '请选择姓名',
                    editable: false,// 是否允许输入
                    allowBlank: false,
                    queryMode: 'local',
                    displayField: 'nameAndMid',
                    valueField: 'nameAndMid',
                    fieldLabel: '姓名',
                    store: Ext.create('ExtFrame.store.ModuleTree', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/correctRecord/getPersonInfo.do",
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
                    }),listeners: {
                        select: "onSelectCombo"
                    }
                },{
                    xtype: 'textfield',
                    name: 'personNum',
                    itemId: 'personNum',
                    bind: '{rec.personNum}',
                    emptyText: '请输入编号',
                    fieldLabel: '编号',
                    readOnly:true,
                    allowBlank: false,
                    allowDecimals: false
                },{
                    xtype: 'textfield',
                    name: 'correctSex',
                    itemId: 'correctSex',
                    bind: '{rec.correctSex}',
                    emptyText: '请输入性别',
                    fieldLabel: '性别',
                    readOnly:true,
                    allowBlank: false,
                    allowDecimals: false
                },{
                    xtype: 'textfield',
                    name: 'telephone',
                    itemId: 'telephone',
                    bind: '{rec.telephone}',
                    emptyText: '请输入联系方式',
                    fieldLabel: '联系方式',
                    readOnly:true,
                    allowBlank: false,
                    allowDecimals: false
                },{
                    xtype: 'datefield',
                    name: 'stateTime',
                    itemId: 'stateTime',
                    bind: '{rec.stateTime}',
                    emptyText: '请输入矫正开始时间',
                    fieldLabel: '矫正开始时间',
                    format: 'Y年m月d日',
                    allowBlank: false,
                    editable: false
                },{
                    xtype: 'datefield',
                    name: 'endTime',
                    itemId: 'endTime',
                    bind: '{rec.endTime}',
                    emptyText: '请输入矫正结束时间',
                    fieldLabel: '矫正结束时间',
                    format: 'Y年m月d日',
                    allowBlank: false,
                    editable: false
                },{
                    xtype: 'textareafield',
                    name: 'remark',
                    itemId: 'remark',
                    bind: '{rec.remark}',
                    emptyText: '请输入备注',
                    fieldLabel: '备注',
                    allowDecimals: false
                }]
            }]
        }];
        me.buttons = [
            {
                xtype: "button", text: "保存",handler: 'onClickButtonSave'
            },{
                xtype: "button", text: "关闭", handler: 'onClickClear'
            }
        ];
        me.callParent();
    }
});
