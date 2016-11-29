package com.pmcc.core.web;

import com.pmcc.core.domain.*;
import com.pmcc.utils.JsonUtils;
import com.pmcc.core.manager.BasePersonInfoManager;
import com.pmcc.core.manager.BasePersonRoleRelationManager;
import com.pmcc.utils.AppUtils;
import com.pmcc.utils.EncryptMD5;
import com.pmcc.utils.OnlineUser;
import com.pmcc.utils.ResultBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 登录
 * Created by LvXL on 2016/6/23.
 */
@Controller
@RequestMapping("login")
public class LoginController {

    @Autowired
    BasePersonInfoManager personInfoManager;

    @Autowired
    BasePersonRoleRelationManager personRoleRelationManager;

    /**
     * 用户登录
     * @param userName
     * @param password
     * @param systemCode
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public void login(String userName, String password, String systemCode,String typename, HttpServletRequest request, HttpServletResponse response) throws Exception {

        BasePersonInfo personInfo = personInfoManager.queryByUserEName(userName);
        ResultBean resultBean = new ResultBean();
        password = password == null ? "" : password;
        // 判断用户是否存在
        if(personInfo != null){
            String md5pwd = EncryptMD5.getMD5(password.trim().getBytes());
            // 判断密码是否正确
            if(md5pwd.equals(personInfo.getUserPwd())){
                // 判断此平台有无角色权限
                List<BasePersonRoleRelation> list =
                        personRoleRelationManager.queryByPersonSystemCode(personInfo.getId(), typename);
                if(list != null && list.size() > 0){
                    HttpSession session = request.getSession();
                    OnlineUser onlineUser = new OnlineUser();
                    onlineUser.setSessionId(session.getId());
                    onlineUser.setUserId(personInfo.getId());
                    onlineUser.setUserCName(personInfo.getUserCName());
                    onlineUser.setUserEName(personInfo.getUserEName());
                    onlineUser.setSysCode(systemCode);
                    onlineUser.setUserDegree(personInfo.getUserDegree());
                    onlineUser.setTelephone(personInfo.getTelephone());
                    // 用户和组织机构关系
                    Set<BasePersonOrgRelation> personOrgRelations = personInfo.getPersonOrgRelations();
                    for (BasePersonOrgRelation personOrgRelation : personOrgRelations) {
                        BaseOrganization organization = personOrgRelation.getOrganization();
                        if(organization != null){
                            // 系统编码
                            String sysCode = organization.getSystemCode();
                            if(systemCode.equals(sysCode)){
                                onlineUser.setDepId(organization.getId());
                                onlineUser.setDepCName(organization.getcName());
                                onlineUser.setDepEName(organization.geteName());
                                break;
                            }
                        }
                    }
                    // 用户和角色关系
                    List<String> roleIds = new ArrayList<String>();
                    Set<BasePersonRoleRelation> personRoleRelations = personInfo.getPersonRoleRelations();
                    for (BasePersonRoleRelation personRoleRelation : personRoleRelations) {
                        BaseRole role = personRoleRelation.getRole();
                        // 系统编码
//                        String sysCode = role.getSystemCode();
//                        if(systemCode.equals(sysCode)){
//                            roleIds.add(role == null ? "" : role.getId());
//                        }


                        String rolecode = role.getCode();
                        if(typename.equals(rolecode)){
                            roleIds.add(role == null ? "" : role.getId());
                        }
                    }





                    onlineUser.setRoleIds(roleIds);
                    resultBean.setResultCode(ResultBean.SUCCESS);
                    resultBean.setObject(onlineUser);
                    resultBean.setResultDesc("登录成功!");
                    // 存放登录用户到session
                    if (AppUtils.getOnlineUser(session.getId()) != null) {
                        AppUtils.removeOnlineUser(session.getId());
                    }
                    AppUtils.addOnlineUser(session.getId(), onlineUser);
                }else{
                    resultBean.setResultCode(ResultBean.FAIL);
                    resultBean.setResultDesc("无系统权限,请联系管理员!");
                }
            }else{
                resultBean.setResultCode(ResultBean.FAIL);
                resultBean.setResultDesc("登录失败:用户名或密码错误!");
            }
        }else{
            resultBean.setResultCode(ResultBean.FAIL);
            resultBean.setResultDesc("登录失败:用户名或密码错误!");
        }
        JsonUtils.write(resultBean, response.getWriter(), this.getExcludes(), this.getDatePattern());
    }

    /**
     * 用户退出
     * @param request
     */
    @RequestMapping(value = "/logOut", method = RequestMethod.POST)
    @ResponseBody
    public void logOut(HttpServletRequest request) {
        AppUtils.removeOnlineUser(request.getSession().getId());
    }


    public String[] getExcludes() {
        return new String[]{"hibernateLazyInitializer", "personRoleRelations", "personOrgRelations"};
    }

    public String getDatePattern() {
        return "yyyy-MM-dd";
    }

}
