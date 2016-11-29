/**
 * Created by zzw on 2016/9/20.
 */
Ext.define(
    'ExtFrame.view.main.booksManagement.booksMessageMaintain.BooksMessageMaintainManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.booksManagement.booksMessageMaintain.BooksMessageMaintainController',
            'ExtFrame.view.main.booksManagement.booksMessageMaintain.BooksMessageMaintainGrid',
            'ExtFrame.view.main.booksManagement.booksMessageMaintain.BooksMessageMaintainModel',
            'ExtFrame.view.main.booksManagement.booksMessageMaintain.BooksMessageMaintainTree',
            'ExtFrame.view.main.booksManagement.booksMessageMaintain.BooksMessageMaintainWindow',
            'ExtFrame.view.main.booksManagement.booksMessageMaintain.BooksMessageMaintainUpload',
         //   'ExtFrame.view.main.booksManagement.booksMessageMaintain.BooksMessageMaintainPanel'
          ],
        layout: {type: 'border'},
        controller: 'booksMessageMaintainController',
        viewModel: {type: 'booksMessageMaintainModel'},
        fit: true,
        bodyBorder: false,
        defaults: {
            collapsible: false,
            split: true,
            bodyPadding: 1
        },
        itemId:"booksMessageMaintainManager",
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    title: '图书分类',
                    xtype: 'booksMessageMaintainTree',
                    itemId: 'booksMessageMaintainTree',
                    width:'20%',
                    region:'west'
                },{
                    xtype: 'booksMessageMaintainGrid',
                    itemId: 'booksMessageMaintainGrid',
                    region: 'center'
                },{
                    xtype: 'booksMessageMaintainWindow',
                    itemId:'booksMessageMaintainWindow',
                    region: 'east',
                    split: true
                }];
            me.callParent();
        }
    }
);