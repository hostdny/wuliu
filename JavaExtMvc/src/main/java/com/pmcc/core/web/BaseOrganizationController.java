package com.pmcc.core.web;

import com.pmcc.core.domain.BaseOrganization;
import com.pmcc.core.manager.BaseOrganizationManager;
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
 * 组织机构表
 * Created by LvXL on 2016/6/22.
 */
@Controller
@RequestMapping("organization")
public class BaseOrganizationController extends BaseAjaxController<BaseOrganization, String> {

    @Autowired
    BaseOrganizationManager organizationManager;

    @Override
    public String beforeSave(BaseOrganization model, HttpServletRequest request) {

        if (id == null) {
            OnlineUser user = AppUtils.getOnlineUser(WebUtils.getSessionId(request));
            model.setCreateId(user.getUserId());
            model.setCreateName(user.getUserCName());
            model.setCreateTime(new Date());
            model.setCreateUnitId(user.getDepId());
            model.setCreateUnitName(user.getDepCName());
            model.setDelFlag(0);
        }
        if("-1".equals(id)){
            model.setParentId("00000000000000000000000000000000");
        }
        return null;
    }

    /**
     * 移动机构位置
     *
     * @param id
     * @param moveType
     * @return
     */
    @RequestMapping(value = "/orgTreeMove", method = RequestMethod.POST)
    @ResponseBody
    public ResultBean orgTreeMove(String id, String moveType) {

        ResultBean resultBean = new ResultBean();
        resultBean.setResultCode(ResultBean.FAIL);
        resultBean.setResultDesc("操作失败!");
        boolean isExist = organizationManager.orgTreeMove(id, moveType);
        if (isExist) {
            resultBean.setResultCode(ResultBean.SUCCESS);
            resultBean.setResultDesc("操作成功!");
        }
        return resultBean;
    }


    @RequestMapping(value = "/queryByOrgNo", method = RequestMethod.GET)

    public void queryByOrgNo(String orgNo,HttpServletResponse response) {
      List<BaseOrganization> list= organizationManager.queryByOrgNo(orgNo);
        try {
            response.setContentType("text/html;charset=UTF-8");
            JsonUtils.write(list, response.getWriter(), this.getExcludes(), this.getDatePattern());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 查询组织机构树
     *
     * @param parentId
     * @return
     */
    @RequestMapping(value = "/queryOrgToCombo", method = RequestMethod.GET)
    public void queryOrgToCombo(String parentId, HttpServletResponse response) throws Exception {

        if("root".equals(parentId)){
            parentId = "00000000000000000000000000000000";
        }
        BaseOrganization organization = new BaseOrganization();
        organization.setParentId(parentId);
        response.setContentType("text/html;charset=UTF-8");
        JsonUtils.write(organizationManager.queryOrgToCombo(organization), response.getWriter(), this.getExcludesLoad(), this.getDatePattern());
    }


    @Override
    public String[] getExcludes() {
        return new String[]{"hibernateLazyInitializer", "roleOrgRelations", "personOrgRelations"};
    }

    @Override
    public String[] getExcludesLoad() {
        return new String[]{"hibernateLazyInitializer", "roleOrgRelations", "personOrgRelations"};
    }

}
