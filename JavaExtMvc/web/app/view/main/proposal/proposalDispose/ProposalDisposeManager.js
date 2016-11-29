/**
 * Created by wangBin on 2016/9/29.
 */
Ext.define(
    'ExtFrame.view.main.proposal.proposalDispose.ProposalDisposeManager',
    {
        requires: [
            'ExtFrame.view.main.proposal.proposalDispose.ProposalDisposeModel',
            'ExtFrame.view.main.proposal.proposalDispose.ProposalDisposeController',
            'ExtFrame.view.main.proposal.proposalDispose.ProposalDisposeGrid',
            'ExtFrame.view.main.proposal.proposalDispose.ProposalDisposeWindow'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'proposalDisposeManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'proposalDisposeController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'proposalDisposeGrid',
                    itemId: 'proposalDisposeGrid',
                    ename: 'proposalDispose',
                    region:'center'
                }
                ,
                {
                    xtype: 'proposalDisposeWindow',
                    itemId: 'proposalDisposeWindow',
                    ename: 'proposalDispose',
                    region:'east'
                }
            ];
            me.callParent();
        }


    });