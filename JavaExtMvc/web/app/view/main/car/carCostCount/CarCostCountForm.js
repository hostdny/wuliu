/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.car.carCostCount.CarCostCountForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.carCostCountForm',
    viewModel: {type: 'carCostCountModel'},
    region: 'center',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 60,
        padding: 5
    },
    bodyBorder: false,
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.items = [{
            layout: 'column',
            itemId: 'column1',
            items: [{
                xtype: 'combo',
                name: 'costType',
                itemId: 'costType',
                bind: '{rec.costType}',
                editable: false,// 是否允许输入
                emptyText: '请选择费用类型',
                blankText: '请选择费用类型',// 该项如果没有选择，则提示错误信息,
                queryMode: 'local',
                displayField: 'dictName',
                valueField: 'dictValue',
                fieldLabel: '费用类型',
                store: Ext.create('ExtFrame.store.Permission', {
                    proxy: {
                        type: 'ajax',
                        url: Tools.Method.getAPiRootPath() + "/dict/queryToCombo.do?dictType=JFLX",
                        reader: {
                            type: 'json',
                            rootProperty: 'ID'//数据根节点名称
                        }
                    }
                })
            },{
                xtype: 'textfield',
                itemId: 'carNum',
                name: 'carNum',
                fieldLabel: '车辆编号',
                emptyText: '请输入车辆编号',
                bind: '{rec.carNum}'
            },{
                xtype: 'datefield',
                name: 'stateTime',
                itemId: 'stateTime',
                bind: '{rec.stateTime}',
                emptyText: '请输入开始时间',
                fieldLabel: '开始时间',
                format: 'Y年m月d日',
                editable: false
            },{
                xtype: 'datefield',
                name: 'endTime',
                itemId: 'endTime',
                bind: '{rec.endTime}',
                emptyText: '请输入结束时间',
                fieldLabel: '结束时间',
                format: 'Y年m月d日',
                editable: false
            }]
        }
        ];
        me.buttons = [
            {
                xtype: "button",
                text: "查询",
                itemId:'search',
                handler: 'onClickSearch'
            },
            {
                xtype: "button",
                text: "重置",
                itemId:'clear',
                handler: 'onClickClear'
            }
        ];
        me.callParent();
    }


});
