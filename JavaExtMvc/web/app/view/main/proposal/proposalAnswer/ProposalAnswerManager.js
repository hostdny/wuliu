/**
 * Created by wangBin on 2016/9/29.
 */
Ext.define(
    'ExtFrame.view.main.proposal.proposalAnswer.ProposalAnswerManager',
    {
        requires: [
            'ExtFrame.view.main.proposal.proposalAnswer.ProposalAnswerModel',
            'ExtFrame.view.main.proposal.proposalAnswer.ProposalAnswerController',
            'ExtFrame.view.main.proposal.proposalAnswer.ProposalAnswerGrid',
            'ExtFrame.view.main.proposal.proposalAnswer.ProposalAnswerWindow',
            'ExtFrame.view.main.lawyerAcceptManage.lawyerAccept.DownLoadGrid'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'proposalAnswerManager',
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        controller: 'proposalAnswerController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'proposalAnswerGrid',
                    itemId: 'proposalAnswerGrid',
                    ename: 'proposalAnswer',
                    region:'center'
                }
                ,
                {
                    xtype: 'proposalAnswerWindow',
                    itemId: 'proposalAnswerWindow',
                    ename: 'proposalAnswer',
                    region:'east'
                }
            ];
            me.callParent();
        }


    });