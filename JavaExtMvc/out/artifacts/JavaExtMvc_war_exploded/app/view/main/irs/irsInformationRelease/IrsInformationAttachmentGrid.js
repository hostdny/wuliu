/**
 * Created by LvXL on 2016/7/14.d
 */
Ext.define('ExtFrame.view.main.irs.irsInformationRelease.IrsInformationAttachmentGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.irsInformationAttachmentGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        /********************** 根据具体业务需要适当修改 ***********************/
        var OrderField = 'createTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        /*
         ** grid控件绑定列
         ** text: 前台显示文字, dataIndex: 数据绑定字段, sortable: 能否排序（缺省值为true）
         ** searchable: 能否查询（缺省值为false）
         ** fieldType: 字段类型（用户查询控件拼接where字句，目前仅支持 string、int、datetime
         其中string类型使用'like'关键字查询，其余的使用'='关键字查询）
         */
        me.columns = [
            {text: 'id', dataIndex: 'id', hidden: true},
            {text: '附件名称', dataIndex: 'fileName', width: 300},
            {
                text: '操作', renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                var id = record.data.id;
                var fileUrl = record.data.fileUrl;
                return "<a href=\"#\" onclick=\"deleteAtt('" + id + "')\">删除</a> | <a href=\"" + fileUrl + "\" >下载</a>";
            }
            }
        ];
        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/attachment/query.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'id'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'businessData': ""
                },
                listeners: {
                    //捕捉异常处理
                    exception: function (theproxy, response, operation, options) {
                        Tools.Method.ExceptionEncap(response);
                    }
                }
            }
        });
        //grid 停靠item
        me.dockedItems = [{
            xtype: 'toolbar',
            id: 'irsInformationAttachmentGrid_toolbar',
            layout: 'column',
            items: [{
                text: '上传附件',
                handler: 'onClickUploadFile'
            }]
        }];
        me.callParent();
    }
});
function deleteAtt(id) {

    var attIds = Ext.getCmp("irsInformationReleaseForm_attachmentIds");
    var grid = Ext.getCmp("irsInformationAttachmentGrid");
    var data = {ids: id};
    //用户确认删除操作-----点击“是”
    Ext.MessageBox.confirm('提醒', '确定要删除选中行？', function (btn) {
        if (btn == 'yes') {
            Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/attachment/delete.do', 'POST', data, true, function (jsonData) {
                if (jsonData.resultCode == "1") {
                    Tools.Method.ShowTipsMsg(Tools.Method.StrFormat(Tools.Msg.MSG00141, [jsonData.sCount, jsonData.fCount]), '4000', '1', null);
                    // 刷新grid
                    grid.store.getProxy().extraParams = {
                        'attIds': attIds.getValue()
                    }
                    grid.store.reload();
                } else {
                    Tools.Method.ShowTipsMsg(Tools.Msg.MSG0022, '4000', '2', null);
                }
            });
        }
    });
}