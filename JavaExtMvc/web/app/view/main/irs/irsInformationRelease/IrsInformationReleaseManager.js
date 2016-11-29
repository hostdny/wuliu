/**
 * Created by LvXL on 2016/7/14.
 */
Ext.define(
    'ExtFrame.view.main.irs.irsInformationRelease.IrsInformationReleaseManager',
    {
        extend: 'Ext.panel.Panel',
        requires: [
            'ExtFrame.view.main.irs.irsInformationRelease.IrsInformationReleaseController',
            'ExtFrame.view.main.irs.irsInformationRelease.IrsInformationReleaseModel',
            'ExtFrame.view.main.irs.irsInformationRelease.IrsInformationReleaseGrid',
            'ExtFrame.view.main.irs.irsInformationRelease.IrsInformationReleaseWindow',
            'ExtFrame.view.main.irs.irsInformationRelease.IrsInformationReleaseUpload',
            'ExtFrame.view.main.irs.irsInformationRelease.IrsInformationReleaseForm',
            'ExtFrame.view.main.irs.irsInformationRelease.IrsInfoReleaseEquipmentGrid',
            'ExtFrame.view.main.irs.irsInformationRelease.IrsInformationAttachmentGrid',
            'ExtFrame.view.extEncap.UEditor'],
        layout: {type: 'border'},
        controller: 'irsInformationReleaseController',
        viewModel: {type: 'irsInformationReleaseModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'irsInformationReleaseGrid',
                id: 'irsInformationReleaseGrid',
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center',
                split: true
            }, {
                xtype: 'irsInformationReleaseWindow',
                id: 'irsInformationReleaseWindow',
                itemId: me.ename + 'Window',
                ename: me.ename,
                region: 'east',
                split: true
            }];
            me.callParent();
        }
    }
);