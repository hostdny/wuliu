/**
 * Created by wangBin on 2016/8/18.
 */
Ext.define('ExtFrame.view.main.exam.examStudent.register.RegisterForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.registerForm',
    itemId: 'registerForm',
    region: 'center',
    viewModel: { type: 'registerModel' },
    layout: {type: 'border'},
    closeAction: 'destroy',
    buttonAlign: 'center',
    autoScroll:'true',
    fit: true,
    height:"100%",
    initComponent: function () {
        var me = this;
        var store = Ext.create("ExtFrame.store.Race");
        me.items = [{
            xtype: 'form',
            itemId: 'registerForm',
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
                    labelWidth: 110,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [{
                    xtype: 'hiddenfield',
                    itemId: 'hfOID',
                    name: 'id',
                    bind: '{rec.id}'
                },{
                    xtype: 'textfield',
                    name: 'userCName',
                    itemId: 'userCName',
                    bind: '{rec.userCName}',
                    emptyText: '请输入用户中文名',
                    fieldLabel: '用户中文名',
                    allowBlank: false,
                    allowDecimals: false
                },{
                    xtype: 'textfield',
                    name: 'userEName',
                    itemId: 'userEName',
                    bind: '{rec.userEName}',
                    emptyText: '请输入用户英文名',
                    fieldLabel: '用户英文名',
                    allowBlank: false,
                    allowDecimals: false
                },{
                    xtype: 'textfield',
                    name: 'idNo',
                    itemId: 'idNo',
                    bind: '{rec.idNo}',
                    emptyText: '请输入身份证号',
                    fieldLabel: '身份证号',
                    regex:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                    allowBlank: false,
                    allowDecimals: false,
                    listeners: {
                        change: function (me, newValue, oldValue, eOpts) {
                            var id = me.up('#registerForm').down('#hfOID').getValue();
                            Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/examStudent/isExist.do?idNo=' + newValue + '&id=' + id, 'GET', null, false, function (jsonData) {
                                if (jsonData.resultCode == "0") {
                                    valid = "身份证号已存在，请重新输入";
                                } else {
                                    valid = true;
                                }
                            });
                            me.validation = valid;
                        }
                    }
                },{
                    xtype: 'combo',
                    name: 'subject',
                    itemId: 'subject',
                    bind: '{rec.subject}',
                    emptyText: '请选择所属类别',
                    editable: false,// 是否允许输入
                    allowBlank: false,
                    queryMode: 'local',
                    displayField: 'dictName',
                    valueField: 'dictName',
                    fieldLabel: '所属类别',
                    store: Ext.create('ExtFrame.store.ModuleTree', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/dict/queryToCombo.do?dictType=EXAM_TYPE",
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
                },{
                    xtype: 'combo',
                    name: 'sex',
                    itemId: 'sex',
                    bind: '{rec.sex}',
                    emptyText: '请选择性别',
                    editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'sexText',
                    valueField: 'sexValue',
                    fieldLabel: '性别',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['sexValue', 'sexText'],
                        data: [
                            {'sexValue': '0', 'sexText': '男'},
                            {'sexValue': '1', 'sexText': '女'}
                        ]
                    })
                },{
                    xtype: 'combo',
                    name: 'race',
                    itemId: 'race',
                    bind: '{rec.race}',
                    emptyText: '请选择民族',
                    editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'name',
                    fieldLabel: '民族',
                    store: store
                },{
                    xtype: 'datefield',
                    name: 'userBirthday',
                    itemId: 'userBirthday',
                    bind: '{rec.userBirthday}',
                    emptyText: '请输入出生年月',
                    fieldLabel: '出生年月',
                    format: 'Y年m月d日',
                    editable: false
                },{
                    xtype: 'textfield',
                    name: 'politicalAffiliation',
                    itemId: 'politicalAffiliation',
                    bind: '{rec.politicalAffiliation}',
                    emptyText: '请输入政治面貌',
                    fieldLabel: '政治面貌',
                    allowDecimals: false
                },{
                    xtype: 'textfield',
                    name: 'degree',
                    itemId: 'degree',
                    bind: '{rec.degree}',
                    emptyText: '请输入文化程度',
                    fieldLabel: '文化程度',
                    allowDecimals: false
                },{
                    xtype: 'textfield',
                    name: 'telephone',
                    itemId: 'telephone',
                    bind: '{rec.telephone}',
                    emptyText: '请输入手机号码',
                    fieldLabel: '手机号码',
                    allowDecimals: false
                },{
                    xtype: 'textfield',
                    name: 'contractNo',
                    itemId: 'contractNo',
                    bind: '{rec.contractNo}',
                    emptyText: '请输入其他联系方式',
                    fieldLabel: '其他联系方式',
                    allowDecimals: false
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