Ext.define(
    'ExtFrame.view.login.LoginController',
    {
        extend: 'Ext.app.ViewController',
        alias: 'controller.login',
        onKeyUp: function (textField, e) {
            if (e.getKey() == 13) {
                this.onLoginbtnClick();
            }

        },
        //用户登录按钮事件处理
        onLoginbtnClick: function () {
            var form = Ext.getCmp('login_form');
            if (form.isValid()) {
                this.login({
                    data: form.getValues(),
                    scope: this,
                    success: 'onLoginSuccess',
                    failure: 'onLoginFailure'
                })
            }
        },
        onLoginFailure: function () {
            Ext.getBody().unmask();
        },
        onLoginSuccess: function (userId, userName, userOrg) {
            this.fireViewEvent('login', userId, userName, userOrg);
        },
        login: function (options) {
            var curController = this;
            var t1 = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正在请求页面...&nbsp;&nbsp;";
            Ext.getBody().mask(t1, 'page-loading');
            var t2 = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正在登录系统...&nbsp;&nbsp;";
            curController.getView().mask(t2, 'page-loading');
            Ext.Ajax.request({
                url: Tools.Method.getAPiRootPath() + '/login/login.do',
                method: 'POST',
                params: options.data,
                dataType: 'json',
                contentType: 'application/json',
                success: function (response) {
                    curController.getView().unmask();
                    var jsonData = Ext.decode(response.responseText);
                    curController.onLoginReturn(options, jsonData.resultCode, jsonData);
                },
                failure: function (response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        onLoginReturn: function (options, resultCode, jsonData) {
            if (resultCode == "1") {
                //【0】用户id，【1】用户名称，【2】用户所在第一个组织机构id，【3】业务群名称，【4】单位名称,【5】组织机构code
                Tools.Method.AddCookie("CurUser", "['" + jsonData.object.userId + "','" + jsonData.object.userCName + "','"+jsonData.object.depId+"','" + jsonData.object.depEName + "','" + jsonData.object.depCName + "','" + jsonData.object.sysCode + "']",20);
                Ext.callback(options.success, options.scope, [jsonData.object.userId, jsonData.object.userCName, jsonData.object.depCName]);
                return;
            } else if(resultCode == "0") {
                Ext.MessageBox.alert('登录失败', jsonData.resultDesc);
            } else {
                Ext.MessageBox.alert('登录失败', jsonData.resultDesc);
            }
        }
    }
);