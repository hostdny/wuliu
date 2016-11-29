/**
 * Created by wangBin on 2016/7/28.
 */
Ext.define('ExtFrame.view.main.correct.correctSupervise.CorrectSuperviseGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.correctSuperviseGrid',
    viewModel: {type: 'correctSuperviseModel'},
    fit: true,
    stripeRows: true,
    defaults: {
        bodyPadding: 0
    },
    id: "correctSuperviseGridId",
    initComponent: function () {
        var me = this;
        var pageSize = 20;//分页条数
        var OrderField = 'createTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {
                text: '编号',
                width: 200,
                sortable: true,
                dataIndex: 'personNum'
            }, {
                text: '姓名',
                width: 150,
                sortable: true,
                dataIndex: 'correctName'
            }, {
                text: '性别',
                width: 100,
                sortable: true,
                dataIndex: 'correctSex'
            }, {
                text: '联系方式',
                width: 200,
                sortable: true,
                dataIndex: 'telephone'
            }, {
                text: '矫正开始时间',
                width: 200,
                sortable: true,
                dataIndex: 'stateTime'
            }, {
                text: '矫正结束时间',
                width: 200,
                sortable: true,
                dataIndex: 'endTime'

            }, {
                text: '状态',
                width: 150,
                sortable: true,
                dataIndex: 'correctState',
                renderer: function (value, eOpts) {
                    if (value == '0') {
                        return "新建";
                    } else if (value == '1') {
                        return "等待反馈";
                    } else if (value == '2') {
                        return "<a href='javascript:void(0)' onclick='lookFile(" +
                            "\"" + eOpts.record.data.id + "\"" +
                            ",\"" + eOpts.record.data.personNum + "\"" +
                            ",\"" + eOpts.record.data.correctName + "\"" +
                            ",\"" + eOpts.record.data.correctSex + "\"" +
                            ",\"" + eOpts.record.data.telephone + "\"" +
                            ",\"" + eOpts.record.data.correctAddress + "\"" +
                            ",\"" + eOpts.record.data.comebackMessage + "\"" +
                            ")'>查看详情</a>";
                    } else if (value == '3') {
                        return "超时";
                    } else {
                        return "";
                    }
                }
            }
        ];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/correctRecord/pagedQueryByBean.do",
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
                    //捕捉异常处理
                    exception: function (theproxy, response) {
                        Tools.Method.ExceptionEncap(response);
                    }
                }
            }
        });
        me.selModel = Ext.create('Ext.selection.CheckboxModel', {
            mode: 'SIMPLE',//multi,simple,single；默认为多选multi
            injectCheckbox: 0,//checkbox位于哪一列，默认值为0
            checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true
        });
        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
            ename: 'correctSupervise',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            hasSearch: false,
            dock: 'top',
            items: [{
                itemId: 'correctId',
                text: '监查',
                handler: "onClickCorrect"
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: me.store,//分页控件数据（同grid的数据保持一致）
            dock: 'bottom',
            displayInfo: true,
            items: [
                '-', {cls: 'x-btn-text-icon details'}
            ]
        }];
        me.callParent();
    }
});
function lookFile(id, personNum, correctName, correctSex, telephone, correctAddress, comebackMessage) {
    if (!Tools.Method.IsLogin) {
        return;
    }
    var correctSuperviseGrid = Ext.getCmp("correctSuperviseGridId");
    var selectRecords = correctSuperviseGrid.getSelection();
    var win = Ext.create('Ext.Window', {
        width: 950,
        height: 550,
        plain: true,
        layout: 'fit',
        modal: true,
        closeAction: 'destroy',
        title: '人员反馈信息',
        autoShow: true,
        closable: true,
        items: {
            xtype: 'correctSuperviseOpenWindow',
            itemId: 'correctSuperviseOpenWindow',
            requires: ['ExtFrame.view.main.correct.correctSupervise.CorrectSuperviseController'],
            controller: 'correctSuperviseController'
        }
    }).show();
    var correctSuperviseOpenWindow = Ext.getCmp("correctSuperviseOpenWindowId");
    var correctSuperviseForm = correctSuperviseOpenWindow.down('#correctSuperviseForm');
    correctSuperviseForm.down("#hfOID").setValue(id);
    correctSuperviseForm.down("#personNum").setValue(personNum);
    correctSuperviseForm.down("#correctName").setValue(correctName);
    correctSuperviseForm.down("#correctSex").setValue(correctSex);
    correctSuperviseForm.down("#telephone").setValue(telephone);
    correctSuperviseForm.down("#correctAddress").setValue(correctAddress);
    correctSuperviseForm.down("#comebackMessage").setValue(comebackMessage);
    correctSuperviseOpenWindow.store.getProxy().extraParams = {
        'id': id
    };
    correctSuperviseOpenWindow.store.reload();
}
