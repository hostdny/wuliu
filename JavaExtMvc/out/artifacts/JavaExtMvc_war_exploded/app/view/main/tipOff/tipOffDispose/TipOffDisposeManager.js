Ext.define(
    'ExtFrame.view.main.tipOff.tipOffDispose.TipOffDisposeManager',
    {
        requires: [
            'ExtFrame.view.main.tipOff.tipOffDispose.TipOffDisposeModel',
            'ExtFrame.view.main.tipOff.tipOffDispose.TipOffDisposeController',
            'ExtFrame.view.main.tipOff.tipOffDispose.TipOffDisposeGrid',
            'ExtFrame.view.main.tipOff.tipOffDispose.TipOffDisposeWindow',
            'ExtFrame.view.main.tipOff.tipOffDispose.TipOffDisposeWindowGrid'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'tipOffDisposeManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'tipOffDisposeController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'tipOffDisposeGrid',
                    itemId: 'tipOffDisposeGrid',
                    width:'80%',
                    region:'center'
                },{
                    xtype: 'tipOffDisposeWindow',
                    itemId: 'tipOffDisposeWindow',
                    ename: 'tipOffDisposeWindow',
                    region: 'east',
                    split: true
                }
            ];
            me.callParent();
        }


    });