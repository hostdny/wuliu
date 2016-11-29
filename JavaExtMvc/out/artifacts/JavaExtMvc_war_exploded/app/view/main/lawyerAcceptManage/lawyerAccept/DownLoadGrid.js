/**
 * Created by zzw on 2016/9/24.
 */
Ext.define('ExtFrame.view.main.lawyerAcceptManage.lawyerAccept.DownLoadGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.downLoadGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        var pageSize = 10;//分页条数
        var OrderField = 'rptDate';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {text: '文件名',dataIndex: 'fileName',width: '30%', sortable: true},
            {text: '附件大小', width: '15%', sortable: true, dataIndex: 'fileSize'},
            {
                text: '下载',
                width: '20%',
                sortable: true,
                dataIndex: 'fileUrl',
                renderer: function(value,eOpts) {
                    var fileType = eOpts.record.data.fileType;
                    var a = new Array(["jpg","jpeg","png","gif","tiff","tif"]);
                    var fileType = eOpts.record.data.fileType;
                    if (a.toString().indexOf(fileType) > -1) {
                        return'<a href="javascript:void(0)" onclick="lookFile(\'' + value + '\')">查看</a>';
                    }else{
                        return '<a href="javascript:void(0)" onclick="downLoadFile(\'' + value + '\')">下载</a>';
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
                url: Tools.Method.getAPiRootPath()+ "/lawyerAccept/queryByBuinessDate.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'pttId'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'businessData':-1
                },
                listeners: {
                    //捕捉异常处理
                    exception: function (theproxy, response) {
                        Tools.Method.ExceptionEncap(response);
                    }
                }

            }

        });
        //grid 停靠item
        me.dockedItems = [ {
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
function downLoadFile(url){
    window.location.href = url;
}
function lookFile(url){
    window.open(url);
}
