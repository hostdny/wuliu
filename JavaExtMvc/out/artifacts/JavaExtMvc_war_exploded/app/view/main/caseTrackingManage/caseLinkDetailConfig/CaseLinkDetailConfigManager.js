/**
 * Created by Jia on 2016/11/02.
 */
Ext.define(
    'ExtFrame.view.main.caseTrackingManage.caseLinkDetailConfig.CaseLinkDetailConfigManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.caseTrackingManage.caseLinkDetailConfig.CaseLinkDetailConfigController',
            'ExtFrame.view.main.caseTrackingManage.caseLinkDetailConfig.CaseLinkDetailConfigGrid',
            'ExtFrame.view.main.caseTrackingManage.caseLinkDetailConfig.CaseLinkDetailConfigWindow',
            'ExtFrame.view.main.caseTrackingManage.caseLinkDetailConfig.CaseLinkDetailConfigModel'
        ],
        layout: {type: 'border'},
        controller: 'caseLinkDetailConfigController',
        viewModel: {type: 'caseLinkDetailConfigModel'},
        ename: '',
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'caseLinkDetailConfigGrid',
                itemId:me.ename+'Grid',
                ename: me.ename,
                region: 'center'
            },{
                xtype: 'caseLinkDetailConfigWindow',
                itemId: me.ename + 'Window',
                title: '套餐流程配置',
                ename: me.ename
            }];
            me.callParent();
        }
    }
);