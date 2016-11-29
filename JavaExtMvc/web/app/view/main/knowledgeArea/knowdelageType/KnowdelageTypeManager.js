/**
 * Created by Jia on 2016/8/30.
 */
Ext.define(
    'ExtFrame.view.main.knowledgeArea.knowdelageType.KnowdelageTypeManager',
    {
        requires: [
            'ExtFrame.view.main.knowledgeArea.knowdelageType.KnowdelageTypeModel',
            'ExtFrame.view.main.knowledgeArea.knowdelageType.KnowdelageTypeTree',
            'ExtFrame.view.main.knowledgeArea.knowdelageType.KnowdelageTypeController',
            'ExtFrame.view.main.knowledgeArea.knowdelageType.KnowdelageTypeGrid',
            'ExtFrame.view.main.knowledgeArea.knowdelageType.KnowdelageTypeWindow'
        ],
        extend: 'Ext.panel.Panel',
        layout: {type: 'border'},
        controller: 'knowdelageTypeController',
        viewModel: {type: 'knowdelageTypeModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    title:'分类类别',
                    xtype: 'knowdelageTypeTree',
                    itemId: 'knowdelageTypeTree',
                    ename: me.ename,
                    region: 'west',
                    width: 150,
                    split: true
                },
                {
                    title:'分类列表',
                    xtype: 'knowdelageTypeGrid',
                    itemId: me.ename + 'Grid',
                    id : 'knowdelageTypeGrid',
                    ename: me.ename,
                    region: 'center'
                },
                {
                    xtype: 'knowdelageTypeWindow',
                    itemId: me.ename + 'Window',
                    ename: me.ename,
                    region: 'east',
                    split: true
                }
            ];
            me.callParent();
        }
    }
);