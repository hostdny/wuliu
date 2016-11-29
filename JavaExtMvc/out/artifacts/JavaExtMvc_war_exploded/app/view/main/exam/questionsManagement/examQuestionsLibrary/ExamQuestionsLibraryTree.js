/**
 * Created by zzw on 2016/8/19.
 */
Ext.define('ExtFrame.view.main.exam.questionsManagement.examQuestionsLibrary.ExamQuestionsLibraryTree', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Ext.ux.CheckColumn'
    ],
    alias: 'widget.examQuestionsLibraryTree',
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