/**
 * Created by Administrator on 2016/10/25.
 */

Ext.define('ExtFrame.view.main.correct.correctActivity.CorrectActivityWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.correctActivityWindow',
    controller: 'correctActivityController',
    viewModel: {type: 'correctActivityModel'},
    layout: {type: 'border'},
    closeAction: 'destroy',
    stripeRows: true,
    buttonAlign: 'center',
    id: 'correctActivityWindowId',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'correctActivityForm',
            ename: me.ename,
            region: 'center',
            autoScroll: true,
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'right',
                padding: 2
            },
            items: [{
                xtype: 'fieldset',
                title: '基本信息',
                itemId: 'column1',
                collapsible: true,
                defaults: {
                    labelWidth: 89,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [{
                    xtype: 'hiddenfield',
                    itemId: 'hfOID',//注意，此itemId要写固定，functionjs中重置from有用到
                    name: 'id',
                    bind: '{rec.id}'
                }, {
                    xtype: 'displayfield',
                    name: 'activityName',
                    itemId: 'activityName',
                    bind: '{rec.activityName}',
                    emptyText: '活动名称',
                    fieldLabel: '活动名称',
                    allowDecimals: false
                }, {
                    xtype: 'displayfield',
                    name: 'activityTime',
                    itemId: 'activityTime',
                    bind: '{rec.activityTime}',
                    emptyText: '活动时间',
                    fieldLabel: '活动时间',
                    allowDecimals: false
                }, {
                    xtype: 'displayfield',
                    name: 'personNames',
                    itemId: 'personNames',
                    bind: '{rec.personNames}',
                    emptyText: '参与人员',
                    fieldLabel: '参与人员',
                    allowDecimals: false
                }]
            }]
        }];
        me.store = Ext.create('ExtFrame.store.Role', {
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/correctActivity/queryByActivityId.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'id'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    id:"-1"
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
                store: me.store,
                tpl: [
                    '<tpl for=".">',
                    '<div class="thumb-wrap" style="width:100px;display: inline-block;text-align: center;margin-top: 10px">',
                    '<tpl if="this.check(fileType)">',
                    '<div class="thumb"><img src="{fileUrl}" height="50" width="50"></div>',
                    '</tpl>',
                    '<tpl if="!this.check(fileType)">',
                    '<div class="thumb"><img src="../../../../../image/videoShow.jpg" height="50" width="50"></div>',
                    '</tpl>',
                    '<span class="x-editable">{fileName}</span>',
                    '</div>',
                    '</tpl>',
                    {
                        check : function(fileType) {
                            if(fileType == "mp4"){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    }
                ],
                trackOver: true,
                overItemCls: 'x-item-over',
                itemSelector: 'div.thumb-wrap',
                itemId:'imageId',
                listeners: {
                    selectionchange:'onClickSelectedImage'
                }
            })
        };


        me.buttons = [
            {
                xtype: "button", text: "关闭", handler: function () {
                me.up().close();
            }
            }
        ];
        me.callParent();
    }
});
