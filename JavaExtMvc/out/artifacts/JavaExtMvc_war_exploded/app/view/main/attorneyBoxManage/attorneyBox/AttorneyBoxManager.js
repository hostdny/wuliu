/**
 * Created by Jia on 2016/8/1.
 */
Ext.define(
    'ExtFrame.view.main.attorneyBoxManage.attorneyBox.AttorneyBoxManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.attorneyBoxManage.attorneyBox.AttorneyBoxController',
                    'ExtFrame.view.main.attorneyBoxManage.attorneyBox.AttorneyBoxGrid',
                    'ExtFrame.view.main.attorneyBoxManage.attorneyBox.AttorneyBoxModel',
                    'ExtFrame.view.main.attorneyBoxManage.attorneyBox.DownLoadGrid',
                    'ExtFrame.view.main.attorneyBoxManage.attorneyBox.AttorneyBoxPanel'
        ],
        layout: {type: 'border'},
        controller: 'attorneyBoxController',
        viewModel: {type: 'attorneyBoxModel'},
        ename: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'attorneyBoxGrid',
                    itemId: 'attorneyBoxGrid',
                    id:'attorneyBoxGrid',
                    region: 'center',
                    ename: me.ename
                }
            ];
            me.callParent();
        }
    }
);