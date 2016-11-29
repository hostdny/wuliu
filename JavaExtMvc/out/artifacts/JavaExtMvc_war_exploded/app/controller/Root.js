Ext.onReady(function () {

    // 封装表单控件自定义验证
    Ext.apply(Ext.form.field.VTypes, {
        //日期控件关联验证。
        daterange: function (val, field) {
            var date = field.parseDate(val);
            if (!date) {
                return false;
            }
            if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
                var start = field.up('form').down('#' + field.startDateField);
                start.setMaxValue(date);
                start.validate();
                this.dateRangeMax = date;
            }
            else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
                var end = field.up('form').down('#' + field.endDateField);
                end.setMinValue(date);
                end.validate();
                this.dateRangeMin = date;
            }
            /*
             * Always return true since we're only using this vtype to set the
             * min/max allowed values (these are tested for after the vtype test)
             */
            return true;
        },
        daterangeText: 'Start date must be less than end date',
        //日期控件关联验证。
        monthAndDay: function (val, field) {
            if (val.length != 5)
                return false;
            var date = new Date('2015-' + val);
            if (date.toString() == 'Invalid Date')
                return false;
            if (field.startDateField) {
                var start = field.up('form').down('#' + field.startDateField);
                var startDate = new Date('2015-' + start.getValue());
                if (date < startDate)
                    return false;
            }
            else if (field.endDateField) {
                var end = field.up('form').down('#' + field.endDateField);
                var endDate = new Date('2015-' + end.getValue());
                if (date > endDate)
                    return false;
            }
            return true;
        },
        monthAndDayText: '请输入正确的格式(05-31)；开始时间必须早于结束时间',
        //日期控件关联验证。
        monthAndDayGrid: function (val, field) {
            if (val.length != 5)
                return false;
            var date = new Date('2015-' + val);
            if (date.toString() == 'Invalid Date')
                return false;
            if (field.startDateField) {
                var start = field.up('grid').getDefaultFocus();
                var startDate = new Date('2015-' + start.getValue());
                if (date < startDate)
                    return false;
            }
            else if (field.endDateField) {
                var end = field.up('grid').down('#' + field.endDateField);
                var endDate = new Date('2015-' + end.getValue());
                if (date > endDate)
                    return false;
            }
            return true;
        },
        monthAndDayGridText: '请输入正确的格式(05-31)；开始时间必须早于结束时间',
        //只能输入英文字母的验证。
        OnlyEnglishletters: function (val, field) {
            return Tools.Method.StrValidEncap(val, 'letter');
        },
        OnlyEnglishlettersText: '只能输入a-z,A-Z英文字母',
        //固定电话验证。
        FixedPhoneVerification: function (val, field) {
            return Tools.Method.StrValidEncap(val, 'phone');
        },
        FixedPhoneVerificationText: '请输入有效的固定电话！',
        //手机号码验证。
        Phonenumberverification: function (val, field) {
            return Tools.Method.StrValidEncap(val, 'mobile2');
        },
        PhonenumberverificationText: '请输入有效的手机号码！',
        //邮政编码验证。
        ZIPCodeverification: function (val, field) {
            return Tools.Method.StrValidEncap(val, 'postalcode');
        },
        ZIPCodeverificationText: '请输入正确的邮编！',
        OnlyEnglishAndNum: function (val, field) {
            return Tools.Method.StrValidEncap(val, 'letterAndNum');
        },
        OnlyEnglishAndNumText: '只能输入a-z,A-Z,0-9英文字母或数字'

    });

});

/**
 * The main application controller. This is a good place to handle things like routes.
 * 这是主程序的控制器，这里适合做类似路由转发这样的事情
 */
