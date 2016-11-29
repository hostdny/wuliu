package com.pmcc.core.dao;

import com.pmcc.core.domain.BaseDict;
import com.pmcc.core.domain.BaseModule;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 字典表
 * Created by LvXL on 2016/6/22.
 */
@Repository
public class BaseDictDao extends BaseDao<BaseDict, String> {

    /**
     * 下拉gird
     *
     * @param dict
     * @return
     */
    public List<BaseDict> query(BaseDict dict) {
        DetachedCriteria criteria = DetachedCriteria.forClass(BaseDict.class);
        if (dict.getParentId() != null) {
            criteria.add(Restrictions.eq("parentId", dict.getParentId()));
        }
        criteria.addOrder(Order.asc("sortNo"));
        return (List<BaseDict>) hibernateTemplate.findByCriteria(criteria);
    }

    /**
     * 查询下拉框
     *
     * @param dictType
     * @return
     */
    public List<BaseDict> queryToCombo(String dictType) {
        DetachedCriteria criteria = DetachedCriteria.forClass(BaseDict.class);
        if (dictType != null && !"".equals(dictType)) {
            criteria.add(Restrictions.eq("dictType", dictType));
        }
        criteria.addOrder(Order.asc("sortNo"));
        return (List<BaseDict>) hibernateTemplate.findByCriteria(criteria);
    }

    public BaseDict queryByValueAndCode(String dictType, String value) {
        DetachedCriteria criteria = DetachedCriteria.forClass(BaseDict.class);
        if (dictType != null && !"".equals(dictType)) {
            criteria.add(Restrictions.eq("dictType", dictType));
        }
        if (value != null && !"".equals(value)) {
            criteria.add(Restrictions.eq("dictCode", value));
        }
       BaseDict baseDict= (BaseDict) hibernateTemplate.findByCriteria(criteria).get(0);
        return baseDict;
    }
}
