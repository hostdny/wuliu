package com.pmcc.core.web;

import com.pmcc.core.domain.BaseRole;
import com.pmcc.core.manager.BaseRoleManager;
import com.pmcc.utils.AppUtils;
import com.pmcc.utils.JsonUtils;
import com.pmcc.utils.OnlineUser;
import com.pmcc.utils.ResultBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;

/**
 * 角色表
 * Created by LvXL on 2016/6/22.
 */
@Controller
@RequestMapping("role")
public class BaseRoleController extends BaseAjaxController<BaseRole, String> {


    @Autowired
    BaseRoleManager roleManager;

    @Override
    public String beforeSave(BaseRole model, HttpServletRequest request) {

        if (id == null) {
            OnlineUser user = AppUtils.getOnlineUser(WebUtils.getSessionId(request));
            model.setCreateId(user.getUserId());
            model.setCreateName(user.getUserCName());
            model.setCreateTime(new Date());
            model.setCreateUnitId(user.getDepId());
            model.setCreateUnitName(user.getDepCName());
            model.setDelFlag(0);
            String sysCode = model.getSystemCode();
            if(sysCode == null || "".equals(sysCode)){
                model.setSystemCode("-1");
            }
        }
        return null;
    }

    /**
     * 验证角色编码是否存在
     *
     * @param code
     * @return
     */
    @RequestMapping(value = "/checkCode", method = RequestMethod.GET)
    @ResponseBody
    public ResultBean checkCode(String code, String id) {

        ResultBean resultBean = new ResultBean();
        resultBean.setResultCode(ResultBean.SUCCESS);
        BaseRole role = new BaseRole();
        role.setId(id);
        role.setCode(code);
        List<BaseRole> list = roleManager.query(role);
        if (list != null && list.size() > 0) {
            resultBean.setResultCode(ResultBean.FAIL);
            resultBean.setResultDesc("编码已存在，请重新输入");
        }
        return resultBean;
    }

    /**
     * 获取角色下拉框
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/queryRoleToCombo", method = RequestMethod.GET)
    public void queryRoleToCombo(HttpServletRequest request, HttpServletResponse response) throws Exception {

        response.setContentType("text/html;charset=UTF-8");
        JsonUtils.write(roleManager.query(new BaseRole()), response.getWriter(), this.getExcludesLoad(), this.getDatePattern());
    }

    @Override
    public String[] getExcludes() {
        return new String[]{"hibernateLazyInitializer", "personRoleRelations", "rolePermissionRelations", "roleOrgRelations", "roleModuleRelations"};
    }

    @Override
    public String[] getExcludesLoad() {
        return new String[]{"hibernateLazyInitializer", "personRoleRelations", "rolePermissionRelations", "roleOrgRelations", "roleModuleRelations"};
    }

}
