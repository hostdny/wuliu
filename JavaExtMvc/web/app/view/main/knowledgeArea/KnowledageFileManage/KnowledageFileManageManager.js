/**
 * Created by zzw on 2016/8/30.
 */
Ext.define(
    'ExtFrame.view.main.knowledgeArea.KnowledageFileManage.KnowledageFileManageManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.knowledgeArea.KnowledageFileManage.KnowledageFileManageController',
            'ExtFrame.view.main.knowledgeArea.KnowledageFileManage.KnowledageFileManageGrid',
            'ExtFrame.view.main.knowledgeArea.KnowledageFileManage.KnowledageFileManageModel',
            'ExtFrame.view.main.knowledgeArea.KnowledageFileManage.KnowledageFileManageTree',
            'ExtFrame.view.main.knowledgeArea.KnowledageFileManage.KnowledageFileManageWindow',
            'ExtFrame.view.main.knowledgeArea.KnowledageFileManage.KnowledageFileManageUpload',
            'ExtFrame.view.main.knowledgeArea.KnowledageFileManage.KnowledageFileManageButton'],
        layout: {type: 'border'},
        controller: 'knowledageFileManageController',
        viewModel: {type: 'knowledageFileManageModel'},
        fit: true,
        bodyBorder: false,
        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        id:"knowledageFileManageId",
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    title: '文档类别',
                    xtype: 'knowledageFileManageTree',
                    itemId: 'knowledageFileManageTree',
                    id: 'knowledageFileManageTree',
                    width:'20%',
                    region:'west'
                },{
                    xtype: 'knowledageFileManageGrid',
                    itemId: 'knowledageFileManageGrid',
                    id:'knowledageFileManageGrid',
                    ename: 'knowledageFileManage',
                    region: 'center'
                },{
                    xtype: 'knowledageFileManageWindow',
                    itemId:'knowledageFileManageWindow',
                    id:'knowledageFileManageWindow',
                    ename: 'knowledageFileManage',
                    region: 'east',
                    split: true
                }];
            me.callParent();
        }
    }
);