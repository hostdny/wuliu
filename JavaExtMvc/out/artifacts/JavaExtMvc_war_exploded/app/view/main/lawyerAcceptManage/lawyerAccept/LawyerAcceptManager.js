/**
 * Created by zzw on 2016/9/24.
 */
Ext.define(
    'ExtFrame.view.main.lawyerAcceptManage.lawyerAccept.LawyerAcceptManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.lawyerAcceptManage.lawyerAccept.LawyerAcceptController',
            'ExtFrame.view.main.lawyerAcceptManage.lawyerAccept.LawyerAcceptGrid',
            'ExtFrame.view.main.lawyerAcceptManage.lawyerAccept.DownLoadGrid',
            'ExtFrame.view.main.lawyerAcceptManage.lawyerAccept.LawyerAcceptModel',
            'ExtFrame.view.main.lawyerAcceptManage.lawyerAccept.LawyerAcceptWindow',
            'ExtFrame.view.extEncap.DateTime'],
        layout: {type: 'border'},
        controller: 'lawyerAcceptController',
        viewModel: {type: 'lawyerAcceptModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'lawyerAcceptGrid',
                itemId: me.ename + 'Grid',
                ename: me.ename,
                region: 'center'
            },{
                xtype: 'lawyerAcceptWindow',
                itemId: me.ename + 'Window',
                ename: me.ename,
                region: 'east',
                split: true
            }];
            me.callParent();
        }
    }
);