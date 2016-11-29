package com.pmcc.core.web;

import com.pmcc.core.domain.*;
import com.pmcc.core.manager.BaseModuleManager;
import com.pmcc.core.manager.BaseOrganizationManager;
import com.pmcc.core.manager.BaseRoleModuleRelationManager;
import com.pmcc.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

/**
 * 菜单功能表
 * Created by LvXL on 2016/6/22.
 */
@Controller
@RequestMapping("module")
public class BaseModuleController extends BaseAjaxController<BaseModule, String> {

    @Autowired
    BaseModuleManager moduleManager;

    @Autowired
    BaseOrganizationManager organizationManager;

    @Autowired
    BaseRoleModuleRelationManager roleModuleRelationManager;

    @Override
    public String beforeSave(BaseModule model, HttpServletRequest request) {
        if (id == null) {
            OnlineUser user = AppUtils.getOnlineUser(WebUtils.getSessionId(request));
            model.setCreateId(user.getUserId());
            model.setCreateName(user.getUserCName());
            model.setCreateTime(new Date());
            model.setDelFlag(0);
        }
        return null;
    }

    @Override
    public void afterSave(int flag, BaseModule model, HttpServletRequest request, ResultBean resultBean) {

        // 执行存储过程
        moduleManager.executeProcedure(flag, model);
    }

    /**
     * 获取菜单树
     *
     * @param moduleId
     * @return
     */
    @RequestMapping(value = "/getModuleListForTreeGrid", method = RequestMethod.GET)
    @ResponseBody
    public List<ModuleTreeNode> getModuleListForTreeGrid(String moduleId) {
        if (moduleId == null || "".equals(moduleId)) {
            moduleId = "00000000000000000000000000000000";
        }
        return moduleManager.queryByPId(moduleId);
    }

    /**
     * 菜单下拉树
     *
     * @param parentOid
     * @return
     */
    @RequestMapping(value = "/queryModuleToCombo", method = RequestMethod.GET)
    public void queryModuleToCombo(String parentOid, HttpServletResponse response) throws Exception {

        if (parentOid == null || "".equals(parentOid) || "root".equals(parentOid)) {
            parentOid = "00000000000000000000000000000000";
        }
        response.setContentType("text/html;charset=UTF-8");
        JsonUtils.write(moduleManager.queryModuleToCombo(parentOid), response.getWriter(), this.getExcludesLoad(), this.getDatePattern());
    }

    /**
     * 菜单删除
     *
     * @param ids
     * @param request
     * @return
     */
    @RequestMapping(value = "/deleteModule", method = RequestMethod.POST)
    @ResponseBody
    public ResultBean deleteModule(String ids, HttpServletRequest request) {

        return moduleManager.deleteModule(ids);
    }

    /**
     * 菜单位置移动
     *
     * @param moveType up：上移；down：下移
     * @param moduleId 菜单id
     * @return
     */
    @RequestMapping(value = "/moduleTreeMove", method = RequestMethod.GET)
    @ResponseBody
    public ResultBean moduleTreeMove(String moveType, String moduleId) {

        ResultBean resultBean = new ResultBean();
        resultBean.setResultCode(ResultBean.SUCCESS);
        resultBean.setResultDesc("操作成功！");
        moduleManager.moduleTreeMove(moveType, moduleId);

        return resultBean;
    }

    /**
     * 获得页面左侧菜单
     *
     * @param moduleId
     * @return
     */
    @RequestMapping(value = "/queryModule", method = RequestMethod.GET)
    @ResponseBody
    public List<ModuleTreeNode> queryModule(String moduleId, HttpServletRequest request) {

        // 当前登录人
        OnlineUser user = AppUtils.getOnlineUser(WebUtils.getSessionId(request));
        //如果moduleRname为空值，代表请求整个菜单权限
        List<ModuleTreeNode> list1 = new ArrayList<ModuleTreeNode>();
        if (moduleId == null || "".equals(moduleId)) {
            moduleId = "00000000000000000000000000000000";
        }
        List<BaseModule> list = moduleManager.queryModuleByRole(user.getRoleIds(), moduleId);
        for (int i = 0; i < list.size(); i++) {
            ModuleTreeNode tn = new ModuleTreeNode();
            tn.setOid(list.get(i).getId());
            tn.setId(list.get(i).geteName() + "|" + list.get(i).getPathHandler());
            tn.setCode(list.get(i).getCode());
            //tn.setText(b.getName());
            tn.setName(list.get(i).getcName());
            tn.setParentOid(list.get(i).getParentOid());
            tn.setLT(list.get(i).getLt());
            tn.setRT(list.get(i).getRt());
            tn.setTreeLevel(list.get(i).getTreeLevel());
            tn.setSortCode(list.get(i).getSortNo());
            tn.setFlag(list.get(i).getFlag());
            tn.setIconCls("noIcon");
            tn.setPathHandler(list.get(i).getPathHandler());
            tn.setEname(list.get(i).geteName());
            tn.setUrl(list.get(i).getUrl());

            if (list.get(i).getIco() != null && !"".equals(list.get(i).getIco())) {
                String ico = list.get(i).getIco();
                String st = ico.substring(ico.lastIndexOf("|") + 1);
                tn.setText("<i class=\"fa " + st + " \"></i> " + list.get(i).getcName());
            } else {
                tn.setText(list.get(i).getcName());
            }
            tn.setIco(list.get(i).getIco());
            tn.setDescription(list.get(i).getDescription());
            tn.setState(list.get(i).getState());

            // 是否含有子菜单
            List<BaseModule> childList = moduleManager.queryModuleByRole(user.getRoleIds(), list.get(i).getId());
            if (childList != null && childList.size() > 0) {
                // 有子菜单
                tn.setLeaf(false);
                // 是否展开
                tn.setExpanded(false);
            } else {
                // 没有子菜单,展开
                tn.setExpanded(true);
            }
            list1.add(tn);
        }
        return list1;
    }

