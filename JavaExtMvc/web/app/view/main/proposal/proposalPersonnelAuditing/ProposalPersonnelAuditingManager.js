/**
 * Created by wangBin on 2016/9/28.
 */
Ext.define(
    'ExtFrame.view.main.proposal.proposalPersonnelAuditing.ProposalPersonnelAuditingManager',
    {
        requires: [
            'ExtFrame.view.main.proposal.proposalPersonnelAuditing.ProposalPersonnelAuditingModel',
            'ExtFrame.view.main.proposal.proposalPersonnelAuditing.ProposalPersonnelAuditingController',
            'ExtFrame.view.main.proposal.proposalPersonnelAuditing.ProposalPersonnelAuditingGrid',
            'ExtFrame.view.main.proposal.proposalPersonnelAuditing.ProposalPersonnelAuditingWindow'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'proposalPersonnelAuditingManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'proposalPersonnelAuditingController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'proposalPersonnelAuditingGrid',
                    itemId: 'proposalPersonnelAuditingGrid',
                    ename: 'proposalPersonnelAuditing',
                    region:'center'
                }
                ,
                {
                    xtype: 'proposalPersonnelAuditingWindow',
                    itemId: 'proposalPersonnelAuditingWindow',
                    ename: 'proposalPersonnelAuditing',
                    region:'east'
                }
            ];
            me.callParent();
        }


    });