Ext.define(
  'ExtFrame.view.login.Login',
  {
      requires: ['ExtFrame.view.login.LoginController'],
      extend: 'Ext.container.Viewport',
      controller: 'login',
      closable: false,
      resizable: false,
      loginFailNum: 2,
      //modal: true,
      //draggable: false,
      autoShow: true,
      autoScroll: true,
      title: '用户登录---管理平台',
      glyph: 'xf007@FontAwesome',
      initComponent: function () {
          var width = 1920;//Ext.getBody().getWidth();
          var height = 900;//Ext.getBody().getHeight();
          var me = this;
          me.items = [{
              xtype: 'form',//父窗体
              id: 'login_form',
              bodyBorder: true,
              border: false,
              align: 'center',
              plain: true,
              width: width,
              minHeight: height,
              x: $('#bgDiv').width() / 2 - width / 2,
              y: $('#bgDiv').height() / 2 - height / 2,
              buttonAlign: 'center',
              labelAlign: 'right',
              baseCls: Ext.baseCSSPrefix + 'panel form-login',
              //bodyPadding: '120 20 30 520',
              bodyPadding: '380 20 30 1000',
              items: [{
                  xtype: 'textfield',
                  name: 'userName',
                  labelWidth: 50,
                  //fieldLabel: '用户名',
                  allowBlank: false,
                  emptyText: '请输入用户名',
                  value:'stu',
                  enableKeyEvents: true,
                  style: {
                      width: '360px',
                      height: '50px',
                      marginBottom: '10px'
                  },
                  listeners: {
                      keyup: 'onKeyUp'
                  }
              }, {
                  xtype: 'textfield',
                  name: 'password',
                  labelWidth: 50,
                  inputType: 'password',
                  //fieldLabel: '密  码',
                  allowBlank: false,
                  emptyText: '请输入您的密码',
                  value:'123456',
                  enableKeyEvents: true,
                  style: {
                      width: '360px',
                      height: '50px',
                      marginBottom: '20px'
                  },
                  listeners: {
                      keyup: 'onKeyUp'
                  }
              },

                  {
                      xtype      : 'fieldcontainer',
                     // fieldLabel : '用户类型',
                      width:210,
                      height:50,
                      id:'otype',
                      defaultType: 'radiofield',
                      defaults: {
                          flex: 1
                      },
                      layout: 'hbox',
                      items: [
                          {
                              boxLabel  : '管理员',
                              name      : 'typename',
                              inputValue: 'manager',
                              id        : 'radio1'
                          }, {
                              boxLabel  : '教师',
                              name      : 'typename',
                              inputValue: 'teacher',
                              id        : 'radio2'
                          }, {
                              boxLabel  : '学生',
                              name      : 'typename',
                              checked:true,
                              inputValue: 'student',
                              id        : 'radio3'
                          }
                      ]

                  }


                  ,{
                  xtype: 'hiddenfield',
                  name: 'systemCode',
                  value: '-1'
              },{
                  xtype: 'button',
                  text: '用户注册',
                  style: {
                      width: '170px',
                      height: '40px',
                      marginBottom: '200px',
                  },
                  glyph: 'xf118@FontAwesome'
              },{
                  xtype: 'button',
                  text: '用户登录',
                  style: {
                      width: '170px',
                      height: '40px',
                      marginLeft: '18px'
                  },
                  glyph: 'xf110@FontAwesome',
                  listeners: {
                      click: 'onLoginbtnClick'//单击事件 调用LoginConroller.js中的onLoginbtnClick函数
                  }
              }]
          }];

          me.callParent();
      }
  }
);