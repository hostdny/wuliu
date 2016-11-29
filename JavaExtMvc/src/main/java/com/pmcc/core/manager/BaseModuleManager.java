package com.pmcc.core.manager;

import com.pmcc.core.dao.BaseModuleDao;
import com.pmcc.core.dao.BaseRoleModuleRelationDao;
import com.pmcc.core.domain.BaseModule;
import com.pmcc.utils.ButtonUtils;
import com.pmcc.utils.ModuleTreeNode;
import com.pmcc.utils.ResultBean;
import com.pmcc.utils.RoleModuleRelationNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * 菜单功能表
 * Created by LvXL on 2016/6/22.
 */
@Transactional
@Service
public class BaseModuleManager extends BaseManager<BaseModule, String> {

    @Autowired
    BaseModuleDao moduleDao;

    @Autowired
    BaseRoleModuleRelationDao roleModuleRelationDao;

    @Transactional(readOnly = true)
    public List<BaseModule> query(BaseModule module) {
        return moduleDao.query(module);
    }

    /**
     * 根据角色和父id获取菜单
     *
     * @param roleIds
     * @return
     */
    @Transactional(readOnly = true)
    public List<BaseModule> queryModuleByRole(List<String> roleIds, String moduleId) {

        String ids = "";
        for (String roleId : roleIds) {
            ids += roleId + ",";
        }
        ids = ids.substring(0, ids.length() - 1);
        ids = ids.replaceAll(",", "','");
        return moduleDao.queryModuleByRole(ids, moduleId);
    }

    /**
     * 菜单下拉树
     *
     * @param parentOid
     * @return
     */
    @Transactional(readOnly = true)
    public List<BaseModule> queryModuleToCombo(String parentOid) {
        BaseModule module = new BaseModule();
        module.setParentOid(parentOid);
        module.setFlag(0);
        List<BaseModule> list = moduleDao.query(module);
        if (list != null && list.size() > 0) {
            for (BaseModule baseModule : list) {
                module.setParentOid(baseModule.getId());
                module.setFlag(0);
                List<BaseModule> childList = moduleDao.query(module);
                if (childList != null && childList.size() > 0) {
                    baseModule.setExpanded(false);
                    baseModule.setLeaf(false);
                } else {
                    baseModule.setExpanded(true);
                    baseModule.setLeaf(true);
                }
            }
        }
        return list;
    }


    /**
     * 获取菜单树
     *
     * @param moduleId
     * @return
     */
    @Transactional(readOnly = true)
    public List<ModuleTreeNode> queryByPId(String moduleId) {

        List<ModuleTreeNode> listTree = new ArrayList<ModuleTreeNode>();
        //
        BaseModule module = new BaseModule();
        module.setParentOid(moduleId);
        List<BaseModule> list = moduleDao.query(module);
        if (list != null && list.size() > 0) {
            for (BaseModule baseModule : list) {
                ModuleTreeNode tn = new ModuleTreeNode();
                tn.setOid(baseModule.getId());
                tn.setId(baseModule.geteName() + "|" + baseModule.getPathHandler());
                tn.setCode(baseModule.getCode());
                tn.setName(baseModule.getcName());
                tn.setParentOid(baseModule.getParentOid());
                tn.setLT(baseModule.getLt());
                tn.setRT(baseModule.getRt());
                tn.setTreeLevel(baseModule.getTreeLevel());
                tn.setSortCode(baseModule.getSortNo());
                tn.setFlag(baseModule.getFlag());
                tn.setPathHandler(baseModule.getPathHandler());
                tn.setEname(baseModule.geteName());
                tn.setIconCls("noIcon");
                tn.setUrl(baseModule.getUrl());

                if (baseModule.getIco() != null && !"".equals(baseModule.getIco())) {
                    String ico = baseModule.getIco();
                    String st = ico.substring(ico.lastIndexOf("|") + 1);
                    tn.setText("<i class=\"fa " + st + " \"></i> " + baseModule.getcName());
                } else {
                    tn.setText(baseModule.getcName());
                }
                tn.setIco(baseModule.getIco());
                tn.setDescription(baseModule.getDescription());
                tn.setState(baseModule.getState());
                // 是否有子菜单
                module.setParentOid(baseModule.getId());
                List<BaseModule> childList = moduleDao.query(module);
                if (childList != null && childList.size() > 0) {
                    tn.setExpanded(false);
                    tn.setLeaf(false);
                } else {
                    tn.setExpanded(true);
                    tn.setLeaf(true);
                }
                // 父级菜单名称
                BaseModule pModule = moduleDao.get(baseModule.getParentOid());
                if(pModule != null){
                    tn.setParentName(pModule.getcName());
                }
                listTree.add(tn);
            }
            return listTree;

        } else {
            return null;
        }
    }

