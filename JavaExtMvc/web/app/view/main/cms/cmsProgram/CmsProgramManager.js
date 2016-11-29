/**
 * Created by zzw on 2016/9/26.
 */
Ext.define(
    'ExtFrame.view.main.cms.cmsProgram.CmsProgramManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.cms.cmsProgram.CmsProgramController',
            'ExtFrame.view.main.cms.cmsProgram.CmsProgramGrid',
            'ExtFrame.view.main.cms.cmsProgram.CmsProgramWindow',
            'ExtFrame.view.main.cms.cmsProgram.CmsProgramModel'],
        //   'ExtFrame.view.extEncap.UEditor'
        layout: {type: 'border'},
        controller: 'cmsProgramController',
        viewModel: {type: 'cmsProgramModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'cmsProgramGrid',
                    itemId: me.ename + 'Grid',
                    region: 'center',
                    ename: me.ename
                },{
                    xtype: 'cmsProgramWindow',
                    itemId: me.ename + 'Window',
                    ename: me.ename,
                    region: 'east',
                    split: true
                }];
            me.callParent();
        }
    }
);