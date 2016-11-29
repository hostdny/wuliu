/**
 * Created by zzw on 2016/9/20.
 */
Ext.define(
    'ExtFrame.view.main.booksManagement.booksBorrowRecordInquiries.BooksBorrowRecordInquiriesManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.booksManagement.booksBorrowRecordInquiries.BooksBorrowRecordInquiriesController',
            'ExtFrame.view.main.booksManagement.booksBorrowRecordInquiries.BooksBorrowRecordInquiriesGrid',
            'ExtFrame.view.main.booksManagement.booksBorrowRecordInquiries.BooksBorrowRecordInquiriesModel'],
        layout: {type: 'border'},
        controller: 'booksBorrowRecordInquiriesController',
        viewModel: {type: 'booksBorrowRecordInquiriesModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'booksBorrowRecordInquiriesGrid',
                    itemId: me.ename + 'Grid',
                    region: 'center',
                    ename: me.ename
                }];
            me.dockedItems = [{
                xtype: 'toolbar',
                layout: 'column',
                items: [{
                    xtype: 'datefield',
                    editable: false,
                    itemId: 'startTime',
                    name: 'startTime',
                    fieldLabel: '日期',
                    emptyText: '选择开始日期',
                    value: Ext.util.Format.date(Ext.Date.add(new Date(), Ext.Date.MONTH, -1), "Y-m-d"),
                    format: 'Y-m-d',
                    allowBlank: false,
                    labelWidth: 40
                }, {
                    xtype: 'displayfield',
                    value: "----"
                }, {
                    xtype: 'datefield',
                    editable: false,
                    itemId: 'endTime',
                    name: 'endTime',
                    emptyText: '选择结束日期',
                    value: Ext.util.Format.date(Ext.Date.add(new Date(), Ext.Date.MONTH), "Y-m-d"),
                    allowBlank: false,
                    format: 'Y-m-d'
                }, {
                    xtype: 'combo',
                    itemId: 'departmentId',
                    labelWidth: 40,
                    fieldLabel: '科室',
                    name: 'office',
                    displayField: 'cName',
                    bind: '{rec.office}',
                    editable: false,// 是否允许输入
                    emptyText: '请选择科室',
                    allowBlank: false,// 不允许为空
                    blankText: '请选择科室',// 该项如果没有选择，则提示错误信息
                    rootVisible: false,
                    store: Ext.create('ExtFrame.store.ModuleTree', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/departMent/queryByParent.do?parentId=4028981655e830080155e83792bc0000",
                            reader: {
                                type: 'json',
                                rootProperty: 'permissions'//数据根节点名称
                            },
                            //扩展参数
                            extraParams: {}
                        }
                    }),
                    listeners: {
                        select: function (me, record, eOpts) {
                            var panel = this.up('panel').up('panel');
                            var Sign = panel.down("#bookBorrowerName");
                            Sign.store.getProxy().extraParams = {
                                'orgId': record.data.id
                            };
                            Sign.store.reload();
                        }
                    }
                }, {
                    xtype: 'combo',
                    name: 'bookBorrowerName',
                    itemId: 'bookBorrowerName',
                    bind: '{rec.bookBorrowerName}',
                    emptyText: '姓名',
                    labelWidth: 40,
                   // editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'userCName',
                    fieldLabel: '姓名',
                    valueField: 'id',
                    allowBlank: false,
                    store: Ext.create('ExtFrame.store.User', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/bookHistory/queryByOrgId.do",
                            reader: {
                                type: 'json',
                                rootProperty: 'rows'//数据根节点名称
                            },
                            //扩展参数
                            extraParams: {
                                'orgId': ""
                            }
                        }
                    })
                }, {
                    xtype: 'button',
                    text: '查询',
                    handler: function (startTime, endTime) {
                        var panel = this.up('panel').up('panel');
                        var SignGrid = panel.down('#booksBorrowRecordInquiriesGrid');
                        var SearchDate = me.dockedItems.items[0].items.items;
                        var startTime = SearchDate[0].getValue();
                        var endTime = SearchDate[2].getValue();
                        //var office = panel.down('#office').getValue();
                        //var bookBorrowerId = panel.down('#bookBorrowerId').getValue();
                        var office = SearchDate[3].getValue();
                        var bookBorrowerName = SearchDate[4].getValue();
                        if (startTime == null || endTime == null) {
                            Ext.MessageBox.alert('提示', '请先填写数据！');
                            return;
                        }
                        SignGrid.store.getProxy().extraParams = {
                            'startTime': startTime,
                            'endTime': endTime,
                            'office': office,
                            'bookBorrowerName': bookBorrowerName
                        };
                        SignGrid.store.reload();
                    }
                }, {
                    xtype: 'button',
                    text: '导出',
                    handler: function () {
                        var panel = this.up('panel').up('panel');
                        var SearchDate = me.dockedItems.items[0].items.items;
                        var startTime = SearchDate[0].getRawValue();
                        var endTime = SearchDate[2].getRawValue();

                        var url = '/jasperjsp/ToReport.jsp?fid=9&type=excel&sDate=' + startTime + '&eDate=' + endTime;
                        window.open(url);
                    }
                }]
            }];
            me.callParent();
        }
    }
);