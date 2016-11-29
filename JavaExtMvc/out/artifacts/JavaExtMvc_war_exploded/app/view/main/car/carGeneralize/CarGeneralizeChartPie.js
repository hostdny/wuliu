/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.car.carGeneralize.CarGeneralizeChartPie', {
    extend: 'Ext.panel.Panel',
    xtype: 'basic-pie',
    viewModel: { type: 'carGeneralizeModel' },
    stripeRows: true,
    alias: 'widget.carGeneralizeChartPie',
    layout: {type: 'border'},
    initComponent: function () {
        var me = this;
        var curDate = new Date();
        var time=Ext.Date.format(curDate, 'Y');
        me.store = Ext.create('ExtFrame.store.User', {
            sortOnLoad: true,
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/carCost/queryByYearAndCid.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'pttId'//id标示节点名称
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
            style: 'background: #fff',
            animate: true,
            shadow: false,
            insetPadding: 90,
            store: me.store,
            legend: {
                field: 'ptype',
                position: 'right',
                labelFont: '12px Helvetica'
            },
            series: [{
                type: 'pie',
                angleField: 'precent',
                label: {
                    field: 'ptype',
                    display: 'outside',
                    calloutLine: true
                },
                showInLegend: true,
                highlight: true,
                highlightCfg: {
                    fill: '#000',
                    stroke: '#fff'
                },
                tips: {
                    trackMouse: true,
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('ptype') + ': ' + storeItem.get('precent') + '%');
                    }
                }
            }]
        }];
        me.callParent();
    }
});
