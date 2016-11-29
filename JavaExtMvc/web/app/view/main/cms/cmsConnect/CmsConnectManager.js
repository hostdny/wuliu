/**
 * Created by Jia on 2016/10/25.
 */
Ext.define(
    'ExtFrame.view.main.cms.cmsConnect.CmsConnectManager',
    {
        extend: 'Ext.panel.Panel',
        requires: [
            'ExtFrame.view.main.cms.cmsConnect.CmsConnectModel',
            'ExtFrame.view.main.cms.cmsConnect.CmsConnectController',
            'ExtFrame.view.main.cms.cmsConnect.CmsConnectGrid',
            'ExtFrame.view.main.cms.cmsConnect.CmsConnectWindow'
        ],
        layout: {type: 'border'},
        controller: 'cmsConnectController',
        viewModel: {type: 'cmsConnectModel'},
        ename: '',
        id:"cmsConnectManagerId",
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'cmsConnectGrid',
                itemId: me.ename + 'Grid',
                id: 'cmsConnectGrid',
                ename: me.ename,
                region: 'center'
            }, {
                xtype: 'cmsConnectWindow',
                itemId: me.ename + 'Window',
                ename: me.ename,
                region: 'east',
                split: true
            }];
            me.callParent();
        }
    }
);
