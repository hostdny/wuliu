/**
 * Created by MSI on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.correct.correctCount.CorrectCountGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.correctCountGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        /********************** 根据具体业务需要适当修改 ***********************/
        me.columns = [
            {text: 'id', dataIndex: 'id', hidden: true},
            {text: '矫正活动次数', dataIndex: 'activitycount', width: 200},
            {text: '被矫正人员矫正次数', dataIndex: 'reccount', width: 200},
            {text: '被矫正人员反馈次数', dataIndex: 'replaycount', width: 200}
        ];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.Role', {
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/correctActivity/count.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'id'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'swhere': "",
                    'startTime':"",
                    'endTime':""
                },
                listeners: {
                    //捕捉异常处理
                    exception: function (theproxy, response, operation, options) {
                        Tools.Method.ExceptionEncap(response);
                    }
                }
            },
            listeners: {
                beforeload: function (store, operation, eOpts) {
                    var aaa = store;
                }
            }
        });
        //////grid 停靠item
        me.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: me.store,//分页控件数据（同grid的数据保持一致）
            dock: 'bottom',
            displayInfo: true,
            items: [
                '-', {cls: 'x-btn-text-icon details'}
            ]
        }]
        me.callParent();
    }
});
