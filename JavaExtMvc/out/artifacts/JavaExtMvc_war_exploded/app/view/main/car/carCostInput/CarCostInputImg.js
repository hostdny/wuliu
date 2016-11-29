/**
 * Created by wangBin on 2016/7/22.
 */
Ext.define('ExtFrame.view.main.car.carCostInput.CarCostInputImg', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.carCostInputImg',
    stripeRows: true,
    autoScroll:true,
    initComponent: function () {
        var me = this;
        me.storeImageModel = Ext.create('ExtFrame.store.ModuleTree', {
            remoteSort: true,
            sortOnLoad: true,
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/attachment/queryByDataId.do",
                reader: {
                    type: 'json',
                    rootProperty: 'extData',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'pttId'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'businessData': "-1"
                },
                listeners: {
                    //捕捉异常处理
                    exception: function (theproxy, response, operation, options) {
                        Tools.Method.ExceptionEncap(response);
                    }
                }
            }
        });

        me.dockedItems = {
            items: Ext.create('Ext.view.View', {
                store: me.storeImageModel,
                autoScroll:true,
                tpl: [
                    '<tpl for=".">',
                    '<div class="thumb-wrap" style="width:100px;display: inline-block;text-align: center;margin-top: 10px">',
                    '<div class="thumb"><img src="{fileUrl}" height="50" width="50"></div>',
                    '</div>',
                    '</tpl>',
                ],
                trackOver: true,
                autoScroll:true,
                overItemCls: 'x-item-over',
                itemSelector: 'div.thumb-wrap',
                itemId:'imgId',
                listeners: {
                    selectionchange: "onClickImgShow"
                }
            })
        }
        me.callParent();
    }



});