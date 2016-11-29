package com.pmcc.core.web;

import com.pmcc.core.domain.BasePersonInfoDetail;
import com.pmcc.core.manager.BasePersonInfoDetailManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 用户表详细
 * Created by LvXL on 2016/6/22.
 */
@Controller
@RequestMapping("personInfoDetail")
public class BasePersonInfoDetailController extends BaseAjaxController<BasePersonInfoDetail, String> {

    @Autowired
    BasePersonInfoDetailManager personInfoDetailManager;

    /**
     * 根据用户id查询用户其他信息
     *
     * @param detail
     * @return
     */
    @RequestMapping(value = "find", method = RequestMethod.GET)
    @ResponseBody
    public BasePersonInfoDetail find(BasePersonInfoDetail detail) {

        List<BasePersonInfoDetail> list = personInfoDetailManager.query(detail);
        if (list != null && list.size() > 0) {
            detail = list.get(0);
        }
        return detail;
    }
}
