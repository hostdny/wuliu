/**
 * Created by Jia on 2016/8/30.
 */
Ext.define('ExtFrame.view.main.cms.cmsColumnManage.CmsColumnManageWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cmsColumnManageWindow',
    controller: 'cmsColumnManageController',
    viewModel: {type: 'cmsColumnManageModel'},
    layout: {type: 'border'},
    collapsible: true,
    collapsed: true,
    width: 600,
    closeAction: 'destroy',
    title: '栏目管理',
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'cmsColumnManageForm',
            ename: "cmsColumnManage",
            viewModel: {type: 'cmsColumnManageModel'},
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
                },{
                    xtype: 'hiddenfield',
                    itemId: 'programCode',//注意，此itemId要写固定，functionjs中重置from有用到
                    name: 'programCode',
                    bind: '{rec.programCode}'
                },{
                    xtype: 'textfield',
                    name: 'programName',
                    id: 'programName',
                    bind: '{rec.programName}',
                    allowBlank: false,
                    fieldLabel: '栏目名称',
                    emptyText: '请填写栏目名称',
                    maxLength: 100
                }, {
                    xtype: 'treepicker',
                    itemId: 'parentName',
                    name: 'parentName',
                    bind: '{rec.parentName}',
                    forceSelection: true,// 只能选择下拉框里面的内容
                    emptyText: '请选择所属分类',
                    blankText: '请选择所属分类',// 该项如果没有选择，则提示错误信息
                    fieldLabel: '所属分类',
                    rootVisible: false,
                    displayField: 'name',
                    valueField: 'pid',
                    store: Ext.create('ExtFrame.store.OrgTree', {
                        root: {
                            typeName: '',
                            parentId: "",
                            expanded: true
                        },
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + '/cmsProgram/queryAll.do',
                            reader: {
                                type: 'json'
                            },
                            extraParams: {
                                'swhere': "",
                                parentId: ""
                            }
                        }
                    }),
                    listeners : {
                        select: "onSelectTreePicker"
                    }
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
                    emptyText: '请选择所属区域',
                    editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'keyText',
                    valueField: 'keyValue',
                    fieldLabel: '所属区域',
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
                }]
            }]
        }];
        me.buttons = [
            {
                xtype: "button",
                text: "保存",
                handler: 'onClickButtonSave'},
            {
                xtype: "button",
                text: "关闭",
                handler: "onClickClear"
            }
        ];
        this.callParent();
    }
});