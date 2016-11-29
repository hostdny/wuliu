package com.pmcc.core.web;

import com.pmcc.core.domain.*;
import com.pmcc.core.manager.*;
import com.pmcc.utils.*;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * 用户表
 * Created by LvXL on 2016/6/22.
 */
@Controller
@RequestMapping("personInfo")
public class BasePersonInfoController extends BaseAjaxController<BasePersonInfo, String> {

    @Autowired
    BasePersonInfoManager personInfoManager;

    @Autowired
    BaseRoleManager roleManager;

    @Autowired
    BasePersonOrgRelationManager personOrgRelationManager;

    @Autowired
    BaseAttachmentManager attachmentManager;

    @Autowired
    BasePersonInfoDetailManager personInfoDetailManager;

    @Override
    public String beforeSave(BasePersonInfo model, HttpServletRequest request) {

        if (id == null) {
            OnlineUser user = AppUtils.getOnlineUser(WebUtils.getSessionId(request));
            model.setCreateId(user.getUserId());
            model.setCreateName(user.getUserCName());
            model.setCreateTime(new Date());
            model.setCreateUnitId(user.getDepId());
            model.setCreateUnitName(user.getDepCName());
            model.setDelFlag(0);
            // 密码加密
            String md5pwd = EncryptMD5.getMD5(model.getUserPwd().trim().getBytes());
            model.setUserPwd(md5pwd);
//            EasemobUtils.insert(user.getUserCName(), md5pwd);
        }else{
            OnlineUser user = AppUtils.getOnlineUser(WebUtils.getSessionId(request));
            String md5pwd = EncryptMD5.getMD5(model.getUserPwd().trim().getBytes());
            model.setUserPwd(md5pwd);
            EasemobUtils.updatePwd(user.getUserEName(), md5pwd);
        }
        return null;
    }

    @Override
    public void afterSave(int flag, BasePersonInfo model, HttpServletRequest request, ResultBean resultBean) {

        OnlineUser user = AppUtils.getOnlineUser(WebUtils.getSessionId(request));
        //往环信中插入数据
        EasemobUtils.insert(model.getUserEName(),model.getUserPwd());
        // 保存人员机构关系表
        String orgId = HttpUtil.getString(request, "orgId", "");
        if(!"".equals(orgId)){
            // 先删除
            personOrgRelationManager.deleteByPersonId(model.getId());
            // 后新增
            personOrgRelationManager.save(new BasePersonOrgRelation(model.getId(), orgId));
        }else{
            resultBean.setResultCode(ResultBean.FAIL);
            resultBean.setResultDesc("操作失败！");
        }
        // 头像附件
        BaseAttachment attachment = null;
        String attachmentId = HttpUtil.getString(request, "attachmentId", "");
        if(!"".equals(attachmentId)){
            attachment = attachmentManager.get(attachmentId);
            if(attachment != null){
                attachment.setBusinessData(model.getId());
                attachmentManager.save(attachment);
            }
        }
        // 保存详细表
        BasePersonInfoDetail detail = new BasePersonInfoDetail();
        detail.setUserId(model.getId());
        List<BasePersonInfoDetail> list = personInfoDetailManager.query(detail);
        if(list != null && list.size() > 0){
            detail = list.get(0);
        }
        detail.setUserId(model.getId());
        detail.setTelephone(model.getTelephone());
        detail.setUserMail(request.getParameter("userMail"));
        detail.setUserQQ(request.getParameter("userQQ"));
        if(attachment != null){
            detail.setUserPhotoUrl(attachment.getFileUrl());
        }
        if(detail.getId() == null || "".equals(detail.getId())){
            detail.setCreateId(user.getUserId());
            detail.setCreateName(user.getUserCName());
            detail.setCreateTime(new Date());
            detail.setDelFlag(0);
        }
        personInfoDetailManager.save(detail);
    }

    @Override
    public String beforeQuery(Criteria criteria, HttpServletRequest request) {

        String unitId = HttpUtil.getString(request, "unitId", "");
        if(!"".equals(unitId)){
            criteria.createAlias("personOrgRelations","orgRelation").add(Restrictions.eq("orgRelation.organization.id", unitId));
        }
        criteria.add(Restrictions.eq("delFlag", 0));
        return null;
    }

    @Override
    public void afterQuery(ResultBean resultBean, HttpServletRequest request) {

        OnlineUser user = AppUtils.getOnlineUser(WebUtils.getSessionId(request));
        List<BasePersonInfo> list = resultBean.getRows();
        if(list != null && list.size() > 0){
            for (BasePersonInfo personInfo : list) {
                String roles = "";
                Set<BasePersonRoleRelation> personRoleRelations = personInfo.getPersonRoleRelations();
                if(personRoleRelations != null && personRoleRelations.size() > 0){
                    for (BasePersonRoleRelation personRoleRelation : personRoleRelations) {
                        roles += personRoleRelation.getRole().getName() + ",";
                    }
                }
                if("".equals(roles)){
                    personInfo.setRoles(roles);
                }else{
                    personInfo.setRoles(roles.substring(0, roles.length() - 1));
                }
                // 所属机构名称  orgName
                Set<BasePersonOrgRelation> personOrgRelations = personInfo.getPersonOrgRelations();
                if(personOrgRelations != null && personOrgRelations.size() > 0){
                    for (BasePersonOrgRelation personOrgRelation : personOrgRelations) {
                        BaseOrganization org = personOrgRelation.getOrganization();
                        if(user!=null){
                            if(org != null && user.getSysCode().equals(org.getSystemCode())){
                                personInfo.setOrgName(org.getcName());
                                personInfo.setOrgId(org.getId());
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    @Override
    public void afterDelete(String id, HttpServletRequest request) {
        personInfoDetailManager.executeSQL(" DELETE FROM base_person_info_detail WHERE USER_ID = '" + id + "' ", null);
    }

    /**
     * 验证用户名称重复
     *
     * @param userEName
     * @return
     */
    @RequestMapping(value = "/nameIsExist", method = RequestMethod.GET)
    @ResponseBody
    public ResultBean nameIsExist(String userEName, String id) {

        ResultBean resultBean = new ResultBean();
        resultBean.setResultCode(ResultBean.SUCCESS);
        BasePersonInfo personInfo = new BasePersonInfo();
        personInfo.setUserEName(userEName);
        List<BasePersonInfo> list = personInfoManager.query(personInfo);
        if (list != null && list.size() > 0) {
            if(id != null && !id.equals(list.get(0).getId())){
                resultBean.setResultCode(ResultBean.FAIL);
                resultBean.setResultDesc("用户名已存在!");
            }
        }
        return resultBean;
    }


    @Override
    public String[] getExcludes() {
        return new String[]{"hibernateLazyInitializer", "personRoleRelations", "personOrgRelations"};
    }

    @Override
    public String[] getExcludesLoad() {
        return new String[]{"hibernateLazyInitializer", "personRoleRelations", "personOrgRelations"};
    }
}
