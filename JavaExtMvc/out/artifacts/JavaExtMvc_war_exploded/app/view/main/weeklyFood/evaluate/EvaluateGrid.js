/**
 * Created by wangBin on 2016/8/1.
 */
Ext.define('ExtFrame.view.main.weeklyFood.evaluate.EvaluateGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.evaluateGrid',
    viewModel: { type: 'evaluateModel' },
    fit: true,
    stripeRows: true,
    defaults: {
        bodyPadding: 0,
        align:"center"
    },
    initComponent: function () {
        var me = this;
        var pageSize = 10;//分页条数
        var OrderField = 'createTime';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {
                text: '图片',
                width: 200,
                sortable: true,
                dataIndex: '',
                renderer:function(value){
                    return '<div class="thumb"><img src="'+value+'" height="100" width="120"></div>';
                    //return '<div class="thumb"><img src="../../../../../starLevel/仰望星空.jpg" height="100" width="120"></div>';
                }
            },{
                text: '菜名',
                width: 150,
                sortable: true,
                dataIndex: 'foodName',
                renderer:function(value){
                    if(!value){
                        return '<div style="margin-top: 50px;height:50px">'+""+'</div>';
                    }else{
                        return '<div style="margin-top: 50px;height:50px">'+value+'</div>';
                    }
                }
            },{
                text: '评价',
                width: 200,
                sortable: true,
                dataIndex: 'opinionScore',
                renderer:function(value){
                    if(value == '0'){
                        return '<div class="thumb" style="margin-top: 25%;height:50px">' +
                            '<img src="../../../../../starLevel/0.png" height="20" width="150">' +
                            '</div>';
                    }else if(value == '1'){
                        return '<div class="thumb" style="margin-top: 25%;height:50px">' +
                            '<img src="../../../../../starLevel/1.png" height="20" width="150">' +
                            '</div>';
                    }else if(value == '2'){
                        return '<div class="thumb" style="margin-top: 25%;height:50px">' +
                            '<img src="../../../../../starLevel/2.png" height="20" width="150">' +
                            '</div>';
                    }else if(value == '3'){
                        return '<div class="thumb" style="margin-top: 25%;height:50px">' +
                            '<img src="../../../../../starLevel/3.png" height="20" width="150">' +
                            '</div>';
                    }else if(value == '4'){
                        return '<div class="thumb" style="margin-top: 25%;height:50px">' +
                            '<img src="../../../../../starLevel/4.png" height="20" width="150">' +
                            '</div>';
                    }else if(value == '5'){
                        return '<div class="thumb" style="margin-top: 25%;height:50px">' +
                            '<img src="../../../../../starLevel/5.png" height="20" width="150">' +
                            '</div>';
                    }else if(value == '6'){
                        return '<div class="thumb" style="margin-top: 25%;height:50px">' +
                            '<img src="../../../../../starLevel/6.png" height="20" width="150">' +
                            '</div>';
                    }else if(value == '7'){
                        return '<div class="thumb" style="margin-top: 25%;height:50px">' +
                            '<img src="../../../../../starLevel/7.png" height="20" width="150">' +
                            '</div>';
                    }else if(value == '8'){
                        return '<div class="thumb" style="margin-top: 25%;height:50px">' +
                            '<img src="../../../../../starLevel/8.png" height="20" width="150">' +
                            '</div>';
                    }else if(value == '9'){
                        return '<div class="thumb" style="margin-top: 25%;height:50px">' +
                            '<img src="../../../../../starLevel/9.png" height="20" width="150">' +
                            '</div>';
                    }else if(value == '10'){
                        return '<div class="thumb" style="margin-top: 25%;height:50px">' +
                            '<img src="../../../../../starLevel/10.png" height="20" width="150">' +
                            '</div>';
                    }else{
                        return "";
                    }
                }
            },{
                text: '评价信息',
                width: 150,
                sortable: true,
                dataIndex: 'content',
                renderer:function(value){
                    if(!value){
                        return '<div style="margin-top: 50px;height:50px">'+""+'</div>';
                    }else{
                        return '<div style="margin-top: 50px;height:50px">'+value+'</div>';
                    }
                }
            },{
                text: '评价人',
                width: 150,
                sortable: true,
                dataIndex: 'createPerson',
                renderer:function(value){
                    if(!value){
                        return '<div style="margin-top: 50px;height:50px">'+""+'</div>';
                    }else{
                        return '<div style="margin-top: 50px;height:50px">'+value+'</div>';
                    }
                }
            }
        ];

        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            sorters: [{property: OrderField, direction: OrderType}],
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/foodOpinion/pagedQueryByBean.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'pttId'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    //foodId|String|-1
                    'swhere': ""
                },
                listeners: {
                    //捕捉异常处理
                    exception: function (theproxy, response) {
                        Tools.Method.ExceptionEncap(response);
                    }
                }
            }
        });
        me.selModel = Ext.create('Ext.selection.CheckboxModel', {
            mode: 'SIMPLE',//multi,simple,single；默认为多选multi
            injectCheckbox: 0,//checkbox位于哪一列，默认值为0
            checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true
        });
        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
            ename: 'evaluate',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            hasSearch: false,
            dock: 'top',
            items: [{
                xtype: 'combo',
                name: 'foodId',
                itemId: 'foodIdSearch',
                emptyText: '请选择菜名',
                editable: false,// 是否允许输入
                allowBlank: false,
                queryMode: 'local',
                displayField: 'foodName',
                valueField: 'id',
                fieldLabel: '菜名',
                store: Ext.create('ExtFrame.store.ModuleTree', {
                    proxy: {
                        type: 'ajax',
                        url: Tools.Method.getAPiRootPath() + "/foodsDict/query.do",
                        reader: {
                            type: 'json',
                            rootProperty: 'rows',//数据根节点名称
                            totalProerty: 'total',//数据总数节点名称
                            idProperty: 'pttId'//id标示节点名称
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
                })
            },{
                text: '搜索',
                handler: "onClickSearch"
            }]
        },{
            xtype: 'pagingtoolbar',
            store: me.store,//分页控件数据（同grid的数据保持一致）
            dock: 'bottom',
            displayInfo: true,
            items: [
                '-', {cls: 'x-btn-text-icon details'}
            ]
        }];
        me.callParent();
    }
});
