package com.pmcc.core.dao;

import com.pmcc.core.domain.BaseModule;
import org.hibernate.SQLQuery;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * 菜单功能表
 * Created by LvXL on 2016/6/22.
 */
@Repository
public class BaseModuleDao extends BaseDao<BaseModule, String> {

    /**
     * 获取菜单树
     *
     * @param module
     * @return
     */
    public List<BaseModule> query(BaseModule module) {

        DetachedCriteria criteria = DetachedCriteria.forClass(BaseModule.class);

        // id
        if (module.getId() != null) {
            criteria.add(Restrictions.eq("id", module.getId()));
        }
        // 父id
        if (module.getParentOid() != null) {
            criteria.add(Restrictions.eq("parentOid", module.getParentOid()));
        }
        // 英文名称
        if (module.geteName() != null) {
            criteria.add(Restrictions.eq("eName", module.geteName()));
        }
        // 类型
        if (module.getFlag() != null) {
            if (module.getFlag() == 1234) {
                criteria.add(Restrictions.in("flag", new Integer[]{1, 2, 3, 4}));
            } else {
                criteria.add(Restrictions.eq("flag", module.getFlag()));
            }
        }
        criteria.add(Restrictions.eq("delFlag", 0));
        criteria.addOrder(Order.asc("lt"));
        return (List<BaseModule>) hibernateTemplate.findByCriteria(criteria);
    }

    /**
     * @param id
     * @return
     */
    public BaseModule find(String id) {
        return hibernateTemplate.get(BaseModule.class, id);
    }

    /**
     * 根据角色查询菜单
     *
     * @param ids
     * @return
     */
    public List<BaseModule> queryModuleByRole(String ids, String moduleId) {

        DetachedCriteria criteria = DetachedCriteria.forClass(BaseModule.class);
        String sql = " PARENTOID = '" + moduleId + "' AND FLAG = 0 AND DEL_FLAG = 0 AND OID IN (SELECT b.MODULE_ID FROM base_role_module_relation b WHERE b.ROLE_ID IN ('" + ids + "')) ORDER BY LT";
        criteria.add(Restrictions.sqlRestriction(sql));

        return (List<BaseModule>) hibernateTemplate.findByCriteria(criteria);
    }


    /**
     * 通过菜单英文名查询菜单下所有按钮
     *
     * @param ids         角色id
     * @param moduleEname 菜单英文名
     * @return
     */
    public List<BaseModule> queryModuleButtons(String ids, String moduleEname) {

        DetachedCriteria criteria = DetachedCriteria.forClass(BaseModule.class);
        StringBuffer sb = new StringBuffer();
        sb.append(" FLAG IN (1, 3, 4) AND DEL_FLAG = 0 ");
        sb.append(" AND PARENTOID = (SELECT t.OID FROM base_module t WHERE t.ENAME = '" + moduleEname + "')  ");
        sb.append(" AND OID IN (SELECT a.MODULE_ID FROM base_role_module_relation a WHERE a.ROLE_ID IN ('" + ids + "')) ORDER BY SORT_NO ");
        criteria.add(Restrictions.sqlRestriction(sb.toString()));
        return (List<BaseModule>) hibernateTemplate.findByCriteria(criteria);
    }

    /**
     * 查询子菜单
     *
     * @param pid
     * @return
     */
    public List<BaseModule> queryModuleByPid(String pid) {
        DetachedCriteria criteria = DetachedCriteria.forClass(BaseModule.class);
        DetachedCriteria criteriaList = DetachedCriteria.forClass(BaseModule.class);
        criteriaList.add(Restrictions.and(Restrictions.eq("flag", 0), Restrictions.eq("parentOid", pid)));
        List<BaseModule> listModule = (List<BaseModule>) hibernateTemplate.findByCriteria(criteriaList);
        List<String> listString = new ArrayList<String>();
        for (int i = 0; i < listModule.size(); i++) {
            listString.add(listModule.get(i).getId());
        }
        criteria.add(Restrictions.or(Restrictions.in("parentOid", listString), Restrictions.eq("parentOid", pid)));
        criteria.add(Restrictions.eq("flag", 0));
        criteria.addOrder(Order.asc("lt"));
        return (List<BaseModule>) hibernateTemplate.findByCriteria(criteria);
    }

    /**
     * 新增时调用的存储过程
     *
     * @param module
     */
    public int executeProcedureToAdd(BaseModule module) {

        String sql = "{CALL ModuleTreeNodeAdd(?,?)}";
        SQLQuery query = hibernateTemplate.getSessionFactory().getCurrentSession().createSQLQuery(sql);
        query.setString(0, module.getId());
        query.setString(1, module.getParentOid());
        return query.executeUpdate();
    }

    /**
     * 修改时调用的存储过程
     *
     * @param module
     */
    public int executeProcedureToUpdate(BaseModule module) {

        String sql = "{CALL ModuleTreeNodeUpdate(?,?)}";
        SQLQuery query = hibernateTemplate.getSessionFactory().getCurrentSession().createSQLQuery(sql);
        query.setString(0, module.getId());
        query.setString(1, module.getParentOid());
        return query.executeUpdate();
    }

    /**
     * 删除时调用的存储过程
     *
     * @param module
     */
    public int executeProcedureToDelete(BaseModule module) {

        String sql = "{CALL ModuleTreeNodeDelete(?)}";
        SQLQuery query = hibernateTemplate.getSessionFactory().getCurrentSession().createSQLQuery(sql);
        query.setString(0, module.getId());
        return query.executeUpdate();
    }

    /**
     * 移动菜单
     *
     * @param moveFlag -1：上移；1：下移
     * @param moduleId 菜单id
     * @return
     */
    public int executeProcedureToMove(int moveFlag, String moduleId) {

        String sql = "{CALL ModuleTreeNodeMove(?,?)}";
        SQLQuery query = hibernateTemplate.getSessionFactory().getCurrentSession().createSQLQuery(sql);
        query.setString(0, moduleId);
        query.setInteger(1, moveFlag);
        return query.executeUpdate();
    }

}
