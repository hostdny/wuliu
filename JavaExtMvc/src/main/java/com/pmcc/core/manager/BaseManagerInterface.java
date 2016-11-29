package com.pmcc.core.manager;

import com.pmcc.utils.ServiceException;
import com.pmcc.utils.ResultBean;
import org.hibernate.Criteria;

import java.io.Serializable;
import java.util.List;

/**
 * 基础 manager 接口
 * Created by Admin on 2016/1/28.
 */
public interface BaseManagerInterface<T, PK extends Serializable> {

    public T get(PK id) throws ServiceException;

    public T get(Class<T> entityClass, Serializable id);

    public void  save(T entity);

    public void onlysave(T entity);

    public ResultBean pagedQuery(Criteria criteria, int pageNo, int limit);

    public void delete(PK id);

    public void delete(String[] arr, String[] ids);

    public void delete(T entity);

    public void executeSQL(String sql, List parameters);

    public int saveAll(List<T> entitys);

    public List queryBySQL(String sql, List parameters);

    public Criteria createCriteria();

}
