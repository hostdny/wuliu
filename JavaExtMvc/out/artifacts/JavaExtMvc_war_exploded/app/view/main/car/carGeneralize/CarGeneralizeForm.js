/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.car.carGeneralize.CarGeneralizeForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.carGeneralizeForm',
    viewModel: {type: 'carGeneralizeModel'},
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
        var curDate = new Date();
        var time=Ext.Date.format(curDate, 'Y');
        me.items = [{
            layout: 'column',
            itemId: 'column1',
            items: [{
                xtype: 'numberfield',
                nanText: "请输入正整数",
                itemId: 'costDate',
                minValue: 0,
                allowNegative: false,
                value: Ext.Date.format(new Date(), 'Y'),
                name: 'costDate',
                bind: '{rec.costDate}',
                emptyText: '请输入日期',
                regex:/^\d{4}$/,
                fieldLabel: '日期',
                allowDecimals: false
            },{
                xtype: 'combo',
                name: 'carNum',
                itemId: 'carNum',
                bind: '{rec.carNum}',
                emptyText: '请选择车辆编号',
                editable: false,// 是否允许输入
                queryMode: 'local',
                displayField: 'carNum',
                valueField: 'carNum',
                fieldLabel: '车辆编号',
                store: Ext.create('ExtFrame.store.ModuleTree', {
                    proxy: {
                        type: 'ajax',
                        url: Tools.Method.getAPiRootPath() + "/carMessage/pagedQueryByBean.do?delFlag=0",
                        reader: {
                            type: 'json',
                            rootProperty: 'rows',//数据根节点名称
                            totalProerty: 'total',//数据总数节点名称
                            idProperty: 'pttId'//id标示节点名称
                        },
                        //扩展参数
                        extraParams: {
                            'year': time,
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
