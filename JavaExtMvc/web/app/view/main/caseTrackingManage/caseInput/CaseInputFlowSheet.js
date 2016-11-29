Ext.define('ExtFrame.view.main.caseTrackingManage.caseInput.CaseInputFlowSheet', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.caseInputFlowSheet',
    stripeRows: true,
    id:'caseInputFlowSheetId',
    viewModel: { type: 'caseInputModel' },
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.store = Ext.create('ExtFrame.store.ModuleTree', {
            remoteSort: true,
            sortOnLoad: true,
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/caseInfo/queryFlowSheet.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'id'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'configId': "-1"
                },
                listeners: {
                    //捕捉异常处理
                    exception: function (theproxy, response) {
                        Tools.Method.ExceptionEncap(response);
                    }
                }
            }
        });
        me.dockedItems = {
            items: Ext.create('Ext.view.View', {
                store: me.store,
                tpl: [
                    '<tpl for=".">',
                    '<div class="thumb-wrap" style="width:100px;display: inline-block;text-align: center;margin-top: 10px">',
                    '<div class="thumb"><img src="../../../../../image/videoShow.jpg" height="50" width="50"></div>',
                    '<span class="x-editable">{caseName}</span>',
                    '</div>',
                    '</tpl>'
                ],
                trackOver: true,
                overItemCls: 'x-item-over',
                itemSelector: 'div.thumb-wrap',
                itemId:'imageId'
                //,
                //listeners: {
                //    selectionchange:'onClickSelectedImage'
                //}
            })
        };
        me.buttons = [
            {
                xtype: "button",
                text: "关闭",
                handler: 'onClickFlowSheetClose'
            }
        ];
        me.callParent();
    }
});