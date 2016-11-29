Ext.define(
    'ExtFrame.view.main.Main',
    {
        extend: 'Ext.container.Viewport',
        requires: ['ExtFrame.view.main.MainController', 'ExtFrame.view.main.region.LeftMenu'],//请求MainController类
        layout: {type: 'border'},
        xtype: 'app-main',
        controller: 'main',
        viewModel: {type: 'main'},
        items: [
            {
                xtype: 'maintop',
                region: 'north'
            },
            {
                xtype: 'mainbottom',
                region: 'south',
                bind: '你好，{currentUser}'
            },
            {
                xtype: 'mainleftmenu',// 'mainleft','mainleftmenu'
                region: 'west', // 左边面板
                width: 220,
                split: true,
                collapsible: true,
                floatable: false
            },
            {
                xtype: 'tabpanel',
                id: 'main-tabpanel',
                region: 'center',
                plugins:[
                    Ext.create('Ext.ux.TabCloseMenu',{
                        closeTabText: '关闭当前',
                        closeOthersTabsText: '关闭其他',
                        closeAllTabsText: '关闭所有'
                    })
                ],
                items: [{
                    title: '首页',
                    itemId: 'tab-index',
                    html: '<iframe  width="100%" height="100%" src="/app/view/main/mainHtml/homePage.html"><iframe/>'
                }
                ]
            }
        ],

        initComponent: function () {
            //设置图标文件，设置后可以使用glyph属性
            Ext.setGlyphFontFamily('FontAwesome');
            this.callParent();
        }
    }

);

