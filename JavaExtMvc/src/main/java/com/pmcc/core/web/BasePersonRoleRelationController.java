package com.pmcc.core.web;

import com.pmcc.core.domain.BasePersonRoleRelation;
import com.pmcc.core.manager.BasePersonRoleRelationManager;
import com.pmcc.utils.ResultBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * 用户角色关系表
 * Created by LvXL on 2016/6/22.
 */
@Controller
@RequestMapping("personRoleRelation")
public class BasePersonRoleRelationController extends BaseAjaxController<BasePersonRoleRelation, String> {

    @Autowired
    BasePersonRoleRelationManager personRoleRelationManager;

    /**
     * 保存人员角色关系
     *
     * @param personIds
     * @param roleIds
     * @param request
     * @return
     */
    @RequestMapping(value = "/saveRelation", method = RequestMethod.POST)
    @ResponseBody
    public ResultBean saveRelation(String personIds, String roleIds, HttpServletRequest request) {
        ResultBean resultBean = new ResultBean();
        resultBean.setResultCode(ResultBean.SUCCESS);
        resultBean.setResultDesc("操作成功！");
        int res = personRoleRelationManager.saveRelation(personIds, roleIds);
        if (res > 0) {
            resultBean.setResultCode(ResultBean.FAIL);
            resultBean.setResultDesc("操作失败！");
        }
        return resultBean;
    }

}
