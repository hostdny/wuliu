/**
 * Created by LvXL on 2016/7/14.
 */
Ext.define(
    'ExtFrame.view.main.irs.irsInformationCheck.IrsInformationCheckManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.irs.irsInformationCheck.IrsInformationCheckController',
            'ExtFrame.view.main.irs.irsInformationCheck.IrsInformationCheckModel',
            'ExtFrame.view.main.irs.irsInformationCheck.IrsInformationCheckGrid'],//请求MainController类
        layout: {type: 'border'},
        controller: 'irsInformationCheckController',
        viewModel: {type: 'irsInformationCheckModel'},
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'irsInformationCheckGrid',
                itemId: me.ename + 'Grid',
                id: 'irsInformationCheckGrid',
                ename: me.ename,
                region: 'center'
            }];
            me.callParent();
        }
    }
);


