package com.pmcc.core.web;

import com.pmcc.core.domain.BaseSystem;
import com.pmcc.core.manager.BaseSystemManager;
import com.pmcc.utils.SystemPropertyUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * 系统管理表
 * Created by LvXL on 2016/6/23.
 */
@Controller
@RequestMapping("system")
public class BaseSystemController extends BaseAjaxController<BaseSystem, String> {

    @Autowired
    BaseSystemManager systemManager;

    /**
     * rsa 加密返回方法，此加密目前未使用
     *
     * @return
     */
    @RequestMapping(value = "/getRSAPublicKey", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getRSAPublicKey() {
        Map<String, Object> model = new HashMap<String, Object>();
        String exponent = SystemPropertyUtil.getProperty("exponent");
        String modulus = SystemPropertyUtil.getProperty("modulus");
        model.put("result", true);
        model.put("exponent", exponent);
        model.put("modulus", modulus);
        return model;
    }

}
