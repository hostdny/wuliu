package com.pmcc.core.dao;

import com.pmcc.core.domain.BaseRoleModuleRelation;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 角色菜单关系表
 * Created by LvXL on 2016/6/23.
 */
@Repository
public class BaseRoleModuleRelationDao extends BaseDao<BaseRoleModuleRelation, String> {

    /**
     * 判断角色是否存在菜单权限
     *
     * @param moduleId
     * @param roleId
     * @return
     */
    public boolean isChecked(String moduleId, String roleId) {

        boolean flag = false;

        DetachedCriteria criteria = DetachedCriteria.forClass(BaseRoleModuleRelation.class);
        String sql = " MODULE_ID = '" + moduleId + "' AND ROLE_ID = '" + roleId + "' ";
        criteria.add(Restrictions.sqlRestriction(sql));

        List<BaseRoleModuleRelation> list = (List<BaseRoleModuleRelation>) hibernateTemplate.findByCriteria(criteria);
        if (list != null && list.size() > 0) {
            flag = true;
        }
        return flag;
    }

}
