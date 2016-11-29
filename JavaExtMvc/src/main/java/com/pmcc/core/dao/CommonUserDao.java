package com.pmcc.core.dao;

import com.pmcc.core.domain.CommonUser;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 普通用户
 * Created by LvXL on 2016/8/10.
 */
@Repository
public class CommonUserDao extends BaseDao<CommonUser, String> {

    /**
     * 条件查询
     *
     * @param user
     * @return
     */
    public List<CommonUser> query(CommonUser user) {

        DetachedCriteria criteria = DetachedCriteria.forClass(CommonUser.class);

        if (user.getUserEName() != null && !"".equals(user.getUserEName())) {
            criteria.add(Restrictions.eq("userEName", user.getUserEName()));
        }
        criteria.addOrder(Order.desc("createTime"));

        return (List<CommonUser>) hibernateTemplate.findByCriteria(criteria);
    }

    /**
     * 查询审核通过人员
     * @param user
     * @return
     */
    public List<CommonUser> judgeJurisdiction (CommonUser user){
        DetachedCriteria criteria = DetachedCriteria.forClass(CommonUser.class);
        if (user.getUserEName() != null && !"".equals(user.getUserEName())) {
            criteria.add(Restrictions.eq("userEName", user.getUserEName()));
            criteria.add(Restrictions.eq("status","1"));
        }
        return (List<CommonUser>) this.hibernateTemplate.findByCriteria(criteria);
    }

    /**
     * 手机端查询所有委员会人员
     * @return
     */
    public List<CommonUser> queryAll (){
        DetachedCriteria criteria = DetachedCriteria.forClass(CommonUser.class);
        criteria.add(Restrictions.eq("userType","1"));
        criteria.addOrder(Order.desc("createTime"));
        return (List<CommonUser>) this.hibernateTemplate.findByCriteria(criteria);
    }


    public CommonUser queryByEname(String ename) {
        DetachedCriteria criteria = DetachedCriteria.forClass(CommonUser.class);
        criteria.add(Restrictions.eq("userEName",ename));
        return  (CommonUser)this.hibernateTemplate.findByCriteria(criteria).get(0);
    }
}