    /**
     * 根据菜单英文名获取按钮
     *
     * @param roleIds     角色id
     * @param moduleEname 菜单英文名
     * @return
     */
    @Transactional(readOnly = true)
    public List<BaseModule> queryModuleButtons(List<String> roleIds, String moduleEname) {
        String ids = "";
        for (String roleId : roleIds) {
            ids += roleId + ",";
        }
        ids = ids.substring(0, ids.length() - 1);
        ids = ids.replaceAll(",", "','");
        return moduleDao.queryModuleButtons(ids, moduleEname);
    }

    @Transactional(readOnly = true)
    public List<BaseModule> queryModuleByPid(String pid) {
        return moduleDao.queryModuleByPid(pid);
    }

    /**
     * 新增后调用存储过程
     *
     * @param flag   0：新增，1：修改
     * @param module
     */
    @Transactional(propagation = Propagation.REQUIRED)
    public void executeProcedure(int flag, BaseModule module) {
        if (flag == 0) {
            // 新增
            moduleDao.executeProcedureToAdd(module);
        } else if (flag == 1) {
            // 修改
            moduleDao.executeProcedureToUpdate(module);
        }
    }

    /**
     * 菜单删除
     *
     * @param ids
     * @return
     */
    @Transactional(propagation = Propagation.REQUIRED)
    public ResultBean deleteModule(String ids) {

        ResultBean resultBean = new ResultBean();
        resultBean.setResultCode(ResultBean.FAIL);
        BaseModule module = new BaseModule();
        if (ids != null && !"".equals(ids)) {
            int j = 0;
            String[] arr = ids.split(",");
            for (int i = 0; i < arr.length; i++) {
                module.setId(arr[i]);
                // 先执行过程
                int res = moduleDao.executeProcedureToDelete(module);
                // 删除菜单数据
                moduleDao.delete(module);
                // 删除角色菜单关系
                roleModuleRelationDao.executeSQL(" DELETE FROM base_role_module_relation WHERE MODULE_ID = '" + arr[i] + "' ", null);
            }
            resultBean.setsCount(arr.length);
            resultBean.setResultCode(ResultBean.SUCCESS);
        }
        return resultBean;
    }

    /**
     * 菜单位置移动
     *
     * @param moveType up：上移；down：下移
     * @param moduleId 菜单id
     * @return
     */
    @Transactional(propagation = Propagation.REQUIRED)
    public int moduleTreeMove(String moveType, String moduleId) {

        if("up".equals(moveType)){
            // 上移
            moduleDao.executeProcedureToMove(-1, moduleId);
        }else if("down".equals(moveType)){
            // 下移
            moduleDao.executeProcedureToMove(1, moduleId);
        }
        return 0;
    }

    /**
     * 菜单异步树，权限管理用
     *
     * @param moduleId
     * @return
     */
    @Transactional(readOnly = true)
    public List<RoleModuleRelationNode> queryModuleTree(String moduleId, String roleId) {

        List<RoleModuleRelationNode> resList = new ArrayList<RoleModuleRelationNode>();

        BaseModule module = new BaseModule();
        module.setParentOid(moduleId);
        module.setFlag(0);
        List<BaseModule> list = moduleDao.query(module);
        if (list != null && list.size() > 0) {
            RoleModuleRelationNode node = null;
            for (BaseModule baseModule : list) {
                node = new RoleModuleRelationNode();
                node.setId(baseModule.getId());
                node.setText(baseModule.getcName());
                node.setName(baseModule.getcName());
                node.setChecked(roleModuleRelationDao.isChecked(baseModule.getId(), roleId));
                // 查询按钮
                module.setParentOid(baseModule.getId());
                module.setFlag(1234);
                List<BaseModule> childList = moduleDao.query(module);
                if (childList != null && childList.size() > 0) {
                    List<ButtonUtils> toolbarBtns = new ArrayList<ButtonUtils>();
                    List<ButtonUtils> actions = new ArrayList<ButtonUtils>();
                    List<ButtonUtils> operationBtns = new ArrayList<ButtonUtils>();
                    List<ButtonUtils> pageBtns = new ArrayList<ButtonUtils>();

                    for (BaseModule moduleChild : childList) {
                        // 类型
                        int flag = moduleChild.getFlag();
                        if (flag == 1) {
                            // 工具栏按钮 flag=1
                            toolbarBtns.add(new ButtonUtils(moduleChild.getId(), moduleChild.getcName(), roleModuleRelationDao.isChecked(moduleChild.getId(), roleId)));
                        } else if (flag == 2) {
                            // 请求 flag=2
                            actions.add(new ButtonUtils(moduleChild.getId(), moduleChild.getcName(), roleModuleRelationDao.isChecked(moduleChild.getId(), roleId)));
                        } else if (flag == 3) {
                            // 行操作按钮 flag=3
                            operationBtns.add(new ButtonUtils(moduleChild.getId(), moduleChild.getcName(), roleModuleRelationDao.isChecked(moduleChild.getId(), roleId)));
                        } else if (flag == 4) {
                            // 页面按钮 flag=4
                            pageBtns.add(new ButtonUtils(moduleChild.getId(), moduleChild.getcName(), roleModuleRelationDao.isChecked(moduleChild.getId(), roleId)));
                        }
                    }
                    node.setToolbarBtns(toolbarBtns);
                    node.setActions(actions);
                    node.setOperationBtns(operationBtns);
                    node.setPageBtns(pageBtns);
                }
                // 是否有子菜单
                module.setParentOid(baseModule.getId());
                module.setFlag(0);
                List<BaseModule> childModule = moduleDao.query(module);
                if (childModule != null && childModule.size() > 0) {
                    node.setExpanded(false);
                    node.setChecked(false);
                } else {
                    node.setExpanded(true);
                    node.setChecked(false);
                }
                resList.add(node);
            }
        }
        return resList;
    }

