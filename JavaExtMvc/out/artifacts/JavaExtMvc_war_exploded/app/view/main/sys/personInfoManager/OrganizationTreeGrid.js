/**
 * Created by LvXL on 2016/7/4.
 */
Ext.define('ExtFrame.view.main.sys.personInfoManager.OrganizationTreeGrid', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Ext.ux.CheckColumn',
        'ExtFrame.view.main.sys.personInfoManager.PersonInfoController'
    ],
    alias: 'widget.organizationTreeGrid',
    controller: 'personInfoController',
    reserveScrollbar: true,
    rootVisible: false,
    fit: true,
    stripeRows: true,
    initComponent: function () {
        var me = this;
        me.store = Ext.create('ExtFrame.store.OrgTree', {
            proxy: {
                type: 'ajax',
                url: Tools.Method.getAPiRootPath() + '/organization/queryOrgToCombo.do',
                //扩展参数
                extraParams: {
                    'parentId': '00000000000000000000000000000000'
                }
            },
            listeners: {
                nodebeforeexpand: function (node, eOpts) {
                    //点击父亲节点的菜单会将节点的id通过ajax请求，将到后台
                    this.proxy.extraParams.parentId = node.id;
                }
            },
            clearOnLoad: true,
            folderSort: false
        }),

        me.columns = [{
            xtype: 'treecolumn',
            text: '组织机构',
            width: 200,
            dataIndex: 'cName'
        }]
        // 点击机构刷新人员列表
        me.on('cellclick', function (sender, td, cellIndex, record, tr, rowIndex, e) {
            // 人员列表
            var personGrid = me.up("panel").down("#" + me.ename + "Grid");
            personGrid.store.getProxy().extraParams = {
                'swhere': "",
                "unitId": record.id
            };
            //重新加载grid
            personGrid.store.reload();
        });
        me.callParent();
    }
});