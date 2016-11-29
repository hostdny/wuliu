/**
 * Created by zzw on 2016/9/24.
 */
Ext.define(
    'ExtFrame.view.main.briberyCrime.briberyCrimeBespeak.BriberyCrimeBespeakManager',
    {
        extend: 'Ext.panel.Panel',
        requires: [
            'ExtFrame.view.main.briberyCrime.briberyCrimeBespeak.BriberyCrimeBespeakController',
            'ExtFrame.view.main.briberyCrime.briberyCrimeBespeak.BriberyCrimeBespeakGrid',
            'ExtFrame.view.main.briberyCrime.briberyCrimeBespeak.DownLoadGrid',
            'ExtFrame.view.main.briberyCrime.briberyCrimeBespeak.BriberyCrimeBespeakModel',
            'ExtFrame.view.main.briberyCrime.briberyCrimeBespeak.BriberyCrimeBespeakWindow'],
        layout: {type: 'border'},
        controller: 'briberyCrimeBespeakController',
        viewModel: {type: 'briberyCrimeBespeakModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'briberyCrimeBespeakGrid',
                id:"briberyCrimeBespeakGridId",
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center'
            }];
            me.callParent();
        }
    }
);