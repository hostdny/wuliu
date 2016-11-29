/**
 * Created by Administrator on 2016/7/25.
 */
Ext.define(
    'ExtFrame.view.main.assets.applicationStatistics.ApplicationStatisticsManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.assets.applicationStatistics.ApplicationStatisticsController',
            'ExtFrame.view.main.assets.applicationStatistics.ApplicationStatisticsModel',
            'ExtFrame.view.main.assets.applicationStatistics.ApplicationStatisticsGrid'],//请求MainController类
        layout: {type: 'border'},
        controller: 'applicationStatisticsController',
        viewModel: {type: 'applicationStatisticsModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'applicationStatisticsGrid',
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center'
            }];
            me.dockedItems = [{
                xtype: 'toolbar',
                layout:'column',
                items: [{
                    xtype: 'numberfield',
                    nanText: "请输入正整数",
                    itemId: 'year',
                    minValue: 0,
                    allowNegative: false,
                    name: 'year',
                    bind: '{rec.year}',
                    fieldLabel: '年份',
                    labelWidth: 50,
                    emptyText: '请输入年份',
                    allowDecimals: false
                },{
                    text: '搜索',
                    handler: function(year){
                        var panel = this.up('panel').up('panel');
                        var SignGrid = panel.down('applicationStatisticsGrid');
                        var SearchDate = me.dockedItems.items[0].items.items;
                        var year = SearchDate[0].getValue();
                        SignGrid.store.getProxy().extraParams = {
                            'year':year
                        };
                        SignGrid.store.reload();
                    }
                },{
                    text: '导出',
                    handler: function(){
                        var panel = this.up('panel').up('panel');
                        var SearchDate = me.dockedItems.items[0].items.items;
                        var year = SearchDate[0].getRawValue();
                        var url = '/jasperjsp/ToReport.jsp?fid=5&type=excel&year=' + year;
                        window.open(url);
                    }
                }]
            }];
            me.callParent();
        }
    }
);