/**
 * Created by zzw on 2016/8/18.
 */
Ext.define(
    'ExtFrame.view.main.exam.examSession.ExamPanel', {
        extend: 'Ext.panel.Panel',
        alias: 'widget.examPanel',
        controller: 'examSessionController',
        buttonAlign: 'center',
        viewModel: {type: 'examPaperModel'},
        autoScroll:true,
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'form',
                itemId: 'examSessionPanelForm',
                region: 'center',
                autoScroll: true,
                bodyPadding: 6,
                padding: 5,
                layoutConfig:{
                    columns:6
                },
                defaults: {
                    bodyPadding: '8 10',
                    border: true
                },
                items: [{
                    xtype: 'hiddenfield',
                    itemId: 'hfOID',
                    name: 'id',
                    bind: '{rec.id}'
                },{
                    xtype: 'hiddenfield',
                    itemId: 'sessionId',
                    name: 'sessionId',
                    bind: '{rec.sessionId}'
                },{
                    layout: 'table',
                    columns: 6,
                    itemId: 'column1',
                    items: [
                        {
                            height:25,
                            width:130,
                            cellCls: 'highlight',
                            disabled:true,
                            allowBlank:false,
                            editable: false
                        }, {
                            html: '个数',
                            style:'text-align:center',
                            height:25,
                            width:130
                        }, {
                            html: '单个分值',
                            style:'text-align:center',
                            height:25,
                            width:130
                        }, {
                            html: '容易',
                            style:'text-align:center',
                            height:25,
                            width:130
                        }, {
                            html: '一般',
                            style:'text-align:center',
                            height:25,
                            width:130
                        },{
                            html: '困难',
                            style:'text-align:center',
                            height:25,
                            width:130
                        }]
                },{
                    layout: 'table',
                    itemId: 'column2',
                    items: [
                        {
                            html: '基础类',
                            style:'text-align:center',
                            width:780

                        }
                    ]
                }, {
                    layout: 'table',
                    itemId: 'column3',
                    items: [
                        {
                            html: '判断题',
                            style:'text-align:center',
                            height:25,
                            width:130
                        }, {
                            xtype: 'numberfield',
                            name: 'baseJudgeNo',
                            itemId: 'baseJudgeNo',
                            bind: '{rec.baseJudgeNo}',
                            height:25,
                            width:130,
                            listeners: {
                                blur: 'onBlurBaseJudgeNo'
                            }
                        }, {
                            xtype: 'numberfield',
                            name: 'baseJudgeScore',
                            itemId: 'baseJudgeScore',
                            bind: '{rec.baseJudgeScore}',
                            height:25,
                            width:130,
                            listeners: {
                                blur: 'onBlurBaseJudgeScore'
                            }
                        }, {
                            xtype: 'numberfield',
                            name: 'baseJudgeEasyNo',
                            itemId: 'baseJudgeEasyNo',
                            bind: '{rec.baseJudgeEasyNo}',
                            height:25,
                            width:130
                        }, {
                            xtype: 'numberfield',
                            name: 'baseJudgeMidNo',
                            itemId: 'baseJudgeMidNo',
                            bind: '{rec.baseJudgeMidNo}',
                            height:25,
                            width:130
                        },{
                            xtype: 'numberfield',
                            name: 'baseJudgeHardNo',
                            itemId: 'baseJudgeHardNo',
                            bind: '{rec.baseJudgeHardNo}',
                            height:25,
                            width:130
                        }]
                }, {
                    layout: 'table',
                    itemId: 'column4',
                    items: [
                        {
                            html: '单选题',
                            style:'text-align:center',
                            height:25,
                            width:130
                        }, {
                            xtype: 'numberfield',
                            name: 'baseSingleNo',
                            itemId: 'baseSingleNo',
                            bind: '{rec.baseSingleNo}',
                            height:25,
                            width:130,
                            listeners: {
                                blur: 'onBlurSingleNo'
                            }
                        }, {
                            xtype: 'numberfield',
                            name: 'baseSingleScore',
                            itemId: 'baseSingleScore',
                            bind: '{rec.baseSingleScore}',
                            height:25,
                            width:130,
                            listeners: {
                                blur: 'onBlurSingleScore'
                            }
                        }, {
                            xtype: 'numberfield',
                            name: 'baseSingleEasyNo',
                            itemId: 'baseSingleEasyNo',
                            bind: '{rec.baseSingleEasyNo}',
                            height:25,
                            width:130
                        }, {
                            xtype: 'numberfield',
                            name: 'baseSingleMidNo',
                            itemId: 'baseSingleMidNo',
                            bind: '{rec.baseSingleMidNo}',
                            height:25,
                            width:130
                        },{
                            xtype: 'numberfield',
                            name: 'baseSingleHardNo',
                            itemId: 'baseSingleHardNo',
                            bind: '{rec.baseSingleHardNo}',
                            height:25,
                            width:130
                        }]
                },{
                    layout: 'table',
                    itemId: 'column5',
                    items: [
                        {
                            html: '多选题',
                            style:'text-align:center',
                            height:25,
                            width:130
                        }, {
                            xtype: 'numberfield',
                            name: 'baseMulNo',
                            itemId: 'baseMulNo',
                            bind: '{rec.baseMulNo}',
                            height:25,
                            width:130,
                            listeners: {
                                blur: 'onBlurBaseMulNo'
                            }
                        }, {
                            xtype: 'numberfield',
                            name: 'baseMulScore',
                            itemId: 'baseMulScore',
                            bind: '{rec.baseMulScore}',
                            height:25,
                            width:130,
                            listeners: {
                                blur: 'onBlurBaseMulScore'
                            }
                        }, {
                            xtype: 'numberfield',
                            name: 'baseMulEasyNo',
                            itemId: 'baseMulEasyNo',
                            bind: '{rec.baseMulEasyNo}',
                            height:25,
                            width:130
                        }, {
                            xtype: 'numberfield',
                            name: 'baseMulMidNo',
                            itemId: 'baseMulMidNo',
                            bind: '{rec.baseMulMidNo}',
                            height:25,
                            width:130
                        },{
                            xtype: 'numberfield',
                            name: 'baseMulHardNo',
                            itemId: 'baseMulHardNo',
                            bind: '{rec.baseMulHardNo}',
                            height:25,
                            width:130
                        }]
                },{
                    layout: 'table',
                    itemId: 'column6',
                    items: [
                        {
                            html: '专业类',
                            style:'text-align:center',
                            width:780
                        }
                    ]
                },{
                    layout: 'table',
                    itemId: 'column7',
                    items: [
                        {
                            html: '判断题',
                            style:'text-align:center',
                            height:25,
                            width:130
                        }, {
                            xtype: 'numberfield',
                            name: 'judgeNo',
                            itemId: 'judgeNo',
                            bind: '{rec.judgeNo}',
                            height:25,
                            width:130,
                            listeners: {
                                blur: 'onBlurjudgeNo'
                            }
                        }, {
                            xtype: 'numberfield',
                            name: 'judgeScore',
                            itemId: 'judgeScore',
                            bind: '{rec.judgeScore}',
                            height:25,
                            width:130,
                            listeners: {
                                blur: 'onBlurjudgeScore'
                            }
                        }, {
                            xtype: 'numberfield',
                            name: 'judgeEasyNo',
                            itemId: 'judgeEasyNo',
                            bind: '{rec.judgeEasyNo}',
                            height:25,
                            width:130
                        }, {
                            xtype: 'numberfield',
                            name: 'judgeMidNo',
                            itemId: 'judgeMidNo',
                            bind: '{rec.judgeMidNo}',
                            height:25,
                            width:130
                        },{
                            xtype: 'numberfield',
                            name: 'judgeHardNo',
                            itemId: 'judgeHardNo',
                            bind: '{rec.judgeHardNo}',
                            height:25,
                            width:130
                        }]
                },{
                    layout: 'table',
                    itemId: 'column8',
                    items: [
                        {
                            html: '单选题',
                            style:'text-align:center',
                            height:25,
                            width:130
                        }, {
                            xtype: 'numberfield',
                            name: 'singleNo',
                            itemId: 'singleNo',
                            bind: '{rec.singleNo}',
                            height:25,
                            width:130,
                            listeners: {
                                blur: 'onBlursingleNo'
                            }
                        }, {
                            xtype: 'numberfield',
                            name: 'singleScore',
                            itemId: 'singleScore',
                            bind: '{rec.singleScore}',
                            height:25,
                            width:130,
                            listeners: {
                                blur: 'onBlursingleScore'
                            }
                        }, {
                            xtype: 'numberfield',
                            name: 'singleEasyNo',
                            itemId: 'singleEasyNo',
                            bind: '{rec.singleEasyNo}',
                            height:25,
                            width:130
                        }, {
                            xtype: 'numberfield',
                            name: 'singleMidNo',
                            itemId: 'singleMidNo',
                            bind: '{rec.singleMidNo}',
                            height:25,
                            width:130
                        },{
                            xtype: 'numberfield',
                            name: 'singleHardNo',
                            itemId: 'singleHardNo',
                            bind: '{rec.singleHardNo}',
                            height:25,
                            width:130
                        }]
                },{
                    layout: 'table',
                    itemId: 'column9',
                    items: [
                        {
                            html: '多选题',
                            style:'text-align:center',
                            height:25,
                            width:130
                        }, {
                            xtype: 'numberfield',
                            name: 'mulNo',
                            itemId: 'mulNo',
                            bind: '{rec.mulNo}',
                            height:25,
                            width:130,
                            listeners: {
                                blur: 'onBlurMulNo'
                            }
                        }, {
                            xtype: 'numberfield',
                            name: 'mulScore',
                            itemId: 'mulScore',
                            bind: '{rec.mulScore}',
                            height:25,
                            width:130,
                            listeners: {
                                blur: 'onBlurMulScore'
                            }
                        }, {
                            xtype: 'numberfield',
                            name: 'mulEasyNo',
                            itemId: 'mulEasyNo',
                            bind: '{rec.mulEasyNo}',
                            height:25,
                            width:130
                        }, {
                            xtype: 'numberfield',
                            name: 'mulMidNo',
                            itemId: 'mulMidNo',
                            bind: '{rec.mulMidNo}',
                            height:25,
                            width:130
                        },{
                            xtype: 'numberfield',
                            name: 'mulHardNo',
                            itemId: 'mulHardNo',
                            bind: '{rec.mulHardNo}',
                            height:25,
                            width:130
                        }]
                },{
                    layout: 'table',
                    itemId: 'column10',
                    items: [
                        {
                            html: '总分',
                            style:'text-align:center',
                            width:130
                        },{
                            xtype: 'textfield',
                            name: 'totalScore',
                            itemId: 'totalScore',
                            bind: '{rec.totalScore}',
                            width:650,
                            editable: false
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