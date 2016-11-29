/**
 * Created by LvXL on 2016/7/4.
 */
Ext.define('ExtFrame.view.main.sys.personInfoManager.PersonInfoWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.personInfoWindow',
    controller: 'personInfoController',
    viewModel: {type: 'personInfoModel'},
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 400,
    closeAction: 'destroy',
    title: '用户管理',
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: me.ename + 'Form',
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
                    itemId: 'hfOID',//注意，此itemId要写固定，functionjs中重置from有用到
                    name: 'id',
                    bind: '{rec.id}'
                }, {
                    xtype: 'textfield',
                    name: 'userCName',
                    id: 'userCName',
                    bind: '{rec.userCName}',
                    allowBlank: false,
                    fieldLabel: '中文名称',
                    maxLength: 50
                }, {
                    xtype: 'textfield',
                    name: 'userEName',
                    id: 'userEName',
                    bind: '{rec.userEName}',
                    allowBlank: false,
                    fieldLabel: '英文名称',
                    maxLength: 50,
                    listeners: {
                        change: function (me, newValue, oldValue, eOpts) {
                            var value = me.getValue();
                            if (value == '') {
                                valid = "请输入角色编码";
                            }else{
                                var id = me.up('#column1').down('#hfOID').getValue();
                                Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/personInfo/nameIsExist.do?userEName=' + value + '&id=' + id, 'GET', null, false, function (jsonData) {
                                    if (jsonData.resultCode == "0") {
                                        valid = "英文名称已存在，请重新输入";
                                    } else {
                                        valid = true;
                                    }
                                });
                            }
                            me.validation = valid;
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'userPwd',
                    id: 'userPwd',
                    bind: '{rec.userPwd}',
                    allowBlank: false,
                    fieldLabel: '用户密码',
                    maxLength: 100
                }, {
                    xtype: 'textfield',
                    fieldLabel: '身份证号',
                    name: 'userCard',
                    id: 'userCard',
                    allowBlank: false,
                    bind: '{rec.userCard}',
                    regex: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                    regexText: '请输入正确的身份证号'
                }, {
                    xtype: 'datefield',
                    name: 'userBirthday',
                    itemId: 'userBirthday',
                    bind: '{rec.userBirthday}',
                    format: 'Y-m-d',
                    emptyText: '请选择出生日期',
                    fieldLabel: '出生日期',
                    editable: false,
                    allowBlank: false
                }, {
                    xtype: 'combo',
                    name: 'userSex',
                    bind: '{rec.userSex}',
                    editable: false,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['text', 'value'],
                        data: [{'value': '0', 'text': '男'}, {'value': '1', 'text': '女'}]
                    }),
                    queryMode: 'local',
                    displayField: 'text',
                    valueField: 'value',
                    fieldLabel: '用户性别'
                }, {
                    xtype: 'hiddenfield',
                    itemId: 'orgId',
                    name: 'orgId',
                    bind: '{rec.orgId}'
                }, {
                    xtype: 'treepicker',
                    itemId: 'orgPicker',
                    fieldLabel: '组织机构',
                    name: 'orgName',
                    displayField: 'cName',
                    valueField: 'id',
                    bind: '{rec.orgName}',
                    forceSelection: true,// 只能选择下拉框里面的内容
                    emptyText: '请选择组织机构',
                    allowBlank: false,// 不允许为空
                    blankText: '请选择组织机构',// 该项如果没有选择，则提示错误信息
                    rootVisible: false,
                    store: Ext.create('ExtFrame.store.OrgTree', {
                        root: {
                            oid: '00000000000000000000000000000000',
                            name: '',
                            id: '00000000000000000000000000000000',
                            expanded: true
                        },
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + '/organization/queryOrgToCombo.do',
                            reader: {
                                type: 'json'
                            },
                            extraParams: {
                                'parentId': '00000000000000000000000000000000'
                            }
                        },
                        listeners: {
                            nodebeforeexpand: function (node, eOpts) {
                                //点击父亲节点的菜单会将节点的id通过ajax请求，将到后台
                                this.proxy.extraParams.parentId = node.id;
                            }
                        },
                        clearOnLoad: true,
                        nodeParam: 'PID'
                    }),
                    listeners : {
                        select: function (me, record, eOpts) {
                            me.up('#column1').down('#orgId').setValue(record.data.id);
                        }
                    }
                }, {
                    xtype: 'combo',
                    name: 'state',
                    bind: '{rec.state}',
                    editable: false,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['text', 'value'],
                        data: [{'value': '0', 'text': '启用'}, {'value': '1', 'text': '停用'}]
                    }),
                    queryMode: 'local',
                    displayField: 'text',
                    valueField: 'value',
                    fieldLabel: '状态',
                    listeners: {
                        afterRender: function (combo) {
                            combo.setValue(combo.getStore().getAt(0).data.abbr);
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'userCode',
                    id: 'userCode',
                    bind: '{rec.userCode}',
                    allowBlank: false,
                    fieldLabel: '用户编码',
                    maxLength: 100
                }, {
                    xtype: 'combo',
                    name: 'userDegree',
                    bind: '{rec.userDegree}',
                    allowBlank: false,
                    emptyText: '职位',
                    fieldLabel: '职位',
                    editable: false,
                    displayField: 'dictName',
                    valueField: 'dictValue',
                    field:{dictName:'',dictValue:''},
                    store: Ext.create('ExtFrame.store.ModuleTree', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/dict/queryToCombo.do?dictType=ZHIWEI",
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
                    xtype: 'textfield',
                    name: 'telephone',
                    id: 'telephone',
                    bind: '{rec.telephone}',
                    allowBlank: false,
                    fieldLabel: '联系电话',
                    maxLength: 100
                }]
            },{
                xtype: 'fieldset',
                title: '其他信息',
                itemId: 'column2',
                collapsible: true,
                defaults: {
                    labelWidth: 89,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'userMail',
                        itemId: 'userMail',
                        bind: '{rec.userMail}',
                        fieldLabel: '用户邮箱',
                        maxLength: 100
                    }, {
                        xtype: 'textfield',
                        name: 'userQQ',
                        itemId: 'userQQ',
                        bind: '{rec.userQQ}',
                        fieldLabel: '用户QQ',
                        maxLength: 100
                    }, {
                        xtype: 'textfield',
                        name: 'remark',
                        bind: '{rec.remark}',
                        emptyText: '请输入备注',
                        fieldLabel: '备注',
                        maxLength: 200
                    }, {
                        xtype: 'button',
                        text: '上传图像',
                        anchor: '20%',
                        iconAlign: 'right',
                        listeners: {
                            click: 'onClickPhotoUpload'
                        }
                    }, {
                        xtype: 'hiddenfield',
                        itemId: 'userPhotoUrl_attachmentId',
                        id: 'userPhotoUrl_attachmentId',
                        name: 'attachmentId',
                    }, {
                        xtype: 'box', //或者xtype: 'component',
                        id: 'img_show',
                        width: 100, //图片宽度
                        height: 200, //图片高度
                        margin: "10 0 0 0",
                        autoEl: {
                            tag: 'img',    //指定为img标签
                            src: ''    //指定url路径
                        }
                    }
                ]
            }]
        }];
        me.buttons = [
            {
                xtype: "button",
                id: 'personInfoWindowSaveButton',
                text: "保存",
                handler: 'onClickButtonSave'
            },
            {
                xtype: "button",
                text: "关闭",
                handler: function () {
                    this.up("panel").collapse();
                    // 按钮启用
                    Ext.getCmp("personInfoWindowSaveButton").enable();
                }
            }
        ];
        this.callParent();
    }
});
// image/B000001.jpg