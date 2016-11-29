/**
 * Created by wangBin on 2016/8/29.
 */
Ext.define('ExtFrame.view.main.knowledgeArea.knowledgeAreaFileList.KnowledgeAreaFileListTree', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Ext.ux.CheckColumn'
    ],
    alias: 'widget.knowledgeAreaFileListTree',
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
            width:'98%',
            renderer: function (value,eOpts) {
                var state = eOpts.record.data.state;
                if (state == "0") {
                    return '<span style="color:gray;">'+value+'</span>';
                }else{
                    return value;
                }
            }
        }];
        me.callParent();

    }
});