/**
 * Created by lihaiyue on 2016/9/26.
 */
Ext.define('ExtFrame.view.main.cms.cmsLink.CmsLinkWindow', {
    //extend: 'Ext.panel.Panel',
    extend: 'Ext.window.Window',
    alias: 'widget.cmsLinkWindow',
    controller: 'cmsLinkController',
    viewModel: {type: 'cmsLinkModel'},
    //layout: {type: 'border'},

    width: 550,
    height:350,
    plain: true,
    layout: 'fit',
    modal : true,
    closeAction:  'close',
    title: '链接管理',
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemId: me.ename + 'Form',
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
                    labelWidth: 95,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [{
                    xtype: 'hiddenfield',
                    itemId: 'hfOID',//注意，此itemId要写固定，functionjs中重置from有用到
                    name: 'id',
                    bind: '{rec.id}'
                }, {
                    xtype: 'combo',
                    itemId: 'siteId',
                    name: 'siteId',
                    editable: false,
                    allowBlank: false,
                    emptyText: '请选择站点',
                    store: Ext.create('ExtFrame.store.Org', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/cmsSite/queryAll.do",
                            reader: {
                                type: 'json'
                            }
                        }
                    }),
                    queryMode: 'local',
                    displayField: 'siteName',
                    valueField: 'id',
                    allowBlank: false,
                    fieldLabel: '站点名称',
                    maxLength: 100,
                    listeners: {
                        select: function (ppp, record, eOpts) {
                            me.down("#siteName").setValue(record.data.siteName);
                        }
                    }
                },{
                    xtype: 'hiddenfield',
                    itemId: 'siteName',//注意，此itemId要写固定，functionjs中重置from有用到
                    name: 'siteName',
                    bind: '{rec.siteName}'
                }, {
                    xtype: 'textfield',
                    itemId: 'linkName',
                    name: 'linkName',
                    id: 'linkName',
                    bind: '{rec.linkName}',
                    allowBlank: false,
                    emptyText: '请填写链接名称',
                    fieldLabel: '链接名称'
                },{
                    xtype: 'filefield',
                    name : 'siteLogoFile',
                    itemId : 'siteLogoFile',
                    emptyText: '请上传LOGO',
                    fieldLabel : '链接LOGO',
                    buttonText : '选择文件',
                    width : 375,
                    validator: function(value) {
                        if(value != ""){
                            var a = new Array(["jpg","jpeg","png","gif","tiff","tif","JPG","JPEG","PNG","GIF","TIFF","TIF"]);
                            var arr = value.split('.');
                            var img = me.down('image');
                            if (a.toString().indexOf(arr[arr.length - 1]) > -1) {
                                var file = me.down('filefield').fileInputEl.dom.files[0];
                                if(file){
                                    var url = URL.createObjectURL(file);
                                    img.setSrc(url);
                                }
                                return true;
                            }else{
                                img.setSrc("");
                                return "请选择正确的文件类型";
                            }
                        }else{
                            return true;
                        }
                    }
                },{
                    xtype :'textfield',
                    itemId:'url',
                    name : 'url',
                    id:'url',
                    emptyText: '如：https://www.baidu.com/',
                    bind:'{rec.url}',
                    allowBlank: false,
                    fieldLabel:'URL'
                },{
                    xtype :'numberfield',
                    itemId:'sortNo',
                    name : 'sortNo',
                    id:'sortNo',
                    allowBlank: false,
                    emptyText: '请输入排序号',
                    bind:'{rec.sortNo}',
                    fieldLabel:'排序'
                },{
                    xtype :'combo',
                    itemId:'isLogo',
                    name : 'isLogo',
                    id:'isLogo',
                    editable: false,
                    emptyText: '请选择',
                    allowBlank: false,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['text', 'value'],
                        data: [{'value': '0', 'text': '是'}, {'value': '1', 'text': '否'}]
                    }),
                    queryMode: 'local',
                    displayField: 'text',
                    valueField: 'value',
                    bind:'{rec.isLogo}',
                    fieldLabel:'是否显示LOGO'
                },{
                    xtype :'textfield',
                    itemId:'remark',
                    name : 'remark',
                    id:'remark',
                    bind:'{rec.remark}',
                    emptyText: '请填写备注',
                    fieldLabel:'备注'
                },{
                    xtype : 'image',
                    itemId : 'logoUrl',
                    fieldLabel : '预览',
                    width : 200,
                    height : 150,
                    src:''
                }]
            }]
        }];
        me.buttons = [
            {xtype: "button", text: "保存", handler: 'onClickButtonSave'},
            {
                xtype: "button", text: "关闭", handler: 'cancel'
            }
        ];
        this.callParent();
    }
});
