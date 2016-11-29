package com.pmcc.core.dao;

import com.pmcc.core.domain.BaseRole;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 角色表
 * Created by LvXL on 2016/6/22.
 */
@Repository
public class BaseRoleDao extends BaseDao<BaseRole, String> {

    public List<BaseRole> query(BaseRole role) {

        DetachedCriteria criteria = DetachedCriteria.forClass(BaseRole.class);
        if (role.getId() != null) {
            criteria.add(Restrictions.eq("id", role.getId()));
        }
        if (role.getCode() != null) {
            criteria.add(Restrictions.eq("code", role.getCode()));
        }
        criteria.addOrder(Order.asc("code"));
        return (List<BaseRole>) hibernateTemplate.findByCriteria(criteria);
    }

}
