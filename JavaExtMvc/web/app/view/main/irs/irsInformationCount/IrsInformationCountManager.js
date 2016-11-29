/**
 * Created by Administrator on 2016/7/20.
 */
Ext.define('ExtFrame.view.main.irs.irsInformationCount.IrsInformationCountManager',
    {   extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.irs.irsInformationCount.IrsInformationCountController',
            'ExtFrame.view.main.irs.irsInformationCount.IrsInformationCountGrid',
            'ExtFrame.view.main.irs.irsInformationCount.IrsInformationCountModel'],//请求MainController类
        layout: {type: 'border'},
        controller: 'irsInformationCountController',
        viewModel: {type: 'irsInformationCountModel'},
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'irsInformationCountGrid',
                    itemId: me.ename + 'Grid',
                    region: 'center',
                    ename: me.ename
                }];
            me.dockedItems = [{
                xtype: 'toolbar',
                layout:'column',
                items: [{
                    xtype: 'datefield',
                    editable: false,
                    itemId:'startTime',
                    name: 'startTime',
                    fieldLabel: '时间',
                    emptyText: '选择开始日期',
                    format:'Y-m-d',
                    allowBlank:false,
                    labelWidth: 50
                },{
                    xtype: 'displayfield',
                    value:"----"
                },{
                    xtype: 'datefield',
                    editable: false,
                    itemId:'endTime',
                    name: 'endTime',
                    emptyText: '选择结束日期',
                    allowBlank: false,
                    format:'Y-m-d'
                },{
                    xtype: 'textfield',
                    name: 'infoTitle',
                    itemId: 'infoTitle',
                    bind: '{rec.infoTitle}',
                    allowBlank: false,
                    emptyText: '信息标题',
                    fieldLabel: '信息标题'
                },{
                 //   itemId: 'searchId',
                    text: '搜索',
                    handler: function(startTime,endTime,infoTitle){
                        var panel = this.up('panel').up('panel');
                        var SignGrid = panel.down('irsInformationCountGrid');
                        var SearchDate = me.dockedItems.items[0].items.items;
                        var startTime = SearchDate[0].getValue();
                        var endTime = SearchDate[2].getValue();
                        var infoTitle = panel.down('#infoTitle').getValue();
                        if(startTime == null || endTime == null || infoTitle== null){
                            Ext.MessageBox.alert('提示', '请先填写数据！');
                        }
                        SignGrid.store.getProxy().extraParams = {
                            'startTime':startTime,
                            'endTime':endTime,
                            'title':infoTitle
                        };
                        SignGrid.store.reload();
                    }
                },{
                    itemId: 'aaaaaa',
                    text: '导出',
                    handler: function(){
                        var panel = this.up('panel').up('panel');
                        var SearchDate = me.dockedItems.items[0].items.items;
                        var startTime = SearchDate[0].getRawValue();
                        var endTime = SearchDate[2].getRawValue();
                        var infoTitle = panel.down('#infoTitle').getValue();

                        var url = '/jasperjsp/ToReport.jsp?fid=2&type=excel&sDate=' + startTime + '&eDate=' + endTime+ '&title=' + infoTitle;
                        window.open(url);
                    }
                }]
            }];
            me.callParent();
        }
    }
);