/**
 * Created by Administrator on 2016/9/27.
 */
Ext.define(
    'ExtFrame.view.main.cms.cmsSubject.CmsSubjectManager',
    {
        requires: [
            'ExtFrame.view.main.cms.cmsSubject.CmsSubjectModel',
            'ExtFrame.view.main.cms.cmsSubject.CmsSubjectController',
            'ExtFrame.view.main.cms.cmsSubject.CmsSubjectGrid',
            'ExtFrame.view.main.cms.cmsSubject.CmsSubjectWindow'
        ],
        extend: 'Ext.panel.Panel',
        itemId: 'cmsSubjectManager',
        viewModel: {type: 'cmsSubjectModel'},
        fit: true,
        layout: 'border',
        bodyBorder: false,

        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        id:"cmsSubjectManagerId",
        controller: 'cmsSubjectController',
        stripeRows: true,
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'cmsSubjectGrid',
                    itemId: me.ename + 'Grid',
                    id:'cmsSubjectGrid',
                    ename: me.ename,
                    region:'center'
                },
                {
                    xtype: 'cmsSubjectWindow',
                    itemId: me.ename + 'Window',
                    id:'cmsSubjectWindow',
                    ename: me.ename,
                    region: 'east',
                    split: true
                }
            ];
            me.callParent();
        }


    });