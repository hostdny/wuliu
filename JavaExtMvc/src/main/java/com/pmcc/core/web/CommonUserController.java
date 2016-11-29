package com.pmcc.core.web;

import com.pmcc.core.domain.CommonUser;
import com.pmcc.core.manager.CommonUserManager;
import org.hibernate.Criteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by liuchunhui on 2016/9/29.
 */
@Controller
@RequestMapping("commonUser")
public class CommonUserController extends BaseAjaxController<CommonUser, String> {
    @Autowired
    CommonUserManager commonUserManager;
    /**
     * 手机端查询所有委员会人员
     * @return
     */
    @RequestMapping(value = "/queryAll", method = RequestMethod.GET)
    @ResponseBody
    public List<CommonUser> queryAll (){
        return commonUserManager.queryAll();
    }

}
