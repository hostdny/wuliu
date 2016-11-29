package com.pmcc.core.dao;

import com.pmcc.utils.ResultBean;
import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;

import java.io.Serializable;
import java.util.List;

/**
 * 基础 dao 接口
 * Created by Admin on 2016/1/28.
 */
public interface BaseDaoInterface<T, PK extends Serializable> {

    public void save(T entity);

    public String onlysave(T entity);

    public ResultBean pagedQuery(Criteria criteria, int pageNo, int pageSize);

    public Integer getCount(Criteria criteria);

    public void updateByColumn(String column, Object val, final Object[] ids);

    public void delete(PK id);

    public void delete(T entity);

    public T get(PK id);

    public <T> T get(Class<T> entityClass, Serializable id);

    public int executeSQL(final String sql, final List parameters);

    public List queryBySQL(final String sql, final List parameters);

    public List queryByCriteriaSQL(final String sql, Class cls);

    public Criteria createCriteria(Criterion... criterions);

    public int saveAll(List<T> entitys);
}
