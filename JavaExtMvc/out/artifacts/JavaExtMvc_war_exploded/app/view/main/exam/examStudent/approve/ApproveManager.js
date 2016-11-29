/**
 * Created by wangBin on 2016/8/18.
 */
Ext.define(
    'ExtFrame.view.main.exam.examStudent.approve.ApproveManager',
    {
        requires: [
            'ExtFrame.view.main.exam.examStudent.approve.ApproveModel',
            'ExtFrame.view.main.exam.examStudent.approve.ApproveTree',
            'ExtFrame.view.main.exam.examStudent.approve.ApproveController',
            'ExtFrame.view.main.exam.examStudent.approve.ApproveGrid',
            'ExtFrame.view.main.exam.examStudent.approve.ApproveWindow'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'examManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'approveController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    title: '考试类别',
                    xtype: 'approveTree',
                    itemId: 'approveTree',
                    width:'10%',
                    region:'west'
                },
                {
                    title: '人员管理',
                    xtype: 'approveGrid',
                    itemId: 'approveGrid',
                    width:'90%',
                    region:'center'
                },{
                    xtype: 'approveWindow',
                    itemId: 'approveWindow',
                    ename: 'approve',
                    region: 'east',
                    split: true
                }
            ];
            me.callParent();
        }


    });