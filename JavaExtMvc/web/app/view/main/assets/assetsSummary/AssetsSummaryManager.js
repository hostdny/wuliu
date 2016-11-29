/**
 * Created by zzw on 2016/7/26.
 */
Ext.define(
    'ExtFrame.view.main.assets.assetsSummary.AssetsSummaryManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.assets.assetsSummary.AssetsSummaryController',
            'ExtFrame.view.main.assets.assetsSummary.AssetsSummaryModel',
            'ExtFrame.view.main.assets.assetsSummary.AssetsSummaryGrid'],//请求MainController类
        layout: {type: 'border'},
        controller: 'assetsSummaryController',
        viewModel: {type: 'assetsSummaryModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'assetsSummaryGrid',
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center'
            }];
            me.dockedItems = [{
                xtype: 'toolbar',
                layout:'column',
                items: [{
                    text: '导出',
                    handler: function(){
                        var delOIDs = '';
                        var assetsSummaryGridId = Ext.getCmp("assetsSummaryGridId");
                        var selectRows = assetsSummaryGridId.getSelection();
                        for(var i = 0;i<selectRows.length;i++){
                            delOIDs +="\'"+selectRows[i].data.row + "\',";
                        }
                        delOIDs = delOIDs.substr(0, delOIDs.length - 1);
                        var ids = "";
                        if(delOIDs == ""){
                            ids ="where  1=1";
                        }else{
                            ids="where  z.类型 in("+delOIDs+")";
                        }
                        var url = '/jasperjsp/ToReport.jsp?type=excel&fid=6&ids='+ids;
                        window.open(url);
                    }
                }]
            }];
            me.callParent();
        }
    }
);