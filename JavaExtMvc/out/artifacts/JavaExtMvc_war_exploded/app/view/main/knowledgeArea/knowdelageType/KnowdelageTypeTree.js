Ext.define('ExtFrame.view.main.knowledgeArea.knowdelageType.KnowdelageTypeTree', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Ext.ux.CheckColumn'
    ],
    alias: 'widget.knowdelageTypeTree',
    reserveScrollbar: true,
    rootVisible: false,
    useArrows: true,
    fit: true,
    collapsible:false,
    stripeRows: true,
    hideHeaders:true,
    listeners: {
        select: 'onSelectTree'
    },
    initComponent: function () {
        var me = this;
        me.store = Ext.create('ExtFrame.store.ModuleTree', {
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath()+'/knowdelageType/queryToTreeGrid.do'
            },listeners : {
                nodebeforeexpand:function(node,eOpts){
                    //点击父亲节点的菜单会将节点的id通过ajax请求，
                    if(node.id !="root"){
                        this.proxy.extraParams.parentId = node.raw.id;
                    }else{
                        this.proxy.extraParams.parentId="";
                    }
                }
            }
        });
        me.columns = [{
            xtype: 'treecolumn',
            dataIndex: 'typeName',
            width:'98%'
        }];
        me.callParent();

    }
});