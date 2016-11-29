package com.pmcc.core.dao;

import com.pmcc.core.domain.BaseButtons;
import com.pmcc.core.domain.BaseModule;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 功能按钮表
 * Created by yaonan on 2015/12/18.
 */
@Repository
public class BaseButtonsDao extends BaseDao<BaseButtons, String> {


    public List<BaseButtons> query(BaseButtons entity) {

        DetachedCriteria criteria = DetachedCriteria.forClass(BaseButtons.class);
        // 英文名称
        if(entity.geteName() != null && !"".equals(entity.geteName())){
            criteria.add(Restrictions.eq("eName", entity.geteName()));
        }
        // 事件名称
        if(entity.getEventMethod() != null && !"".equals(entity.getEventMethod())){
            criteria.add(Restrictions.eq("eventMethod", entity.getEventMethod()));
        }
        criteria.addOrder(Order.asc("sortNo"));

        return (List<BaseButtons>) hibernateTemplate.findByCriteria(criteria);
    }

}
