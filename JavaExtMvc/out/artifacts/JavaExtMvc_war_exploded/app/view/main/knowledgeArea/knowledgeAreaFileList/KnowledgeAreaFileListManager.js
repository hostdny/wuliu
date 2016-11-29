/**
 * Created by wangBin on 2016/8/29.
 */
Ext.define(
    'ExtFrame.view.main.knowledgeArea.knowledgeAreaFileList.KnowledgeAreaFileListManager',
    {
        requires: [
            'ExtFrame.view.main.knowledgeArea.knowledgeAreaFileList.KnowledgeAreaFileListModel',
            'ExtFrame.view.main.knowledgeArea.knowledgeAreaFileList.KnowledgeAreaFileListTree',
            'ExtFrame.view.main.knowledgeArea.knowledgeAreaFileList.KnowledgeAreaFileListController',
            'ExtFrame.view.main.knowledgeArea.knowledgeAreaFileList.KnowledgeAreaFileListGrid'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'knowledgeAreaFileListManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'knowledgeAreaFileListController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    title: '文档类别',
                    xtype: 'knowledgeAreaFileListTree',
                    itemId: 'knowledgeAreaFileListTree',
                    width:'20%',
                    region:'west'
                },
                {
                    title: '文档列表',
                    xtype: 'knowledgeAreaFileListGrid',
                    itemId: 'knowledgeAreaFileListGrid',
                    width:'80%',
                    region:'center'
                }
            ];
            me.callParent();
        }


    });