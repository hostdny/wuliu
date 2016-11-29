/**
 * Created by wangBin on 2016/9/21.
 */
Ext.define(
    'ExtFrame.view.main.eBookManage.eBook.EBookManager',
    {
        requires: [
            'ExtFrame.view.main.eBookManage.eBook.EBookController',
            'ExtFrame.view.main.eBookManage.eBook.EBookGrid',
            'ExtFrame.view.main.eBookManage.eBook.EBookUpload',
            'ExtFrame.view.main.eBookManage.eBook.EBookForm',
            'ExtFrame.view.main.eBookManage.eBook.EBookModel'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'eBookManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,
        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'eBookController',
        stripeRows: true,

        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'eBookGrid',
                    itemId: 'eBookGrid',
                    width:'60%',
                    region:'west'
                },{
                    xtype: 'eBookForm',
                    itemId: 'eBookForm',
                    width:'40%',
                    hidden:true,
                    region:'center'
                },{
                    xtype: 'eBookUpload',
                    itemId: 'eBookUpload',
                    width:'40%',
                    region:'center'
                }

            ];
            me.callParent();
        }


    });