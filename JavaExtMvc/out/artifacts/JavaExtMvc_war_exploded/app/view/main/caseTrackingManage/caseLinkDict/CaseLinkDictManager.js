/**
 * Created by Jia on 2016/11/02.
 */
Ext.define(
    'ExtFrame.view.main.caseTrackingManage.caseLinkDict.CaseLinkDictManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.caseTrackingManage.caseLinkDict.CaseLinkDictController',
            'ExtFrame.view.main.caseTrackingManage.caseLinkDict.CaseLinkDictGrid',
            'ExtFrame.view.main.caseTrackingManage.caseLinkDict.CaseLinkDictWindow',
            'ExtFrame.view.main.caseTrackingManage.caseLinkDict.CaseLinkDictModel'
        ],
        layout: {type: 'border'},
        controller: 'caseLinkDictController',
        viewModel: {type: 'caseLinkDictModel'},
        ename: '',
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'caseLinkDictGrid',
                itemId:me.ename+'Grid',
                ename: me.ename,
                region: 'center'
            },{
                xtype: 'caseLinkDictWindow',
                itemId: me.ename + 'Window',
                title: '流程字典录入',
                ename: me.ename
            }];
            me.callParent();
        }
    }
);