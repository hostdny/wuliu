/**
 * Created by zzw on 2016/11/2.
 */
Ext.define(
    'ExtFrame.view.main.signAttendance.signPersonCount.SignPersonCountManager',
    {
        extend: 'Ext.panel.Panel',
        requires: [
            'ExtFrame.view.main.signAttendance.signPersonCount.SignPersonCountController',
            'ExtFrame.view.main.signAttendance.signPersonCount.SignPersonCountModel',
            'ExtFrame.view.main.signAttendance.signPersonCount.SignPersonCountGrid'],//请求MainController类
        layout: {type: 'border'},
        id: 'signPersonCountId',
        controller: 'signPersonCountController',
        viewModel: {type: 'signPersonCountModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'signPersonCountGrid',
                itemId: 'signPersonCountGrid',
                ename: me.ename,
                region: 'center'
            }];
            me.dockedItems = [{
                xtype: 'toolbar',
                layout: 'column',
                items: [{
                    xtype: 'datefield',
                    editable: false,
                    itemId: 'startTime',
                    name: 'startTime',
                    fieldLabel: '时间',
                    emptyText: '选择开始日期',
                    format: 'Y-m-d',
                    allowBlank: false,
                    labelWidth: 50
                }, {
                    xtype: 'displayfield',
                    value: "----"
                }, {
                    xtype: 'datefield',
                    editable: false,
                    itemId: 'endTime',
                    name: 'endTime',
                    emptyText: '选择结束日期',
                    allowBlank: false,
                    format: 'Y-m-d'
                }, {
                    text: '搜索',
                    handler: function (startTime, endTime) {
                        var panel = this.up('panel').up('panel');
                        var SignGrid = panel.down('signPersonCountGrid');
                        var SearchDate = me.dockedItems.items[0].items.items;
                        var startTime = SearchDate[0].getValue();
                        var endTime = SearchDate[2].getValue();
                        if (startTime == null || endTime == null) {
                            Ext.MessageBox.alert('提示', '请先选择日期！');
                            return;
                        }
                        if (startTime >= endTime) {
                            Ext.MessageBox.alert('提示', '日期范围错误！');
                            return;
                        }
                        SignGrid.store.getProxy().extraParams = {
                            'startTime': startTime,
                            'endTime': endTime
                        };
                        SignGrid.store.reload();
                    }
                }, {
                    xtype: "button",
                    text: "重置",
                    itemId: 'clear',
                    handler: 'onClickClear'
                }, {
                    xtype: 'button',
                    text: '导出',
                    handler: function () {
                        var panel = this.up('panel').up('panel');
                        var SearchDate = me.dockedItems.items[0].items.items;
                        var startTime = SearchDate[0].getRawValue();
                        var endTime = SearchDate[2].getRawValue();
                        var url = '/jasperjsp/ToReport.jsp?fid=13&type=excel&sDate=' + startTime + '&eDate=' + endTime;
                        window.open(url);
                    }
                }
                ]
            }];
            me.callParent();
        }
    }
);