Ext.define('ExtFrame.controller.Root',
    {
        extend: 'Ext.app.Controller',
        uses: ['ExtFrame.view.login.Login', 'ExtFrame.view.main.Main', 'ExtFrame.view.main.ChooseOrgs'],
        /**
         * 初始化事件
         */
        onLaunch: function () {
            var session = this.session = new Ext.data.Session();
            if (Ext.isIE8) {
                Ext.Msg.alert('亲，本例子不支持IE8哟');
                return;
            }
            if ($.cookie('CurUser') == undefined) {
                //debugger;
                this.showLogin();
                //this.login = new ExtFrame.view.login.Login({
                //    session: session,
                //    listeners: {
                //        scope: this,
                //        login: 'onLogin'
                //    }
                //});
            } else {
                var CurUser = Ext.decode($.cookie('CurUser'));
                var me = this;
                var t = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正在请求页面...&nbsp;&nbsp;";
                Ext.getBody().mask(t, 'page-loading');
                Tools.Method.ExtAjaxRequestEncap(Tools.Method.getAPiRootPath() + '/login/login.do', 'POST', {'id': CurUser[0]}, true, function (jsonData) {
                    me.showUI(CurUser[0], CurUser[1], jsonData.depId)
                    //if(jsonData != null && jsonData != "" && jsonData.resultCode == "1"){
                    //    //me.showUI(jsonData.object.userId, jsonData.object.userCName, jsonData.depId);
                    //}else{
                    //    debugger;
                    //    Tools.Method.AddCookie('CurUser', $.cookie("CurUser"), -1);
                    //    window.location.href = "http://localhost:8080/";
                    //}
                });
            }
        },
        /**
         * logincontroller 的 "login" 事件回调.
         * @param user
         * @param loginManager
         */
        onLogin: function (userId, userName, userOrgs, loginController) {
            this.login.destroy();
            this.showUI(userId, userName, userOrgs);
        },
        /**
         * mainController 的 "Logout" 事件回调.
         * @param mainManager
         */
        onLogout: function (mainController) {
            this.viewport.destroy();
            this.showLogin();
        },
        /**
         * chooseOrgsController 的 "chooseOrgs" 事件回调.
         * @param mainManager
         */
        onChooseOrgs: function (userName, DefaultOrgId, Orgs) {
            this.chooseOrgs.destroy();
            this.showMain(userName, DefaultOrgId, Orgs);
        },
        showUI: function (userId, userName, userOrgs) {

            if (userOrgs != '') {
                //显示主界面
                this.showMain(userName, userOrgs, userOrgs);
            } else {
                this.showLogin();
                Ext.MessageBox.alert('登录失败', '用户不在任何组织机构中！请联系系统管理员');
            }
        },
        showLogin: function () {
            var bgObj = document.createElement("div");//创建一个div对 象（背景层）
            //定义div属性
            bgObj.setAttribute("id", "bgDiv");
            bgObj.style.position = "absolute";
            bgObj.style.background = "#fff";
            //bgObj.style.backgroundImage = "url(resources/image/lock-screen-background.jpg)";
            bgObj.style.backgroundSize = "cover";
            bgObj.style.width = "100%";
            bgObj.style.height = "100%";
            bgObj.style.zIndex = "-1";
            bgObj.style.display = "fixed";
            bgObj.style.overflow = "scroll";
            bgObj.style.top = 0;
            document.body.appendChild(bgObj);//在body内添加该div对象

            this.login = new ExtFrame.view.login.Login({
                listeners: {
                    scope: this,
                    login: 'onLogin'
                }
            });

            //var session = this.session = new Ext.data.Session();
            //this.login = new ExtFrame.view.login.Login({
            //    session: session,
            //    listeners: {
            //        scope: this,
            //        login: 'onLogin'
            //    }
            //});
        },
        showMain: function (userName, DefaultOrgId, Orgs) {
            var session = this.session = new Ext.data.Session();
            this.viewport = new ExtFrame.view.main.Main(
                {   //用户信息传入视图
                    viewModel: {
                        data: {
                            currentUser: userName,
                            defaultOrgId: DefaultOrgId,
                            userOrgs: Orgs
                        }
                    },
                    id: 'Main',
                    session: session,
                    listeners: {
                        scope: this,
                        onSignoutClick: 'onLogout',
                        onShowLogin: 'onLogout'
                    }
                }
            );
            Ext.getBody().unmask();
        }
    });
