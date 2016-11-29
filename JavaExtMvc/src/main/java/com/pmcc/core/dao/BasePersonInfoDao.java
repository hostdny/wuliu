package com.pmcc.core.dao;

import com.pmcc.core.domain.BasePersonInfo;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 用户表
 * Created by LvXL on 2016/6/22.
 */
@Repository
public class BasePersonInfoDao extends BaseDao<BasePersonInfo, String> {

    /**
     * 查询:登录用
     *
     * @param personInfo
     * @return
     */
    public List<BasePersonInfo> query(BasePersonInfo personInfo) {

        DetachedCriteria criteria = DetachedCriteria.forClass(BasePersonInfo.class);
        // 英文名称
        if (personInfo.getUserEName() != null && !"".equals(personInfo.getUserEName())) {
            criteria.add(Restrictions.eq("userEName", personInfo.getUserEName()));
        }
        criteria.add(Restrictions.eq("delFlag", 0));
        return (List<BasePersonInfo>) hibernateTemplate.findByCriteria(criteria);
    }

    /**
     * 根据账户查询
     * @param userEname
     * @return
     */
    public List<BasePersonInfo> queryByName(String userEname) {

        DetachedCriteria criteria = DetachedCriteria.forClass(BasePersonInfo.class);
        // 英文名称
        if (userEname != null && !"".equals(userEname)) {
            criteria.add(Restrictions.eq("userEName", userEname));
        }
        criteria.add(Restrictions.eq("delFlag", 0));
        return (List<BasePersonInfo>) hibernateTemplate.findByCriteria(criteria);
    }
}
