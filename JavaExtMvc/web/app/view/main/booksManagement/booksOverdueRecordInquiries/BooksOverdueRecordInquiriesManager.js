/**
 * Created by wangBin on 2016/9/19.
 * 逾期记录查询
 */
Ext.define(
    'ExtFrame.view.main.booksManagement.booksOverdueRecordInquiries.BooksOverdueRecordInquiriesManager',
    {
        requires: [
            'ExtFrame.view.main.booksManagement.booksOverdueRecordInquiries.BooksOverdueRecordInquiriesGrid',
            'ExtFrame.view.main.booksManagement.booksOverdueRecordInquiries.BooksOverdueRecordInquiriesModel',
            'ExtFrame.view.main.booksManagement.booksOverdueRecordInquiries.BooksOverdueRecordInquiriesController'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'booksOverdueRecordInquiriesManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,
        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'booksOverdueRecordInquiriesController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'booksOverdueRecordInquiriesGrid',
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
                    //emptyText: '选择开始日期',
                    format: 'Y-m-d',
                    value: Ext.util.Format.date(Ext.Date.add(new Date(), Ext.Date.MONTH, -1)),
                    allowBlank: false,
                    labelWidth: 30
                }, {
                    xtype: 'displayfield',
                    value: "----"
                }, {
                    xtype: 'datefield',
                    editable: false,
                    itemId: 'endTime',
                    name: 'endTime',
                    //emptyText: '选择结束日期',
                    value: new Date(),
                    allowBlank: false,
                    format: 'Y-m-d'
                }, {
                    xtype: 'combo',
                    itemId: 'office',
                    labelWidth: 40,
                    fieldLabel: '科室',
                    name: 'office',
                    editable: false,// 是否允许输入
                    displayField: 'cName',
                    bind: '{rec.office}',
                    forceSelection: true,// 只能选择下拉框里面的内容
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
                                rootProperty: 'rows',//数据根节点名称
                                totalProerty: 'total',//数据总数节点名称
                                idProperty: 'pttId'//id标示节点名称
                            },
                            //扩展参数
                            extraParams: {
                                'swhere': ""
                            },
                            listeners: {
                                select: function (ppp, record, eOpts) {
                                    var store = me.down("combo").store;
                                    store.getProxy().extraParams = {
                                        'unitId': record.data.id
                                    };
                                    store.reload();
                                }
                            }
                        }
                    })
                }, {
                    xtype: 'combo',
                    name: 'bookBorrowerName',
                    itemId: 'bookBorrowerName',
                    bind: '{rec.bookBorrowerName}',
                    emptyText: '姓名',
                    labelWidth: 40,
                    editable: false,// 是否允许输入
                    queryMode: 'local',
                    displayField: 'userCName',
                    fieldLabel: '姓名',
                    allowBlank: false,
                    field: {userCName: '', id: ''},
                    store: Ext.create('ExtFrame.store.ModuleTree', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/departMent/queryPerson.do?deptId=",
                            reader: {
                                type: 'json',
                                rootProperty: 'rows',//数据根节点名称
                                totalProerty: 'total',//数据总数节点名称
                                idProperty: 'pttId'//id标示节点名称
                            },
                            //扩展参数
                            extraParams: {
                                'swhere': "",
                                'unitId': ""
                            },
                            listeners: {
                                //捕捉异常处理
                                exception: function (theproxy, response, operation, options) {
                                    Tools.Method.ExceptionEncap(response);
                                }
                            }
                        }
                    })
                }, {
                    xtype: 'button',
                    text: '查询',
                    handler: function (startTime, endTime) {
                        var panel = this.up('panel').up('panel');
                        var SignGrid = panel.down('#booksOverdueRecordInquiriesGrid');
                        var SearchDate = me.dockedItems.items[0].items.items;
                        var startTime = SearchDate[0].getValue();
                        var endTime = SearchDate[2].getValue();
                        var office = panel.down('#office').getValue();
                        var bookBorrowerName = panel.down('#bookBorrowerName').getValue();
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
                        var url = '/jasperjsp/ToReport.jsp?fid=10&type=excel&sDate=' + startTime + '&eDate=' + endTime;
                        window.open(url);
                    }
                }]
            }];
            me.callParent();
        }
    }
);