/**
 * Created by Jia on 2016/8/19.
 */
Ext.define(
    'ExtFrame.view.main.exam.questionsManagement.questionsContrast.QuestionsContrastManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.exam.questionsManagement.questionsContrast.QuestionsContrastController',
                    'ExtFrame.view.main.exam.questionsManagement.questionsContrast.QuestionsContrastModel',
                    'ExtFrame.view.main.exam.questionsManagement.questionsContrast.QuestionsContrastGrid'],//请求MainController类
        layout: {type: 'border'},
        controller: 'questionsContrastController',
        viewModel: {type: 'questionsContrastModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                xtype: 'questionsContrastGrid',
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center'
            }];
            me.callParent();
        }
    }
);