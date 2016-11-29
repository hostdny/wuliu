/**
 * Created by zzw on 2016/9/7.
 */
Ext.define(
    'ExtFrame.view.main.cms.cmsMessageRelease.CmsMessageReleaseManager',
    {
        extend: 'Ext.panel.Panel',
        requires: ['ExtFrame.view.main.cms.cmsMessageRelease.CmsMessageReleaseController',
            'ExtFrame.view.main.cms.cmsMessageRelease.CmsMessageReleaseGrid',
            'ExtFrame.view.main.cms.cmsMessageRelease.CmsMessageReleaseModel',
            'ExtFrame.view.main.cms.cmsMessageRelease.CmsMessageReleaseWindow',
            'ExtFrame.view.main.cms.cmsMessageRelease.CmsMessageReleaseModel',
            'ExtFrame.view.extEncap.UEditor'],
        layout: {type: 'border'},
        controller: 'cmsMessageReleaseController',
        viewModel: {type: 'cmsMessageReleaseModel'},
        eName: '',//用于构造itemId，很重要，要和数据库存储的模块Ename对应
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype: 'cmsMessageReleaseGrid',
                    itemId: me.ename + 'Grid',
                    region: 'center',
                    ename: me.ename
                },{
                    xtype: 'cmsMessageReleaseWindow',
                    itemId: me.ename + 'Window',
                    ename: me.ename,
                    height:'100%',
                    region: 'east',
                    split: true
                }];
            me.dockedItems = [{
                xtype: 'toolbar',
                layout:'column',
                items: [{
                    xtype: 'treepicker',
                    itemId: 'parentName',
                    name: 'parentName',
                    allowBlank: false,
                    labelWidth: 60,
                    bind: '{rec.parentName}',
                    forceSelection: true,// 只能选择下拉框里面的内容
                    emptyText: '请选择所属分类',
                    blankText: '请选择所属分类',// 该项如果没有选择，则提示错误信息
                    fieldLabel: '所属分类',
                    rootVisible: false,
                    displayField: 'name',
                    valueField: 'pid',
                    store: Ext.create('ExtFrame.store.OrgTree', {
                        root: {
                            typeName: '',
                            parentId: "",
                            expanded: true
                        },
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + '/cmsProgram/queryAll.do',
                            reader: {
                                type: 'json'
                            },
                            extraParams: {
                                'swhere': "",
                                parentId: ""
                            }
                        }
                    }),
                    listeners : {
                        select: "onSelectTreePicker"
                    }
                }]
            }];
            me.callParent();
        }
    }
);