/**
 * Created by Jia on 2016/8/18.
 */
Ext.define(
    'ExtFrame.view.main.exam.examSession.ExamSessionManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.exam.examSession.ExamSessionController',
            'ExtFrame.view.main.exam.examSession.ExamSessionModel',
            'ExtFrame.view.main.exam.examSession.ExamSessionGrid',
            'ExtFrame.view.main.exam.examSession.ExamSessionWindow',
            'ExtFrame.view.main.exam.examSession.ExamBatchGrid',
            'ExtFrame.view.main.exam.examSession.ExamPanel',
            'ExtFrame.view.main.exam.examSession.ExamPaperModel',
            'ExtFrame.view.extEncap.DateTime'],//请求MainController类
        layout: {type: 'border'},
        controller: 'examSessionController',
        viewModel: {type: 'examSessionModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'examBatchGrid',
                    itemId: 'examBatchGrid',
                    ename: me.ename,
                    region: 'west',
                    width: 275,
                    split: true
                },
                {
                    xtype: 'examSessionGrid',
                    itemId: me.ename + 'Grid',
                    id : 'examSessionGrid',
                    ename: me.ename,
                    region: 'center'
                }, {
                    xtype: 'examSessionWindow',
                    itemId: me.ename + 'Window',
                    ename: me.ename,
                    region: 'east',
                    split: true
                }];
            me.callParent();
        }
    }
);