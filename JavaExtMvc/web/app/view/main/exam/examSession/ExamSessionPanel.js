/**
 * Created by Jia on 2016/8/23.
 */
Ext.define(
    'ExtFrame.view.main.exam.examSession.ExamSessionPanel', {
        extend: 'Ext.panel.Panel',
        alias: 'widget.examSessionPanel',
        controller: 'examSessionController',
        buttonAlign: 'center',
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'form',
                itemId: 'examSessionPanelForm',
                region: 'center',
                autoScroll: true,
                bodyPadding: 6,
                padding: 5,
                defaults: {
                    bodyPadding: 6
                },
                items: [{   text: 'batchId',
                    name: 'batchId',
                    itemId: 'batchId',
                    bind: '{rec.batchId}',
                    hidden: true
                },{
                    layout: 'column',
                    itemId: 'column1',
                    items: [
                        {
                            xtype: 'textfield',
                            height:50,
                            width:130,
                            disabled:true,
                            allowBlank:false,
                            editable: false
                        }, {
                            xtype: 'textfield',
                            value: '个数',
                            height:50,
                            width:130,
                            disabled:true,
                            allowBlank:false,
                            editable: false
                        }, {
                            xtype: 'textfield',
                            value: '单个分值',
                            disabled:true,
                            allowBlank:false,
                            height:50,
                            width:130,
                            editable: false
                        }, {
                            xtype: 'textfield',
                            value: '容易',
                            disabled:true,
                            allowBlank:false,
                            height:50,
                            width:130,
                            editable: false
                        }, {
                            xtype: 'textfield',
                            value: '一般',
                            height:50,
                            width:130,
                            disabled:true,
                            allowBlank:false,
                            editable: false
                        },{
                            xtype: 'textfield',
                            value: '困难',
                            height:50,
                            width:130,
                            disabled:true,
                            allowBlank:false,
                            editable: false
                        }]
                },{
                    layout: 'column',
                    itemId: 'column2',
                    items: [
                        {
                            xtype: 'textfield',
                            value: '基础类',
                            width:780,
                            disabled:true,
                            allowBlank:false,
                            editable: false
                        }
                    ]
                }, {
                    layout: 'column',
                    itemId: 'column3',
                    items: [
                        {
                            xtype: 'textfield',
                            value: '判断题',
                            disabled:true,
                            allowBlank:false,
                            height:30,
                            width:130,
                            allowNegative : false,
                            editable: false
                        }, {
                            xtype: 'textfield',
                            name: 'baseJudgeNo',
                            itemId: 'baseJudgeNo',
                            bind: '{rec.baseJudgeNo}',
                            height:30,
                            width:130,
                            listeners: {
                                blur: 'onBlurbaseJudgeNo'
                            }

                        }, {
                            xtype: 'textfield',
                            name: 'baseJudgeScore',
                            itemId: 'baseJudgeScore',
                            bind: '{rec.baseJudgeScore}',
                            height:30,
                            width:130
                        }, {
                            xtype: 'textfield',
                            name: 'baseJudgeEasyNo',
                            itemId: 'baseJudgeEasyNo',
                            bind: '{rec.baseJudgeEasyNo}',
                            height:30,
                            width:130
                        }, {
                            xtype: 'textfield',
                            name: 'baseJudgeMidNo',
                            itemId: 'baseJudgeMidNo',
                            bind: '{rec.baseJudgeMidNo}',
                            height:30,
                            width:130
                        },{
                            xtype: 'textfield',
                            name: 'baseJudgeHardNo',
                            itemId: 'baseJudgeHardNo',
                            bind: '{rec.baseJudgeHardNo}',
                            height:30,
                            width:130
                        }]
                }, {
                    layout: 'column',
                    itemId: 'column4',
                    items: [
                        {
                            xtype: 'textfield',
                            value: '单选题',
                            disabled:true,
                            allowBlank:false,
                            height:30,
                            width:130,
                            editable: false
                        }, {
                            xtype: 'textfield',
                            name: 'baseSingleNo',
                            itemId: 'baseSingleNo',
                            bind: '{rec.baseSingleNo}',
                            height:30,
                            width:130
                        }, {
                            xtype: 'textfield',
                            name: 'baseSingleScore',
                            itemId: 'baseSingleScore',
                            bind: '{rec.baseSingleScore}',
                            height:30,
                            width:130
                        }, {
                            xtype: 'textfield',
                            name: 'baseSingleEasyNo',
                            itemId: 'baseSingleEasyNo',
                            bind: '{rec.baseSingleEasyNo}',
                            height:30,
                            width:130
                        }, {
                            xtype: 'textfield',
                            name: 'baseSingleMidNo',
                            itemId: 'baseSingleMidNo',
                            bind: '{rec.baseSingleMidNo}',
                            height:30,
                            width:130
                        },{
                            xtype: 'textfield',
                            name: 'baseSingleHardNo',
                            itemId: 'baseSingleHardNo',
                            bind: '{rec.baseSingleHardNo}',
                            height:30,
                            width:130
                        }]
                },{
                    layout: 'column',
                    itemId: 'column5',
                    items: [
                        {
                            xtype: 'textfield',
                            value: '多选题',
                            disabled:true,
                            allowBlank:false,
                            height:30,
                            width:130,
                            editable: false
                        }, {
                            xtype: 'textfield',
                            name: 'baseMulNo',
                            itemId: 'baseMulNo',
                            bind: '{rec.baseMulNo}',
                            height:30,
                            width:130
                        }, {
                            xtype: 'textfield',
                            name: 'baseMulScore',
                            itemId: 'baseMulScore',
                            bind: '{rec.baseMulScore}',
                            height:30,
                            width:130
                        }, {
                            xtype: 'textfield',
                            name: 'baseMulEasyNo',
                            itemId: 'baseMulEasyNo',
                            bind: '{rec.baseMulEasyNo}',
                            height:30,
                            width:130
                        }, {
                            xtype: 'textfield',
                            name: 'baseMulMidNo',
                            itemId: 'baseMulMidNo',
                            bind: '{rec.baseMulMidNo}',
                            height:30,
                            width:130
                        },{
                            xtype: 'textfield',
                            name: 'baseMulHardNo',
                            itemId: 'baseMulHardNo',
                            bind: '{rec.baseMulHardNo}',
                            height:30,
                            width:130
                        }]
                },{
                    layout: 'column',
                    itemId: 'column6',
                    items: [
                        {
                            xtype: 'textfield',
                            value: '专业类',
                            disabled:true,
                            allowBlank:false,
                            width:780,
                            editable: false
                        }
                    ]
                },{
                    layout: 'column',
                    itemId: 'column7',
                    items: [
                        {
                            xtype: 'textfield',
                            value: '判断题',
                            disabled:true,
                            allowBlank:false,
                            height:30,
                            width:130,
                            editable: false
                        }, {
                            xtype: 'textfield',
                            name: 'judgeNo',
                            itemId: 'judgeNo',
                            bind: '{rec.judgeNo}',
                            height:30,
                            width:130
                        }, {
                            xtype: 'textfield',
                            name: 'judgeScore',
                            itemId: 'judgeScore',
                            bind: '{rec.judgeScore}',
                            height:30,
                            width:130
                        }, {
                            xtype: 'textfield',
                            name: 'judgeEasyNo',
                            itemId: 'judgeEasyNo',
                            bind: '{rec.judgeEasyNo}',
                            height:30,
                            width:130
                        }, {
                            xtype: 'textfield',
                            name: 'judgeMidNo',
                            itemId: 'judgeMidNo',
                            bind: '{rec.judgeMidNo}',
                            height:30,
                            width:130
                        },{
                            xtype: 'textfield',
                            name: 'judgeHardNo',
                            itemId: 'judgeHardNo',
                            bind: '{rec.judgeHardNo}',
                            height:30,
                            width:130
                        }]
                },{
                    layout: 'column',
                    itemId: 'column8',
                    items: [
                        {
                            xtype: 'textfield',
                            value: '单选题',
                            disabled:true,
                            allowBlank:false,
                            height:30,
                            width:130,
                            editable: false
                        }, {
                            xtype: 'textfield',
                            name: 'singleNo',
                            itemId: 'singleNo',
                            bind: '{rec.singleNo}',
                            height:30,
                            width:130
                        }, {
                            xtype: 'textfield',
                            name: 'singleScore',
                            itemId: 'singleScore',
                            bind: '{rec.singleScore}',
                            height:30,
                            width:130
                        }, {
                            xtype: 'textfield',
                            name: 'singleEasyNo',
                            itemId: 'singleEasyNo',
                            bind: '{rec.singleEasyNo}',
                            height:30,
                            width:130
                        }, {
                            xtype: 'textfield',
                            name: 'singleMidNo',
                            itemId: 'singleMidNo',
                            bind: '{rec.singleMidNo}',
                            height:30,
                            width:130
                        },{
                            xtype: 'textfield',
                            name: 'singleHardNo',
                            itemId: 'singleHardNo',
                            bind: '{rec.singleHardNo}',
                            height:30,
                            width:130
                        }]
                },{
                    layout: 'column',
                    itemId: 'column9',
                    items: [
                        {
                            xtype: 'textfield',
                            value: '多选题',
                            disabled:true,
                            allowBlank:false,
                            height:30,
                            width:130,
                            editable: false
                        }, {
                            xtype: 'textfield',
                            name: 'mulNo',
                            itemId: 'mulNo',
                            bind: '{rec.mulNo}',
                            height:30,
                            width:130
                        }, {
                            xtype: 'textfield',
                            name: 'mulScore',
                            itemId: 'mulScore',
                            bind: '{rec.mulScore}',
                            height:30,
                            width:130
                        }, {
                            xtype: 'textfield',
                            name: 'mulEasyNo',
                            itemId: 'mulEasyNo',
                            bind: '{rec.mulEasyNo}',
                            height:30,
                            width:130
                        }, {
                            xtype: 'textfield',
                            name: 'mulMidNo',
                            itemId: 'mulMidNo',
                            bind: '{rec.mulMidNo}',
                            height:30,
                            width:130
                        },{
                            xtype: 'textfield',
                            name: 'mulHardNo',
                            itemId: 'mulHardNo',
                            bind: '{rec.mulHardNo}',
                            height:30,
                            width:130
                        }]
                },{
                    layout: 'column',
                    itemId: 'column10',
                    items: [
                        {
                            xtype: 'textfield',
                            disabled:true,
                            allowBlank:false,
                            value: '总分',
                            editable: false,
                            width:130
                        },{
                            xtype: 'textfield',
                            name: 'totalScore',
                            itemId: 'totalScore',
                            bind: '{rec.totalScore}',
                            width:650
                        }
                    ]
                }]
            }];

            //grid 停靠item
            me.buttons = [
                {
                    xtype: "button",
                    text: "确定",
                    handler:'onClickSave'
                },{
                    xtype: "button",
                    text: "关闭",
                    handler:'onClickAll'
                }
            ];
            me.callParent();
        }
    });