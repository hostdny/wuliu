/**
 * Created by zzw on 2016/8/18.
 */
Ext.define(
    'ExtFrame.view.main.exam.questionsManagement.examQuestionsLibrary.ExamQuestionsLibraryManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.exam.questionsManagement.examQuestionsLibrary.ExamQuestionsLibraryController',
            'ExtFrame.view.main.exam.questionsManagement.examQuestionsLibrary.ExamQuestionsLibraryGrid',
            'ExtFrame.view.main.exam.questionsManagement.examQuestionsLibrary.ExamQuestionsLibraryModel',
            'ExtFrame.view.main.exam.questionsManagement.examQuestionsLibrary.ExamQuestionsLibraryTree',
            'ExtFrame.view.main.exam.questionsManagement.examQuestionsLibrary.ExamQuestionsLibraryWindow',
            'ExtFrame.view.extEncap.UEditor'],
        layout: {type: 'border'},
        controller: 'examQuestionsLibraryController',
        viewModel: {type: 'examQuestionsLibraryModel'},
        fit: true,
        bodyBorder: false,
        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    title: '试题分类',
                    xtype: 'examQuestionsLibraryTree',
                    itemId: 'examQuestionsLibraryTree',
                    width:'10%',
                    region:'west'
            },{
                xtype: 'examQuestionsLibraryGrid',
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center'
            },{
                xtype: 'examQuestionsLibraryWindow',
                itemId: me.ename + 'Window',
                ename: me.ename,
                region: 'east',
                split: true
            }];
            me.callParent();
        }
    }
);