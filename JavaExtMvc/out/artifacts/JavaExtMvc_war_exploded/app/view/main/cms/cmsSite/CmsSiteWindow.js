/**
 * Created by zzw on 2016/9/26.
 */
Ext.define('ExtFrame.view.main.cms.cmsSite.CmsSiteWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cmsSiteWindow',
    viewModel: {type: 'cmsSiteModel'},
    controller: 'cmsSiteController',
    layout: {type: 'border'},
    closeAction: 'destroy',
    buttonAlign: 'center',
    id: 'cmsSiteWindow',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: 'cmsSiteWindowForm',
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
                    xtype: 'textfield',
                    name: 'siteName',
                    itemId: 'siteName',
                    bind: '{rec.siteName}',
                    emptyText: '站点名称',
                    fieldLabel: '站点名称',
                    allowDecimals: false
                }, {
                    xtype: 'textfield',
                    name: 'url',
                    itemId: 'url',
                    bind: '{rec.url}',
                    emptyText: '站点URL',
                    fieldLabel: '站点URL',
                    allowDecimals: false
                },{
                    xtype: 'hiddenfield',
                    name: 'siteCode',
                    itemId: 'siteCode',
                    bind: '{rec.siteCode}',
                    emptyText: '站点编码',
                    fieldLabel: '站点编码',
                    allowDecimals: false
                },{
                    xtype: 'filefield',
                    name : 'addImg',
                    itemId : 'addImg',
                    fieldLabel : 'BANNER图片地址',
                    buttonText : '上传图片',
                    width : 375,
                    regex : /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
                    regexText : '请选择正确的文件类型！',
                    listeners : {
                        change:function(btn,value, eOpts  ){
                            var img_reg = /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
                            if (!img_reg.test(value))
                                return;
                            var img = btn.up('#cmsSiteWindowForm').down('image');
                            var file = btn.fileInputEl.dom.files[0];
                            var url = URL.createObjectURL(file);
                            img.setSrc(url);
                        }
                    }
                },{
                    xtype: 'textfield',
                    name: 'showName',
                    itemId: 'showName',
                    bind: '{rec.showName}',
                    emptyText: '站点显示名称',
                    fieldLabel: '站点显示名称',
                    allowDecimals: false
                },{
                    xtype: 'textfield',
                    name: 'keyWords',
                    itemId: 'keyWords',
                    bind: '{rec.keyWords}',
                    emptyText: '关键字',
                    fieldLabel: '关键字',
                    allowDecimals: false
                },{
                    xtype: 'textfield',
                    name: 'remark',
                    itemId: 'remark',
                    bind: '{rec.remark}',
                    emptyText: '备注',
                    fieldLabel: '备注',
                    allowDecimals: false
                },{
                    xtype: 'hiddenfield',
                    itemId: 'hiddenfootInfo',
                    bind: '{rec.footInfo}',
                    listeners: {
                        change: function (me, newValue, oldValue, eOpts) {
                            me.up('#cmsSiteWindowForm').down('#footInfo').setValue(newValue);
                        }
                    }
                }]
            }, {
                xtype: 'ueditor',
                fieldLabel: 'Foot信息',
                name: 'footInfo',
                itemId: 'footInfo',
                width: '100%'
            },{
                xtype: 'displayfield',
                fieldLabel: '----图片预览'
            },{
                xtype : 'image',
                itemId : 'fileUrl',
                name : 'fileUrl',
                fieldLabel: '预览',
                width : 900,
                height : 200,
                region:'center',
                src:''
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
