/**
 * Created by Jia on 2016/8/19.
 */
Ext.define(
    'ExtFrame.view.main.exam.examScore.ExamScoreManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.exam.examScore.ExamScoreController',
                    'ExtFrame.view.main.exam.examScore.ExamScoreModel',
                    'ExtFrame.view.main.exam.examScore.ExamScoreGrid'],//请求MainController类
        layout: {type: 'border'},
        controller: 'examScoreController',
        viewModel: {type: 'examScoreModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                xtype: 'examScoreGrid',
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center'
            }];
            me.dockedItems = [{
                xtype: 'toolbar',
                layout:'column',
                items: [
                    {
                    xtype: 'combo',
                    name: 'name',
                    itemId: 'name',
                    bind: '{rec.name}',
                    emptyText: '请选择批次',
                    editable: false,// 是否允许输入
                    //allowBlank: false,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    labelWidth: 50,
                    fieldLabel: '批次',
                    store: Ext.create('ExtFrame.store.User', {
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + "/examBatch/queryBatchs.do",
                            reader: {
                                type: 'json',
                                rootProperty: 'rows',//数据根节点名称
                                totalProerty: 'total',//数据总数节点名称
                                idProperty: 'Id'//id标示节点名称
                            },
                            //扩展参数
                            extraParams: {
                                'swhere': ""
                            },
                            listeners: {
                                //捕捉异常处理
                                exception: function (theproxy, response, operation, options) {
                                    Tools.Method.ExceptionEncap(response);
                                }
                            }
                        }
                    }),listeners: {
                        select: "onSelectName"
                    }
                },{
                        xtype: 'combo',
                        name: 'typeOfWork',
                        itemId: 'typeOfWork',
                        bind: '{rec.typeOfWork}',
                        emptyText: '请选择场次',
                        editable: false,// 是否允许输入
                        //allowBlank: false,
                        queryMode: 'local',
                        displayField: 'typeOfWork',
                        valueField: 'id',
                        labelWidth: 50,
                        fieldLabel: '场次',
                        store: Ext.create('ExtFrame.store.User', {
                            proxy: {
                                type: 'ajax',
                                url: Tools.Method.getAPiRootPath() + "/examSession/querySessionByBatchId.do",
                                reader: {
                                    type: 'json',
                                    rootProperty: 'rows',//数据根节点名称
                                    totalProerty: 'total',//数据总数节点名称
                                    idProperty: 'Id'//id标示节点名称
                                },
                                //扩展参数
                                extraParams: {
                                    'swhere': ""
                                },
                                listeners: {
                                    //捕捉异常处理
                                    exception: function (theproxy, response, operation, options) {
                                        Tools.Method.ExceptionEncap(response);
                                    }
                                }
                            }
                        }),listeners: {
                            select: "onSelectExamType"
                        }
                    },{
                        //   itemId: 'searchId',
                        text: '成绩导出',
                        handler: 'onClickButtonExport'
                    }]
            }];
            me.callParent();
        }
    }
);