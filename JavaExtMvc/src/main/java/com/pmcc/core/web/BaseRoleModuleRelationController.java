package com.pmcc.core.web;

import com.pmcc.core.domain.BaseRoleModuleRelation;
import com.pmcc.core.manager.BaseRoleModuleRelationManager;
import com.pmcc.utils.ResultBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * 角色菜单关系表
 * Created by LvXL on 2016/6/23.
 */
@Controller
@RequestMapping("roleModuleRelation")
public class BaseRoleModuleRelationController extends BaseAjaxController<BaseRoleModuleRelation, String> {

    @Autowired
    BaseRoleModuleRelationManager roleModuleRelationManager;

    /**
     * 保存角色菜单关系
     *
     * @param roleId
     * @param moduleIds
     * @param request
     * @return
     */
    @RequestMapping(value = "/saveRoleModule", method = RequestMethod.POST)
    @ResponseBody
    public ResultBean saveRoleModule(String roleId, String moduleIds, HttpServletRequest request) {

        ResultBean resultBean = new ResultBean();
        resultBean.setResultCode(ResultBean.FAIL);
        resultBean.setResultDesc("操作失败");
        int res = roleModuleRelationManager.saveRoleModule(roleId, moduleIds);
        if(res > 0){
            resultBean.setResultCode(ResultBean.SUCCESS);
            resultBean.setResultDesc("操作成功");
        }
        return resultBean;
    }

}