    /**
     * 根据菜单英文名获取按钮
     *
     * @param moduleEname 菜单英文名
     * @return
     */
    @RequestMapping(value = "/queryModuleButtons", method = RequestMethod.GET)
    public void queryModuleButtons(String moduleEname, HttpServletRequest request, HttpServletResponse response) throws Exception {

        // 当前登录人
        OnlineUser user = AppUtils.getOnlineUser(WebUtils.getSessionId(request));
        List<BaseModule> list = moduleManager.queryModuleButtons(user.getRoleIds(), moduleEname);
        response.setContentType("text/html;charset=UTF-8");
        JsonUtils.write(list, response.getWriter(), this.getExcludes(), this.getDatePattern());
    }

    /**
     * 菜单异步树， 权限管理用
     *
     * @param moduleId
     * @return
     */
    @RequestMapping(value = "/queryModuleTree", method = RequestMethod.GET)
    @ResponseBody
    public List<RoleModuleRelationNode> queryModuleTree(String moduleId, String roleId) {
        return moduleManager.queryModuleTree(moduleId, roleId);
    }

    /**
     * 菜单同步树， 权限管理用
     *
     * @param moduleId
     * @return
     */
    @RequestMapping(value = "/queryModuleTreeSync", method = RequestMethod.GET)
    @ResponseBody
    public RoleModuleRelationNode queryModuleTreeSync(String moduleId, String roleId) {
        return moduleManager.queryModuleTreeSync(moduleId, roleId);
    }

