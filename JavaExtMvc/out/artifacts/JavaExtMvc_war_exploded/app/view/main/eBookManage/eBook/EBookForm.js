Ext.define('ExtFrame.view.main.eBookManage.eBook.EBookForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.eBookForm',
    itemId: 'eBookForm',
    buttonAlign: 'center',
    region: 'center',
    viewModel: { type: 'eBookModel' },
    autoScroll:'true',
    controller: 'eBookController',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 60,
        padding: 5
    },
    initComponent: function () {
        var me = this;
        me.items = [{
            layout: 'column',
            itemId: 'column1',
            items: [{
                xtype: 'hiddenfield',
                itemId: 'hfOID',
                name: 'id',
                bind: '{rec.id}'
            },{
                xtype: 'displayfield',
                itemId: 'bookName',
                name: 'bookName',
                fieldLabel: '图书名称',
                width:"100%",
                allowBlank: false,
                bind: '{rec.bookName}'
            },{
                xtype: 'textfield',
                itemId: 'bookAuthor',
                name: 'bookAuthor',
                fieldLabel: '作者',
                emptyText: '请输入作者',
                width:"100%",
                allowBlank: false,
                bind: '{rec.bookAuthor}'
            },{
                xtype: 'combo',
                name: 'classificationId',
                bind: '{rec.classificationId}',
                itemId: 'classificationId',
                allowBlank: false,
                labelWidth: 60,
                emptyText: '请选择书籍分类',
                fieldLabel: '书籍分类',
                editable: false,
                displayField: 'dictName',
                valueField: 'id',
                width:"100%",
                store: Ext.create('ExtFrame.store.ModuleTree', {
                    proxy: {
                        type: 'ajax',
                        url: Tools.Method.getAPiRootPath() + "/dict/queryToCombo.do?dictType=BOOK_TYPE",
                        reader: {
                            type: 'json',
                            rootProperty: 'rows',//数据根节点名称
                            totalProerty: 'total',//数据总数节点名称
                            idProperty: 'pttId'//id标示节点名称
                        },
                        //扩展参数
                        extraParams: {
                            'swhere': ""
                        },
                        listeners: {
                            //捕捉异常处理
                            exception: function (theproxy, response, operation, options) {
                                Tools.Method.ExceptionEncap(response);
                            }
                        }
                    }
                })
            }
            ]
        }
        ];
        me.buttons = [
            {
                xtype: "button", text: "保存", handler: "onClickButtonSave"
            }
        ];
        me.callParent();
    }


});