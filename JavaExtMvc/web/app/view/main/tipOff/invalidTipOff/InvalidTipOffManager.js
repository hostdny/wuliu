Ext.define(
    'ExtFrame.view.main.tipOff.invalidTipOff.InvalidTipOffManager',
    {
        requires: [
            'ExtFrame.view.main.tipOff.invalidTipOff.InvalidTipOffModel',
            'ExtFrame.view.main.tipOff.invalidTipOff.InvalidTipOffController',
            'ExtFrame.view.main.tipOff.invalidTipOff.InvalidTipOffGrid',
            'ExtFrame.view.main.tipOff.invalidTipOff.InvalidTipOffWindow',
            'ExtFrame.view.main.tipOff.invalidTipOff.InvalidTipOffWindowGrid'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'invalidTipOffManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'invalidTipOffController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'invalidTipOffGrid',
                    itemId: 'invalidTipOffGrid',
                    width:'80%',
                    region:'center'
                },{
                    xtype: 'invalidTipOffWindow',
                    itemId: 'invalidTipOffWindow',
                    ename: 'invalidTipOffWindow',
                    region: 'east',
                    split: true
                }
            ];
            me.callParent();
        }


    });