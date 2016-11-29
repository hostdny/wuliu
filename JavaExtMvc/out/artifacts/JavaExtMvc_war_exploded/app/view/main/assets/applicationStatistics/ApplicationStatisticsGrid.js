/**
 * Created by zzw on 2016/7/25.申请统计
 */
Ext.define('ExtFrame.view.main.assets.applicationStatistics.ApplicationStatisticsGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.applicationStatisticsGrid',
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
            {text: '类型', dataIndex: 'row'},
            {text: '年份', dataIndex: 'year'},
            {text: '办公室', dataIndex: 'bangongshi'},
            {text: '政治处', dataIndex: 'zhengzhichu'},
            {text: '技术科', dataIndex: 'jishuke'},
            {text: '计财科', dataIndex: 'jicaike'},
            {text: '后勤服务中心', dataIndex: 'houqinfuwuzhongxin'},
            {text: '监察室', dataIndex: 'jianchashi'},
            {text: '侦监局', dataIndex: 'zhenjianju'},
            {text: '公诉局', dataIndex: 'gongsuju'},
            {text: '反贪局', dataIndex: 'fantanju'},
            {text: '反渎局', dataIndex: 'fanduju'},
            {text: '刑事执行检察局', dataIndex: 'xingshizhijingjianchaju'},
            {text: '民行科', dataIndex: 'minxingke'},
            {text: '控申科', dataIndex: 'kongshenke'},
            {text: '预防局', dataIndex: 'yufangju'},
            {text: '案管中心', dataIndex: 'anguanzhongxin'},
            {text: '法警大队', dataIndex: 'fajingdadui'},
            {header: "合计",
                dataIndex: "total",
                renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
                    var dat=record.data;
                    return dat.bangongshi+dat.zhengzhichu+dat.jishuke+dat.jicaike
                        +dat.houqinfuwuzhongxin+dat.jianchashi+dat.zhenjianju
                        +dat.gongsuju+dat.fantanju+dat.fanduju
                        +dat.xingshizhijingjianchaju+dat.minxingke+dat.kongshenke
                        +dat.yufangju+dat.anguanzhongxin+dat.fajingdadui;
                }
            }
        ];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.Role', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/assentRecord/queryAssentRecordDeclare.do",
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
