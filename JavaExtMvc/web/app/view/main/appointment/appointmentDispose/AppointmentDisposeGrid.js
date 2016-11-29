/**
 * Created by wangBin on 2016/8/8.
 */
Ext.define('ExtFrame.view.main.appointment.appointmentDispose.AppointmentDisposeGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.appointmentDisposeGrid',
    viewModel: { type: 'appointmentDisposeModel' },
    id:"appointmentDisposeGridId",
    fit: true,
    stripeRows: true,
    defaults: {
        bodyPadding: 0
    },
    initComponent: function () {
        var me = this;
        var pageSize = 10;//分页条数
        var OrderField = 'consultationRptdate';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {
                text: '预约类型',
                width: 200,
                sortable: true,
                dataIndex: 'consultationType',
                renderer:function(value){
                    if(value == "0"){
                        return "律师预约";
                    }else if(value == "1"){
                        return "检察长预约";
                    }else{
                        return "";
                    }
                }
            },{
                text: '预约简介',
                width: 150,
                sortable: true,
                dataIndex: 'consultationTitle'
            },{
                text: '预约人',
                width: 100,
                sortable: true,
                dataIndex: 'consultationPerson'
            },{
                text: '联系方式',
                width: 200,
                sortable: true,
                dataIndex: 'telephone'
            },{
                text: '预约时间',
                width: 200,
                sortable: true,
                dataIndex: 'consultationRptdate'
            },{
                text: '预约回复',
                width: 200,
                sortable: true,
                dataIndex: 'consultationTime',
                renderer:function(value,metaData,record){
                    var id = record.data.id;
                    var consultationBack = record.data.consultationBack;
                    if(value != "" && value != null){
                        metaData.tdAttr = 'data-qtip="' + consultationBack + '"';
                        return value;
                    }else{
                        return '<a href="javascript:void(0)" onclick="onClickReply(\''+id+'\')">回复</a>';
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
                url: Tools.Method.getAPiRootPath() + "/appointment/pagedQueryByBean.do",
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
        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
            ename: 'appointmentDispose',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            hasSearch: false,
            dock: 'top',
            items: []
        },{
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
function onClickReply(value){
    var appointmentDisposeManager = Ext.getCmp("appointmentDisposeManagerId");
    var appointmentDisposeController = appointmentDisposeManager.controller;
    appointmentDisposeController.onClickReply(value);
}