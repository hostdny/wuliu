Ext.define(
    'ExtFrame.view.main.region.Left',
    {
        extend: 'Ext.panel.Panel',
        alias: 'widget.mainleft',
        title: '折叠菜单',
        glyph: 0xf0c9,
        split: true,
        collapsible: false,
        floatable: false,
        tools: [{type: 'pin'}],
        header: {
            titlePosition: 2,
            titleAlign: 'left'
        },
        maximizable: true,
        layout: {
            type: 'accordion',
            animate: true //点击的时候有动画动作
            //titleCollapse: true,
            //enableSplitters: true,
            //hideCollapseTool: true
        },
        viewModel: 'main',//指定后可获取MainModel中data数据块

        initComponent: function () {
            var LeftMenus = [];
            this.items = [
                {
                    xtype: 'treepicker',
                    itemId: 'modulePicker',
                    fieldLabel: '上级菜单',
                    displayField: 'name',
                    valueField: 'oid',
                    forceSelection: true,// 只能选择下拉框里面的内容
                    emptyText: '请选择',
                    blankText: '请选择',// 该项如果没有选择，则提示错误信息
                    labelWidth: 60,
                    rootVisible: false,
                    store: Ext.create('ExtFrame.store.ModuleTree', {
                        root: {
                            oid: '00000000000000000000000000000000',
                            name: '',
                            id: '00000000000000000000000000000000'
                        },
                        proxy: {
                            type: 'ajax',
                            url: Tools.Method.getAPiRootPath() + '/module/queryModule.do',
                            reader: {
                                type: 'json',
                                rootproperty: 'children'//数据根节点名称
                            },
                            extraParams: {
                                'moduleId': '00000000000000000000000000000000'
                            }
                        },
                        listeners: {
                            nodebeforeexpand: function (node, eOpts) {
                                //点击父亲节点的菜单会将节点的id通过ajax请求，将到后台
                                if (node.id == '00000000000000000000000000000000') {
                                    this.proxy.extraParams.moduleId = node.oid;
                                } else {
                                    this.proxy.extraParams.moduleId = node.raw.oid;
                                }
                            }
                        },
                        clearOnLoad: true,
                        nodeParam: 'PID'
                    })
                }
            ];

            for (var i in LeftMenus) {
                //先获取分组显示
                var group = LeftMenus[i];
                var leftpanel = {
                    menuAccordion: true,
                    xtype: 'panel',
                    title: group.name,
                    glyph: group.ico,
                    headerStype: {},
                    bodyStype: {
                        padding: '10px'
                    },
                    layout: 'fit',
                    dockedItems: [
                        {
                            dock: 'left',
                            xtype: 'toolbar',
                            items: []
                        }
                    ]
                };
                //遍历分组下的菜单项
                for (var j in group.items) {
                    var menumodule = group.items[j];
                    leftpanel.dockedItems[0].items.push({
                        text: menumodule.name,
                        reference: menumodule.ename,
                        className: menumodule.pathHandler,
                        glyph: menumodule.ico,
                        handler: 'onMainMenuClick'
                    });
                }
                this.items.push(leftpanel);
            }
            this.callParent(arguments);
        }
    }
);