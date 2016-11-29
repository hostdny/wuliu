package com.pmcc.core.dao;

import com.pmcc.core.domain.BasePersonInfoDetail;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 用户表详细
 * Created by LvXL on 2016/6/22.
 */
@Repository
public class BasePersonInfoDetailDao extends BaseDao<BasePersonInfoDetail, String> {

    /**
     * 条件查询
     *
     * @param detail
     * @return
     */
    public List<BasePersonInfoDetail> query(BasePersonInfoDetail detail) {

        DetachedCriteria criteria = DetachedCriteria.forClass(BasePersonInfoDetail.class);
        if (detail.getUserId() != null && !"".equals(detail.getUserId())) {
            criteria.add(Restrictions.eq("userId", detail.getUserId()));
        }
        criteria.addOrder(Order.desc("createTime"));
        return (List<BasePersonInfoDetail>) hibernateTemplate.findByCriteria(criteria);
    }

}
