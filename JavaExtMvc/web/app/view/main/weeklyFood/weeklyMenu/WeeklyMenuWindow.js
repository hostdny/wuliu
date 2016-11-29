/**
 * Created by wangBin on 2016/8/1.
 */
Ext.define('ExtFrame.view.main.weeklyFood.weeklyMenu.WeeklyMenuWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.weeklyMenuWindow',
    viewModel: {type: 'weeklyMenuModel'},
    layout: {type: 'border'},
    width: 600,
    collapsible: true,
    collapsed: true,
    closeAction: 'destroy',
    title: '周菜单信息',
    buttonAlign: 'center',
    autoScroll:true,
    fit: true,
    initComponent: function () {
        var me = this;
        me.store = Ext.create('ExtFrame.store.User', {
            remoteSort: true,
            sortOnLoad: true,
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/foodsDict/query.do",
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
                    exception: function (theproxy, response) {
                        Tools.Method.ExceptionEncap(response);
                    }
                }
            }
        });
        me.items = [{
            xtype: 'form',
            itemId: 'weeklyMenuForm',
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
                    name: 'hfOID',
                    bind: '{rec.hfOID}'
                }
                    , {
                    xtype: 'combo',
                    name: 'weekId',
                    itemId: 'weekId',
                    bind: '{rec.weekId}',
                    width:"100%",
                    emptyText: '请选择星期',
                    editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'weekText',
                    valueField: 'weekValue',
                    fieldLabel: '星期',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['weekValue', 'weekText'],
                        data: [
                            {'weekValue': '1', 'weekText': '星期一'},
                            {'weekValue': '2', 'weekText': '星期二'},
                            {'weekValue': '3', 'weekText': '星期三'},
                            {'weekValue': '4', 'weekText': '星期四'},
                            {'weekValue': '5', 'weekText': '星期五'},
                            {'weekValue': '6', 'weekText': '星期六'},
                            {'weekValue': '0', 'weekText': '星期日'}
                        ]
                    })
                }
                    ,{
                    xtype: 'combo',
                    name: 'timePoint',
                    itemId: 'timePoint',
                    bind: '{rec.timePoint}',
                    emptyText: '请选择时间点',
                    editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'timeText',
                    valueField: 'timeValue',
                    fieldLabel: '时间点',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['timeValue', 'timeText'],
                        data: [
                            {'timeValue': '早餐', 'timeText': '早餐'},
                            {'timeValue': '中餐', 'timeText': '中餐'},
                            {'timeValue': '晚餐', 'timeText': '晚餐'}
                        ]
                    })
                },{
                    xtype: 'combo',
                    name: 'foodId',
                    itemId: 'foodId',
                    bind: '{rec.foodId}',
                    emptyText: '请选择菜单',
                    editable: false,// 是否允许输入
                    multiSelect: true,
                    queryMode: 'local',
                    displayField: 'foodName',
                    valueField: 'id',
                    fieldLabel: '菜单',
                    store: me.store
                }]
            },{
                xtype: 'weeklyMenuWindowGrid',
                itemId: 'weeklyMenuWindowGrid',
                width:"100%"

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
