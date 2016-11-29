/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.car.carGeneralize.CarGeneralizeChartLine', {
    extend: 'Ext.panel.Panel',
    xtype: 'marked-line',
    alias: 'widget.carGeneralizeChartLine',
    layout: {type: 'border'},
    stripeRows: true,
    initComponent: function() {
        var me = this;
        var curDate = new Date();
        var time=Ext.Date.format(curDate, 'Y');
        me.store = Ext.create('ExtFrame.store.User', {
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/carCost/queryByYearAndCnum.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total'//数据总数节点名称
                },
                //扩展参数
                extraParams: {
                    'year': time
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
            xtype: 'chart',
            animate: true,
            shadow: false,
            style: 'background: #fff;',
            legend: {
                position: 'right',
                boxStrokeWidth: 0,
                labelFont: '12px Helvetica'
            },
            store: me.store,
            insetPadding: 40,
            axes: [{
                type: 'Numeric',
                position: 'left',
                grid: true
            }, {
                type: 'Category',
                fields: 'month',
                position: 'bottom',
                grid: true
            }],
            series: [{
                type: 'line',
                axis: 'left',
                title: '月加油',
                xField: 'month',
                yField: 'fuelBills',
                style: {
                    'stroke-width': 4
                },
                markerConfig: {
                    radius: 4
                },
                highlight: {
                    fill: '#000',
                    radius: 5,
                    'stroke-width': 2,
                    stroke: '#fff'
                },
                tips: {
                    trackMouse: true,
                    style: 'background: #FFF',
                    height: 20,
                    renderer: function(storeItem, item) {
                        var title = item.series.title;
                        this.setTitle(title + storeItem.get(item.series.yField)+"元");
                    }
                }
            }, {
                type: 'line',
                axis: 'left',
                title: '月维修',
                xField: 'month',
                yField: 'maintenanceCost',
                style: {
                    'stroke-width': 4
                },
                markerConfig: {
                    radius: 4
                },
                highlight: {
                    fill: '#000',
                    radius: 5,
                    'stroke-width': 2,
                    stroke: '#fff'
                },
                tips: {
                    trackMouse: true,
                    style: 'background: #FFF',
                    height: 20,
                    renderer: function(storeItem, item) {
                        var title = item.series.title;
                        this.setTitle(title + storeItem.get(item.series.yField)+"元");
                    }
                }
            }]
        }];

        me.callParent();
    }
});
