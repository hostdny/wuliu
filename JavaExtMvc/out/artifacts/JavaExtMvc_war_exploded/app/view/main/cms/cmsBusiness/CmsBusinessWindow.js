/**
 * Created by Jia on 2016/10/25.
 */
Ext.define('ExtFrame.view.main.cms.cmsBusiness.CmsBusinessWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.cmsBusinessWindow',
    controller: 'cmsBusinessController',
    viewModel: {type: 'cmsBusinessModel'},
    width: 550,
    height: 350,
    plain: true,
    layout: 'fit',
    modal: true,
    closeAction: 'close',
    title: '应用信息预览与编辑',
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
                title: '应用信息',
                itemId: 'column1',
                collapsible: true,
                defaults: {
                    labelWidth: 89,
                    anchor: '100%',
                    layout: {type: 'hbox', defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}
                },
                items: [{
                    xtype: 'hiddenfield',
                    itemId: 'hfOid',
                    id: "hfOidPid",
                    name: 'id',
                    fieldLabel: '应用ID',
                    bind: '{rec.id}',
                    readOnly: true
                }, {
                    xtype: 'hiddenfield',
                    itemId: 'siteId',
                    name: 'siteId',
                    fieldLabel: '站点ID',
                    bind: '{rec.siteId}',
                    readOnly: true
                },
                    {
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
                                form.down("#siteId").setValue(record.data.id);
                            }
                        },
                        queryMode: 'local',
                        displayField: 'siteName',
                        valueField: 'id'
                    },
                    {
                    xtype: 'textfield',
                    itemId: 'programName',
                    name: 'programName',
                    bind: '{rec.programName}',
                    emptyText: '应用名称',
                    fieldLabel: '应用名称',
                    allowDecimals: false,
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    name: 'url',
                    itemId: 'url',
                    bind: '{rec.url}',
                    emptyText: '应用url',
                    fieldLabel: '应用url',
                    allowDecimals: false
                }, {
                    xtype: 'hiddenfield',
                    name: 'isMain',
                    itemId: 'isMain',
                    bind: '{rec.isMain}',
                    editable: false,
                    allowDecimals: false
                },
                    {
                        xtype: 'filefield',
                        name: 'businessLogoFile',
                        itemId: 'businessLogoFile',
                        emptyText: '请上传LOGO',
                        fieldLabel: '应用LOGO',
                        buttonText: '选择文件',
                        width: 375,
                        validator: function (value) {
                            if (value != "") {
                                var a = new Array(["jpg", "jpeg", "png", "gif", "tiff", "tif", "JPG", "JPEG", "PNG", "GIF", "TIFF", "TIF"]);
                                var arr = value.split('.');
                                var img = me.down('image');
                                if (a.toString().indexOf(arr[arr.length - 1]) > -1) {
                                    var file = me.down('filefield').fileInputEl.dom.files[0];
                                    if (file) {
                                        var url = URL.createObjectURL(file);
                                        img.setSrc(url);
                                    }
                                    return true;
                                } else {
                                    img.setSrc("");
                                    return "请选择正确的文件类型";
                                }
                            } else {
                                return true;
                            }
                        }
                    },{
                        xtype: 'combo',
                        name: 'isShow',
                        itemId: 'isShow',
                        bind: '{rec.isShow}',
                        emptyText: '是否在网站端显示',//是否在网站端显示 0显示 1 不显示
                        editable: false,// 是否允许输入
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'abbr',
                        fieldLabel: '是否在网站端显示',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['abbr', 'name'],
                            data: [{'abbr': '0', 'name': '显示'}, {'abbr': '1', 'name': '不显示'}]
                        })
                    }, {
                        xtype: 'combo',
                        name: 'isNeedLogin',
                        itemId: 'isNeedLogin',
                        bind: '{rec.isNeedLogin}',
                        emptyText: '是否需要登录',//是否在网站端显示 0显示 1 不显示
                        editable: false,// 是否允许输入
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'abbr',
                        fieldLabel: '是否需要登录',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['abbr', 'name'],
                            data: [{'abbr': '0', 'name': '否'}, {'abbr': '1', 'name': '是'}]
                        })
                    }, {
                        xtype: 'numberfield',
                        name: 'sortNo',
                        itemId: 'sortNo',
                        bind: '{rec.sortNo}',
                        emptyText: '数值越大排序越靠前',
                        fieldLabel: '排序数值',
                        allowDecimals: false
                    }, {
                        xtype: 'textfield',
                        name: 'remark',
                        itemId: 'remark',
                        bind: '{rec.remark}',
                        emptyText: '备注',
                        fieldLabel: '备注',
                        allowDecimals: false
                    }, {
                        xtype: 'image',
                        itemId: 'logoUrl',
                        fieldLabel: '预览',
                        width: 200,
                        height: 150,
                        src: ''
                    }]
            }
            ]
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