    /**
     * 查询所有菜单 同步树
     *
     * @param moduleId
     * @param roleId
     * @return
     */
    @Transactional(readOnly = true)
    public RoleModuleRelationNode queryModuleTreeSync(String moduleId, String roleId) {

        BaseModule module = new BaseModule();
        module.setParentOid(moduleId);
        module.setFlag(0);
        List<BaseModule> list = moduleDao.query(module);

        RoleModuleRelationNode node = new RoleModuleRelationNode();
        node.setText("root");
        node.setExpanded(true);
        node.setChildren(this.queryNode(list, roleId));

        return node;
    }

    /**
     * 查询所有子
     *
     * @param list
     * @param roleId
     * @return
     */
    public List<RoleModuleRelationNode> queryNode(List<BaseModule> list, String roleId) {

        List<RoleModuleRelationNode> nodeList = new ArrayList<RoleModuleRelationNode>();
        for (BaseModule baseModule : list) {
            RoleModuleRelationNode node = this.covertModule(baseModule, roleId);
            nodeList.add(node);
        }
        return nodeList;
    }

    /**
     * 菜单转换
     *
     * @param baseModule
     * @param roleId
     * @return
     */
    @Transactional(readOnly = true)
    public RoleModuleRelationNode covertModule(BaseModule baseModule, String roleId) {

        RoleModuleRelationNode node = new RoleModuleRelationNode();
        BaseModule module = new BaseModule();
        // 菜单项
        node.setId(baseModule.getId());
        node.setText(baseModule.getcName());
        node.setName(baseModule.getcName());
        node.setChecked(roleModuleRelationDao.isChecked(baseModule.getId(), roleId));
        node.setExpanded(true);
        // 查询其他项
        module.setParentOid(baseModule.getId());
        module.setFlag(1234);
        List<BaseModule> other = moduleDao.query(module);
        if (other != null && other.size() > 0) {
            List<ButtonUtils> toolbarBtns = new ArrayList<ButtonUtils>();
            List<ButtonUtils> actions = new ArrayList<ButtonUtils>();
            List<ButtonUtils> operationBtns = new ArrayList<ButtonUtils>();
            List<ButtonUtils> pageBtns = new ArrayList<ButtonUtils>();
            for (BaseModule moduleChild : other) {
                // 类型
                int flag = moduleChild.getFlag();
                if (flag == 1) {
                    // 工具栏按钮 flag=1
                    toolbarBtns.add(new ButtonUtils(moduleChild.getId(), moduleChild.getcName(), roleModuleRelationDao.isChecked(moduleChild.getId(), roleId)));
                } else if (flag == 2) {
                    // 请求 flag=2
                    actions.add(new ButtonUtils(moduleChild.getId(), moduleChild.getcName(), roleModuleRelationDao.isChecked(moduleChild.getId(), roleId)));
                } else if (flag == 3) {
                    // 行操作按钮 flag=3
                    operationBtns.add(new ButtonUtils(moduleChild.getId(), moduleChild.getcName(), roleModuleRelationDao.isChecked(moduleChild.getId(), roleId)));
                } else if (flag == 4) {
                    // 页面按钮 flag=4
                    pageBtns.add(new ButtonUtils(moduleChild.getId(), moduleChild.getcName(), roleModuleRelationDao.isChecked(moduleChild.getId(), roleId)));
                }
            }
            node.setToolbarBtns(toolbarBtns);
            node.setActions(actions);
            node.setOperationBtns(operationBtns);
            node.setPageBtns(pageBtns);
        }
        // 是否有子菜单
        module.setParentOid(baseModule.getId());
        module.setFlag(0);
        List<BaseModule> childModule = moduleDao.query(module);
        if (childModule != null && childModule.size() > 0) {
            node.setExpanded(true);
            node.setChildren(this.queryNode(childModule, roleId));
        } else {
            node.setExpanded(false);
            node.setLeaf(true);
        }
        return node;
    }

}
