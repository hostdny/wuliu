Ext.define(
    'ExtFrame.view.main.cms.CmsPanel',
    {
        extend: 'Ext.panel.Panel',
        itemId: 'cmsPanel',
        alias: 'widget.cmsPanel',
        layout: {type: 'border'},
        buttonAlign: 'center',
        autoScroll:true,
        fit: true,
        initComponent: function () {
            var me = this;
            me.items = [

                {
                    xtype: 'cmsGrid',
                    itemId: 'cmsGrid',
                    height:"100%",
                    ename: 'cms',
                    region: 'center'
                },{
                    xtype: 'cmsForm',
                    itemId: 'cmsForm',
                    ename: 'cms',
                    height:"35%",
                    hidden:true,
                    region:'center'
                },{
                    xtype: 'cmsHtml',
                    itemId: 'cmsHtml',
                    height: '65%',
                    hidden:true,
                    region: 'south'
                }
            ];
            me.callParent();
        }


    });