Ext.define('ExtFrame.view.main.exam.examStudent.approve.ApproveTree', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Ext.ux.CheckColumn'
    ],
    alias: 'widget.approveTree',
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
                url: Tools.Method.getAPiRootPath()+'/examStudent/queryExamTypeTree.do'
            }
        });
        me.columns = [{
            xtype: 'treecolumn',
            dataIndex: 'name',
            width:'98%'
        }];
        me.callParent();

    }
});