/**
 * Created by zzw on 2016/11/10.
 */
Ext.define(
    'ExtFrame.view.main.signAttendance.workTimeConfig.WorkTimeConfigManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.signAttendance.workTimeConfig.WorkTimeConfigController',
            'ExtFrame.view.main.signAttendance.workTimeConfig.WorkTimeConfigModel',
            'ExtFrame.view.extEncap.DateTime',
            'ExtFrame.view.main.signAttendance.workTimeConfig.WorkTimeConfigGrid'],//请求MainController类
        layout: {type: 'border'},
        controller: 'workTimeConfigController',
        viewModel: {type: 'workTimeConfigModel'},
        layout: 'fit',
        buttonAlign: 'center',
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块ename对应
        initComponent: function () {
            var me = this;
            var pageSize = 20;//分页条数
            me.items = [{
                xtype: 'form',
                itemId:  me.ename + 'Form',
                ename: me.ename,
                region: 'north',
                bodyPadding: 40,
                padding: 10,
                fieldDefaults: {
                    anchor: '60%',
                    labelAlign: 'left',
                    padding: 10
                },
                items: [{
                    xtype: 'fieldset',
                    title: '工作时间配置信息',
                    itemId: 'column1',
                    collapsible: true,
                    defaults: {
                        labelWidth: 70,
                        anchor: '40%',
                        layout: {type: 'hbox', defaultMargins: {top: 10, right: 0, bottom: 0, left: 0}}
                    },
                    items: [{
                        xtype: 'hiddenfield',
                        itemId: 'hfOid',
                        name: 'id',
                        bind: '{rec.id}'
                    },{
                        xtype: 'timefield',
                        name: 'workTimeStart',
                        itemId: 'workTimeStart',
                        bind: '{rec.workTimeStart}',
                        format: 'H:i',
                        emptyText: '请输入上班时间',
                        fieldLabel: '上班时间',
                        editable: false
                    },{
                        xtype: 'timefield',
                        name: 'workTimeEnd',
                        itemId: 'workTimeEnd',
                        bind: '{rec.workTimeEnd}',
                        format: 'H:i',
                        emptyText: '请输入下班时间',
                        fieldLabel: '下班时间',
                        editable: false
                    },{
                        xtype: 'numberfield',
                        step:5,
                        value: 0,
                        maxValue: 60,
                        minValue: 0,
                        name: 'reTime',
                        itemId: 'reTime',
                        bind: '{rec.reTime}',
                        emptyText: '请输入冗余时间',
                        fieldLabel: '冗余时间',
                        editable: false
                    }]
                }]
            }
            ];
            me.store = Ext.create('ExtFrame.store.User', {
                pageSize: pageSize,
                remoteSort: true,
                sortOnLoad: true,
                proxy: {
                    type: 'ajax',
                    url: Tools.Method.getAPiRootPath() + "/signAttendanceList/pagedQueryByBean.do",
                    reader: {
                        type: 'json',
                        rootProperty: 'rows',//数据根节点名称
                        totalProerty: 'total',//数据总数节点名称
                        idProperty: 'pttId'//id标示节点名称
                    },
                    //扩展参数
                    extraParams: {
                        'swhere': "",
                        type:2
                    },
                    listeners: {
                        //捕捉异常处理
                        exception: function (theproxy, response) {
                            Tools.Method.ExceptionEncap(response);
                        }
                    }
                }
            });
            me.store.load({
                callback: function(records, options, success){
                    if(records.length != 0){
                        me.down("#hfOid").setValue(records[0].data.id);
                        me.down("#workTimeStart").setValue(records[0].data.workTimeStart);
                        me.down("#workTimeEnd").setValue(records[0].data.workTimeEnd);
                        me.down("#reTime").setValue(records[0].data.reTime);
                    }
                }
            });
            me.buttons = [
                {xtype: "button", text: "保存", handler: 'onClickButtonSave'}
            ];
            me.callParent();
        }
    }
);