    /**
     * @param b
     * @return
     */
    public StringBuffer getTreeJsonNoIco(List<BaseModule> b) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < b.size(); i++) {
            //最后一个
            if (i + 1 == b.size()) {
                sb.append(getCurrentNoIco(b.get(i), null));
            } else {
                sb.append(getCurrentNoIco(b.get(i), b.get(i + 1)));
            }
        }
        return sb;
    }

    /**
     * @param current
     * @param next
     * @return
     */
    public StringBuffer getCurrentNoIco(BaseModule current, BaseModule next) {
        StringBuffer s = new StringBuffer();
        s.append("{\"oid\":\"" + current.getId() + "\",\"id\":\"" + current.getId() + "\"");
        if (next == null) {

            s.append(",\"name\":\"" + current.getcName() + "\",\"leaf\":true}]}");
        } else {
            //当前的是下一个的父级
            if (current.getId().equals(next.getParentOid())) {
                s.append(",\"name\":\"" + current.getcName() + "\",\"expanded\":false,\"children\":[");
            } else {
                if (current.getParentOid().equals(next.getParentOid())) {
                    s.append(",\"name\":\"" + current.getcName() + "\",\"leaf\":true},");
                } else {
                    s.append(",\"name\":\"" + current.getcName() + "\",\"leaf\":true}]},");
                }
            }
        }
        return s;
    }

    /**
     * 当前对象和下一个对象，返回当前对象的字符串
     *
     * @param current
     * @param next
     * @return
     */
    public StringBuffer getCurrent(BaseModule current, BaseModule next) {
        StringBuffer s = new StringBuffer();
        s.append("{\"text\":\"");
        if (current.getIco() != null && !"".equals(current.getIco())) {
            String ico = current.getIco();
            String st = ico.substring(ico.lastIndexOf("|") + 1);
            s.append("<i class=\\\"fa " + st + " \\\"></i> " + current.getcName() + "\"");
        } else {
            s.append("" + current.getcName() + "\"");
        }
        String path = "";
        if (current.getPathHandler() != null && !"".equals(current.getPathHandler())) {
            path = current.getPathHandler();
        }
        if (next == null) {

            s.append(",\"iconCls\":\"noIcon\",\"id\":\"" + current.getcName() + "|" + path + "\",\"leaf\":true}]}");
        } else {
            //当前的是下一个的父级
            if (current.getId().equals(next.getParentOid())) {
                s.append(",\"iconCls\":\"noIcon\",\"id\":\"" + current.geteName() + "|" + path + "\",\"expanded\":false,\"children\":[");
            } else {
                if (current.getParentOid().equals(next.getParentOid())) {
                    s.append(",\"iconCls\":\"noIcon\",\"id\":\"" + current.geteName() + "|" + path + "\",\"leaf\":true},");
                } else {
                    s.append(",\"iconCls\":\"noIcon\",\"id\":\"" + current.geteName() + "|" + path + "\",\"leaf\":true}]},");
                }
            }
        }
        return s;
    }

    /**
     * @param PID
     * @return
     */
    @RequestMapping(value = "/getModulesList", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String getModulesList(String PID) {
        Map<String, Object> model = new HashMap<String, Object>();
        StringBuffer sb = new StringBuffer();
        List<BaseModule> list = new ArrayList<BaseModule>();
        String s = "";
        list = moduleManager.queryModuleByPid(PID);
        sb.append("{\"text\":\"root\",\"children\":[");
        sb.append(getTreeJsonNoIco(list));
        s = sb.toString();
        return s;
    }

    /**
     * 完全展开异步树
     *
     * @return
     */
//    @RequestMapping(value = "/getAllModulesForTree", method = RequestMethod.GET)
//    @ResponseBody
//    public ModuleTreeNode getAllModulesForTree() {
//        return moduleManager.queryAllModule();
//    }

    /**
     * 根据菜单id找到对应的权限
     *
     * @param
     * @return
     */
//    @RequestMapping(value = "/getModulePermissionByOid", method = RequestMethod.GET)
//    @ResponseBody
//    public List<BasePermission> getModulePermissionByOid(String oid) {
//        List<BasePermission> list = moduleManager.getModulePermissionByOid(oid);
//        return list;
//    }
    public String getCurrentJson(BaseModule b) {
        String s = "{\"oid\":\"" + b.getId() + "\",\"code\":\"" + b.getCode() + "\",\"text\":";
        if (b.getIco() != null && !"".equals(b.getIco())) {
            String ico = b.getIco();
            String st = ico.substring(ico.lastIndexOf("|") + 1);
            s = s + "\"<i class=\\\"fa " + st + " \\\"></i> " + b.getcName() + "\"";
        } else {
            s = s + "\"" + b.getcName() + "\"";
        }
        s = s + ",\"name\":\"" + b.getcName() + "\",\"ename\":\"" + b.geteName() + "\",\"url\":\"" + b.getUrl() + "\",\"ico\":\"" + b.getIco() + "\",\"pathHandler\":"
                + "\"" + b.getPathHandler() + "\",\"description\":\"" + b.getDescription() + "\",\"LT\":" + b.getLt() + ",\"RT\":" + b.getRt() + ",\"treeLevel\":" + b.getTreeLevel() + ","
                + "\"sortCode\":" + b.getSortNo() + ",\"state\":" + b.getState() + ",\"flag\":" + b.getFlag() + ",\"buttonId\":\"" + b.getButtonId() + "\",\"createTime\":\"" + b.getCreateTime() + "\","
                + "\"parentOid\":\"" + b.getParentOid() + "\",\"check\":false,\"iconCls\":\"noIcon\",";
        return s;
    }

    /**
     * 验证英文名称重复
     */
    @RequestMapping(value = "/getIsExist", method = RequestMethod.GET)
    @ResponseBody
    public ResultBean getIsExist(String eName, String id) {

        ResultBean resultBean = new ResultBean();
        resultBean.setResultCode(ResultBean.SUCCESS);
        BaseModule model = new BaseModule();
        model.seteName(eName);
        List<BaseModule> list = moduleManager.query(model);
        if (list != null && list.size() > 0) {
            if(id != null && !id.equals(list.get(0).getId())){
                resultBean.setResultCode(ResultBean.FAIL);
                resultBean.setResultDesc("名称已存在，请重新输入");
            }
        }
        return resultBean;
    }

    @Override
    public String[] getExcludes() {
        return new String[]{"hibernateLazyInitializer", "permissionModuleRelations", "roleModuleRelations"};
    }

    @Override
    public String[] getExcludesLoad() {
        return new String[]{"hibernateLazyInitializer", "permissionModuleRelations", "roleModuleRelations"};
    }

}
