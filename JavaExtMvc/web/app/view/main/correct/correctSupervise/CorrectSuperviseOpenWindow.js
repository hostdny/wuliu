/**
 * Created by Administrator on 2016/10/25.
 */

Ext.define('ExtFrame.view.main.correct.correctSupervise.CorrectSuperviseOpenWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.correctSuperviseOpenWindow',
    controller: 'correctSuperviseController',
    viewModel: {type: 'correctSuperviseModel'},
    layout: {type: 'border'},
    closeAction: 'destroy',
    stripeRows: true,
    buttonAlign: 'center',
    id: 'correctSuperviseOpenWindowId',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'correctSuperviseForm',
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
                    name: 'personNum',
                    itemId: 'personNum',
                    bind: '{rec.personNum}',
                    emptyText: '人员编号',
                    fieldLabel: '人员编号',
                    allowDecimals: false
                }, {
                    xtype: 'displayfield',
                    name: 'correctName',
                    itemId: 'correctName',
                    bind: '{rec.correctName}',
                    emptyText: '人员姓名',
                    fieldLabel: '人员姓名',
                    allowDecimals: false
                }, {
                    xtype: 'displayfield',
                    name: 'correctSex',
                    itemId: 'correctSex',
                    bind: '{rec.correctSex}',
                    emptyText: '人员性别',
                    fieldLabel: '人员性别',
                    allowDecimals: false
                }, {
                    xtype: 'displayfield',
                    name: 'telephone',
                    itemId: 'telephone',
                    bind: '{rec.telephone}',
                    emptyText: '人员手机号',
                    fieldLabel: '人员手机号',
                    allowDecimals: false
                }, {
                    xtype: 'displayfield',
                    name: 'correctAddress',
                    itemId: 'correctAddress',
                    bind: '{rec.correctAddress}',
                    emptyText: '人员位置',
                    fieldLabel: '人员位置',
                    allowDecimals: false
                }, {
                    xtype: 'displayfield',
                    name: 'comebackMessage',
                    itemId: 'comebackMessage',
                    bind: '{rec.comebackMessage}',
                    emptyText: '人员反馈',
                    fieldLabel: '人员反馈',
                    allowDecimals: false
                }]
            }]
        }];
        me.store = Ext.create('ExtFrame.store.Role', {
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+ "/correctRecord/queryByRecordId.do",
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
