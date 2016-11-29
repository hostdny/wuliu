/**
 * Created by zzw on 2016/8/18.
 */
Ext.define(
    'ExtFrame.view.main.exam.examBatch.ExamBatchManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.exam.examBatch.ExamBatchController',
            'ExtFrame.view.main.exam.examBatch.ExamBatchGrid',
            'ExtFrame.view.main.exam.examBatch.ExamBatchModel',
            'ExtFrame.view.main.exam.examBatch.ExamPanel',
            'ExtFrame.view.main.exam.examBatch.ExamBatchWindow',
            'ExtFrame.view.main.exam.examBatch.ExamPaperModel',
            'ExtFrame.view.extEncap.DateTime'
        ],
        layout: {type: 'border'},
        controller: 'examBatchController',
        viewModel: {type: 'examBatchModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'examBatchGrid',
                itemId: me.ename + 'Grid',
                id: 'examBatchGridId',
                ename: me.ename,
                region: 'center'
            }, {
                xtype: 'examBatchWindow',
                itemId: me.ename + 'Window',
                ename: me.ename,
                region: 'east',
                split: true
            }];
            me.callParent();
        }
    }
);