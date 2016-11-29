/**
 * Created by MSI on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.send.sendsFilesCount.SendsFilesCountGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.sendsFilesCountGrid',
    features:[{
        ftype:'summary'
    }],
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        /********************** 根据具体业务需要适当修改 ***********************/
        var pageSize = 10;//分页条数
        var OrderField = 'year';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {text: 'id', dataIndex: 'id', hidden: true},
            {text: '年份', dataIndex: 'year',
                summaryRenderer: function () {
                    return "合计";
                }},
            {text: '办公室', dataIndex: 'bangongshi',summaryType: 'sum'},
            {text: '政治处', dataIndex: 'zhengzhichu',summaryType: 'sum'},
            {text: '技术科', dataIndex: 'jishuke',summaryType: 'sum'},
            {text: '计财科', dataIndex: 'jicaike',summaryType: 'sum'},
            {text: '后勤服务中心', dataIndex: 'houqinfuwuzhongxin',summaryType: 'sum'},
            {text: '监察室', dataIndex: 'jianchashi',summaryType: 'sum'},
            {text: '侦监局', dataIndex: 'zhenjianju',summaryType: 'sum'},
            {text: '公诉局', dataIndex: 'gongsuju',summaryType: 'sum'},
            {text: '反贪局', dataIndex: 'fantanju',summaryType: 'sum'},
            {text: '反渎局', dataIndex: 'fanduju',summaryType: 'sum'},
            {text: '刑事执行检察局', dataIndex: 'xingshizhijingjianchaju',summaryType: 'sum'},
            {text: '民行科', dataIndex: 'minxingke',summaryType: 'sum'},
            {text: '控申科', dataIndex: 'kongshenke',summaryType: 'sum'},
            {text: '预防局', dataIndex: 'yufangju',summaryType: 'sum'},
            {text: '案管中心', dataIndex: 'anguanzhongxin',summaryType: 'sum'},
            {text: '法警大队', dataIndex: 'fajingdadui',summaryType: 'sum'},
            {header: "合计",dataIndex: "total",summaryType: 'sum' }
        ];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.Role', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/sendsFiles/query.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'id'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'swhere': ""
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
