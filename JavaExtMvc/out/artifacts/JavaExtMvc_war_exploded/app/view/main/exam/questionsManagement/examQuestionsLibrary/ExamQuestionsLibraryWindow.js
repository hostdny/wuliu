/**
 * Created by zzw on 2016/8/18.
 */
Ext.define('ExtFrame.view.main.exam.questionsManagement.examQuestionsLibrary.ExamQuestionsLibraryWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.examQuestionsLibraryWindow',
    controller: 'examQuestionsLibraryController',
    viewModel: {type: 'examQuestionsLibraryModel'},
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 700,
    closeAction: 'destroy',
    title: '试题维护',
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
                title: '试题维护',
                itemId: 'column1',
                collapsible: true,
                defaults: {
                    labelWidth: 89,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [
                    {
                        xtype: 'displayfield',
                        name: 'typeOfWork',
                        itemId: 'typeOfWork',
                        bind: '{rec.typeOfWork}',
                        fieldLabel: '所属类别',
                        allowDecimals: false
                    },{   xtype: 'combo',
                        id: 'testType',
                        name: 'testType',
                        bind: '{rec.testType}',
                        allowBlank: false,
                        emptyText: '题型',
                        fieldLabel: '题型',
                        editable: false,
                        displayField: 'dictName',
                        valueField: 'dictValue',
                        field:{dictName:'',dictValue:''},
                        store: Ext.create('ExtFrame.store.ModuleTree', {
                            proxy: {
                                type: 'ajax',
                                url: Tools.Method.getAPiRootPath() + "/dict/queryToCombo.do?dictType=STLX",
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
                                var form = me.up('#examQuestionsLibraryForm');
                                if(record.data.dictName == "单选"){
                                    form.down("#ansA").show();
                                    form.down("#ansB").show();
                                    form.down("#ansC").show();
                                    form.down("#ansD").show();
                                    form.down("#ansE").hide();
                                    form.down("#ansF").hide();
                                    form.down("#rightAns").show();
                                }else if(record.data.dictName == "多选"){
                                    form.down("#ansA").show();
                                    form.down("#ansB").show();
                                    form.down("#ansC").show();
                                    form.down("#ansD").show();
                                    form.down("#ansE").show();
                                    form.down("#ansF").show();
                                    form.down("#rightAns").show();
                                }else if(record.data.dictName == "判断"){
                                    form.down("#ansA").show();
                                    form.down("#ansB").show();
                                    form.down("#ansC").hide();
                                    form.down("#ansD").hide();
                                    form.down("#ansE").hide();
                                    form.down("#ansF").hide();
                                    form.down("#rightAns").hide();
                                }
                            }
                        }
                    }, {
                        xtype: 'combo',
                        name: 'difficulty',
                        bind: '{rec.difficulty}',
                        allowBlank: false,
                        emptyText: '试题难度',
                        fieldLabel: '试题难度',
                        editable: false,
                        displayField: 'dictName',
                        valueField: 'dictValue',
                        field:{dictName:'',dictValue:''},
                        store: Ext.create('ExtFrame.store.ModuleTree', {
                            proxy: {
                                type: 'ajax',
                                url: Tools.Method.getAPiRootPath() + "/dict/queryToCombo.do?dictType=NYD",
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
                        id: 'ansA',
                        itemId: 'ansA',
                        name: 'ansA',
                        bind: '{rec.ansA}',
                        emptyText: '请输入答案选项',
                        fieldLabel: 'A'
                    },{
                        xtype: 'textfield',
                        id: 'ansB',
                        itemId: 'ansB',
                        name: 'ansB',
                        bind: '{rec.ansB}',
                        emptyText: '请输入答案选项',
                        fieldLabel: 'B'
                    },{
                        xtype: 'textfield',
                        id: 'ansC',
                        itemId: 'ansC',
                        name: 'ansC',
                        bind: '{rec.ansC}',
                        emptyText: '请输入答案选项',
                        fieldLabel: 'C'
                    },{
                        xtype: 'textfield',
                        id: 'ansD',
                        itemId: 'ansD',
                        name: 'ansD',
                        bind: '{rec.ansD}',
                        emptyText: '请输入答案选项',
                        fieldLabel: 'D'
                    },{
                        xtype: 'textfield',
                        id: 'ansE',
                        itemId: 'ansE',
                        name: 'ansE',
                        bind: '{rec.ansE}',
                        emptyText: '请输入答案选项',
                        fieldLabel: 'E'
                    },{
                        xtype: 'textfield',
                        id: 'ansF',
                        itemId: 'ansF',
                        name: 'ansF',
                        bind: '{rec.ansF}',
                        emptyText: '请输入答案选项',
                        fieldLabel: 'F'
                    },{
                        xtype: 'checkboxgroup',
                        id:'rightAns',
                        itemId: 'rightAns',
                        name: 'rightAns',
                        bind: '{rec.rightAns}',
                        fieldLabel: '正确答案',
                        allowBlank: false,
                        column:6,
                        flex:1,
                        items: [
                            { boxLabel: "A", name: "rightAns", inputValue: "A"},
                            { boxLabel: "B", name: "rightAns", inputValue: "B"},
                            { boxLabel: "C", name: "rightAns", inputValue: "C"},
                            { boxLabel: "D", name: "rightAns", inputValue: "D"},
                            { boxLabel: "E", name: "rightAns", inputValue: "E"},
                            { boxLabel: "F", name: "rightAns", inputValue: "F"}
                        ]
                    },]
            },{
                xtype: 'ueditor',
                id: 'testContent',
                itemId: 'testContent',
                name: 'testContent',
                bind: '{rec.testContent}',
                fieldLabel: '题干',
                width: '100%'

            }]
        }];
        me.buttons = [
            {xtype: "button", text: "保存并继续", handler: 'onClickButtonSave'},
            {xtype: "button", text: "保存并返回", handler: 'onClickButtonSaveReturn'},
            {
                xtype: "button", text: "关闭", handler: function () {
                this.up("panel").collapse();
            }}
        ];
        this.callParent();
    }
});