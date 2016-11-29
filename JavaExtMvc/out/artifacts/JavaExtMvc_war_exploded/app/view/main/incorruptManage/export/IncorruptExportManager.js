/**
 * Created by zzw on 2016/8/1.
 */
Ext.define(
    'ExtFrame.view.main.incorruptManage.export.IncorruptExportManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.incorruptManage.export.IncorruptExportController',
            'ExtFrame.view.main.incorruptManage.export.IncorruptExportGrid',
            'ExtFrame.view.main.incorruptManage.export.IncorruptExportModel'],
        layout: {type: 'border'},
        controller: 'incorruptExportController',
        viewModel: {type: 'incorruptExportModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'incorruptExportGrid',
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center'
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
                    text: '搜索',
                    handler: function(startTime,endTime){
                        var panel = this.up('panel').up('panel');
                        var SignGrid = panel.down('incorruptExportGrid');
                        var SearchDate = me.dockedItems.items[0].items.items;
                        var startTime = SearchDate[0].getValue();
                        var endTime = SearchDate[2].getValue();
                        if(startTime == null || endTime == null){
                            Ext.MessageBox.alert('提示', '请先填写数据！');
                            return;
                        }
                        SignGrid.store.getProxy().extraParams = {
                            'startTime':startTime,
                            'endTime':endTime
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
                        if((startTime != "" && endTime != "") || (startTime == "" && endTime == "")){
                            var url = '/jasperjsp/ToReport.jsp?fid=12&type=excel&sDate=' + startTime + '&eDate=' + endTime;
                        }else{
                            Ext.MessageBox.alert('提示', '请先填写数据！');
                            return;
                        }

                        window.open(url);
                    }
                }]
            }];
            me.callParent();
        }
    }
);