/**
 * Created by MSI on 2016/7/14.
 */
/**
 * Created by Jiayunpeng on 2016/7/11.
 */
Ext.define('ExtFrame.view.main.tipOff.tipChart.TipChartPanel', {
    extend: 'Ext.Panel',
    xtype: 'marked-line',
    alias: 'widget.tipChartPanel',
    layout: {type: 'border'},
    stripeRows: true,
    initComponent: function() {
        var me = this;
        me.store = Ext.create('ExtFrame.store.User', {
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/tipMessage/queryBrokenLine.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total'//数据总数节点名称
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
                fields: ['total', 'finish'],
                position: 'left',
                grid: true,
                minimum: 0,
                maximum: 20
            }, {
                type: 'Category',
                fields: 'month',
                position: 'bottom',
                grid: true
            }],
            series: [{
                type: 'line',
                axis: 'left',
                title: '数量',
                xField: 'month',
                yField: 'total',
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
                        this.setTitle(title + ' 共有 '+ storeItem.get(item.series.yField));
                    }
                }
            }, {
                type: 'line',
                axis: 'left',
                title: '举报案例',
                xField: 'month',
                yField: 'finish',
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
                        this.setTitle(title + ' 处理 '+ storeItem.get(item.series.yField)+"个");
                    }
                }
            }]
        }];

        me.callParent();
    }

});