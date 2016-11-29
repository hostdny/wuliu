/**
 * Created by admin on 2016/7/14.
 */
Ext.define('ExtFrame.view.main.irs.irsInformationRelease.IrsInformationReleaseWindow', {
    //extend: 'Ext.panel.Panel',
    extend: 'Ext.window.Window',
    alias: 'widget.irsInformationReleaseWindow',
    //layout: {type: 'border'},
    width: 550,
    height:500,
    plain: true,
    layout: 'fit',
    modal : true,
    closeAction:  'close',

    //collapsible: false,
    //collapsed: false,
    //width: 450,
    //closeAction: 'destroy',
    title: '信息管理',
    buttonAlign: 'center',
    defaults: {
        split: true,
        bodyPadding: 1
    },
    stripeRows: true,
    fit: true,
    scrollable: true,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'irsInformationReleaseForm',
            id: 'irsInformationReleaseForm',
            itemId: 'irsInformationReleaseForm',
            region: 'center',
            height: '70%',
            width: '100%'
        }];
        //, {
        //    xtype: 'irsInformationAttachmentGrid',
        //        id: 'irsInformationAttachmentGrid',
        //        region: 'south',
        //        height: '30%',
        //        width: '100%'
        //}
        this.callParent();
    }
});