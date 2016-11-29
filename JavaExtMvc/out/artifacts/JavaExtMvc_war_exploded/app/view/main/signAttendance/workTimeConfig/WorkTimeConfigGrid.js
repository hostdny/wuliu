/**
 * Created by zzw on 2016/11/10.
 */
Ext.define('ExtFrame.view.main.signAttendance.workTimeConfig.WorkTimeConfigGrid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.workTimeConfigGrid',
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        var pageSize = 20;//分页条数
        me.columns = [
            {text: 'id',dataIndex: 'id',hidden: true},
            {text: '上班时间',dataIndex: 'workTimeStart',width:150},
            {text: '下班时间',dataIndex: 'workTimeEnd',width:150},
            {text: '冗余时间',dataIndex: 'reTime',width:150}
        ];
        //构造grid store
        me.store = Ext.create('ExtFrame.store.User', {
            pageSize: pageSize,
            remoteSort: true,
            sortOnLoad: true,
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + "/signAttendanceList/pagedQueryByBean.do",
                reader: {
                    type: 'json',
                    rootProperty: 'rows',//数据根节点名称
                    totalProerty: 'total',//数据总数节点名称
                    idProperty: 'pttId'//id标示节点名称
                },
                //扩展参数
                extraParams: {
                    'swhere': "",
                    type:2
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
            checkOnly: true,//如果值为true，则只用点击checkbox列才能选中此条记录
            enableKeyNav: true
        });
        //grid 工具栏
        me.dockedItems = [{
            xtype: 'gridsearchtoolbar',
            itemId: 'gridtoolbar',
            hasSearch: false,
            ename: me.ename,//搜索栏父级grid 对应类名称，用于GridSearchToolbar查找父级grid对象
            dock: 'top',
            items: []
        }];
        me.callParent();
    }
});
