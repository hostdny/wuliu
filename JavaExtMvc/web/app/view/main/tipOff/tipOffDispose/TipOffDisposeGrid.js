Ext.define('ExtFrame.view.main.tipOff.tipOffDispose.TipOffDisposeGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.tipOffDisposeGrid',
    viewModel: { type: 'tipOffDisposeModel' },
    fit: true,
    stripeRows: true,
    defaults: {
        bodyPadding: 0
    },
    initComponent: function () {
        var me = this;
        var pageSize = 10;//分页条数
        var OrderField = 'rptDate';//默认排序字段
        var OrderType = 'DESC';//默认排序类型 ASC/DESC
        me.columns = [
            {
                text: '举报类型',
                width: 100,
                sortable: true,
                dataIndex: 'tipTypeShow'
            },{
                text: '举报简介',
                width: 200,
                sortable: true,
                dataIndex: 'addMessage1'
            },{
                text: '匿名/实名',
                width: 100,
                sortable: true,
                dataIndex: 'tipStyle'
            },{
                text: '举报时间',
                width: 150,
                sortable: true,
                dataIndex: 'rptDate'
            }
            //,{
            //    text: '举报材料',
            //    width: 120,
            //    sortable: true,
            //    dataIndex: 'tiperName',
            //    renderer: function(){
            //        return "点击按钮";
            //    }
            //}
            ,{
                text: '负责人',
                width: 200,
                sortable: true,
                dataIndex: 'accepterNameAndNumber'
                //,
                //renderer: function(value,eOpts){
                //    if(value !="分发"){
                //        var accepter = eOpts.record.data.accepterName+"："+eOpts.record.data.accepterNumber;
                //        return accepter;
                //    }else{
                //        return value;
                //    }
                //
                //}
            },{
                text: '当前状态',
                width: 100,
                sortable: true,
                dataIndex: 'tipStateShow'
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
                url: Tools.Method.getAPiRootPath() + "/tipMessage/pagedQueryByBean.do?tipStateFlag=1",
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
                    exception: function (theproxy, response) {
                        Tools.Method.ExceptionEncap(response);
                    }
                }
            }
        });
        me.selModel = Ext.create('Ext.selection.CheckboxModel', {
            mode: 'SINGLE',//multi,simple,single；默认为多选multi
            singleSelect:true,
            injectCheckbox: 0,//checkbox位于哪一列，默认值为0
            checkOnly: false,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true
        });
        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
            ename: 'TipOffDispose',//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            hasSearch: false,
            dock: 'top',
            items: []
        }, {
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
