/**
 * Created by Jia on 2016/9/29.
 */
Ext.define('ExtFrame.view.main.proposal.proposalStatistics.ProposalStatisticsGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.proposalStatisticsGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;

        /********************** 根据具体业务需要适当修改 ***********************/
        var pageSize = 10;//分页条数
        var OrderField = 'createTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {text: 'id', dataIndex: 'id', hidden: true},
            //{
            //    text: '提案人身份', dataIndex: 'proposalIdentity', renderer: function (v) {
            //    if (v == 0) {
            //        return '人大代表';
            //    } else if (v == 1) {
            //        return '政协委员';
            //    }
            //}},
            {text: '人大代表提案数', dataIndex: 'npccount',width:150},
            {text: '政协委员提案数', dataIndex: 'cppcccount',width:150},
            {text: '限制时间内回复总数', dataIndex: 'inlimitDateCount',width:150},
            {text: '限制时间外回复总数', dataIndex: 'outlimitDateCount',width:150},
            {text: '答复总数', dataIndex: 'replyCount',width:150}
        ];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.Role', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/proposal/count.do",
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
        }];
        me.callParent();
    }
});
