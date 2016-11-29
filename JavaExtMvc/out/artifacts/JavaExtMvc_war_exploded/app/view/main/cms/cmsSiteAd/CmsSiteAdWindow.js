/**
 * Created by zzw on 2016/9/26.
 */
Ext.define('ExtFrame.view.main.cms.cmsSiteAd.CmsSiteAdWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cmsSiteAdWindow',
    viewModel: {type: 'cmsSiteAdModel'},
    controller: 'cmsSiteAdController',
    layout: {type: 'border'},
    closeAction: 'destroy',
    buttonAlign: 'center',
    id: 'cmsSiteAdWindow',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'cmsSiteAdWindowForm',
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
                    itemId: 'id',
                    name: 'id',
                    bind: '{rec.id}',
                    fieldLabel: 'ID',
                    readOnly: true
                }, {
                    xtype: 'hiddenfield',
                    name: 'siteName',
                    itemId: 'siteName',
                    bind: '{rec.siteName}',
                    emptyText: '站点名称',
                    fieldLabel: '站点名称',
                    allowDecimals: false
                },{
                    xtype: 'combo',
                    itemId: 'siteId',
                    allowNegative: false,
                    name: 'siteId',
                    fieldLabel: '站点名称',
                    emptyText: '请输入站点名称',
                    allowDecimals: false,
                    editable: false,
                    store: Ext.create('ExtFrame.store.Org', {
                        pageSize: 0,
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/cmsSite/queryAll.do",
                            reader: {
                                type: 'json'
                            }
                        }
                    }),
                    listeners: {
                        select: function (me, record, eOpts) {
                            var form = me.up('form');
                            //var name=form.down("#siteId").rawValue;
                            form.down("#siteName").setValue(record.data.siteName);
                        }
                    },
                    queryMode: 'local',
                    displayField: 'siteName',
                    valueField: 'id'
                }, {
                    xtype: 'textfield',
                    name: 'adName',
                    itemId: 'adName',
                    bind: '{rec.adName}',
                    emptyText: '广告名称',
                    fieldLabel: '广告名称',
                    allowDecimals: false
                }, {
                    xtype: 'textfield',
                    name: 'adType',
                    itemId: 'adType',
                    bind: '{rec.adType}',
                    emptyText: '广告类型',
                    fieldLabel: '广告类型',
                    allowDecimals: false
                }, {
                    xtype: 'textfield',
                    name: 'adAddress',
                    itemId: 'adAddress',
                    bind: '{rec.adAddress}',
                    emptyText: '广告位置',
                    fieldLabel: '广告位置',
                    allowDecimals: false
                },{
                    xtype: 'filefield',
                    name : 'addImg',
                    itemId : 'addImg',
                    fieldLabel : '图片地址',
                    buttonText : '上传图片',
                    width : 375,
                    regex : /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
                    regexText : '请选择正确的文件类型！',
                    listeners : {
                        change:function(btn,value, eOpts  ){
                            var img_reg = /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
                            if (!img_reg.test(value))
                                return;
                            var img = btn.up('#cmsSiteAdWindowForm').down('image');
                            var file = btn.fileInputEl.dom.files[0];
                            var url = URL.createObjectURL(file);
                            img.setSrc(url);
                        }
                    }
                },{
                    xtype: 'textfield',
                    name: 'remark',
                    itemId: 'remark',
                    bind: '{rec.remark}',
                    emptyText: '备注',
                    fieldLabel: '备注',
                    allowDecimals: false
                },{
                    xtype: 'displayfield',
                    fieldLabel: '----图片预览'
                },{
                    xtype : 'image',
                    itemId : 'fileUrl',
                    name : 'fileUrl',
                    fieldLabel: '预览',
                    width : 200,
                    height : 200,
                    region:'center',
                    src:''
                }
                ]
            }
            ]
        }];
        me.buttons = [
            {xtype: "button", text: "保存", handler: 'onClickButtonSave'},
            {
                xtype: "button", text: "关闭", handler: function () {
                me.up().close();
            }
            }
        ];
        this.callParent();
    }
});
