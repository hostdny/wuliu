/**
 * Created by zzw on 2016/9/7.
 */
Ext.define(
    'ExtFrame.view.main.officeDesk.newsInfo.NewsInfoManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.officeDesk.newsInfo.NewsInfoController',
            'ExtFrame.view.main.officeDesk.newsInfo.NewsInfoGrid',
            'ExtFrame.view.main.officeDesk.newsInfo.NewsInfoModel',
            'ExtFrame.view.main.officeDesk.newsInfo.NewsInfoWindow',
            'ExtFrame.view.main.officeDesk.newsInfo.NewsInfoModel',
            'ExtFrame.view.extEncap.UEditor'],
        layout: {type: 'border'},
        controller: 'newsInfoController',
        viewModel: {type: 'newsInfoModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'newsInfoGrid',
                    itemId: me.ename + 'Grid',
                    region: 'center',
                    ename: me.ename
                },{
                    xtype: 'newsInfoWindow',
                    itemId: me.ename + 'Window',
                    ename: me.ename,
                    height:'100%',
                    region: 'east',
                    split: true
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
                    name: 'title',
                    itemId: 'title',
                    bind: '{rec.title}',
                    allowBlank: false,
                    emptyText: '信息标题',
                    fieldLabel: '信息标题'
                },{
                    xtype: 'button',
                    text: '搜索',
                    handler: function(startTime,endTime){
                        var panel = this.up('panel').up('panel');
                        var SignGrid = panel.down('newsInfoGrid');
                        var SearchDate = me.dockedItems.items[0].items.items;
                        var startTime = SearchDate[0].getValue();
                        var endTime = SearchDate[2].getValue();
                        var title = panel.down('#title').getValue();
                        if(startTime == null || endTime == null || title==null){
                            Ext.MessageBox.alert('提示', '请先填写数据！');
                            return;
                        }
                        SignGrid.store.getProxy().extraParams = {
                            'startTime':startTime,
                            'endTime':endTime,
                            'title':title
                        };
                        SignGrid.store.reload();
                    }
                },{
                    xtype: 'button',
                    text: '新增',
                    handler: function(){
                        if (!Tools.Method.IsLogin())
                            return;
                        var view = this.up('panel').up('panel').up('panel');
                        view.down('#newsInfoWindow').down('form').getForm().reset();
                        view.down('#newsInfoWindow').expand();
                    }
                },{
                    xtype: 'button',
                    text: '修改',
                    handler: function(){
                        if (!Tools.Method.IsLogin())
                            return;
                        var view = this.up('panel').up('panel').up('panel');
                        var pnGrid = view.down('#newsInfoGrid');
                        var selectRecords = pnGrid.getSelection();//获取grid选中行records
                     //   view.down('#newsInfoWindow').expand();
                        if (Tools.Method.IsEditData(selectRecords)) {
                            var window = view.down('#newsInfoWindow');
                            var form = window.down('form');
                            //   form.getForm().reset();//表单清空
                            window.expand();
                            form.getForm().loadRecord(selectRecords[0]);
                            var content=window.down('#content');
                        }else{
                            Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
                        }
                    }
                },{
                    xtype: 'button',
                    text: '删除',
                    handler: function() {
                        if (!Tools.Method.IsLogin())
                            return;
                        var view = this.up('panel').up('panel').up('panel');
                        var window = view.down('#newsInfoWindow');
                        var pnGrid = view.down('#newsInfoGrid');
                        var form = view.down('#' + view.ename + 'Form');
                        //   var form = window.down('#cmsWindowForm');
                        var selectRows = pnGrid.getSelectionModel().getSelection();//获取grid选中行
                        if (Tools.Method.IsDelData(selectRows)) {
                            var ids = '';
                            $.each(selectRows, function (index, row) {
                                ids += row.data.id + ',';
                            });
                            var data = {ids: ids};
                            //用户确认删除操作-----点击“是”
                            Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
                                if (btn == 'yes') {
                                    Tools.Method.ExtAjaxRequestEncap('/newsInfo/delete.do', 'POST', data, true, function (jsonData) {
                                        if (jsonData.resultCode) {
                                            Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG0020), '4000', '1', null);
                                            pnGrid.store.reload();
                                        } else {
                                            Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                                        }
                                    });
                                }
                            });
                    }else {
                            Ext.MessageBox.alert('提示', '很抱歉，您当前未选中任何一行！');
                        }
                    }
                }]
            }];
            me.callParent();
        }
    }
);